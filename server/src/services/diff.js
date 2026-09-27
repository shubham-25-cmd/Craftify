import crypto from "crypto";

function hashContent(content) {
  return crypto
    .createHash("md5")
    .update(content)
    .digest("hex")
    .slice(0, 12);
}

export function createDiff(oldFiles = {}, newFiles = {}) {
  const added = [];
  const modified = [];
  const deleted = [];
  const unchanged = [];

  const oldPaths = new Set(Object.keys(oldFiles));
  const newPaths = new Set(Object.keys(newFiles));

  // Added or modified files
  for (const filePath of newPaths) {
    const newContent = newFiles[filePath]?.content ?? newFiles[filePath];

    if (!oldPaths.has(filePath)) {
      added.push({
        path: filePath,
        content: newContent,
      });

      continue;
    }

    const oldContent = oldFiles[filePath]?.content ?? oldFiles[filePath];

    if (hashContent(oldContent) !== hashContent(newContent)) {
      modified.push({
        path: filePath,
        oldContent,
        newContent,
      });
    } else {
      unchanged.push(filePath);
    }
  }

  // Deleted files
  for (const filePath of oldPaths) {
    if (!newPaths.has(filePath)) {
      const oldContent = oldFiles[filePath]?.content ?? oldFiles[filePath];

      deleted.push({
        path: filePath,
        content: oldContent,
      });
    }
  }

  return {
    added,
    modified,
    deleted,
    unchanged,
    summary: {
      added: added.length,
      modified: modified.length,
      deleted: deleted.length,
      unchanged: unchanged.length,
    },
  };
}