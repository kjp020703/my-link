"use client";

import React from "react";
import { Block, LinkBlock, MyLinkTheme } from "@/types";
import { LinkCard } from "./LinkCard";
import { HeaderBlock } from "./HeaderBlock";
import { TextBlock } from "./TextBlock";
import { DividerBlock } from "./DividerBlock";
import { getTimestampMillis } from "@/lib/firestoreLinks";
import { Link as LinkIcon } from "lucide-react";

interface BlockRendererProps {
  blocks: Block[];
  theme: MyLinkTheme;
  onUpdateLink?: (id: string, updates: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => Promise<void>;
  onDeleteLinkRequest?: (block: LinkBlock) => void;
}

export function BlockRenderer({
  blocks,
  theme,
  onUpdateLink,
  onDeleteLinkRequest,
}: BlockRendererProps) {
  // 1. enabled === true 필터링
  // 2. createdAt 기준 최신순 (내림차순) 정렬
  const visibleBlocks = blocks
    .filter((b) => b.enabled)
    .sort((a, b) => {
      const timeA = getTimestampMillis(a.createdAt);
      const timeB = getTimestampMillis(b.createdAt);
      if (timeA && timeB && timeA !== timeB) {
        return timeB - timeA; // 최신순
      }
      if (timeA && !timeB) return -1;
      if (!timeA && timeB) return 1;
      return (b.order || 0) - (a.order || 0);
    });

  if (visibleBlocks.length === 0) {
    return (
      <div className="py-12 px-4 text-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center opacity-70">
          <LinkIcon className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold opacity-90 mb-1">
          등록된 링크가 없습니다
        </p>
        <p className="text-xs opacity-60">
          상단의 &apos;새로운 링크 블록 추가하기&apos;를 눌러 링크를 등록해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-3">
      {visibleBlocks.map((block) => {
        switch (block.type) {
          case "link":
            return (
              <LinkCard
                key={block.id}
                block={block}
                theme={theme}
                onUpdate={onUpdateLink}
                onDeleteRequest={onDeleteLinkRequest}
              />
            );
          case "header":
            return <HeaderBlock key={block.id} block={block} />;
          case "text":
            return <TextBlock key={block.id} block={block} />;
          case "divider":
            return <DividerBlock key={block.id} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
