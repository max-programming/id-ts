import { IdHelper } from "../id-helper";
import { custom as vCustom } from "valibot";
import type { GeneratedId, SeparatorOrDefault } from "../types";

export function createValibotIdSchema<
  P extends string,
  S extends string | undefined = undefined
>(idHelper: IdHelper<P, S>) {
  const { regex } = idHelper;

  return vCustom<GeneratedId<P, SeparatorOrDefault<S>>>(val => {
    return typeof val === "string" && regex.test(val);
  }, "Invalid ID Format");
}
