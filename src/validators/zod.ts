import { IdHelper } from "../id-helper";
import { custom as zodCustom } from "zod/mini";
import type { GeneratedId, SeparatorOrDefault } from "../types";

export function createZodIdSchema<
  P extends string,
  S extends string | undefined = undefined
>(idHelper: IdHelper<P, S>) {
  const {
    separator = IdHelper.DEFAULT_SEPARATOR,
    length = IdHelper.DEFAULT_LENGTH,
    customAlphabets = IdHelper.DEFAULT_ALPHABETS,
  } = idHelper.options;

  const regex = new RegExp(
    `^${idHelper.prefix}${separator}[${customAlphabets}]{${length}}$`
  );

  return zodCustom<GeneratedId<P, SeparatorOrDefault<S>>>(val => {
    return typeof val === "string" && regex.test(val);
  }, "Invalid ID Format");
}
