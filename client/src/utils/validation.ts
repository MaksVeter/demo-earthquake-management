export const isValidLocation = (value: string): boolean => {
    const locationRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    return locationRegex.test(value);
}