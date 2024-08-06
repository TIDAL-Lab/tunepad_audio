# TunePad Audio Module
TunePad audio synthesis engine.
**Experimental** Beta version still in development.

# Install
For local installs:
```sh
npm install --save-dev <tunepad_audio_directory>
```

For remote installs:
```sh
npm install --save-dev https://github.com/TIDAL-Lab/tunepad_audio
```

# Basic Example
```typescript
import { Synthesizer } from '@tunepad/audio';

const synth = new Synthesizer('filtered-saw');

// update the synth's ADSR envelope
synth.release = 0.75;  // slow release 0.75 seconds
synth.attack = 0.1;    // sharp attack
synth.sustain = 0.1;   // very quiet sustain
synth.decay = 1.0;     // slow decay to the sustain level (1.0 s)

// adjust the output volume (decibels)
synth.volume = -2.0;   // turn down the volume a bit to -2.0 dB

// update a custom parameter that sets the lowpass filter cutoff to 300 Hz
synth.updateParameter('frequency', 300);

// update custom parameter that sets resonance (Q-value) to 2.0
synth.updateParameter('Q', 2.0);

document.querySelector('#play-button')?.addEventListener('pointerdown', (e) => {
    synth.playNote(48);
});

document.querySelector('#play-button')?.addEventListener('pointerup', (e) => {
    synth.releaseNote(48);
});
```

# Using Built-in Synth Patches
The Synthesizer comes with several built-in patches (voices) that don't require
external patch definitions or sample files. You can use these by calling 
`loadPatch` with the patch name.

```typescript
// create a synth with a built-in patch "simple-tri"
const synth = new Synthesizer('simple-tri');

// change the voice to another built-in patch
synth.loadPatch('filtered-saw');
```

Here's the complete list of built-in patches:
* "simple-sine"
* "simple-saw"
* "simple-square"
* "simple-tri"
* "filtered-saw"

# Using sample-based patches
A sample-based patch uses external audio files to play different notes or sounds. The audio 
files are interpolated and pitch-shifted to play different notes if needed. Use these steps
to install one of the provided sample-based patches.

1. Copy an entire directory from the `assets/patches` folder and save it in your local project's `assets` folder.
```sh
cd [tunepad_audio_dir]
cp -R assets/patches/organ [my_project_dir]/assets/patches/organ
```
2. Use a relative URL to configure your synthesizer patch
```typescript
let patch_url = new URL('/assets/patches/organ/patch.json', import.meta.url);
const synth = new Synthesizer(patch_url);

/// change the voice
patch_url = new URL('/assets/patches/grand-piano/patch.json', import.meta.url);
synth.loadPatch(patch_url);
```


# Creating your own custom patches
* Go to [https://tunepad.com/patchworks/](https://tunepad.com/patchworks/)
* Create your custom patch
* Use **File --> Export** to download your patch object
* Pass the JavaScript object into Synthesizer.loadPatch


# Dependencies
```sh
npm install --save-dev typescript tslib rollup rimraf
npm install --save-dev @rollup/plugin-typescript @rollup/plugin-terser @rollup/plugin-json
```

# Scripts
* `npm run build`
* `npm run watch`


# Full Patch List

## BASS
* Electric Bass (patch 1)
* Blues Bass (patch 305)
* Jazz Upright (patch 209)
* Jupiter Bass (patch 301)
* Mars Bass (patch 303)
* Saturn Bass (patch 302)
* Pop Fizz Bass (patch 249)
* Triangle Bass (patch 97)
* 303 Bass (patch 65)
* 808 Bass (patch 367)

244 Synth.Bass.1 piano Synth Pop Bass
245 Synth.Bass.2 piano House Organ Bass
248 Synth.Bass.4 piano I Feel Love Bass
250 Synth.Bass.6 piano Like That Bass
282 Synth.Bass.8 piano Clean Cosine
224 Bass.1 bass Plucked Bass
275 Bass.11 piano PWM Synth Bass
84 Bass.2 bass Synth Pop Bass
76 Bass.3 bass House Organ Bass
100 Bass.4 bass Like That Bass
3 Bass.7 bass Pop Bass
79 Bass.8 bass I Feel Love Bass



8       Keyboard.8 piano Rhodes Piano
9       Keyboard.0 piano Piano
5       Keyboard.3 piano Marimba
63      Synth.Arps.1 piano FM Vibraphone
300     Glockenspiel
89      Keyboard.2 piano Sparkly E. Piano
222     Synth.Samples.2 piano Strings
304     Pipe Organ
78      Keyboard.5 piano Crystal Organ
255     Synth.Arps.4 piano Squiggly Pluck
283     Synth.Arps.5 piano Wah Wah
251     Synth.Leads.03 piano Wacky Lead
211     Synth.Leads.01 piano Wobbly Square
253     Synth.Leads.06 piano Ocarina
306     Harpsichord
80      Keyboard.6 piano Hammond Organ
81      Keyboard.7 piano Rock Organ
307     Electric Piano
4       Synth.Leads.04 piano Party Synth
11      Drums.0 drums 808 Drums
466     Drums.1 drums 909 Drumkit
12      Drums.2 drumkit Rock Drumkit
227     Drums.3 drums Headlines Drums
228     LinnDrums
13      Drums.4 drums Percussion Sounds
204     Drums.5 drums Applause
205     Drums.6 drums Sirens and Horns
206     Drums.7 drums Whistles
2       Guitar.0 guitar Acoustic Guitar
107     Guitar.1 guitar Electric Guitar
* Flat Synth (patch 10)     Synth.Leads.08 piano Flat Synth
* Ice Synth (patch 170)     Synth.Arps.3 piano Ice Synth
* Soft Synth (patch 223)    Synth.Leads.00 piano Soft Synth
* Buzz Buzz (patch 252)     Synth.Leads.05 piano Buzz Buzz
* Dreamy Pad (patch 53)     Synth.Pads.1 piano Dreamy Pad
* FM Little Bell (patch 62) Synth.Arps.0 piano FM Little Bell
210 Synth.Arps.2 piano Space Chime
    


126 Keyboard.1 piano Big Piano
7 Keyboard.4 piano Musicbox

213 Synth.Leads.02 piano Soaring Saw
254 Synth.Leads.07 piano Searing Lead
278 Synth.Leads.09 piano Bright Lead
280 Synth.Leads.10 piano Simple Saw
103 Synth.Pads.0 piano Africa Brass
75 Synth.Pads.2 piano Dramatic Pad
82 Synth.Pads.3 piano Sentimental Organ
85 Synth.Pads.4 piano Synth Orchestra
87 Synth.Pads.5 piano Mellotron Flute Choir
99 Synth.Pads.6 piano Lofi Pad
69 Synth.Pads.7 piano Chip Tune Choir
293 Synth.Pads.8 piano Instant Chords 1
294 Synth.Pads.9 piano Instant Chords 2
225 Synth.Samples.0 piano Brass
226 Synth.Samples.1 piano Trumpet
