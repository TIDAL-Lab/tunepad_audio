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

# TODO
* Gain on individual drum samples to balance out sounds
* Possibly re-tune all of the octaves. should match garage band.
* Load patch by ID and create aliases to be backward compatible
* Re-record yamaha
* Min key and max key in each patch. 

# Full Patch List

## BASS
* Electric Bass (electric-bass) 1
* Blues Bass (blues-bass) 305
* Jazz Bass (jazz-bass) 315
* Plucked Bass (plucked-bass) 224
* Billie Bass (billie-bass) 308
* Jazz Upright Bass (upright-bass) 209
* Pop Fizz Bass (pop-bass) 3
* I Feel Love Bass (love-bass) 79
* Like That Bass (like-that-bass) 100
* Synth Pop Bass (synth-pop-bass) 84
* PWM Synth Bass (pwm-bass) 275
* Jupiter Bass (jupiter-bass) 301
* Mars Bass (mars-bass) 303
* Saturn Bass (saturn-bass) 302
* Triangle Bass (triangle-bass) 97
* Clean Cosine (cosine-bass) 282
* 303 Bass (303-bass) 65
* 808 Bass (808-bass) 367

## DRUMS
* 808 Drums (808-drums) 11
* 909 Drums (909-drums) 466
* Rock Drumkit (rock-drums) 12
* Jazz Drumkit (jazz-drums) 314
* Headlines Drums (headlines-drums) 227
* LinnDrums (linndrum) 228
* Djembe (djembe) 313
* Percussion Sounds (shot-drums) 13

## PIANO
* Grand Piano (grand-piano) 9
* Rhodes Piano (rhodes) 8
* Electric Piano (electric-piano) 89
* Electric Piano 2 (electric-piano2) 307
* Harpsichord (harpsichord) 306
* Music Box (music-box) 7
* Big Piano (big-piano) 126

## ORGAN
* Hammond Organ (jazz-organ) 80
* Rock Organ (rock-organ) 81
* Pipe Organ (pipe-organ) 304
* Crystal Organ (crystal-organ) 78
* House Organ Bass (house-organ-bass) 76
* Sentimental Organ (sent-organ) 82

## GUITAR
* Acoustic Guitar (fresh-guitar) 2
* Electric Guitar (electric-guitar) 107
* Ukulele (ukulele) 309

## MALLET
* Marimba (marimba) 5
* Vibraphone (vibraphone) 63
* Glockenspiel (glockenspiel) 300
* Chimes (chimes) 2
* Singing Bowl (singing-bowl) 62

## SOUND FX
* Applause (applause) 204
* Sirens and Horns (sirens) 205
* Whistles (whistles) 206
* Horror (spooky) 312

## ORCHESTRAL
* Strings (strings) 222
* Brass (brass) 225
* Bright Trumpet (bright-trumpet) 226
* Trumpet (trumpet) 310

## SYNTH ARPS
* Party Synth (party) 4
* Space Chimes (space-chimes) 210
* Ice Synth (ice-synth) 170
* Squiggly Pluck (squiggly-pluck) 255
* Wah Wah (wah-wah) 283

## SYNTH LEADS
* Soft Synth (patch 223)    Synth.Leads.00 piano Soft Synth
* Wobbly Square (211)
* Soaring Saw (213)         Synth.Leads.02 piano Soaring Saw
* Wacky Lead (251)
* Buzz Buzz (patch 252)     Synth.Leads.05 piano Buzz Buzz
* Ocarina (253)
* Searing Lead (254)        Synth.Leads.07 piano Searing Lead
* Flat Synth (patch 10)     Synth.Leads.08 piano Flat Synth
* Bright Lead (278)         Synth.Leads.09 piano Bright Lead
* Simple Saw (280)          Synth.Leads.10 piano Simple Saw

## SYNTH PADS
* Africa Brass (africa-brass) 103
* Dreamy Pad (dreamy-pad) 53
* Dramatic Pad (drama-pad) 75
* Synth Orchestra (synth-orchestra) 85
* Mellotron Flute Choir (mellotron-flute-choir) 87
* Lofi Pad (lowfi-pad) 99
* Chip Tune Choir (chip-tune-choir) 69
