[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / Note

# Class: Note

## Constructors

### new Note()

> **new Note**(`n`): [`Note`](Note.md)

#### Parameters

• **n**: `number`

#### Returns

[`Note`](Note.md)

#### Defined in

[note.ts:115](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L115)

## Properties

### \_note

> **\_note**: `number` = `60`

#### Defined in

[note.ts:48](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L48)

***

### \_velocity

> **\_velocity**: `number` = `90`

#### Defined in

[note.ts:79](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L79)

***

### duration

> **duration**: `number` = `1.0`

#### Defined in

[note.ts:60](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L60)

***

### start

> **start**: `number` = `0.0`

#### Defined in

[note.ts:54](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L54)

## Accessors

### accidental

> `get` **accidental**(): `string`

#### Returns

`string`

#### Defined in

[note.ts:94](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L94)

***

### cents

> `get` **cents**(): `number`

#### Returns

`number`

#### Defined in

[note.ts:75](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L75)

***

### end

> `get` **end**(): `number`

#### Returns

`number`

#### Defined in

[note.ts:57](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L57)

***

### frequency

> `get` **frequency**(): `number`

> `set` **frequency**(`f`): `void`

#### Parameters

• **f**: `number`

#### Returns

`number`

#### Defined in

[note.ts:110](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L110)

***

### gain

> `get` **gain**(): `number`

> `set` **gain**(`g`): `void`

#### Parameters

• **g**: `number`

#### Returns

`number`

#### Defined in

[note.ts:85](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L85)

***

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[note.ts:90](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L90)

***

### nameWithOctave

> `get` **nameWithOctave**(): `string`

#### Returns

`string`

#### Defined in

[note.ts:98](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L98)

***

### note

> `get` **note**(): `number`

> `set` **note**(`n`): `void`

#### Parameters

• **n**: `number`

#### Returns

`number`

#### Defined in

[note.ts:49](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L49)

***

### octave

> `get` **octave**(): `number`

> `set` **octave**(`o`): `void`

#### Parameters

• **o**: `number`

#### Returns

`number`

#### Defined in

[note.ts:64](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L64)

***

### rate

> `get` **rate**(): `number`

#### Returns

`number`

#### Defined in

[note.ts:106](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L106)

***

### step

> `get` **step**(): `number`

> `set` **step**(`s`): `void`

#### Parameters

• **s**: `number`

#### Returns

`number`

#### Defined in

[note.ts:70](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L70)

***

### stepColor

> `get` **stepColor**(): `string`

#### Returns

`string`

#### Defined in

[note.ts:102](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L102)

***

### velocity

> `get` **velocity**(): `number`

> `set` **velocity**(`v`): `void`

#### Parameters

• **v**: `number`

#### Returns

`number`

#### Defined in

[note.ts:80](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L80)

## Methods

### clone()

> **clone**(): [`Note`](Note.md)

#### Returns

[`Note`](Note.md)

#### Defined in

[note.ts:127](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L127)

***

### isEqual()

> **isEqual**(`other`): `boolean`

#### Parameters

• **other**: [`Note`](Note.md)

#### Returns

`boolean`

#### Defined in

[note.ts:119](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L119)

***

### fromFrequency()

> `static` **fromFrequency**(`freq`): [`Note`](Note.md)

#### Parameters

• **freq**: `number`

#### Returns

[`Note`](Note.md)

#### Defined in

[note.ts:144](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L144)

***

### fromName()

> `static` **fromName**(`name`): [`Note`](Note.md)

#### Parameters

• **name**: `string`

#### Returns

[`Note`](Note.md)

#### Defined in

[note.ts:136](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L136)

***

### nameToNote()

> `static` **nameToNote**(`s`): `number`

#### Parameters

• **s**: `string`

#### Returns

`number`

#### Defined in

[note.ts:177](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L177)

***

### nameToOctave()

> `static` **nameToOctave**(`n`): `number`

#### Parameters

• **n**: `string`

#### Returns

`number`

#### Defined in

[note.ts:151](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L151)

***

### nameToStep()

> `static` **nameToStep**(`n`): `number`

#### Parameters

• **n**: `string`

#### Returns

`number`

#### Defined in

[note.ts:163](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/note.ts#L163)
