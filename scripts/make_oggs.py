# brew install fmpeg
# fmpeg -i D:/Audio/IN/sample.aiff -acodec pcm_s16le -ac 1 -ar 44100 D:/Audio/OUT/sample.wav

notes = [ "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" ]
octaves = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]

exe = "ffmpeg"  # generate command-line calls to ffmpeg
trim = '-t 8'  # output only 8 seconds of audio per note
fade = 'afade=out:st=7.5:d=0.5'   # fade out over the last second
silence = 'silenceremove=start_periods=1:start_threshold=0.02'  # remove starting silence
verb = '-hide_banner -loglevel warning'     # non-verbose output

midi = 12

print('#!/bin/bash')

for octave in octaves:
    for note in notes:
        if midi <= 108:
            path = str(midi) + "note" + note + str(octave)
            infile = path + ".wav"
            wavfile = path + "-trim.wav"
            oggfile = path + ".ogg"
            #cmd = f'{exe} {verb} {trim} -i {infile} -filter:a "{silence},{fade}" '
            cmd = f'{exe} {verb} {trim} -i {infile} -filter:a "{fade}" '

            print(f'if [ -e {infile} ]')
            print('then')
            print('    ' + cmd + wavfile)
            print('    ' + cmd + oggfile)
            print(f'    mv -f {wavfile} {path}.wav')
            print('fi')
        midi += 1
