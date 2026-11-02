"use client";

import React from "react";
import { HeaderBlock as HeaderBlockType } from "@/types";

interface HeaderBlockProps {
  block: HeaderBlockType;
}

export function HeaderBlock({ block }: HeaderBlockProps) {
  return (
    <div className="w-full pt-4 pb-1">
      <h2 className="text-xs font-bold tracking-wider uppercase opacity-80 text-left px-1">
        {block.title}
      </h2>
    </div>
  );
}
