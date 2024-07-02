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

[midi.ts:92](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/midi.ts#L92)

***

### outputs

> `get` `static` **outputs**(): `undefined` \| `MIDIOutputMap`

#### Returns

`undefined` \| `MIDIOutputMap`

#### Defined in

[midi.ts:83](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/midi.ts#L83)

***

### ready

> `get` `static` **ready**(): `boolean`

Is the MIDI access object ready?

#### Returns

`boolean`

#### Defined in

[midi.ts:77](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/midi.ts#L77)

## Methods

### init()

> `static` **init**(): `void`

Singleton instance initializer. Can safely be called multiple times.

#### Returns

`void`

#### Defined in

[midi.ts:68](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/midi.ts#L68)
