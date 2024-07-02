export declare const SimpleTriPatch: {
    nodes: ({
        type: string;
        A: number;
        D: number;
        S: number;
        R: number;
        level: number;
        id: number;
        waveform?: undefined;
        relative?: undefined;
        frequency?: undefined;
    } | {
        type: string;
        waveform: string;
        relative: string;
        frequency: number;
        id: number;
        level: number;
        A?: undefined;
        D?: undefined;
        S?: undefined;
        R?: undefined;
    })[];
    routing: {
        source: number;
        dest: number;
        type: string;
        level: number;
        id: number;
    }[];
    parameters: never[];
    name: string;
    description: string;
    instrument: string;
    submenu: string;
    version: string;
    format: string;
    created: string;
    modified: string;
};
//# sourceMappingURL=simple-tri.d.ts.map