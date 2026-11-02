"use client";

import React from "react";
import { Block, MyLinkTheme } from "@/types";
import { LinkCard } from "./LinkCard";
import { HeaderBlock } from "./HeaderBlock";
import { TextBlock } from "./TextBlock";
import { DividerBlock } from "./DividerBlock";

interface BlockRendererProps {
  blocks: Block[];
  theme: MyLinkTheme;
}

export function BlockRenderer({ blocks, theme }: BlockRendererProps) {
  // 1. enabled === true 필터링
  // 2. order 기준 오름차순 정렬
  const visibleBlocks = blocks
    .filter((b) => b.enabled)
    .sort((a, b) => a.order - b.order);

  if (visibleBlocks.length === 0) {
    return (
      <div className="py-12 text-center opacity-60 text-sm">
        등록된 링크나 콘텐츠가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-3">
      {visibleBlocks.map((block) => {
        switch (block.type) {
          case "link":
            return <LinkCard key={block.id} block={block} theme={theme} />;
          case "header":
            return <HeaderBlock key={block.id} block={block} />;
          case "text":
            return <TextBlock key={block.id} block={block} />;
          case "divider":
            return <DividerBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
