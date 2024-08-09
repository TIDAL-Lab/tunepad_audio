# brew install fmpeg
# fmpeg -i D:/Audio/IN/sample.aiff -acodec pcm_s16le -ac 1 -ar 44100 D:/Audio/OUT/sample.wav

notesF = [ "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" ]
notesS = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ]
octaves = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]

note_map = {
    "C" : "C",
    "C#" : "Db",
    "Db" : "Db",
    "D" : "D",
    "D#" : "Eb",
    "Eb" : "Eb",
    "E" : "E",
    "F" : "F",
    "F#" : "Gb",
    "Gb" : "Gb",
    "G" : "G",
    "G#" : "Ab",
    "Ab" : "Ab",
    "A" : "A",
    "A#" : "Bb",
    "Bb" : "Bb",
    "B" : "B"
}

midi = 12

for octave in octaves:
    for note in notesS:
        if midi <= 108:
            src = f'FSS6_Royers_L2_{note}{octave}_RR2.wav'
            dst = f'{midi}note{note_map[note]}{octave}.wav'
            print(f'mv {src} {dst}')
        midi += 1
