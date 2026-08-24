import React from "react";

const LoadingLeft = () => {
  return (
    <div className="hidden min-h-screen w-1/2 flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
      <div>
        <div className="mb-16 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold">
            AI
          </div>

          <span className="text-xl font-semibold">
            Craftify
          </span>
        </div>

        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Build websites with the power of AI.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Describe your idea and let AI create beautiful, modern websites
            for you in seconds.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-4 h-px w-full bg-slate-800" />

        <p className="text-sm text-slate-500">
          Create. Customize. Deploy.
        </p>
      </div>
    </div>
  );
};

export default LoadingLeft;