import { MemoizedMarkdown } from "@/components/Markdown/memoized-markdown";
import React from "react";

//============================================================
// * This section is to list RegEx patterns for the different
//   types of tags that we want to look for in the content
//============================================================


/* Identify <tool> tags in streamed chunks */
const PATTERN = /<tool>(.*?)<\/tool>/;


//============================================================
// * This section is to render the content
//============================================================

export function ChunkAnalyzed({
  content,
}: {
  content: string;
}) {
  /* fresh regex each render */
  const REGEX = new RegExp(PATTERN.source, "g");
  const matches = [...content.matchAll(REGEX)];

  /* no <tool> tags → render markdown as-is (FileChip is handled there) */
  if (matches.length === 0) {
    return <MemoizedMarkdown content={content} />;
  }

}
