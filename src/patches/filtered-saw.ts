export const FilteredSaw = {
    "nodes": [
        {
            "id": 0,
            "type": "out",
            "A": 0,
            "D": 0.3,
            "S": 0.5,
            "R": 0.2,
            "a shape": 3.4,
            "d shape": 2,
            "r shape": 2,
            "level": 0
        },
        {
            "id": 7,
            "type": "osc",
            "waveform": "sawtooth",
            "relative": true,
            "frequency": 440,
            "multiplier": 1,
            "frequency-mod": 1000,
            "detune": 0,
            "detune-mod": 2,
            "amplitude-mod": 0.5,
            "level": 0.1
        },
        {
            "id": 8,
            "type": "filter",
            "filter type": "lowpass",
            "tracking": true,
            "frequency": 980,
            "frequency-mod": 100,
            "Q": 3.0,
            "Q-mod": 10,
            "gain": 0,
            "gain-mod": 250,
            "tracking ratio": 1,
            "level": 0
        }
    ],
    "routing": [
        {
            "id": 26,
            "source": 7,
            "dest": 8,
            "type": "audio",
            "level": 0
        },
        {
            "id": 25,
            "source": 8,
            "dest": 0,
            "type": "audio",
            "level": 0
        }
    ],
    "parameters": [
        {
            "node": 8,
            "name": "frequency",
            "label": "FREQUENCY",
            "slot": 1,
            "min": 32,
            "max": 15000,
            "value": 7000
        },
        {
            "node": 8,
            "name": "Q",
            "label": "RESONANCE (Q)",
            "slot": 2,
            "min": 0.0001,
            "max": 50,
            "value": 50
        }
    ],
    "name": "Filtered Saw",
    "instrument": "piano",
    "version": "2.0",
    "format": "tunepad-patch",
    "created": "2024-05-30 17:44:15.448",
    "modified": "2024-05-30 17:44:15.449",
}