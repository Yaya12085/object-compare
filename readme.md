# object-compare-2

A TypeScript utility for comparing objects and detecting changes between them. This package provides robust object comparison with support for deep comparison, custom comparators, and field filtering.

## Installation

```bash
npm install object-compare-2
# or
yarn add object-compare-2
# or
pnpm add object-compare-2
```

## Features

- 🔍 Deep object comparison
- 🎯 Custom field comparators
- ⚡ Shallow comparison option
- 🚫 Field ignoring
- ✨ TypeScript support
- 📅 Built-in Date object support
- 🔄 Array comparison
- ❌ Nullish value handling

## Usage

### Basic Usage

```typescript
import { getChangedFields, hasChanges } from "object-compare-2";

const original = {
  name: "John",
  age: 30,
  address: {
    street: "Main St",
    city: "Boston",
  },
  tags: ["user", "admin"],
};

const current = {
  name: "John",
  age: 31,
  address: {
    street: "Main St",
    city: "New York",
  },
  tags: ["user", "admin", "manager"],
};

// Get changed fields
const changes = getChangedFields(current, original);
console.log(changes);
// Output:
// {
//   age: 31,
//   address: { street: 'Main St', city: 'New York' },
//   tags: ['user', 'admin', 'manager']
// }

// Check if there are any changes
const hasAnyChanges = hasChanges(current, original);
console.log(hasAnyChanges); // true
```

### Advanced Usage

#### With Custom Comparators

```typescript
interface User {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    country: string;
  };
  lastLogin: Date;
  permissions: string[];
}

const current: User = {
  name: "John",
  age: 30,
  address: {
    street: "Main St",
    city: "Boston",
    country: "USA",
  },
  lastLogin: new Date("2024-01-01"),
  permissions: ["read", "write"],
};

const original: User = {
  name: "John",
  age: 30,
  address: {
    street: "Second St",
    city: "Boston",
    country: "USA",
  },
  lastLogin: new Date("2024-01-02"),
  permissions: ["read"],
};

const changes = getChangedFields(current, original, {
  customComparators: {
    // Only compare city and country for address
    address: (curr, orig) =>
      curr.city === orig.city && curr.country === orig.country,
    // Compare dates ignoring time
    lastLogin: (curr, orig) => curr.toDateString() === orig.toDateString(),
    // Check if arrays have same length
    permissions: (curr, orig) => curr.length === orig.length,
  },
});
```

#### With Ignore Fields

```typescript
const changes = getChangedFields(current, original, {
  ignoreFields: ["lastLogin", "permissions"], // These fields will be ignored in comparison
});
```

#### Handling Nullish Values

```typescript
const current = {
  name: "John",
  age: null,
  title: undefined,
};

const original = {
  name: "John",
  age: 30,
  title: "Developer",
};

// Include null/undefined changes
const changes1 = getChangedFields(current, original, {
  includeNullish: true,
});
// Output: { age: null, title: undefined }

// Exclude null/undefined changes
const changes2 = getChangedFields(current, original, {
  includeNullish: false,
});
// Output: {}
```

#### Shallow Comparison

```typescript
const changes = getChangedFields(current, original, {
  deep: false, // Only compare object references
});
```

## API Reference

### `getChangedFields<T>`

Gets the changed fields between two objects by comparing their values.

```typescript
function getChangedFields<T extends Record<string, any>>(
  currentValue: T,
  originalValue: T,
  options?: CompareOptions<T>
): Partial<T>;
```

#### Options

```typescript
interface CompareOptions<T> {
  /**
   * If true, includes fields that changed to undefined/null
   * If false, omits fields that changed to undefined/null
   * @default false
   */
  includeNullish?: boolean;

  /**
   * Custom comparison function for specific fields
   */
  customComparators?: {
    [K in keyof T]?: (current: T[K], original: T[K]) => boolean;
  };

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
```

### `hasChanges<T>`

Checks if an object has any changes compared to its original state.

```typescript
function hasChanges<T extends Record<string, any>>(
  currentValue: T,
  originalValue: T,
  options?: CompareOptions<T>
): boolean;
```

## Supported Types

- Primitives (string, number, boolean)
- Arrays
- Objects
- Date objects
- null/undefined

## TypeScript Support

The package is written in TypeScript and includes type definitions. It provides full type inference for your objects and custom comparators.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
