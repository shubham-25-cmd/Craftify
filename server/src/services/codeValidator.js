// services/codeValidator.js

import path from "path";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB

const allowedExtensions = [
  ".js",
  ".jsx",
  ".json",
  ".html",
  ".css",
  ".scss",
  ".md",
  ".txt",
];

export function validateFilePath(filePath) {
  if (!filePath || typeof filePath !== "string") {
    return {
      valid: false,
      error: "Invalid file path",
    };
  }

  // Prevent path traversal
  if (
    filePath.includes("..") ||
    path.isAbsolute(filePath) ||
    filePath.includes("\\")
  ) {
    return {
      valid: false,
      error: "Unsafe file path",
    };
  }

  const extension = path.extname(filePath).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file type: ${extension}`,
    };
  }

  return {
    valid: true,
  };
}

export function validateFileContent(content) {
  if (typeof content !== "string") {
    return {
      valid: false,
      error: "File content must be a string",
    };
  }

  if (!content.trim()) {
    return {
      valid: false,
      error: "File content cannot be empty",
    };
  }

  if (Buffer.byteLength(content, "utf8") > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size exceeds 500 KB",
    };
  }

  return {
    valid: true,
  };
}

export function validateJson(content) {
  try {
    JSON.parse(content);

    return {
      valid: true,
    };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid JSON: ${error.message}`,
    };
  }
}

export function validateFile(filePath, content) {
  const pathResult = validateFilePath(filePath);

  if (!pathResult.valid) {
    return pathResult;
  }

  const contentResult = validateFileContent(content);

  if (!contentResult.valid) {
    return contentResult;
  }

  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".json") {
    return validateJson(content);
  }

  return {
    valid: true,
  };
}

export function validateProjectFiles(files) {
  if (!files || typeof files !== "object" || Array.isArray(files)) {
    return {
      valid: false,
      errors: ["Files must be an object"],
    };
  }

  const errors = [];

  for (const [filePath, content] of Object.entries(files)) {
    const result = validateFile(filePath, content);

    if (!result.valid) {
      errors.push({
        file: filePath,
        error: result.error,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}