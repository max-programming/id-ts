import { describe, it, expect } from "vitest";
import { IdHelper } from "../../src";
import { createArktypeIdSchema } from "../../src/validators";
import { ArkErrors } from "arktype";

describe("Arktype ID Validator", () => {
  it("should validate ID with default options", () => {
    const userIdHelper = new IdHelper("user");

    const id = userIdHelper.generate();

    const IdSchema = createArktypeIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(IdSchema(id)).toBe(id);

    // Test that the schema rejects IDs with different prefix
    expect(IdSchema("person_0123456789")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different separator
    expect(IdSchema("user::0123456789")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different length
    expect(IdSchema("user_1234")).toBeInstanceOf(ArkErrors);
  });

  it("should validate ID with custom options", () => {
    const userIdHelper = new IdHelper("user", {
      separator: "::",
      length: 12,
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    const IdSchema = createArktypeIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(IdSchema(id)).toBe(id);

    // Test that the schema rejects IDs with different prefix
    expect(IdSchema("person::abcdefghijkl")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different separator
    expect(IdSchema("user_abcdefghijkl")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different length
    expect(IdSchema("user::abcdefghijk")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different alphabets
    expect(IdSchema("user::0123456789123")).toBeInstanceOf(ArkErrors);
  });

  it("should validate ID with custom separator", () => {
    const userIdHelper = new IdHelper("user", { separator: "::" });

    const id = userIdHelper.generate();

    const IdSchema = createArktypeIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(IdSchema(id)).toBe(id);

    // Test that the schema rejects IDs with different prefix
    expect(IdSchema("person::0123456789")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different separator
    expect(IdSchema("user_0123456789")).toBeInstanceOf(ArkErrors);
  });

  it("should validate ID with custom length", () => {
    const userIdHelper = new IdHelper("user", { length: 12 });

    const id = userIdHelper.generate();

    const IdSchema = createArktypeIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(IdSchema(id)).toBe(id);

    // Test that the schema rejects IDs with different prefix
    expect(IdSchema("person_0123456789")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different length
    expect(IdSchema("user_0123456789")).toBeInstanceOf(ArkErrors);
  });

  it("should validate ID with custom alphabets", () => {
    const userIdHelper = new IdHelper("user", {
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    const IdSchema = createArktypeIdSchema(userIdHelper);

    // Test that the schema validates the generated ID
    expect(IdSchema(id)).toBe(id);

    // Test that the schema rejects IDs with different prefix
    expect(IdSchema("person_0123456789")).toBeInstanceOf(ArkErrors);

    // Test that the schema rejects IDs with different alphabets
    expect(IdSchema("user_0123456789123")).toBeInstanceOf(ArkErrors);
  });
});
