type CustomComparator<T> = Partial<{
    [K in keyof T]: (current: T[K], original: T[K]) => boolean;
}>;
interface CompareOptions<T> {
    /**
     * If true, includes fields that changed to undefined/null
     * If false, omits fields that changed to undefined/null
     */
    includeNullish?: boolean;
    /**
     * Custom comparison function for specific fields
     * Useful for comparing complex objects or special types
     */
    customComparators?: CustomComparator<T>;
    /**
     * If true, performs deep comparison of objects and arrays
     * If false, performs shallow comparison
     * @default true
     */
    deep?: boolean;
    /**
     * Fields to ignore during comparison
     */
    ignoreFields?: Array<keyof T>;
}
/**
 * Gets the changed fields between two objects by comparing their values
 * @param currentValue Current state of the object
 * @param originalValue Original state of the object to compare against
 * @param options Configuration options for comparison
 * @returns Object containing only the fields that have changed
 * @throws Error if inputs are not objects
 */
export declare const getChangedFields: <T extends Record<string, any>>(currentValue: T, originalValue: T, options?: CompareOptions<T>) => Partial<T>;
/**
 * Checks if an object has any changes compared to its original state
 * @param currentValue Current state of the object
 * @param originalValue Original state of the object to compare against
 * @param options Configuration options for comparison
 * @returns boolean indicating if there are any changes
 * @throws Error if inputs are not objects
 */
export declare const hasChanges: <T extends Record<string, any>>(currentValue: T, originalValue: T, options?: CompareOptions<T>) => boolean;
export {};
