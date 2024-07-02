[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / WaveformData

# Class: WaveformData

Stores a compressed/reduced version of an audio buffer with just enough information to 
render a waveform visualization.

## Constructors

### new WaveformData()

> **new WaveformData**(): [`WaveformData`](WaveformData.md)

Create a new empty waveform

#### Returns

[`WaveformData`](WaveformData.md)

#### Defined in

[waveform.ts:48](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L48)

## Properties

### sampleRate

> `readonly` **sampleRate**: `44100` = `44100`

#### Defined in

[waveform.ts:26](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L26)

***

### waveQuantum

> `readonly` **waveQuantum**: `128` = `128`

#### Defined in

[waveform.ts:29](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L29)

## Accessors

### duration

> `get` **duration**(): `number`

#### Returns

`number`

#### Defined in

[waveform.ts:37](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L37)

***

### isEmpty

> `get` **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[waveform.ts:34](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L34)

***

### waveRate

> `get` **waveRate**(): `number`

#### Returns

`number`

#### Defined in

[waveform.ts:32](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L32)

***

### wavelines

> `get` **wavelines**(): `SVGGElement`

#### Returns

`SVGGElement`

#### Defined in

[waveform.ts:112](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L112)

***

### wavepath

> `get` **wavepath**(): `SVGPathElement`

#### Returns

`SVGPathElement`

#### Defined in

[waveform.ts:106](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L106)

## Methods

### appendBuffer()

> **appendBuffer**(`buffer`): `void`

Append the given audio data to this waveform.

#### Parameters

• **buffer**: [`GrowableAudioBuffer`](GrowableAudioBuffer.md) \| `AudioBuffer`

#### Returns

`void`

#### Defined in

[waveform.ts:79](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L79)

***

### appendSample()

> **appendSample**(`sample`): `void`

Appends one waveform sample representing 256 underlying audio samples (waveQuantum)

#### Parameters

• **sample**: `number`[]

#### Returns

`void`

#### Defined in

[waveform.ts:57](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L57)

***

### fromBuffer()

> `static` **fromBuffer**(`buffer`): [`WaveformData`](WaveformData.md)

Create a new buffer from the given AudioBuffer object

#### Parameters

• **buffer**: [`GrowableAudioBuffer`](GrowableAudioBuffer.md) \| `AudioBuffer`

#### Returns

[`WaveformData`](WaveformData.md)

#### Defined in

[waveform.ts:99](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/waveform.ts#L99)
