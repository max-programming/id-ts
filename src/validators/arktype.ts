import { IdHelper } from "../id-helper";
import { type } from "arktype";
import type { GeneratedId, SeparatorOrDefault } from "../types";
import type { Type } from "arktype";

export function createArkTypeIdSchema<
  P extends string,
  S extends string | undefined = undefined
>(idHelper: IdHelper<P, S>) {
  const { regex } = idHelper;

  return type<RegExp, Type<GeneratedId<P, SeparatorOrDefault<S>>>>(regex);
}
