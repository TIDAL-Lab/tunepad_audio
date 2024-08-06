
# STEP 1: remove initial silence...
#  ffmpeg -i allnotes.aifc -filter:a "silenceremove=start_periods=1:start_threshold=0.02" allnotes2.aifc

# mv allnotes2.aifc allnotes.aifc

# STEP 2: extract individual notes

notes = [ "C", "E", "G" ]

exe = "ffmpeg"  # generate command-line calls to ffmpeg
trim = '-t 10'  # output 10 seconds of audio per note
fade_out = 'afade=out:st=9.5:d=0.5'   # fade out over the last half second
fade_in = 'afade=in:st=0:d=0.005'
verb = '-hide_banner -loglevel warning'     # non-verbose output

midi = 12
start = 0

for octave in range(0, 8):
    for note in notes:
        path = str(midi) + "note" + note + str(octave)
        infile = "allnotes.aiff"
        wavfile = path + ".wav"
        oggfile = path + ".ogg"
        cmd = f'{exe} {verb} -ss {start} {trim} -i {infile} -filter:a "{fade_in},{fade_out}" '
        print(cmd + wavfile)
        print(cmd + oggfile)
        if note == 'C':
            midi += 4
        elif note == 'E':
            midi += 3
        elif note == 'G':
            midi += 5
        start += 13
