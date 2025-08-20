# typed-id

![npm version](https://img.shields.io/npm/v/typed-id) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![License](https://img.shields.io/npm/l/typed-id) ![Test Status](https://img.shields.io/github/actions/workflow/status/max-programming/typed-id/test.yml?branch=main)

A lightweight, type-safe TypeScript library for generating prefixed IDs with customizable options. Perfect for creating consistent, identifiable IDs across your application (e.g., `user_abc123xyz`, `order_def456uvw`).

## ✨ Features

- 🔒 **Type-safe** - Full TypeScript support with proper type inference
- 🎯 **Prefixed IDs** - Generate IDs with consistent prefixes
- ⚙️ **Highly Customizable** - Configure separators, length, and character sets
- 📦 **Lightweight** - Minimal dependencies (only `nanoid`)
- 🔍 **Zod Integration** - Built-in Zod validation schemas (optional)
- 🧪 **Well Tested** - Comprehensive test coverage
- 📚 **Modern ESM** - ES modules with CommonJS support

## 🚀 Installation

```bash
npm install typed-id
# or
yarn add typed-id
# or
pnpm add typed-id
# or
bun add typed-id
```

### Optional Dependencies

For Zod validation support:

```bash
npm install zod
```

## 📖 Usage

### Basic Usage

```typescript
import { IdHelper } from "typed-id";

// Create an ID helper for users
const userIdHelper = new IdHelper("user");
const userId = userIdHelper.generate();
console.log(userId); // "user_abc123xyz0" (example output)
```

### Custom Options

```typescript
const orderIdHelper = new IdHelper("order", {
  separator: "::", // Custom separator
  length: 12, // Custom ID length
  customAlphabets: "ABCDEF123456789", // Custom character set
});

const orderId = orderIdHelper.generate();
console.log(orderId); // "order::A1B2C3D4E5F6" (example output)
```

### Advanced Examples

```typescript
import { IdHelper } from "typed-id";

// Different ID types for your application
const userIds = new IdHelper("user");
const postIds = new IdHelper("post", { separator: "-", length: 8 });
const sessionIds = new IdHelper("session", {
  separator: "_",
  length: 16,
  customAlphabets: "0123456789abcdef", // Hex only
});

// Generate IDs
const user = userIds.generate(); // "user_abc123xyz0"
const post = postIds.generate(); // "post-ab12cd34"
const session = sessionIds.generate(); // "session_a1b2c3d4e5f67890"
```

### Type Inference with InferId

You can use the `InferId` utility type to extract the generated ID type from your `IdHelper` instances:

```typescript
import { IdHelper, type InferId } from "typed-id";

// Create ID helper instances
const userIdHelper = new IdHelper("user");
const orderIdHelper = new IdHelper("order", { separator: "::" });

// Infer the types that would be generated
type UserId = InferId<typeof userIdHelper>; // "user_${string}"
type OrderId = InferId<typeof orderIdHelper>; // "order::${string}"

// Use the inferred types in your application
function processUser(id: UserId) {
  // id is guaranteed to be a user ID with the correct format
  console.log(`Processing user: ${id}`);
}

// This will work
const userId = userIdHelper.generate();
processUser(userId); // ✅ Type-safe

// This would cause a TypeScript error
const orderId = orderIdHelper.generate();
// processUser(orderId); // ❌ Type error: Argument of type 'OrderId' is not assignable to parameter of type 'UserId'
```

## 🔍 Zod Integration

If you're using Zod for validation, typed-id provides built-in schema creators:

```typescript
import { IdHelper } from "typed-id";
import { createZodIdSchema } from "typed-id/validators/zod";

const userIdHelper = new IdHelper("user");
const userIdSchema = createZodIdSchema(userIdHelper);

// Validate IDs
const validId = userIdHelper.generate();
console.log(userIdSchema.safeParse(validId).success); // true
console.log(userIdSchema.safeParse("invalid_id").success); // false

// Use in your Zod schemas
import { z } from "zod";

const userSchema = z.object({
  id: userIdSchema,
  name: z.string(),
  email: z.string().email(),
});
```

## ⚙️ Configuration Options

| Option            | Type     | Default                                                            | Description                        |
| ----------------- | -------- | ------------------------------------------------------------------ | ---------------------------------- |
| `separator`       | `string` | `"_"`                                                              | Character(s) between prefix and ID |
| `length`          | `number` | `10`                                                               | Length of the generated ID part    |
| `customAlphabets` | `string` | `"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"` | Characters to use in ID generation |

## 📝 API Reference

### `IdHelper<P, S>`

#### Constructor

```typescript
new IdHelper<P extends string, S extends string | undefined>(
  prefix: P,
  options?: Partial<Options<S>>
)
```

#### Methods

##### `generate(): GeneratedID<P, SeparatorOrDefault<S>>`

Generates a new ID with the configured prefix and options.

**Returns:** A type-safe string in the format `${prefix}${separator}${id}`

### Types

#### `Options<S>`

```typescript
type Options<S extends string | undefined = undefined> = {
  length: number;
  separator: S;
  customAlphabets: string;
};
```

#### `GeneratedID<P, S>`

```typescript
type GeneratedID<P extends string, S extends string> = `${P}${S}${string}`;
```

#### `InferId<T>`

A utility type that infers the generated ID type from an `IdHelper` instance type. This is useful for type-level programming and ensuring type consistency across your application.

```typescript
type InferId<T extends IdHelper<string, string>> = T extends IdHelper<
  infer P,
  infer S
>
  ? GeneratedId<P, SeparatorOrDefault<S>>
  : never;
```

**Usage Example:**

```typescript
import { IdHelper, InferId } from "typed-id";

// Create ID helper instances
const userIdHelper = new IdHelper("user");
const orderIdHelper = new IdHelper("order", { separator: "::" });

// Infer the types that would be generated
type UserId = InferId<typeof userIdHelper>; // "user_${string}"
type OrderId = InferId<typeof orderIdHelper>; // "order::${string}"

// Use the inferred types in your application
function processUser(id: UserId) {
  // id is guaranteed to be a user ID with the correct format
  console.log(`Processing user: ${id}`);
}

// This will work
const userId = userIdHelper.generate();
processUser(userId); // ✅ Type-safe

// This would cause a TypeScript error
const orderId = orderIdHelper.generate();
// processUser(orderId); // ❌ Type error: Argument of type 'OrderId' is not assignable to parameter of type 'UserId'
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ or Bun
- TypeScript 5+

### Setup

```bash
# Clone the repository
git clone https://github.com/max-programming/typed-id.git
cd typed-id

# Install dependencies
bun install
```

### Scripts

```bash
# Run tests
bun test

# Run tests in watch mode
bun test:ui

# Build the package
bun run build

# Type checking
tsc --noEmit
```

## 🧪 Testing

This library has comprehensive test coverage including:

- ID generation with default options
- ID generation with custom options
- Zod validation schemas
- Type safety verification

Run tests:

```bash
bun test
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [nanoid](https://github.com/ai/nanoid) for secure, URL-friendly unique ID generation
- Inspired by the need for type-safe, prefixed identifiers in modern applications
- Thanks to all contributors who help improve this library

## 📮 Support

If you have any questions or issues, please:

1. Check the [existing issues](https://github.com/max-programming/typed-id/issues)
2. Create a new issue with a clear description
3. Include code examples and expected vs actual behavior

## ⭐ Star History

## Star History

<a href="https://www.star-history.com/#max-programming/typed-id&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=max-programming/typed-id&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=max-programming/typed-id&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=max-programming/typed-id&type=Date" />
 </picture>
</a>

---

Made with ❤️ and TypeScript
