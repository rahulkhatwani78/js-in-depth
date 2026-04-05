# Week 6 Revision: TypeScript In-Depth

This document summarizes the key concepts from our TypeScript module.

## 1. Compilation Process
- **Lexer**: Breaks code into token streams.
- **Parser**: Organizes tokens into an Abstract Syntax Tree (AST).
- **Binder**: Links identifiers to declarations (Symbol Table).
- **Type Checker**: Ensures type safety using AST and Symbol Table.
- **Emitter**: Converts AST to output JS (plus maps/DTS files).
- *Edge Case*: TypeScript still emits `.js` files by default even if errors occur, unless `"noEmitOnError": true` is set.

## 2. Configuration (`tsconfig.json`)
- `target`: Output JS version (e.g., `ES5`, `ESNext`).
- `module`: Module system (e.g., `CommonJS`, `ESNext`).
- `strict`: Enables strict typing rules (`true` is recommended).
- `outDir`: Where compiled files go.
- `rootDir`: Source file root directory.

## 3. Type Annotations and Inference
- **Explicit Annotations**: Manually setting types (`let age: number = 25;`).
- **Type Inference**: TS automatically infers the type of an initialized variable.
- *Tip*: Uninitialized variables get an implicit `any` type. Always annotate delayed initializations.

## 4. Union and `any` Types
- **Union (`|`)**: Variable can hold multiple types (e.g., `number | string`).
- **`any`**: Opts out of type-checking completely. Cascades virally and should be avoided.

## 5. `unknown` and Type Narrowing
- **`unknown`**: Type-safe alternative to `any`. Variables must be asserted or narrowed before usage.
- **Type Guards**: Processes to move broad types to specific ones.
  - `typeof` for primitives.
  - `instanceof` for classes.
  - `in` operator for object properties.

## 6. Type Assertions and `never`
- **Assertion (`as`)**: Overrides TS's inferred type completely (runs purely at compile-time).
- **`never`**: Used for impossible states, functions that throw/loop forever, or enforcing exhaustive checks in `switch`/`if` blocks.

## 7. Interfaces vs Type Aliases
- **Interfaces**: Intended for object shapes and class contracts. Can automatically merge if declared multiple times. Great for public APIs.
- **Type Aliases**: Can define objects, primitives, unions, and tuples. Cannot be re-declared.

## 8. Objects
- **Modifiers**: Optional keys (`?`) and `readonly` properties.
- **Index Signatures**: Used when exact keys aren't known but types are (`[key: string]: any`).
- *Edge Case*: Object literals passed directly undergo strict excess property checks; assigning to a variable first bypasses this.

## 9. Functions
- Needs types for parameters and the return value.
- **Overloading**: Multiple function signatures with one broad underlying implementation.

## 10. Arrays, Tuples, and Enums
- **Arrays**: `string[]` or `Array<string>`.
- **Tuples**: Fixed-length, strictly typed arrays (`[number, string]`). Bypassed historically via `.push()`.
- **Enums**: Uniquely named constants (numeric or string based). `const enum` prevents generating JS boilerplate.

## 11. Object-Oriented Programming (OOP)
- Introduces visibility modifiers: `public`, `private`, `protected`.
- *Note*: TS `private` is a compile-time check and does not confer true privacy in the runtime compiled JS.

## 12. Generics
- Provides reusable templates acts as "type variables" (`<T>`).
- Can be constrained using `extends` (e.g., `<T extends { length: number }>`).

## 13. External APIs (Fetch/Axios)
- Must typecast generic API payloads (using `.json() as MyInterface` in Fetch or `<MyInterface>` in Axios) because TS cannot predict payload shape. Use Zod for runtime validations.

## 14. React with TypeScript
- Types used for `Props` in functional components (`React.FC<Props>`).
- Useful to add generic types to hooks like `useState<User | null>(null)` and `useRef<HTMLInputElement>(null)`.

## 15. Utility Types
- **`Partial<T>`**: All properties optional.
- **`Required<T>`**: All properties required.
- **`Omit<T, Keys>`**: Removes specific keys.
- **`Pick<T, Keys>`**: Plucks specific keys.
- **`Record<Key, Type>`**: Sets property keys to `Key` and values to `Type`.

## Practical Task
- [Week 6 Practical Task](https://github.com/rahulkhatwani78/js-in-depth/tree/master/015-week6-practicalTask)
