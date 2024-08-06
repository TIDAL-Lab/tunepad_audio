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

optional patch to load (e.g. "simple-sine")

#### Returns

[`Synthesizer`](Synthesizer.md)

#### Defined in

[synth.ts:122](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L122)

## Properties

### parameters

> **parameters**: `SynthParameter`[]

shortcut parameters that can be adjusted by user

#### Defined in

[synth.ts:109](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L109)

***

### patch

> **patch**: [`SynthPatch`](../interfaces/SynthPatch.md) = `SimpleSinePatch`

the patch is a chain of samples and audio nodes that produce notes

#### Defined in

[synth.ts:97](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L97)

***

### MAX\_GENERATORS

> `readonly` `static` **MAX\_GENERATORS**: `24` = `24`

allow a maximum of 24 simultaneous notes

#### Defined in

[synth.ts:86](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L86)

## Accessors

### attack

> `set` **attack**(`A`): `void`

Set attack value for the current synth patch in seconds (>= 0)

#### Parameters

• **A**: `number`

#### Defined in

[synth.ts:535](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L535)

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

[synth.ts:89](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L89)

***

### decay

> `set` **decay**(`D`): `void`

Set decay value for the current synth patch in seconds (>= 0)

#### Parameters

• **D**: `number`

#### Defined in

[synth.ts:545](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L545)

***

### isPlaying

> `get` **isPlaying**(): `boolean`

Is the synth currently playing a sound?

#### Returns

`boolean`

#### Defined in

[synth.ts:130](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L130)

***

### release

> `set` **release**(`R`): `void`

Set release value for the current synth patch in seconds (>= 0)

#### Parameters

• **R**: `number`

#### Defined in

[synth.ts:565](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L565)

***

### sustain

> `set` **sustain**(`S`): `void`

Set sustain value for the current synth patch [0.0, 1.0]

#### Parameters

• **S**: `number`

#### Defined in

[synth.ts:555](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L555)

***

### voice

> `get` **voice**(): `string`

name of the active patch

#### Returns

`string`

#### Defined in

[synth.ts:100](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L100)

***

### volume

> `set` **volume**(`dB`): `void`

Set the output volume of the current patch in decibels [-50.0, 5.0]dB

#### Parameters

• **dB**: `number`

#### Defined in

[synth.ts:575](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L575)

## Methods

### cancelAllMidiNotes()

> **cancelAllMidiNotes**(`port`): `void`

Send NOTE_OFF to all possible midi note values

#### Parameters

• **port**: `MIDIOutput`

#### Returns

`void`

#### Defined in

[synth.ts:397](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L397)

***

### cancelAllNotes()

> **cancelAllNotes**(): `void`

cancel all scheduled notes

#### Returns

`void`

#### Defined in

[synth.ts:254](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L254)

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

[synth.ts:430](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L430)

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

[synth.ts:412](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L412)

***

### playMidiNote()

> **playMidiNote**(`note`, `port`): `void`

Send a single NOTE_ON event to a MIDI output port

#### Parameters

• **note**: `number` \| [`Note`](Note.md)

• **port**: `MIDIOutput`

#### Returns

`void`

#### Defined in

[synth.ts:370](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L370)

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

[synth.ts:147](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L147)

***

### releaseAll()

> **releaseAll**(): `void`

Immediately release all notes that are currently being played by `playNote`

#### Returns

`void`

#### Defined in

[synth.ts:177](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L177)

***

### releaseMidiNote()

> **releaseMidiNote**(`note`, `port`): `void`

Send a single NOTE_OFF event to a MIDI output port

#### Parameters

• **note**: `number` \| [`Note`](Note.md)

• **port**: `MIDIOutput`

#### Returns

`void`

#### Defined in

[synth.ts:379](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L379)

***

### releaseNote()

> **releaseNote**(`note`): `void`

Release (stop playing) a note started with `playNote`

#### Parameters

• **note**: `number` \| [`Note`](Note.md)

#### Returns

`void`

#### Defined in

[synth.ts:165](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L165)

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

[synth.ts:346](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L346)

***

### scheduleNote()

> **scheduleNote**(`note`, `start`, `delta`, `dest`?): `undefined` \| [`SynthChain`](SynthChain.md)

Schedule a note to be played in the future.

#### Parameters

• **note**: `number` \| [`Note`](Note.md)

note to be scheduled.

• **start**: `number`

when to play the note in beats (using synth's tempo setting)

• **delta**: `number` = `0`

time before the start of the next measure (in beats). if negative, it means to skip the beginning of a loop

• **dest?**: `AudioNode`

optional audio destination. By default it plays to AudioContext.destination

#### Returns

`undefined` \| [`SynthChain`](SynthChain.md)

#### Defined in

[synth.ts:218](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L218)

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

[synth.ts:271](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L271)

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

[synth.ts:388](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L388)

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

[synth.ts:512](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/synth.ts#L512)
