import { IdHelper } from "../id-helper";
import { custom as vCustom } from "valibot";
import { getIdRegex } from "../utils";
import type { GeneratedId, SeparatorOrDefault } from "../types";

export function createValibotIdSchema<
  P extends string,
  S extends string | undefined = undefined
>(idHelper: IdHelper<P, S>) {
  const {
    separator = IdHelper.DEFAULT_SEPARATOR,
    length = IdHelper.DEFAULT_LENGTH,
    customAlphabets = IdHelper.DEFAULT_ALPHABETS,
  } = idHelper.options;

  const idRegex = getIdRegex(
    idHelper.prefix,
    separator,
    length,
    customAlphabets
  );

  return vCustom<GeneratedId<P, SeparatorOrDefault<S>>>(val => {
    return typeof val === "string" && idRegex.test(val);
  }, "Invalid ID Format");
}
