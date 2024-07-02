export declare class Note {
    _note: number;
    get note(): number;
    set note(n: number);
    start: number;
    get end(): number;
    duration: number;
    get octave(): number;
    set octave(o: number);
    get step(): number;
    set step(s: number);
    get cents(): number;
    _velocity: number;
    get velocity(): number;
    set velocity(v: number);
    get gain(): number;
    set gain(g: number);
    get name(): string;
    get accidental(): string;
    get nameWithOctave(): string;
    get stepColor(): string;
    get rate(): number;
    get frequency(): number;
    set frequency(f: number);
    constructor(n: number);
    isEqual(other: Note): boolean;
    clone(): Note;
    static fromName(name: string): Note;
    static fromFrequency(freq: number): Note;
    static nameToOctave(n: string): number;
    static nameToStep(n: string): number;
    static nameToNote(s: string): number;
}
//# sourceMappingURL=note.d.ts.map