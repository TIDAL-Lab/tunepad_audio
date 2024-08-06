[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / AudioLoadingService

# Class: AudioLoadingService

This class maintains an asynchronous request queue to generate audio buffers.
This creates an abstraction layer around the synthesizer. 
By using a queue, it means we're only doing one offline audio context render at a time. 
This improves performance and makes loading much smoother.
One issue with OfflineAudioContext is that it can't be cancelled once a render starts.
This is a huge problem because audio rendering can take seconds or minutes to render
with complex synthesizers or effects. We allow for chunking audio into smaller parts
if the goal is to create a waveform visualization.

## Methods

### cancelRequest()

> `static` **cancelRequest**(`uuid`): `void`

#### Parameters

• **uuid**: `string`

#### Returns

`void`

#### Defined in

[loader.ts:107](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/loader.ts#L107)

***

### clearCache()

> `static` **clearCache**(): `void`

#### Returns

`void`

#### Defined in

[loader.ts:113](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/loader.ts#L113)

***

### clearCacheEntry()

> `static` **clearCacheEntry**(`uuid`): `void`

#### Parameters

• **uuid**: `string`

#### Returns

`void`

#### Defined in

[loader.ts:118](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/loader.ts#L118)

***

### requestAudioBuffer()

> `static` **requestAudioBuffer**(`request`): `Promise`\<[`GrowableAudioBuffer`](GrowableAudioBuffer.md)\>

Requests offline audio render of the given resource.

#### Parameters

• **request**: [`AudioRenderRequest`](../interfaces/AudioRenderRequest.md)

#### Returns

`Promise`\<[`GrowableAudioBuffer`](GrowableAudioBuffer.md)\>

#### Defined in

[loader.ts:93](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/loader.ts#L93)
