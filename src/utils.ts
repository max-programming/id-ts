export function getIdRegex(
  prefix: string,
  separator: string,
  length: number,
  customAlphabets: string
): RegExp {
  return new RegExp(`^${prefix}${separator}[${customAlphabets}]{${length}}$`);
}
