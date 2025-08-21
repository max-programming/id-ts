import { describe, it, expect } from "vitest";
import { safeParse } from "valibot";
import { IdHelper } from "../../src";
import { createValibotIdSchema } from "../../src/validators/validbot";

describe("Valibot ID Validator", () => {
  it("should validate ID with default options", () => {
    const userIdHelper = new IdHelper("user");

    const id = userIdHelper.generate();

    const schema = createValibotIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(safeParse(schema, id)).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(safeParse(schema, "person_0123456789")).toBe(false);

    // Test that the schema rejects IDs with different separator
    expect(safeParse(schema, "user::0123456789")).toBe(false);

    // Test that the schema rejects IDs with different length
    expect(safeParse(schema, "user_1234")).toBe(false);
  });

  it("should validate ID with custom options", () => {
    const userIdHelper = new IdHelper("user", {
      separator: "::",
      length: 12,
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    const schema = createValibotIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(safeParse(schema, id)).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(safeParse(schema, "person::abcdefghijkl")).toBe(false);

    // Test that the schema rejects IDs with different separator
    expect(safeParse(schema, "user_abcdefghijkl")).toBe(false);

    // Test that the schema rejects IDs with different length
    expect(safeParse(schema, "user::abcdefghijk")).toBe(false);

    // Test that the schema rejects IDs with different alphabets
    expect(safeParse(schema, "user::0123456789123")).toBe(false);
  });

  it("should validate ID with custom separator", () => {
    const userIdHelper = new IdHelper("user", { separator: "::" });

    const id = userIdHelper.generate();

    const schema = createValibotIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(safeParse(schema, id)).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(safeParse(schema, "person::0123456789")).toBe(false);

    // Test that the schema rejects IDs with different separator
    expect(safeParse(schema, "user_0123456789")).toBe(false);
  });

  it("should validate ID with custom length", () => {
    const userIdHelper = new IdHelper("user", { length: 12 });

    const id = userIdHelper.generate();

    const schema = createValibotIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(safeParse(schema, id)).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(safeParse(schema, "person_0123456789")).toBe(false);

    // Test that the schema rejects IDs with different length
    expect(safeParse(schema, "user_0123456789")).toBe(false);
  });

  it("should validate ID with custom alphabets", () => {
    const userIdHelper = new IdHelper("user", {
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    const schema = createValibotIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(safeParse(schema, id)).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(safeParse(schema, "person_0123456789")).toBe(false);

    // Test that the schema rejects IDs with different alphabets
    expect(safeParse(schema, "user_0123456789123")).toBe(false);
  });
});
