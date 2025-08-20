# Contributing to typed-id

Thank you for considering contributing to typed-id! 🎉 We welcome contributions from everyone, whether you're fixing a bug, adding a feature, improving documentation, or just asking questions.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Contributors](#contributors)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code:

- **Be respectful**: Treat everyone with respect, regardless of their background, identity, or experience level
- **Be inclusive**: Welcome newcomers and help them get involved
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone is learning and growing
- **Be collaborative**: Work together towards common goals

## 🚀 How to Contribute

### Ways to Contribute

1. **Report bugs** - Help us identify and fix issues
2. **Suggest features** - Share ideas for new functionality
3. **Fix bugs** - Submit bug fixes with tests
4. **Add features** - Implement new functionality
5. **Improve documentation** - Make our docs clearer and more helpful
6. **Write tests** - Improve test coverage
7. **Code reviews** - Review pull requests from other contributors

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** for your changes
4. **Make your changes** following our guidelines
5. **Test your changes** thoroughly
6. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- TypeScript 5+ knowledge

### Local Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/typed-id.git
cd typed-id

# 2. Install dependencies
bun install

# 3. Run tests to make sure everything works
bun test

# 4. Start development!
```

### Project Structure

```
typed-id/
├── src/                 # Source code
│   ├── id-helper.ts    # Main IdHelper class
│   ├── types.ts        # Type definitions
│   ├── index.ts        # Public API exports
│   └── validators/     # Optional validation schemas
│       └── zod.ts      # Zod integration
├── tests/              # Test files
│   ├── id-helper.test.ts
│   └── validators/
├── dist/               # Built files (generated)
├── docs/               # Documentation
└── package.json
```

### Available Scripts

```bash
# Run tests
bun test                 # Run all tests
bun test:ui             # Run tests with UI
bun test:run            # Run tests once (CI mode)

# Build
bun run build           # Build the package

# Development
bun run dev             # Watch mode (if available)
```

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure tests pass**: `bun test`
2. **Add tests** for new features or bug fixes
3. **Update documentation** if needed
4. **Follow coding standards** (see below)
5. **Write clear commit messages**

### Commit Message Format

We use conventional commits for clear history:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks

**Examples:**

```
feat: add custom separator support for ID generation

fix(validation): handle edge case in zod schema validation

docs: update README with new API examples

test: add comprehensive tests for custom alphabets
```

### Pull Request Template

When creating a PR, please include:

1. **Description**: What changes you made and why
2. **Type of change**: Bug fix, new feature, documentation, etc.
3. **Testing**: How you tested your changes
4. **Screenshots**: If applicable (UI changes)
5. **Breaking changes**: If any, with migration guide

## 📏 Coding Standards

### TypeScript Standards

- **Use TypeScript strictly**: Enable strict mode, no `any` types
- **Prefer explicit types**: When type inference isn't clear
- **Use generic types**: For reusable components
- **Document complex types**: Add JSDoc for complex type definitions

### Code Style

- **Use Prettier**: Code formatting is handled automatically
- **Use meaningful names**: Variables, functions, and classes should be self-documenting
- **Keep functions small**: One responsibility per function
- **Use async/await**: Instead of Promise chains where possible

### File Organization

- **One export per file**: For main functionality
- **Group related functionality**: Keep related code together
- **Use barrel exports**: Re-export from index files
- **Consistent naming**: Use kebab-case for files, PascalCase for classes

## 🧪 Testing Guidelines

### Testing Requirements

All contributions should include appropriate tests:

- **Unit tests**: For individual functions/methods
- **Integration tests**: For component interactions
- **Type tests**: For TypeScript type safety
- **Edge cases**: Test boundary conditions

### Test Structure

```typescript
import { describe, it, expect } from "vitest";
import { IdHelper } from "../src";

describe("IdHelper", () => {
  it("should describe what it tests", () => {
    // Arrange
    const idHelper = new IdHelper("test");

    // Act
    const result = idHelper.generate();

    // Assert
    expect(result).toMatch(/^test_[a-zA-Z0-9]{10}$/);
  });
});
```

### Test Coverage

- Aim for **90%+ coverage** on new code
- Test **happy paths** and **error cases**
- Include **regression tests** for bug fixes
- Test **TypeScript types** where applicable

## 📚 Documentation Guidelines

### Code Documentation

- **JSDoc comments** for public APIs
- **Inline comments** for complex logic
- **README updates** for new features
- **Type documentation** for complex generics

### Documentation Style

````typescript
/**
 * Generates a prefixed ID with customizable options.
 *
 * @returns A type-safe string in format `${prefix}${separator}${id}`
 * @example
 * ```typescript
 * const userIds = new IdHelper('user');
 * const id = userIds.generate(); // "user_abc123xyz"
 * ```
 */
public generate(): GeneratedID<P, SeparatorOrDefault<S>> {
  // Implementation
}
````

## 🐛 Issue Guidelines

### Bug Reports

When reporting bugs, please include:

1. **Clear title**: Describe the issue briefly
2. **Expected behavior**: What should happen
3. **Actual behavior**: What actually happens
4. **Steps to reproduce**: Clear, numbered steps
5. **Environment**: Node.js/Bun version, OS, etc.
6. **Code example**: Minimal reproduction case

### Feature Requests

For new features, please provide:

1. **Problem description**: What problem does this solve?
2. **Proposed solution**: How should it work?
3. **Alternatives considered**: Other ways to solve this
4. **Implementation ideas**: Technical approach (if any)
5. **Breaking changes**: Would this break existing code?

## 📞 Getting Help

If you need help:

1. **Check existing issues** - Your question might already be answered
2. **Read the documentation** - The README has extensive examples
3. **Create a discussion** - For general questions
4. **Join our community** - [Discord/Slack link if applicable]

## 🔄 Release Process

_For maintainers:_

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin --tags`
5. GitHub Actions will handle npm publishing

## ❤️ Recognition

We appreciate all contributions, no matter how small! Contributors will be:

- **Listed in this file**
- **Mentioned in release notes**
- **Given credit in commit history**
- **Thanked publicly** (if desired)

---

Thank you for contributing to typed-id! Together, we can make type-safe ID generation better for everyone. 🚀
