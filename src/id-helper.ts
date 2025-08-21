import { customAlphabet } from "nanoid";
import type { Options, GeneratedId, SeparatorOrDefault } from "./types";

export class IdHelper<
  P extends string,
  S extends string | undefined = undefined
> {
  static DEFAULT_SEPARATOR = "_" as const;
  static DEFAULT_LENGTH = 10 as const;
  static DEFAULT_ALPHABETS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

  constructor(public prefix: P, public options: Partial<Options<S>> = {}) {}

  private get optionsOrDefaults() {
    const {
      separator = IdHelper.DEFAULT_SEPARATOR,
      length = IdHelper.DEFAULT_LENGTH,
      customAlphabets = IdHelper.DEFAULT_ALPHABETS,
    } = this.options;

    return {
      separator,
      length,
      customAlphabets,
    } as Options<S>;
  }

  public get regex(): RegExp {
    const { separator, length, customAlphabets } = this.optionsOrDefaults;

    return new RegExp(
      `^${this.prefix}${separator}[${customAlphabets}]{${length}}$`
    );
  }

  public generate(): GeneratedId<P, SeparatorOrDefault<S>> {
    const { separator, length, customAlphabets } = this.optionsOrDefaults;

    const nanoid = customAlphabet(customAlphabets, length);

    const id = nanoid();

    return (this.prefix + separator + id) as GeneratedId<
      P,
      SeparatorOrDefault<S>
    >;
  }
}

export type InferId<T extends IdHelper<string, string>> = T extends IdHelper<
  infer P,
  infer S
>
  ? GeneratedId<P, SeparatorOrDefault<S>>
  : never;
