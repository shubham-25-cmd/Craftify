export function createProjectPrompt(userPrompt) {
  return `
You are an expert full-stack software engineer.

The user wants to build the following application:

${userPrompt}

Your task is to plan the project before generating code.

Return a JSON object with this structure:

{
  "name": "project name",
  "description": "short project description",
  "files": [
    {
      "path": "src/App.jsx",
      "purpose": "Main application component"
    }
  ]
}

Rules:

1. Create a production-oriented project structure.
2. Use clear and maintainable file names.
3. Do not generate file contents yet.
4. Do not include markdown code fences.
5. Do not create unnecessary files.
6. Keep the architecture scalable.
7. Consider frontend, backend, database, authentication, and configuration when required.
`;
}

export function createFileGenerationPrompt({
  userPrompt,
  filePath,
  filePurpose,
  existingFiles = {},
}) {
  const existingFileList = Object.keys(existingFiles).join("\n");

  return `
You are an expert software engineer working inside an AI code builder.

USER REQUEST:
${userPrompt}

FILE TO GENERATE:
${filePath}

FILE PURPOSE:
${filePurpose}

EXISTING PROJECT FILES:
${existingFileList || "No existing files"}

Generate only the complete content of:

${filePath}

Rules:

1. Write production-quality code.
2. Follow the existing project architecture.
3. Do not modify unrelated files.
4. Do not include markdown code fences.
5. Do not explain the code.
6. Return only the file content.
7. Use correct imports and exports.
8. Do not use fake APIs or placeholder implementations unless explicitly requested.
`;
}

export function createFixPrompt({
  filePath,
  content,
  error,
}) {
  return `
You are debugging an application.

FILE:
${filePath}

CURRENT CODE:
${content}

ERROR:
${error}

Fix the error while preserving the existing functionality.

Rules:

1. Return only the corrected file content.
2. Do not use markdown code fences.
3. Do not explain the solution.
4. Do not unnecessarily rewrite working code.
5. Keep the existing architecture.
`;
}