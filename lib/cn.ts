/** Tiny className joiner — filters falsy values. Avoids a runtime dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
