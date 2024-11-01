// utils/compareObjects.ts
/**
 * Gets the changed fields between two objects by comparing their values
 * @param currentValue Current state of the object
 * @param originalValue Original state of the object to compare against
 * @param options Configuration options for comparison
 * @returns Object containing only the fields that have changed
 * @throws Error if inputs are not objects
 */
export function getChangedFields(currentValue, originalValue, options = {}) {
    if (!currentValue ||
        !originalValue ||
        typeof currentValue !== "object" ||
        typeof originalValue !== "object") {
        throw new Error("Both currentValue and originalValue must be objects");
    }
    const { includeNullish = false, customComparators = {}, deep = true, ignoreFields = [], } = options;
    const changedFields = {};
    // Helper function to check if a value is a primitive or Date
    const isPrimitive = (value) => {
        return (value === null ||
            value === undefined ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            value instanceof Date);
    };
    // Helper function to compare two values
    const areEqual = (current, original) => {
        // First check if either value is primitive
        if (isPrimitive(current) || isPrimitive(original)) {
            // Handle Date objects specially
            if (current instanceof Date && original instanceof Date) {
                return current.getTime() === original.getTime();
            }
            // Direct comparison for other primitives
            return current === original;
        }
        // Handle Arrays
        if (Array.isArray(current) && Array.isArray(original)) {
            if (current.length !== original.length)
                return false;
            if (!deep)
                return current === original;
            return current.every((value, index) => areEqual(value, original[index]));
        }
        // Handle Objects (we know they're not primitive or arrays at this point)
        if (typeof current === "object" &&
            current !== null &&
            typeof original === "object" &&
            original !== null) {
            if (!deep)
                return current === original;
            const currentKeys = Object.keys(current);
            const originalKeys = Object.keys(original);
            if (currentKeys.length !== originalKeys.length)
                return false;
            return currentKeys.every((key) => areEqual(current[key], original[key]));
        }
        // Fallback for any other cases
        return current === original;
    };
    Object.keys(currentValue).forEach((key) => {
        const typedKey = key;
        // Skip ignored fields
        if (ignoreFields.includes(typedKey)) {
            return;
        }
        const currentField = currentValue[typedKey];
        const originalField = originalValue[typedKey];
        // Use custom comparator if provided
        const comparator = customComparators[typedKey];
        if (comparator) {
            if (!comparator(currentField, originalField)) {
                changedFields[typedKey] = currentField;
            }
            return;
        }
        // Skip if both values are nullish and we're not including nullish values
        if (!includeNullish &&
            (currentField === undefined || currentField === null) &&
            (originalField === undefined || originalField === null)) {
            return;
        }
        // Compare values
        if (!areEqual(currentField, originalField)) {
            changedFields[typedKey] = currentField;
        }
    });
    return changedFields;
}
/**
 * Checks if an object has any changes compared to its original state
 * @param currentValue Current state of the object
 * @param originalValue Original state of the object to compare against
 * @param options Configuration options for comparison
 * @returns boolean indicating if there are any changes
 * @throws Error if inputs are not objects
 */
export function hasChanges(currentValue, originalValue, options) {
    return (Object.keys(getChangedFields(currentValue, originalValue, options)).length >
        0);
}
// Add CommonJS default export compatibility
if (typeof module !== "undefined" && module.exports) {
    module.exports = { getChangedFields, hasChanges };
    module.exports.default = { getChangedFields, hasChanges };
}
