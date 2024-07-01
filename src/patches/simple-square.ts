export const SimpleSquarePatch = {
    nodes: [
      {
        "type" : "out",
        "A": 0.05,
        "D": 0.1,
        "S": 0.8,
        "R": 0.25,
        "level" : 0,
        "id": 0
      },
      {
        "type" : "osc",
        "waveform" : "square",
        "relative" : "true",
        "frequency" : 1.0,
        "id": 1,
        "level": 0.1
      }
    ],
    routing: [
      { "source": 1, "dest": 0, "type": "audio", "level" : 0, "id" : 1 }
    ],
    parameters: [],
    name: "Simple Square",
    description: "",
    instrument: "piano",
    submenu: "",
    version: "2.0",
    format: "tunepad-patch",
    created: "2024-03-08 16:15:54.384",
    modified: "2024-03-08 16:15:54.385"
}
