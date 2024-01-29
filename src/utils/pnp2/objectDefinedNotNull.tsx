/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */
export function objectDefinedNotNull(obj: any) {
    return typeof obj !== "undefined" && obj !== null;
}