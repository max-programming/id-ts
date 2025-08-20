import type { IdHelper } from "./id-helper";

export type Options<S extends string | undefined = undefined> = {
  length: number;
  separator: S;
  customAlphabets: string;
};

export type GeneratedId<
  P extends string,
  S extends string
> = `${P}${S}${string}`;

export type SeparatorOrDefault<S> = S extends string
  ? S
  : typeof IdHelper.DEFAULT_SEPARATOR;
