import React, { useRef, useState } from "react";
import {
  ArrowRightIcon,
  CloudUploadIcon,
  Loader2Icon,
  MicIcon,
} from "lucide-react";

const PromptInput = ({
  onSubmit,
  loading = false,
  placeholder = "Describe the website you want to build...",
  large = false,
  autofocus = false,
  variant = "default",
}) => {
  const [value, setValue] = useState("");

  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = value.trim();

    if (!trimmed || loading) return;

    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSubmit(e);
    }
  };

  if (variant === "glass") {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-xl"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          autoFocus={autofocus}
          rows={3}
          className="w-full resize-none border-0 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        />

        <div className="mt-2 flex items-center justify-between gap-2">
          <label
            htmlFor="prompt-file"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <input
              type="file"
              id="prompt-file"
              hidden
            />

            <CloudUploadIcon size={18} />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MicIcon size={18} />
            </button>

            <button
              type="submit"
              disabled={!value.trim() || loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <Loader2Icon
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <ArrowRightIcon size={18} />
              )}
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl border border-zinc-200 bg-white shadow-sm transition focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/5 ${
        large ? "p-4 sm:p-5" : "p-3"
      }`}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={loading}
        autoFocus={autofocus}
        rows={large ? 5 : 2}
        className="w-full resize-none border-0 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
      />

      <div className="mt-3 flex items-center justify-between gap-2">
        <label
          htmlFor="prompt-file-default"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <input
            type="file"
            id="prompt-file-default"
            hidden
          />

          <CloudUploadIcon size={18} />
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MicIcon size={18} />
          </button>

          <button
            type="submit"
            disabled={!value.trim() || loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <Loader2Icon
                size={18}
                className="animate-spin"
              />
            ) : (
              <ArrowRightIcon size={18} />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptInput;
  return (
    <div className={``${large?'p-4':'p-3'}>
     <textarea ref={textareaRef} value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={loading} rows={large?5:1} className=''/>
    </div>
  )
}

export default PromptInput