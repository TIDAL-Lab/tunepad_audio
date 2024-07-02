[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / Synthesizer

# Class: Synthesizer

Polyphonic audio synthesizer.

## Constructors

### new Synthesizer()

> **new Synthesizer**(`patch`?): [`Synthesizer`](Synthesizer.md)

Create a new synthesizer

#### Parameters

• **patch?**: [`SynthPatchRef`](../type-aliases/SynthPatchRef.md)

optional name of the patch to load (e.g. "grand_piano")

#### Returns

[`Synthesizer`](Synthesizer.md)

#### Defined in

[synth.ts:109](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L109)

## Properties

### parameters

> **parameters**: `SynthParameter`[]

shortcut parameters that can be adjusted by user

#### Defined in

[synth.ts:98](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L98)

***

### MAX\_GENERATORS

> `readonly` `static` **MAX\_GENERATORS**: `24` = `24`

allow a maximum of 24 simultaneous notes

#### Defined in

[synth.ts:75](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L75)

## Accessors

### attack

> `set` **attack**(`A`): `void`

Set attack value for the current synth patch in seconds (>= 0)

#### Parameters

• **A**: `number`

#### Defined in

[synth.ts:505](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L505)

***

### bpm

> `get` **bpm**(): `number`

tempo (beats per minute)

> `set` **bpm**(`tempo`): `void`

#### Parameters

• **tempo**: `number`

#### Returns

`number`

#### Defined in

[synth.ts:78](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L78)

***

### decay

> `set` **decay**(`D`): `void`

Set decay value for the current synth patch in seconds (>= 0)

#### Parameters

• **D**: `number`

#### Defined in

[synth.ts:515](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L515)

***

### isPlaying

> `get` **isPlaying**(): `boolean`

Is the synth currently playing a sound?

#### Returns

`boolean`

#### Defined in

[synth.ts:117](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L117)

***

### release

> `set` **release**(`R`): `void`

Set release value for the current synth patch in seconds (>= 0)

#### Parameters

• **R**: `number`

#### Defined in

[synth.ts:535](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L535)

***

### sustain

> `set` **sustain**(`S`): `void`

Set sustain value for the current synth patch [0.0, 1.0]

#### Parameters

• **S**: `number`

#### Defined in

[synth.ts:525](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L525)

***

### voice

> `get` **voice**(): `string`

name of the active patch

#### Returns

`string`

#### Defined in

[synth.ts:89](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L89)

***

### volume

> `set` **volume**(`dB`): `void`

Set the output volume of the current patch in decibels [-50.0, 5.0]dB

#### Parameters

• **dB**: `number`

#### Defined in

[synth.ts:545](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L545)

## Methods

### cancelAllMidiNotes()

> **cancelAllMidiNotes**(`port`): `void`

Send noteOff to all possible midi note values

#### Parameters

• **port**: `MIDIOutput`

#### Returns

`void`

#### Defined in

[synth.ts:358](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L358)

***

### cancelAllNotes()

> **cancelAllNotes**(): `void`

scheduleSound(note: Note, soundURL: string, dest: AudioNode, start: number, delta: number = 0): SynthChain | null {
    const now = dest.context.currentTime;
    const duration = note.duration * (60 / this.bpm);
    start = (start + delta) * (60 / this.bpm);

    const generator = SynthChain.sound(dest.context!, soundURL);
    const release = generator.scheduleNote(note, start, duration, dest);
    this.sound_gens.push(generator);
    return generator;
}

#### Returns

`void`

#### Defined in

[synth.ts:232](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L232)

***

### loadPatch()

> **loadPatch**(`patch`): `Promise`\<`boolean`\>

Load a patch by name (for built-in patches), by URL, or by using a custom patch object.
* Create custom patches at https://tunepad.com/patchworks and use File -> Export.
* Builtin patches include
  * "simple-sine"
  * "simple-saw"
  * "simple-square"
  * "simple-tri"
  * "filtered-saw"
  * "wobbly-square"
* URLs must resolve to a valid patch JSON object. Any links to audio samples should be relative to the URL path.

#### Parameters

• **patch**: [`SynthPatchRef`](../type-aliases/SynthPatchRef.md)

#### Returns

`Promise`\<`boolean`\>

true iff the patch and all resources were successfully loaded.

#### Defined in

[synth.ts:391](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L391)

***

### pitchBend()

> **pitchBend**(`cents`): `void`

Set the pitch bend "wheel" to the given number of cents.
This only applies to currently scheduled or playing notes.

#### Parameters

• **cents**: `number`

#### Returns

`void`

#### Defined in

[synth.ts:373](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L373)

***

### playNote()

> **playNote**(`note`, `dest`?): `void`

play and hold a note until `releaseNote` is called

#### Parameters

• **note**: `number` \| [`Note`](Note.md)

MIDI note to play

• **dest?**: `AudioNode`

Optional audio destination node. If not provided, will play to AudioContext.destination

#### Returns

`void`

#### Defined in

[synth.ts:134](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L134)

***

### releaseAll()

> **releaseAll**(): `void`

Immediately release all notes that are currently being played by `playNote`

#### Returns

`void`

#### Defined in

[synth.ts:164](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L164)

***

### releaseNote()

> **releaseNote**(`note`): `void`

Release (stop playing) a note started with `playNote`

#### Parameters

• **note**: `number` \| [`Note`](Note.md)

#### Returns

`void`

#### Defined in

[synth.ts:152](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L152)

***

### scheduleMidiNotes()

> **scheduleMidiNotes**(`trace`, `delta`, `port`, `gain`): `void`

Experimental. Generate MIDI output events

#### Parameters

• **trace**: [`MusicTrace`](MusicTrace.md)

• **delta**: `number`

time before the start of the next measure (in beats) 
when this note is to be scheduled. if negative, skip the beginning of a loop

• **port**: `MIDIOutput`

which MIDIOutput port to send messages to

• **gain**: `number` = `1.0`

adjust output velocity of all notes (number >= 0.0)

#### Returns

`void`

#### Defined in

[synth.ts:325](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L325)

***

### scheduleNote()

> **scheduleNote**(`note`, `dest`, `start`, `delta`): `undefined` \| [`SynthChain`](SynthChain.md)

#### Parameters

• **note**: [`Note`](Note.md)

• **dest**: `AudioNode`

• **start**: `number`

• **delta**: `number` = `0`

#### Returns

`undefined` \| [`SynthChain`](SynthChain.md)

#### Defined in

[synth.ts:204](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L204)

***

### scheduleNotes()

> **scheduleNotes**(`trace`, `dest`, `delta`): `void`

#### Parameters

• **trace**: [`MusicTrace`](MusicTrace.md)

• **dest**: `AudioNode`

• **delta**: `number`

#### Returns

`void`

#### Defined in

[synth.ts:249](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L249)

***

### setMidiProgram()

> **setMidiProgram**(`port`, `voice`): `void`

Sets the MIDI output "program" or instrument voice

#### Parameters

• **port**: `MIDIOutput`

• **voice**: `number`

#### Returns

`void`

#### Defined in

[synth.ts:349](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L349)

***

### updateParameter()

> **updateParameter**(`pname`, `value`): `void`

Update parameter value for all playing and scheduled notes

#### Parameters

• **pname**: `string`

• **value**: `any`

#### Returns

`void`

#### Defined in

[synth.ts:482](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/synth.ts#L482)
