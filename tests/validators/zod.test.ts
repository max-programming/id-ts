import { describe, it, expect } from "vitest";
import { IdHelper } from "../../src";
import { createZodIdSchema } from "../../src/validators";

describe("Zod ID Validator", () => {
  it("should validate ID with default options", () => {
    const userIdHelper = new IdHelper("user");

    const id = userIdHelper.generate();

    const schema = createZodIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(schema.safeParse(id).success).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(schema.safeParse("person_0123456789").success).toBe(false);

    // Test that the schema rejects IDs with different separator
    expect(schema.safeParse("user::0123456789").success).toBe(false);

    // Test that the schema rejects IDs with different length
    expect(schema.safeParse("user_1234").success).toBe(false);
  });

  it("should validate ID with custom options", () => {
    const userIdHelper = new IdHelper("user", {
      separator: "::",
      length: 12,
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    const schema = createZodIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(schema.safeParse(id).success).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(schema.safeParse("person::abcdefghijkl").success).toBe(false);

    // Test that the schema rejects IDs with different separator
    expect(schema.safeParse("user_abcdefghijkl").success).toBe(false);

    // Test that the schema rejects IDs with different length
    expect(schema.safeParse("user::abcdefghijk").success).toBe(false);

    // Test that the schema rejects IDs with different alphabets
    expect(schema.safeParse("user::0123456789123").success).toBe(false);
  });

  it("should validate ID with custom separator", () => {
    const userIdHelper = new IdHelper("user", { separator: "::" });

    const id = userIdHelper.generate();

    const schema = createZodIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(schema.safeParse(id).success).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(schema.safeParse("person::0123456789").success).toBe(false);

    // Test that the schema rejects IDs with different separator
    expect(schema.safeParse("user_0123456789").success).toBe(false);
  });

  it("should validate ID with custom length", () => {
    const userIdHelper = new IdHelper("user", { length: 12 });

    const id = userIdHelper.generate();

    const schema = createZodIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(schema.safeParse(id).success).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(schema.safeParse("person_0123456789").success).toBe(false);

    // Test that the schema rejects IDs with different length
    expect(schema.safeParse("user_0123456789").success).toBe(false);
  });

  it("should validate ID with custom alphabets", () => {
    const userIdHelper = new IdHelper("user", {
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    const schema = createZodIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(schema.safeParse(id).success).toBe(true);

    // Test that the schema rejects IDs with different prefix
    expect(schema.safeParse("person_0123456789").success).toBe(false);

    // Test that the schema rejects IDs with different alphabets
    expect(schema.safeParse("user_0123456789123").success).toBe(false);
  });
});
