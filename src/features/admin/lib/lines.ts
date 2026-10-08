/** Serialize string arrays for textarea "lines" fields */
export function linesToText(items: string[] | undefined) {
  return (items ?? []).join("\n");
}

/** Parse textarea lines into a trimmed string array */
export function textToLines(value: string | number | boolean) {
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
