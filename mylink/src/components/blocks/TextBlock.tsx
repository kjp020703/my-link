"use client";

import React from "react";
import { TextBlock as TextBlockType } from "@/types";

interface TextBlockProps {
  block: TextBlockType;
}

export function TextBlock({ block }: TextBlockProps) {
  return (
    <div className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-sm">
      <p className="text-sm leading-relaxed opacity-95 whitespace-pre-line font-medium">
        {block.content}
      </p>
    </div>
  );
}
