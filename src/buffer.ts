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
import { TunePadAudio } from "./audio";
import { clamp } from "./utils";


/**
 * Thin wrapper around the AudioBuffer class that allows for
 * exporting to WAV, MP3, and Base64. Also generates compressed waveform visualization data.
 * This is *mostly* an immutable object, except for the append operation, which can grow the buffer.
 */
export class GrowableAudioBuffer {

    private channels = new Array<Float32Array>();
    public getChannelData(channel : number) { return this.channels[channel]; }

    // audio samples per second
    public readonly sampleRate;  // 44100 Hz

    // channel count
    public get numberOfChannels() { return this.channels.length; }  // mono = 1, stereo = 2

    // length of the audio in samples
    get samples() { return this.channels[0].length; }
    get length() { return this.channels[0].length; }
        
    // is the audio buffer empty
    get isEmpty() { return this.samples <= 0; }

    // length of the audio in seconds
    get duration() { return this.samples / this.sampleRate; }

    // mono or stereo?
    get isMono() { return this.channels.length === 1; }
    get isStereo() { return this.channels.length === 2; }

    // cached AudioBuffer object
    private buffer? : AudioBuffer;


    /**
     * Create a new empty buffer with the given number of channels and sample rate
     */
    public constructor(channels : number = 1, sampleRate : number = 44100) {
        this.sampleRate = sampleRate;
        for (let i=0; i<channels; i++) {
            this.channels.push(new Float32Array());
        }
    }


    /**
     * Append the given audio data to this buffer and return the new buffer.
     * This is the only function that mutates the GrowableAudioBuffer.
     * @returns Returns this object with the new audio data appended.
     */
    public appendAudioBuffer(buffer : AudioBuffer) : GrowableAudioBuffer {
        if (buffer.sampleRate !== this.sampleRate) {
            throw "Cannot append to GrowableAudioBuffer due to a sample rate mismatch."
        }
        const appended = new Array<Float32Array>();
        for (let c = 0; c < this.numberOfChannels; c++) {
            const dest = new Float32Array(this.channels[c].length + buffer.length);
            const src = buffer.getChannelData(c < buffer.numberOfChannels ? c : 0);
            dest.set(this.channels[c], 0);
            dest.set(src, this.channels[c].length);
            appended.push(dest);
        }
        this.channels = appended;
        return this;
    }


    public append(buffer: GrowableAudioBuffer) : GrowableAudioBuffer {
        if (buffer.sampleRate !== this.sampleRate) {
            throw "Cannot append to GrowableAudioBuffer due to a sample rate mismatch."
        }
        const appended = new Array<Float32Array>();
        for (let c = 0; c < this.numberOfChannels; c++) {
            const dest = new Float32Array(this.samples + buffer.samples);
            const src = buffer.channels[c < buffer.numberOfChannels ? c : 0];
            dest.set(this.channels[c], 0);
            dest.set(src, this.channels[c].length);
            appended.push(dest);
        }
        this.channels = appended;
        return this;        
    }


    /**
     * Create a new buffer from the given AudioBuffer object
     */
    public static fromBuffer(buffer : AudioBuffer) : GrowableAudioBuffer {
        const gab = new GrowableAudioBuffer(buffer.numberOfChannels, buffer.sampleRate);
        return gab.appendAudioBuffer(buffer);
    }


    /**
     * load audio source from a URL. Throws an error if buffer cannot be loaded.
     */
    public static async fromURL(url : string) : Promise<GrowableAudioBuffer> {
        const context = TunePadAudio.init().context;
        const response = await fetch(url);
        const abuff = await response.arrayBuffer();
        const buffer = await context.decodeAudioData(abuff);
        return GrowableAudioBuffer.fromBuffer(buffer);
    }


    /**
     * Create a copy of this buffer
     */
    clone() : GrowableAudioBuffer {
        const gab = new GrowableAudioBuffer(this.numberOfChannels, this.sampleRate);
        const cloned = new Array<Float32Array>();
        for (let c = 0; c < gab.numberOfChannels; c++) {
            cloned.push(new Float32Array(this.channels[c]));
        }
        gab.channels = cloned;
        return gab;
    }


    /**
     * Trim the buffer from a start to an end point in seconds.
     * Return the new buffer.
     */
    trim(start : number, end : number) : GrowableAudioBuffer {
        const A = clamp(Math.round(start * this.sampleRate), 0, this.samples - 1);
        const B = clamp(Math.round(end * this.sampleRate), 0, this.samples - 1);
        const len = B - A;

        const gab = new GrowableAudioBuffer(this.numberOfChannels, this.sampleRate);

        if (len <= 0 || this.isEmpty) {
            return gab;
        }

        // copy in trimmed data
        const trimmed = new Array<Float32Array>();
        for (let c=0; c<this.numberOfChannels; c++) {
            trimmed.push(this.channels[c].slice(A, B));
        }
        gab.channels = trimmed;
        return gab;
    }


    /**
     * reverses the audio and returns the new buffer
     */
    reverse() : GrowableAudioBuffer {
        const samples = this.samples;
        const reversed = new Array<Float32Array>();
        for (let c=0; c < this.numberOfChannels; c++) {
            reversed.push(new Float32Array(samples));
            let j = samples - 1;
            for (let i=0; i<samples; i++) {
                reversed[c][j] = this.channels[c][i];
                j--;
            }
        }
        const gab = new GrowableAudioBuffer(this.numberOfChannels, this.sampleRate);
        gab.channels = reversed;
        return gab;
    }


    /**
     * create an AudioBuffer from the saved audio data. 
     * The length of the buffer must be greater than zero or this will throw an exception.
     */
    toAudioBuffer() : AudioBuffer {
        if (this.buffer) return this.buffer;

        this.buffer = new AudioBuffer({
            "length" : this.samples,
            "numberOfChannels" : this.numberOfChannels,
            "sampleRate" : this.sampleRate
        });
        for (let c=0; c<this.numberOfChannels; c++) {
            this.buffer.copyToChannel(this.channels[c], c);
        }
        return this.buffer;
    }


    /// encodes the audio buffer as an MP3 byte array
    /*
    Uint8List? toMP3() {
        if (_buffer == null) toAudioBuffer();
        if (_buffer == null) return null;

        // only mono or stereo support
        int channels = min(2, _buffer?.numberOfChannels ?? 2);
        bool stereo = channels == 2;

        Int16List left = new Int16List(_buffer!.length!);
        Int16List right = stereo ? new Int16List(_buffer!.length!) : left;

        for (int c=0; c < channels; c++) {
        Float32List src = _buffer!.getChannelData(c);
        Int16List dest = (c == 0) ? left : right;
        for (int i=0; i<src.length; i++) {
            num s = max(-1, min(1, src[i]));
            dest[i] = (s * (1 << 15)).round();
        }
        }

        if (stereo) {
        return js.context.callMethod('encodeMP3Stereo', [ left, right, sampleRate ]);
        } else {
        return js.context.callMethod('encodeMP3Mono', [ left, sampleRate ]);
        }
    }
*/


    /// encodes the audio buffer as a WAV byte array
    toWAV() : Uint8Array {
        // only mono or stereo support
        const channels = Math.min(2, this.numberOfChannels);
        const rate = this.sampleRate;
        const stereo = (channels == 2);
        const len = this.samples;

        const wav = new Int16Array(len * channels + 23);
        wav[0] = 0x4952;  // "RI"
        wav[1] = 0x4646;  // "FF"

        wav[2] = (2 * len * channels + 15) & 0x0000ffff; // RIFF size
        wav[3] = ((2 * len * channels + 15) & 0xffff0000) >> 16; // RIFF size

        wav[4] = 0x4157; // "WA"
        wav[5] = 0x4556; // "VE"

        wav[6] = 0x6d66; // "fm"
        wav[7] = 0x2074; // "t "

        wav[8] = 0x0012; // fmt chunksize: 18
        wav[9] = 0x0000;

        wav[10] = 0x0001; // format tag : 1
        wav[11] = channels; // channels: 2 or 1

        wav[12] = rate & 0x0000ffff; // sample per sec
        wav[13] = (rate & 0xffff0000) >> 16; // sample per sec

        wav[14] = (2 * channels * rate) & 0x0000ffff; // byte per sec
        wav[15] = ((2 * channels * rate) & 0xffff0000) >> 16; // byte per sec

        wav[16] = channels * 2; // block align
        wav[17] = 16;  // bits per sample
        wav[18] = 0x0000; // cb size
        wav[19] = 0x6164; // "da"
        wav[20] = 0x6174; // "ta"
        wav[21] = (2 * len * channels) & 0x0000ffff;         // data size[byte]
        wav[22] = ((2 * len * channels) & 0xffff0000) >> 16; // data size[byte]

        const leftSource = this.channels[0];
        const rightSource = stereo ? this.channels[1] : leftSource;

        for (let i=0; i<len; i++) {
            for (let c=0; c<channels; c++) {
                let sample = (c === 0) ? leftSource[i] : rightSource[i];
                sample = Math.max(-1.0, Math.min(1.0, sample));
                sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                wav[i * channels + c + 23] = Math.round(sample);
            }
        }
        return new Uint8Array(wav.buffer);
    }


    /**
     * downloads a WAV file as a blob
     */
    downloadWAV(filename : string) {
        //TESTME!
        const wav = this.toWAV();
        const blob = new Blob([ wav ], { type: "audio/wav" });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(objectUrl);
    }


  /// downloads an MP3 file as a blob
  /*
  Future? downloadMP3(String filename) {
    Uint8List? mp3 = toMP3();
    Blob? blob = new Blob([ mp3 ], "audio/mp3");
    if (blob != null) {
      String objectUrl = Url.createObjectUrlFromBlob(blob);
      AnchorElement link = new AnchorElement();
      link.href = objectUrl;
      link.download = filename;
      link.click();
      Url.revokeObjectUrl(objectUrl);
    }
  }
  */


  /// encode audio buffer as a base64 encoded MP3 file
  /*
  String? toMP3Base64() {
    Uint8List? mp3 = toMP3();
    return (mp3 != null) ? "data:audio/mp3;base64,${base64.encode(mp3)}" : null;
  }
  */


    /**
     * encode audio buffer as a base64 encoded WAV file
     */
    toWAVBase64() : string {
        const wav = this.toWAV();
        //TESTME
        return `data:audio/wav;base64,${btoa(wav.toString())}`;
    }
}