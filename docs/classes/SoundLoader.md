[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / SoundLoader

# Class: SoundLoader

Loads audio files and caches them as audio buffers

## Properties

### \_supports

> `static` **\_supports**: `Map`\<`string`, `boolean`\>

#### Defined in

[sounds.ts:107](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L107)

***

### sounds

> `static` **sounds**: `Map`\<`string`, `AudioBuffer`\>

#### Defined in

[sounds.ts:22](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L22)

## Methods

### getAudioBuffer()

> `static` **getAudioBuffer**(`name`): `undefined` \| `AudioBuffer`

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| `AudioBuffer`

#### Defined in

[sounds.ts:37](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L37)

***

### hasSound()

> `static` **hasSound**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Defined in

[sounds.ts:31](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L31)

***

### loadAudioBuffer()

> `static` **loadAudioBuffer**(`name`): `Promise`\<`undefined` \| `AudioBuffer`\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<`undefined` \| `AudioBuffer`\>

#### Defined in

[sounds.ts:43](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L43)

***

### loadCustomSound()

> `static` **loadCustomSound**(`url`): `Promise`\<`boolean`\>

#### Parameters

• **url**: `string`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[sounds.ts:69](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L69)

***

### supportsAudioType()

> `static` **supportsAudioType**(`mimetype`): `boolean`

#### Parameters

• **mimetype**: `string`

#### Returns

`boolean`

#### Defined in

[sounds.ts:90](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/sounds.ts#L90)
