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

/**
 * Loads audio files and caches them as audio buffers
 */
export class SoundLoader {

    /// global map of loaded audio buffers
    static sounds = new Map<string, AudioBuffer>();

    private static context = TunePadAudio.init().context;

    /// creates a synthesizer with default patch
    private constructor() {  }


    /// returns true if the audio buffer has already been loaded
    static hasSound(name : string) {
        return (SoundLoader.sounds.has(name));
    }


    /// returns a preloaded audio buffer or null if it doesn't exist
    static getAudioBuffer(name: string) : AudioBuffer |  undefined {
        return SoundLoader.sounds.get(name);
    }


    /// asynchronously loads a sound from the given URL and uses name as the hash key
    static async loadAudioBuffer(name : string) : Promise<AudioBuffer | undefined>  {
        const ctx = SoundLoader.context;
        if (SoundLoader.hasSound(name)) {
            return SoundLoader.getAudioBuffer(name)!;
        }
        
        let url = name;
        if (url.endsWith('.ogg') || url.endsWith('.wav')) {
            url = name;
        } else {
            url = SoundLoader.supportsAudioType('audio/ogg') ? `${name}.ogg` : `${name}.wav`;
        }

        try {
            let response = await fetch(url);
            let abuff = await response.arrayBuffer();
            let buffer = await ctx.decodeAudioData(abuff);
            SoundLoader.sounds.set(name, buffer);
            return buffer;
        }
        catch (e) {
            console.log(e);
        }
    }

    /// asynchronously loads a sound from the given URL and uses name as the hash key
    static async loadCustomSound(url : string) : Promise<boolean>  {
        if (SoundLoader.hasSound(url)) return true;
        const ctx = SoundLoader.context;

        try {
            let response = await fetch(url);
            let abuff = await response.arrayBuffer();
            let buffer = await ctx.decodeAudioData(abuff);
            SoundLoader.sounds.set(url, buffer);
            console.log("Loaded " + url);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }


    /// checks to see if a particular audio format is supported by the browser
    ///     "audio/mpeg", "audio/mp4", "audio/ogg", "audio/x-aiff", "audio/wav" 
    static supportsAudioType(mimetype: string) : boolean {
        if (SoundLoader._supports.has(mimetype)) {
            return SoundLoader._supports.get(mimetype) as boolean;
        }
        let supportsFormat = false;

        const audio = document.createElement('audio');
        audio.id = "test-audio-node";
        document.body.append(audio);

        if (audio.canPlayType(mimetype) == "probably" || audio.canPlayType(mimetype) == "maybe") {
            supportsFormat = true;
            document.querySelector("#test-audio-node")?.remove();
        }
        SoundLoader._supports.set(mimetype, supportsFormat);
        return supportsFormat;
    }
    static _supports = new Map<string, boolean>();
}
