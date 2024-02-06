/**
 * Determines if a string is not empty or undefined
 * @param str string to test
 */
export function IsNullOrEmpty(str: string) {
    return str === "undefined" || str === null || str == "";
}