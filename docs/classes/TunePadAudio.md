[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / TunePadAudio

# Class: TunePadAudio

Thin wrapper around the audio context timer that lets you set time
and synchronize multiple subscribers playing at the same time.

## Properties

### context

> **context**: `AudioContext`

#### Defined in

[audio.ts:97](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L97)

***

### \_instance

> `static` **\_instance**: `null` \| [`TunePadAudio`](TunePadAudio.md)

#### Defined in

[audio.ts:106](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L106)

## Accessors

### beatValue

> `get` **beatValue**(): `number`

#### Returns

`number`

#### Defined in

[audio.ts:62](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L62)

***

### beats

> `get` **beats**(): `number`

#### Returns

`number`

#### Defined in

[audio.ts:88](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L88)

***

### beatsPerMeasure

> `get` **beatsPerMeasure**(): `number`

#### Returns

`number`

#### Defined in

[audio.ts:58](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L58)

***

### bpm

> `get` **bpm**(): `number`

> `set` **bpm**(`tempo`): `void`

#### Parameters

• **tempo**: `number`

#### Returns

`number`

#### Defined in

[audio.ts:48](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L48)

***

### contextTime

> `get` **contextTime**(): `number`

#### Returns

`number`

#### Defined in

[audio.ts:71](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L71)

***

### isPaused

> `get` **isPaused**(): `boolean`

#### Returns

`boolean`

#### Defined in

[audio.ts:100](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L100)

***

### key

> `get` **key**(): `string`

> `set` **key**(`keyName`): `void`

#### Parameters

• **keyName**: `string`

#### Returns

`string`

#### Defined in

[audio.ts:66](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L66)

***

### meter

> `get` **meter**(): `string`

> `set` **meter**(`m`): `void`

#### Parameters

• **m**: `string`

#### Returns

`string`

#### Defined in

[audio.ts:53](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L53)

***

### time

> `get` **time**(): `number`

#### Returns

`number`

#### Defined in

[audio.ts:74](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L74)

***

### timeString

> `get` **timeString**(): `string`

#### Returns

`string`

#### Defined in

[audio.ts:77](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L77)

## Methods

### addSubscriber()

> **addSubscriber**(`subscriber`): `void`

#### Parameters

• **subscriber**: [`ClockSubscriber`](../interfaces/ClockSubscriber.md)

#### Returns

`void`

#### Defined in

[audio.ts:121](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L121)

***

### isMetronomePlaying()

> **isMetronomePlaying**(`metronome`): `boolean`

#### Parameters

• **metronome**: `Metronome`

#### Returns

`boolean`

#### Defined in

[audio.ts:245](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L245)

***

### isPlaying()

> **isPlaying**(`subscriber`): `boolean`

#### Parameters

• **subscriber**: [`ClockSubscriber`](../interfaces/ClockSubscriber.md)

#### Returns

`boolean`

#### Defined in

[audio.ts:130](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L130)

***

### pause()

> **pause**(`subscriber`): `void`

Pause this subscriber only ...

#### Parameters

• **subscriber**: [`ClockSubscriber`](../interfaces/ClockSubscriber.md)

#### Returns

`void`

#### Defined in

[audio.ts:150](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L150)

***

### play()

> **play**(`subscriber`): `void`

Start playing for this subscriber

#### Parameters

• **subscriber**: [`ClockSubscriber`](../interfaces/ClockSubscriber.md)

#### Returns

`void`

#### Defined in

[audio.ts:138](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L138)

***

### removeSubscriber()

> **removeSubscriber**(`subscriber`): `void`

#### Parameters

• **subscriber**: [`ClockSubscriber`](../interfaces/ClockSubscriber.md)

#### Returns

`void`

#### Defined in

[audio.ts:125](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L125)

***

### setTempo()

> **setTempo**(`tempo`): `void`

#### Parameters

• **tempo**: `number`

#### Returns

`void`

#### Defined in

[audio.ts:183](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L183)

***

### setTime()

> **setTime**(`elapsedBeats`): `void`

Automatically stops all subscribers

#### Parameters

• **elapsedBeats**: `number`

#### Returns

`void`

#### Defined in

[audio.ts:175](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L175)

***

### setTimeSignature()

> **setTimeSignature**(`s`): `void`

#### Parameters

• **s**: `string`

#### Returns

`void`

#### Defined in

[audio.ts:195](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L195)

***

### startMetronome()

> **startMetronome**(`metronome`): `void`

#### Parameters

• **metronome**: `Metronome`

#### Returns

`void`

#### Defined in

[audio.ts:214](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L214)

***

### stopAll()

> **stopAll**(): `void`

Reset the clock back to zero beats and stop all subscribers

#### Returns

`void`

#### Defined in

[audio.ts:164](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L164)

***

### stopMetronome()

> **stopMetronome**(`metronome`): `void`

#### Parameters

• **metronome**: `Metronome`

#### Returns

`void`

#### Defined in

[audio.ts:240](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L240)

***

### init()

> `static` **init**(): [`TunePadAudio`](TunePadAudio.md)

#### Returns

[`TunePadAudio`](TunePadAudio.md)

#### Defined in

[audio.ts:111](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/audio.ts#L111)
