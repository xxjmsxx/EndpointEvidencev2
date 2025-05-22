import React, { useEffect, useState } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";

export function ToolButton({
  toolName,
  onClick,
  timer,
  onDoneLoading,
}: {
  toolName: string;
  onClick: () => void;
  timer?: number | null;
  onDoneLoading?: (toolName: string) => void;
}) {
  const [loading, setLoading] = useState(true);

  /* spinner finishes once */
  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
      onDoneLoading?.(toolName);
    }, timer ?? 2000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200
                 transition-all px-2 py-1 rounded-md text-sm cursor-pointer"
    >
      {loading ? (
        <LoaderCircle className="w-4 h-4 animate-spin text-zinc-900" />
      ) : (
        <CircleCheck className="w-4 h-4 text-zinc-900" />
      )}
      {toolName}
    </button>
  );
}
