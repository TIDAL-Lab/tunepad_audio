**@tunepad/audio** • [**Docs**](globals.md)

***

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
external sample files. You can use these by calling `loadPatch` with the patch name.

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
