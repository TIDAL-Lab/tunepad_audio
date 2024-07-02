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

[chain.ts:54](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L54)

## Properties

### context

> `readonly` **context**: `BaseAudioContext`

#### Defined in

[chain.ts:35](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L35)

***

### free

> **free**: `number` = `0.0`

#### Defined in

[chain.ts:39](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L39)

***

### gates

> **gates**: `any`[]

#### Defined in

[chain.ts:51](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L51)

***

### id

> **id**: `number` = `0`

#### Defined in

[chain.ts:32](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L32)

***

### nodes

> **nodes**: `Map`\<`number`, `SynthNode`\>

#### Defined in

[chain.ts:42](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L42)

***

### out?

> `optional` **out**: `OutNode`

#### Defined in

[chain.ts:45](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L45)

***

### release

> **release**: `number` = `0.0`

#### Defined in

[chain.ts:48](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L48)

***

### \_CHAIN\_ID

> `static` **\_CHAIN\_ID**: `number` = `0`

#### Defined in

[chain.ts:31](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L31)

***

### \_custom\_patch

> `static` **\_custom\_patch**: `object`

#### nodes

> **nodes**: (`object` \| `object`)[]

#### routing

> **routing**: `object`[]

#### Defined in

[chain.ts:306](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L306)

***

### \_sine\_patch

> `static` **\_sine\_patch**: `object`

#### nodes

> **nodes**: (`object` \| `object`)[]

#### routing

> **routing**: `object`[]

#### Defined in

[chain.ts:281](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L281)

## Methods

### \_updateReleaseValue()

> **\_updateReleaseValue**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:271](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L271)

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

[chain.ts:255](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L255)

***

### cancelNotes()

> **cancelNotes**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:125](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L125)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:131](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L131)

***

### detachAnalyzer()

> **detachAnalyzer**(`nodeId`, `connectorId`): `void`

#### Parameters

• **nodeId**: `number`

• **connectorId**: `number`

#### Returns

`void`

#### Defined in

[chain.ts:260](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L260)

***

### disconnect()

> **disconnect**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:119](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L119)

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

[chain.ts:265](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L265)

***

### getNodeById()

> **getNodeById**(`id`): `undefined` \| `SynthNode`

#### Parameters

• **id**: `number`

#### Returns

`undefined` \| `SynthNode`

#### Defined in

[chain.ts:238](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L238)

***

### loadPatch()

> **loadPatch**(`config`): `void`

#### Parameters

• **config**: `any`

#### Returns

`void`

#### Defined in

[chain.ts:147](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L147)

***

### pitchBend()

> **pitchBend**(`cents`): `void`

#### Parameters

• **cents**: `number`

#### Returns

`void`

#### Defined in

[chain.ts:137](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L137)

***

### playNote()

> **playNote**(`note`, `dest`): `void`

#### Parameters

• **note**: [`Note`](Note.md)

• **dest**: `AudioNode`

#### Returns

`void`

#### Defined in

[chain.ts:61](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L61)

***

### releaseNote()

> **releaseNote**(): `void`

#### Returns

`void`

#### Defined in

[chain.ts:74](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L74)

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

[chain.ts:79](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L79)

***

### schedulePitchBend()

> **schedulePitchBend**(`start`, `curve`): `void`

#### Parameters

• **start**: `number`

• **curve**: `EffectCurve`

#### Returns

`void`

#### Defined in

[chain.ts:142](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L142)

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

[chain.ts:249](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L249)

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

[chain.ts:243](https://github.com/TIDAL-Lab/tunepad_audio/blob/1e1bd16c9c764bdf488b791f76cac7abae0e3b33/src/chain.ts#L243)
