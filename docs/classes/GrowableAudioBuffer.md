[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / GrowableAudioBuffer

# Class: GrowableAudioBuffer

Thin wrapper around the AudioBuffer class that allows for
exporting to WAV, MP3, and Base64. Also generates compressed waveform visualization data.
This is *mostly* an immutable object, except for the append operation, which can grow the buffer.

## Constructors

### new GrowableAudioBuffer()

> **new GrowableAudioBuffer**(`channels`, `sampleRate`): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

Create a new empty buffer with the given number of channels and sample rate

#### Parameters

• **channels**: `number` = `1`

• **sampleRate**: `number` = `44100`

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Defined in

[buffer.ts:54](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L54)

## Properties

### sampleRate

> `readonly` **sampleRate**: `number`

#### Defined in

[buffer.ts:28](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L28)

## Accessors

### duration

> `get` **duration**(): `number`

#### Returns

`number`

#### Defined in

[buffer.ts:41](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L41)

***

### isEmpty

> `get` **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[buffer.ts:38](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L38)

***

### isMono

> `get` **isMono**(): `boolean`

#### Returns

`boolean`

#### Defined in

[buffer.ts:44](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L44)

***

### isStereo

> `get` **isStereo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[buffer.ts:45](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L45)

***

### length

> `get` **length**(): `number`

#### Returns

`number`

#### Defined in

[buffer.ts:35](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L35)

***

### numberOfChannels

> `get` **numberOfChannels**(): `number`

#### Returns

`number`

#### Defined in

[buffer.ts:31](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L31)

***

### samples

> `get` **samples**(): `number`

#### Returns

`number`

#### Defined in

[buffer.ts:34](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L34)

## Methods

### append()

> **append**(`buffer`): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Parameters

• **buffer**: [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Defined in

[buffer.ts:84](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L84)

***

### appendAudioBuffer()

> **appendAudioBuffer**(`buffer`): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

Append the given audio data to this buffer and return the new buffer.
This is the only function that mutates the GrowableAudioBuffer.

#### Parameters

• **buffer**: `AudioBuffer`

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

Returns this object with the new audio data appended.

#### Defined in

[buffer.ts:67](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L67)

***

### clone()

> **clone**(): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

Create a copy of this buffer

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Defined in

[buffer.ts:125](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L125)

***

### downloadWAV()

> **downloadWAV**(`filename`): `void`

downloads a WAV file as a blob

#### Parameters

• **filename**: `string`

#### Returns

`void`

#### Defined in

[buffer.ts:290](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L290)

***

### getChannelData()

> **getChannelData**(`channel`): `Float32Array`

#### Parameters

• **channel**: `number`

#### Returns

`Float32Array`

#### Defined in

[buffer.ts:25](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L25)

***

### reverse()

> **reverse**(): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

reverses the audio and returns the new buffer

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Defined in

[buffer.ts:164](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L164)

***

### toAudioBuffer()

> **toAudioBuffer**(): `AudioBuffer`

create an AudioBuffer from the saved audio data. 
The length of the buffer must be greater than zero or this will throw an exception.

#### Returns

`AudioBuffer`

#### Defined in

[buffer.ts:185](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L185)

***

### toWAV()

> **toWAV**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[buffer.ts:232](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L232)

***

### toWAVBase64()

> **toWAVBase64**(): `string`

encode audio buffer as a base64 encoded WAV file

#### Returns

`string`

#### Defined in

[buffer.ts:332](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L332)

***

### trim()

> **trim**(`start`, `end`): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

Trim the buffer from a start to an end point in seconds.
Return the new buffer.

#### Parameters

• **start**: `number`

• **end**: `number`

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Defined in

[buffer.ts:140](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L140)

***

### fromBuffer()

> `static` **fromBuffer**(`buffer`): [`GrowableAudioBuffer`](GrowableAudioBuffer.md)

Create a new buffer from the given AudioBuffer object

#### Parameters

• **buffer**: `AudioBuffer`

#### Returns

[`GrowableAudioBuffer`](GrowableAudioBuffer.md)

#### Defined in

[buffer.ts:104](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L104)

***

### fromURL()

> `static` **fromURL**(`url`): `Promise`\<[`GrowableAudioBuffer`](GrowableAudioBuffer.md)\>

load audio source from a URL. Throws an error if buffer cannot be loaded.

#### Parameters

• **url**: `string`

#### Returns

`Promise`\<[`GrowableAudioBuffer`](GrowableAudioBuffer.md)\>

#### Defined in

[buffer.ts:113](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/buffer.ts#L113)
