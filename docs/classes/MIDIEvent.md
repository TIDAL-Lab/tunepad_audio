[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / MIDIEvent

# Class: MIDIEvent

MIDI event class

## Constructors

### new MIDIEvent()

> **new MIDIEvent**(`code`): [`MIDIEvent`](MIDIEvent.md)

#### Parameters

• **code**: `number`

#### Returns

[`MIDIEvent`](MIDIEvent.md)

#### Defined in

[midi.ts:51](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L51)

## Properties

### channel

> **channel**: `number` = `0`

MIDI Channel (typically 0)

#### Defined in

[midi.ts:49](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L49)

***

### code

> **code**: `number` = `0`

raw midi message code (e.g. 8, 9, 14)

#### Defined in

[midi.ts:26](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L26)

***

### message

> **message**: `"note-on"` \| `"note-off"` \| `"pitch-bend"` \| `"unknown"`

MIDI message (only three messages supported for now)

#### Defined in

[midi.ts:29](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L29)

***

### note

> **note**: `number` = `-1`

MIDI note number if applicable

#### Defined in

[midi.ts:32](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L32)

***

### value

> **value**: `number` = `0`

Command value (e.g. for pitch bend amount)

#### Defined in

[midi.ts:46](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L46)

## Accessors

### velocity

> `get` **velocity**(): `number`

> `set` **velocity**(`v`): `void`

#### Parameters

• **v**: `number`

#### Returns

`number`

#### Defined in

[midi.ts:36](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/midi.ts#L36)
