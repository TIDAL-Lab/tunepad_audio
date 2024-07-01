export const WobblySquare = {
    "nodes": [
        {
            "id": 0,
            "type": "out",
            "cx": 116.38970947265625,
            "cy": 86.873046875,
            "A": 0.011363636363636362,
            "D": 0.1,
            "S": 1,
            "R": 0.005681818181818182,
            "a shape": 4.000000000000001,
            "d shape": 2,
            "r shape": 2,
            "level": 0
        },
        {
            "id": 2,
            "type": "osc",
            "cx": 13.176898002624512,
            "cy": 87.11394500732422,
            "waveform": "square",
            "relative": true,
            "frequency": 440.00000000000034,
            "multiplier": 1,
            "frequency-mod": 1000,
            "detune": 0,
            "detune-mod": 10,
            "amplitude-mod": 0.5,
            "level": -5
        },
        {
            "id": 3,
            "type": "lfo",
            "cx": -87.84600448608398,
            "cy": 87.11394500732422,
            "waveform": "sine",
            "relative": false,
            "frequency": 6.900000000000002,
            "frequency-mod": 30,
            "detune": 0,
            "detune-mod": 20,
            "amplitude-mod": 0.5,
            "level": 4.950595879501315
        }
    ],
    "routing": [
        {
            "id": 2,
            "source": 2,
            "dest": 0,
            "type": "audio",
            "level": 0
        },
        {
            "id": 5,
            "source": 3,
            "dest": 2,
            "type": "detune",
            "level": 5
        }
    ],
    "parameters": [],
    "name": "Wobbly Square",
    "description": "Created in patchworks",
    "instrument": "piano",
    "version": "2.0",
    "format": "tunepad-patch",
    "created": "2022-03-01 16:37:48.199",
    "modified": "2022-03-01 17:34:23.146",
}