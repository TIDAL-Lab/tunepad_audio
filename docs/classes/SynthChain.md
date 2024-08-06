[**@tunepad/audio**](../README.md) • **Docs**

***

[@tunepad/audio](../globals.md) / SynthChain

# Class: SynthChain

## Constructors

### new SynthChain()

> **new SynthChain**(`context`): [`SynthChain`](SynthChain.md)

#### Parameters

• **context**: `BaseAudioContext`

#### Returns

[`SynthChain`](SynthChain.md)

#### Defined in

[chain.ts:60](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L60)

## Properties

### context

> `readonly` **context**: `BaseAudioContext`

#### Defined in

[chain.ts:41](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L41)

***

### free

> **free**: `number` = `0.0`

#### Defined in

[chain.ts:45](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L45)

***

### gates

> **gates**: `any`[]

#### Defined in

[chain.ts:57](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L57)

***

### id

> **id**: `number` = `0`

#### Defined in

[chain.ts:38](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L38)

***

### nodes

> **nodes**: `Map`\<`number`, `SynthNode`\>

#### Defined in

[chain.ts:48](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L48)

***

### out?

> `optional` **out**: `OutNode`

#### Defined in

[chain.ts:51](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L51)

***

### release

> **release**: `number` = `0.0`

#### Defined in

[chain.ts:54](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L54)

***

### \_CHAIN\_ID

> `static` **\_CHAIN\_ID**: `number` = `0`

#### Defined in

[chain.ts:37](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L37)

***

### \_custom\_patch

> `static` **\_custom\_patch**: `object`

#### nodes

> **nodes**: (`object` \| `object`)[]

#### routing

> **routing**: `object`[]

#### Defined in

[chain.ts:312](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L312)

***

### \_sine\_patch

> `static` **\_sine\_patch**: `object`

#### nodes

> **nodes**: (`object` \| `object`)[]

#### routing

> **routing**: `object`[]

#### Defined in

[chain.ts:287](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L287)

## Methods

### \_updateReleaseValue()

> **\_updateReleaseValue**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:277](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L277)

***

### attachAnalyzer()

> **attachAnalyzer**(`nodeId`, `connectorId`, `fftSize`, `channels`): `void`

#### Parameters

• **nodeId**: `number`

• **connectorId**: `number`

• **fftSize**: `number`

• **channels**: `number`

#### Returns

`void`

#### Defined in

[chain.ts:261](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L261)

***

### cancelNotes()

> **cancelNotes**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:131](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L131)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:137](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L137)

***

### detachAnalyzer()

> **detachAnalyzer**(`nodeId`, `connectorId`): `void`

#### Parameters

• **nodeId**: `number`

• **connectorId**: `number`

#### Returns

`void`

#### Defined in

[chain.ts:266](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L266)

***

### disconnect()

> **disconnect**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:125](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L125)

***

### getFloatTimeDomainData()

> **getFloatTimeDomainData**(`nodeId`, `connectorId`, `channel`, `buff`): `void`

#### Parameters

• **nodeId**: `number`

• **connectorId**: `number`

• **channel**: `number`

• **buff**: `Float32Array`

#### Returns

`void`

#### Defined in

[chain.ts:271](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L271)

***

### getNodeById()

> **getNodeById**(`id`): `undefined` \| `SynthNode`

#### Parameters

• **id**: `number`

#### Returns

`undefined` \| `SynthNode`

#### Defined in

[chain.ts:244](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L244)

***

### loadPatch()

> **loadPatch**(`config`): `void`

#### Parameters

• **config**: `any`

#### Returns

`void`

#### Defined in

[chain.ts:153](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L153)

***

### pitchBend()

> **pitchBend**(`cents`): `void`

#### Parameters

• **cents**: `number`

#### Returns

`void`

#### Defined in

[chain.ts:143](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L143)

***

### playNote()

> **playNote**(`note`, `dest`): `void`

#### Parameters

• **note**: [`Note`](Note.md)

• **dest**: `AudioNode`

#### Returns

`void`

#### Defined in

[chain.ts:67](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L67)

***

### releaseNote()

> **releaseNote**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:80](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L80)

***

### scheduleNote()

> **scheduleNote**(`note`, `when`, `duration`, `dest`): `number`

#### Parameters

• **note**: [`Note`](Note.md)

• **when**: `number`

• **duration**: `number`

• **dest**: `AudioNode`

#### Returns

`number`

#### Defined in

[chain.ts:85](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L85)

***

### schedulePitchBend()

> **schedulePitchBend**(`start`, `curve`): `void`

#### Parameters

• **start**: `number`

• **curve**: `EffectCurve`

#### Returns

`void`

#### Defined in

[chain.ts:148](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L148)

***

### updateConnectorLevel()

> **updateConnectorLevel**(`nodeId`, `connectorId`, `dB`): `void`

#### Parameters

• **nodeId**: `number`

• **connectorId**: `number`

• **dB**: `number`

#### Returns

`void`

#### Defined in

[chain.ts:255](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L255)

***

### updateParameter()

> **updateParameter**(`nodeId`, `pname`, `newValue`): `void`

#### Parameters

• **nodeId**: `number`

• **pname**: `string`

• **newValue**: `any`

#### Returns

`void`

#### Defined in

[chain.ts:249](https://github.com/TIDAL-Lab/tunepad_audio/blob/9451562ae9f07b7b952ae7340ca3f4d9b8cd1a4e/src/chain.ts#L249)
