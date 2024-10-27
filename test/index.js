import { getChangedFields, hasChanges } from "object-compare";

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
  age: 30,
  address: {
    street: "Main St",
    city: "Boston",
  },
  tags: ["user", "admin"],
};

// Get changed fields
const changes = getChangedFields(current, original);
console.log(changes);

const hasAnyChanges = hasChanges(current, original);
console.log(hasAnyChanges);
