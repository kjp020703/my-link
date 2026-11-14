"use client";

import React, { useState } from "react";
import { LinkBlock, MyLinkTheme } from "@/types";
import { ExternalLink, Pencil, Trash2, Clock } from "lucide-react";
import { renderLinkIcon } from "@/lib/linkValidation";
import { formatUpdatedAt, formatFullDateTime } from "@/lib/dateUtils";
import { InlineLinkEdit } from "./InlineLinkEdit";

interface LinkCardProps {
  block: LinkBlock;
  theme: MyLinkTheme;
  onUpdate?: (id: string, updates: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => Promise<void>;
  onDeleteRequest?: (block: LinkBlock) => void;
}

export function LinkCard({
  block,
  theme,
  onUpdate,
  onDeleteRequest,
}: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  // 모서리 둥글기 (buttonShape)
  const getShapeClass = () => {
    switch (theme.buttonShape) {
      case "square":
        return "rounded-lg";
      case "pill":
        return "rounded-full";
      case "rounded":
      default:
        return "rounded-2xl";
    }
  };

  // 버튼 스타일 (buttonStyle) 및 인라인 스타일 생성
  const getStyleProps = () => {
    const shape = getShapeClass();
    const baseTransition =
      "transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]";

    switch (theme.buttonStyle) {
      case "outline":
        return {
          className: `w-full flex items-center justify-between p-3 sm:p-4 border-2 ${shape} ${baseTransition} bg-transparent backdrop-blur-sm`,
          style: {
            borderColor: theme.buttonColor || "#ffffff",
            color: theme.textColor || "#ffffff",
          },
        };
      case "shadow":
        return {
          className: `w-full flex items-center justify-between p-3 sm:p-4 shadow-xl hover:shadow-2xl ${shape} ${baseTransition}`,
          style: {
            backgroundColor: theme.buttonColor || "#ffffff",
            color: theme.buttonTextColor || "#0f172a",
          },
        };
      case "glass":
        return {
          className: `w-full flex items-center justify-between p-3 sm:p-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-md hover:bg-white/25 ${shape} ${baseTransition}`,
          style: {
            color: theme.textColor || "#ffffff",
          },
        };
      case "fill":
      default:
        return {
          className: `w-full flex items-center justify-between p-3 sm:p-4 shadow-md ${shape} ${baseTransition}`,
          style: {
            backgroundColor: theme.buttonColor || "#ffffff",
            color: theme.buttonTextColor || "#0f172a",
          },
        };
    }
  };

  // 인라인 수정 모드일 때
  if (isEditing) {
    return (
      <InlineLinkEdit
        block={block}
        theme={theme}
        onSave={async (updates) => {
          if (onUpdate) {
            await onUpdate(block.id, updates);
          }
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const styleProps = getStyleProps();
  const updatedTimeStr = formatUpdatedAt(block.updatedAt);
  const fullDateTime = formatFullDateTime(block.updatedAt);

  const handleCardClick = () => {
    if (block.url) {
      window.open(block.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDeleteRequest) {
      onDeleteRequest(block);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${styleProps.className} cursor-pointer group select-none`}
      style={styleProps.style}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`${block.title} 바로가기`}
    >
      {/* 좌측 콘텐츠 영역 (썸네일/아이콘 + 제목 + 설명 + 수정 시각) */}
      <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0 pr-2">
        {/* 썸네일 또는 아이콘 */}
        {block.thumbnailUrl ? (
          <img
            src={block.thumbnailUrl}
            alt={block.title}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm"
          />
        ) : (
          <div className="p-2 rounded-xl bg-black/5 dark:bg-white/10 flex-shrink-0 flex items-center justify-center">
            {renderLinkIcon(block.icon)}
          </div>
        )}

        {/* 텍스트 영역 (제목 & 서브텍스트/설명 & 수정 시각) */}
        <div className="flex flex-col text-left overflow-hidden min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base leading-snug truncate">
              {block.title}
            </span>
            {block.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/40 uppercase tracking-wider flex-shrink-0">
                {block.badge}
              </span>
            )}
          </div>
          {block.description && (
            <p className="text-xs opacity-80 leading-normal truncate mt-0.5 font-normal">
              {block.description}
            </p>
          )}
          {/* 수정 시각 (updatedAt) 표시 */}
          {updatedTimeStr && (
            <div
              className="flex items-center gap-1 text-[10px] opacity-60 mt-1 font-mono tracking-tight"
              title={fullDateTime ? `최근 수정 시각: ${fullDateTime}` : undefined}
            >
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>{updatedTimeStr}</span>
            </div>
          )}
        </div>
      </div>

      {/* 우측 액션 버튼 영역 (외부 링크 아이콘 + 항상 표시되는 수정/삭제 버튼) */}
      <div
        className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 ml-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 새창 링크 아이콘 */}
        <button
          type="button"
          onClick={handleCardClick}
          title="새 창에서 열기"
          aria-label="새 창에서 열기"
          className="p-1.5 sm:p-2 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all opacity-75 hover:opacity-100 cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* 수정 버튼 (항상 표시) */}
        <button
          type="button"
          onClick={handleEditClick}
          title="링크 수정 (인라인 편집)"
          aria-label="링크 수정"
          className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-violet-600/15 hover:bg-violet-600 text-violet-400 hover:text-white border border-violet-500/30 hover:border-violet-600 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* 삭제 버튼 (항상 표시) */}
        <button
          type="button"
          onClick={handleDeleteClick}
          title="링크 삭제"
          aria-label="링크 삭제"
          className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-rose-600/15 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 hover:border-rose-600 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
