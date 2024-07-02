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

# Example
```typescript
import { Synthesizer } from '@tunepad/audio';

const synth = new Synthesizer('filtered-saw');
synth.release = 0.75;  // slow release 0.75 seconds
synth.attack = 0.1;    // sharp attack
synth.sustain = 0.1;   // very quiet sustain
synth.decay = 1.0;     // slow decay to the sustain level (1.0 s)
synth.volume = -2.0;   // turn down the volume a bit to -2.0 decibels (dB)

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

# Built-in Synth Patches
* "simple-sine"
* "simple-saw"
* "simple-square"
* "simple-tri"
* "filtered-saw"

# Create a Custom Synth Patch
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
