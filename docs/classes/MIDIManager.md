[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / MIDIManager

# Class: MIDIManager

Singleton wrapper around javascript's MIDIAccess

## Accessors

### inputs

> `get` `static` **inputs**(): `undefined` \| `MIDIInputMap`

#### Returns

`undefined` \| `MIDIInputMap`

#### Defined in

[midi.ts:111](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L111)

***

### outputs

> `get` `static` **outputs**(): `undefined` \| `MIDIOutputMap`

#### Returns

`undefined` \| `MIDIOutputMap`

#### Defined in

[midi.ts:102](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L102)

***

### ready

> `get` `static` **ready**(): `boolean`

Is the MIDI access object ready?

#### Returns

`boolean`

#### Defined in

[midi.ts:96](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L96)

## Methods

### addListener()

> `static` **addListener**(`listener`): `void`

#### Parameters

• **listener**: [`MIDIEventListener`](../interfaces/MIDIEventListener.md)

#### Returns

`void`

#### Defined in

[midi.ts:85](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L85)

***

### init()

> `static` **init**(): `void`

Singleton instance initializer. Can safely be called multiple times.

#### Returns

`void`

#### Defined in

[midi.ts:79](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L79)

***

### removeListener()

> `static` **removeListener**(`listener`): `void`

#### Parameters

• **listener**: [`MIDIEventListener`](../interfaces/MIDIEventListener.md)

#### Returns

`void`

#### Defined in

[midi.ts:89](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L89)
