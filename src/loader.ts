/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
  *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */

import { MusicTrace } from "./trace";
import { GrowableAudioBuffer } from "./buffer";
import { WaveformData } from "./waveform";
import { Synthesizer, SynthPatchRef } from "./synth";


// progress function for recordIntoBuffer
export type AudioRenderProgress = (percent: number) => void;

export interface AudioRenderRequest {

    /// resource id for this request (e.g. gadget ID number)
    uuid : string;

    /// tempo of the request
    bpm : number;

    /// duration of the request (in beats)
    beats : number;

    /// start time of the request (in beats). defaults to zero
    start? : number;

    /// trace object containing the musical notes
    trace : MusicTrace;

    /// musical instrument to use for rendering
    patch : SynthPatchRef;   // e.g. /sounds/voices/piano/

    /// progress callback
    progress : (percent : number) => void;

    /// if defined receives incremental waveform data while rendering
    waveform? : (wave : WaveformData) => void;

    /// for internal use only to fulfill promise
    _callback? : (buffer : GrowableAudioBuffer) => void;
}


/**
 * This class maintains an asynchronous request queue to generate audio buffers.
 * This creates an abstraction layer around the synthesizer. 
 * By using a queue, it means we're only doing one offline audio context render at a time. 
 * This improves performance and makes loading much smoother.
 * One issue with OfflineAudioContext is that it can't be cancelled once a render starts.
 * This is a huge problem because audio rendering can take seconds or minutes to render
 * with complex synthesizers or effects. We allow for chunking audio into smaller parts
 * if the goal is to create a waveform visualization. 
 */
export class AudioLoadingService {

    /// used to render audio buffers
    private synth = new Synthesizer();

    /// queue for audio render requests
    private queue : AudioRenderRequest[] = [];

    /// cache of previously rendered audio
    private cache = new Map<string, GrowableAudioBuffer>();

    /// singleton pattern
    private static instance? : AudioLoadingService;


    private constructor() {
        setTimeout(() => this._processReqest(), 100);
    }

    private static init() : AudioLoadingService {
        if (!AudioLoadingService.instance) {
            AudioLoadingService.instance = new AudioLoadingService();
        }
        return AudioLoadingService.instance!;
    }

    /**
     * Requests offline audio render of the given resource.
     */
    public static requestAudioBuffer(request : AudioRenderRequest) : Promise<GrowableAudioBuffer> {
        const service = AudioLoadingService.init();
        return new Promise<GrowableAudioBuffer>((success) => {
            const cached = service.cache.get(request.uuid);
            if (cached) {
                success(cached);
            } else {
                request._callback = success;
                service.queue.push(request);
            }
        });
    }

    
    public static cancelRequest(uuid : string) {
        const service = AudioLoadingService.init();
        service.queue = service.queue.filter(r => r.uuid !== uuid);
    }


    public static clearCache() {
        AudioLoadingService.instance?.cache.clear();
    }


    public static clearCacheEntry(uuid : string) {
        AudioLoadingService.instance?.cache.delete(uuid);
    }


    private async _processReqest() {
        // unpack first request on the queue
        const r = this.queue.shift();
        if (r) {
            const cached = this.cache.get(r.uuid);
            if (cached && r._callback) {
                r._callback(cached);
            } 
            else if (r.beats <= 0) {
                const gab = new GrowableAudioBuffer();
                this.cache.set(r.uuid, gab);
                if (r._callback) r._callback(gab);
            } 
            else {
                const gab = await this.recordIntoBuffer(r);
                this.cache.set(r.uuid, gab);
                if (r._callback) r._callback(gab);
            }
        }
        setTimeout(() => this._processReqest(), 100);
    }


    /**
     * Render audio into a buffer using an offline audio context.
     * Beats must be greater than zero.
     */
    private async recordIntoBuffer(request : AudioRenderRequest) : Promise<GrowableAudioBuffer> {
        return new Promise(async (success) => {
            const start = request.start ? request.start : 0;
            const duration = request.beats * (60 / request.bpm);
            const rate = 44100;
            const channels = 2;
            const frames = Math.round(rate * duration);
        
            // holds the resulting recording
            const gab = new GrowableAudioBuffer(channels, rate);

            // create offline audio context (stereo @ 44.1k sample rate)
            const oac = new OfflineAudioContext(channels, frames, rate);

            // audio worklet builds incremental waveform and reports on progress
            await oac.audioWorklet.addModule('/js/AudioWorklets.js');
            const recorder = new AudioWorkletNode(oac, "progress-monitor");
            let last_progress = 0.0;

            // build incremental waveform while rendering...
            const waveform = new WaveformData();

            // as audio renders, our reporter node will send periodic updates
            recorder.port.onmessage = (e) => {
                const complete = e.data[2] / frames;
                if (request.waveform) waveform.appendSample(e.data);
                if (complete > last_progress + 0.05) {
                    request.progress(Math.min(1.0, complete));
                    if (request.waveform) request.waveform(waveform);
                    last_progress = complete;
                }
            }
            recorder.connect(oac.destination);

            // configure the synth
            this.synth.bpm = request.bpm;
            await this.synth.loadPatch(request.patch);
            //await _loadCustomSounds(r);  // FIXME

            // record into the context
            this.synth.scheduleNotes(request.trace, recorder, start);

            const recording = await oac.startRendering();
            gab.appendAudioBuffer(recording);
            if (request.waveform) {
                request.waveform(waveform);
            }
            request.progress(1.0);
            success(gab);
        });
    }    

/*
  Future<bool> _loadCustomSounds(AudioRenderRequest r) async {
    for (TraceEvent e in r.trace.trace) {
      if (e.command == TraceEvent.SOUND && e.hasParam('sound') && e['sound'] is num) {
        String url = '${datahost}/recorder/audio/${e['sound']}';
        e['sound-url'] = url;
        print(url);
        await Synthesizer.loadCustomSound(url, r.context);
      }
    }
    return true;
  }
  */
}
