import crypto from "crypto";
import Project from "../Models/Project.js";

// create a new project from an AI prompt

function hashContent(content) {
  return crypto
    .createHash("md5")
    .update(content)
    .digest("hex")
    .slice(0, 12);
}

export async function createProject(req, res) {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    res.status(400).json({
      error: "prompt is required",
    });
    return;
  }

  if (!req.user) {
    res.status(401).json({
      error: "unauthorized",
    });
    return;
  }

  const project = await Project.create({
    name: "planning project...",
    description: prompt,
    files: {},
    messages: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: "planning project structure ...",
      },
    ],
    version: 0,
    owner: req.user.userID,
    status: "pending",
    filesPlanned: [],
    filesGenerated: [],
    currentFile: null,
    error: null,
  });

  // start background generation
  runBackgroundGeneration(project._id.toString(), prompt).catch((err) => {
    console.error(
      `[Background AI] fatal generation error for project ${project._id}`,
      err
    );
  });

  res.status(201).json({
    _id: project._id,
    name: project.name,
    description: project.description,
    files: {},
    messages: project.messages,
    version: project.version,
    status: project.status,
    filesPlanned: project.filesPlanned,
    filesGenerated: project.filesGenerated,
    currentFile: project.currentFile,
    error: project.error,
    createdAt: project.createdAt,
  });
}

async function runBackgroundGeneration(projectId, prompt) {
  // AI generation logic here
}

export async function listProject(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const project = await Project.find(
    { owner: req.user.userId },
    {
      name: 1,
      description: 1,
      version: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  ).sort({ updatedAt: -1 });

  res.json(project);
}

export async function getProject(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user.userId,
  });

  if (!project) {
    res.status(404).json({
      error: "project not found",
    });
    return;
  }

  const filesObj = {};

  for (const [path, entry] of Object.entries(project.files)) {
    filesObj[path] = entry.content;
  }

  res.json({
    _id: project._id,
    name: project.name,
    description: project.description,
    files: filesObj,
    messages: project.messages,
    version: project.version,
    status: project.status,
    filesPlanned: project.filesPlanned,
    filesGenerated: project.filesGenerated,
    currentFile: project.currentFile,
    error: project.error,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  });
}

export async function DeleteProject(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const result = await Project.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.userId,
  });

  if (!result) {
    res.status(404).json({
      error: "project not found",
    });
    return;
  }

  res.json({
    success: true,
  });
}

export async function updateProject(req, res) {
  const { files } = req.body;

  if (!files || typeof files !== "object") {
    res.status(400).json({
      error: "files object is required",
    });
    return;
  }

  if (!req.user) {
    res.status(401).json({
      error: "unauthorized",
    });
    return;
  }

  const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user.userId,
  });

  if (!project) {
    res.status(404).json({
      error: "project not found",
    });
    return;
  }

  const newFiles = {};

  for (const [path, content] of Object.entries(files)) {
    if (typeof content === "string") {
      newFiles[path] = {
        content,
        hash: hashContent(content),
      };
    }
  }

  project.files = newFiles;

  await project.save();

  const filesObj = {};

  for (const [path, entry] of Object.entries(project.files)) {
    if (typeof entry.content === "string") {
      filesObj[path] = entry.content;
    }
  }

  res.json({
    _id: project._id,
    name: project.name,
    description: project.description,
    files: filesObj,
    messages: project.messages,
    version: project.version,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  });
}

export async function publishProject(req, res) {
  if (!req.user) {
    res.status(401).json({
      error: "unauthorized",
    });
    return;
  }

  const project = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user.userId,
    },
    {
      published: true,
    },
    {
      new: true,
    }
  );

  if (!project) {
    res.status(404).json({
      error: "project not found",
    });
    return;
  }

  res.json({
    success: true,
    published: project.published,
  });
}

export async function getpublishProject(req, res) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).json({
      error: "Project not found",
    });
    return;
  }

  if (!project.published) {
    res.status(403).json({
      error: "Project is not published yet",
    });
    return;
  }

  const filesObj = {};

  for (const [path, entry] of Object.entries(project.files)) {
    filesObj[path] = entry.content;
  }

  res.json({
    _id: project._id,
    name: project.name,
    description: project.description,
    files: filesObj,
    version: project.version,
  });
}