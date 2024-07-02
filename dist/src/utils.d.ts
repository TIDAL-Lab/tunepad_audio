/**
 * Parses an int from an object (usually a string)
 * @param d - The input value to be parsed
 * @param defaultValue - The default value to return if the parsing fails
 * @returns The parsed integer value
 */
export declare function toInt(d: any, defaultValue?: number): number;
/**
 * Parses a number from an object (usually a string)
 * @param d - The input value to be parsed
 * @param defaultValue - The default value to return if the parsing fails
 * @returns The parsed number value
 */
export declare function toNum(d: any, defaultValue?: number): number;
/**
 * Parses a DateTime object from an int representing milliseconds since the epoch.
 * Returns DateTime.now() as a default value.
 * @param d - The input value to be parsed
 * @returns The parsed DateTime object
 */
export declare function toDateTime(d: string): number;
/**
 * Formats a DateTime object as a string
 * @param d - The DateTime object to be formatted
 * @returns The formatted date and time string
 */
/**
 * Parses a boolean value from an object (usually a string or boolean)
 * @param b - The input value to be parsed
 * @param defaultValue - The default value to return if the parsing fails
 * @returns The parsed boolean value
 */
export declare function toBool(b: any, defaultValue?: boolean): boolean;
/**
 * Converts a value to a string
 * @param o - The input value to be converted
 * @param defaultValue - The default value to return if the conversion fails
 * @returns The converted string value
 */
export declare function toStr(o: any, defaultValue?: string): string;
/**
 * Linearly interpolates between two values
 * @param a - The starting value
 * @param b - The ending value
 * @param interp - The interpolation factor (between 0 and 1)
 * @returns The interpolated value
 */
export declare function mix(a: number, b: number, interp: number): number;
/**
 * Converts a decibel value to a gain value
 * @param dB - The decibel value
 * @returns The gain value
 */
export declare function dBToGain(dB: number): number;
/**
 * Converts a gain value to a decibel value
 * @param gain - The gain value
 * @returns The decibel value
 */
export declare function gainTodB(gain: number): number;
/**
 * Converts a decibel value to a value
 * @param dB - The decibel value
 * @returns The value
 */
export declare function dBToValue(dB: number): number;
/**
 * Converts a gain value to a value
 * @param gain - The gain value
 * @returns The value
 */
export declare function gainToValue(gain: number): number;
/**
 * Converts a value to a decibel value
 * @param value - The value
 * @returns The decibel value
 */
export declare function valueTodB(value: number): number;
/**
 * Converts a value to a gain value
 * @param value - The value
 * @returns The gain value
 */
export declare function valueToGain(value: number): number;
/**
 * Converts a velocity value to a gain value
 * @param velocity - The velocity value (0-127)
 * @returns The gain value
 */
export declare function veloctyToGain(velocity: number): number;
export declare function clamp(val: number, minV: number, maxV: number): number;
//# sourceMappingURL=utils.d.ts.map