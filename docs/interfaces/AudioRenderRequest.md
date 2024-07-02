[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / AudioRenderRequest

# Interface: AudioRenderRequest

## Properties

### \_callback()?

> `optional` **\_callback**: (`buffer`) => `void`

#### Parameters

• **buffer**: [`GrowableAudioBuffer`](../classes/GrowableAudioBuffer.md)

#### Returns

`void`

#### Defined in

[loader.ts:50](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L50)

***

### beats

> **beats**: `number`

#### Defined in

[loader.ts:32](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L32)

***

### bpm

> **bpm**: `number`

#### Defined in

[loader.ts:29](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L29)

***

### patch

> **patch**: [`SynthPatchRef`](../type-aliases/SynthPatchRef.md)

#### Defined in

[loader.ts:41](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L41)

***

### progress()

> **progress**: (`percent`) => `void`

#### Parameters

• **percent**: `number`

#### Returns

`void`

#### Defined in

[loader.ts:44](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L44)

***

### start?

> `optional` **start**: `number`

#### Defined in

[loader.ts:35](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L35)

***

### trace

> **trace**: [`MusicTrace`](../classes/MusicTrace.md)

#### Defined in

[loader.ts:38](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L38)

***

### uuid

> **uuid**: `string`

#### Defined in

[loader.ts:26](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L26)

***

### waveform()?

> `optional` **waveform**: (`wave`) => `void`

#### Parameters

• **wave**: [`WaveformData`](../classes/WaveformData.md)

#### Returns

`void`

#### Defined in

[loader.ts:47](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/loader.ts#L47)
