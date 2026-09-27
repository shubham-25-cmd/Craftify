// services/contentNormalizer.js

export function normalizeContent(content) {
  if (typeof content !== "string") {
    throw new TypeError("Content must be a string");
  }

  let normalized = content;

  // Normalize line endings
  normalized = normalized.replace(/\r\n/g, "\n");
  normalized = normalized.replace(/\r/g, "\n");

  // Remove BOM if present
  normalized = normalized.replace(/^\uFEFF/, "");

  // Remove trailing spaces/tabs from each line
  normalized = normalized
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");

  // Remove excessive blank lines
  normalized = normalized.replace(/\n{3,}/g, "\n\n");

  // Remove spaces from the beginning and end
  normalized = normalized.trim();

  // Always end the file with one newline
  if (normalized.length > 0) {
    normalized += "\n";
  }

  return normalized;
}