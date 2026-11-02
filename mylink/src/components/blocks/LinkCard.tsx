"use client";

import React from "react";
import { LinkBlock, MyLinkTheme } from "@/types";
import {
  Globe,
  Coffee,
  Download,
  Mail,
  ExternalLink,
  Link as LinkIcon,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  Heart,
} from "lucide-react";
import {
  GithubIcon,
  YoutubeIcon,
  TwitterXIcon,
  InstagramIcon,
} from "@/components/icons/BrandIcons";

interface LinkCardProps {
  block: LinkBlock;
  theme: MyLinkTheme;
}

// 아이콘 이름 매핑 헬퍼
function renderIcon(iconName?: string) {
  if (!iconName) return <LinkIcon className="w-5 h-5 flex-shrink-0" />;

  const key = iconName.toLowerCase();
  switch (key) {
    case "globe":
      return <Globe className="w-5 h-5 flex-shrink-0" />;
    case "youtube":
      return <YoutubeIcon className="w-5 h-5 flex-shrink-0 text-red-500" />;
    case "github":
      return <GithubIcon className="w-5 h-5 flex-shrink-0" />;
    case "coffee":
      return <Coffee className="w-5 h-5 flex-shrink-0 text-amber-500" />;
    case "download":
      return <Download className="w-5 h-5 flex-shrink-0 text-blue-500" />;
    case "mail":
      return <Mail className="w-5 h-5 flex-shrink-0 text-emerald-500" />;
    case "book":
    case "bookopen":
      return <BookOpen className="w-5 h-5 flex-shrink-0" />;
    case "calendar":
      return <Calendar className="w-5 h-5 flex-shrink-0" />;
    case "heart":
      return <Heart className="w-5 h-5 flex-shrink-0 text-rose-500" />;
    case "instagram":
      return <InstagramIcon className="w-5 h-5 flex-shrink-0 text-pink-500" />;
    case "twitter":
      return <TwitterXIcon className="w-5 h-5 flex-shrink-0 text-sky-400" />;
    default:
      return <Sparkles className="w-5 h-5 flex-shrink-0" />;
  }
}

export function LinkCard({ block, theme }: LinkCardProps) {
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
      "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]";

    switch (theme.buttonStyle) {
      case "outline":
        return {
          className: `w-full flex items-center justify-between p-3.5 sm:p-4 border-2 ${shape} ${baseTransition} bg-transparent backdrop-blur-sm`,
          style: {
            borderColor: theme.buttonColor || "#ffffff",
            color: theme.textColor || "#ffffff",
          },
        };
      case "shadow":
        return {
          className: `w-full flex items-center justify-between p-3.5 sm:p-4 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 ${shape} ${baseTransition}`,
          style: {
            backgroundColor: theme.buttonColor || "#ffffff",
            color: theme.buttonTextColor || "#0f172a",
          },
        };
      case "glass":
        return {
          className: `w-full flex items-center justify-between p-3.5 sm:p-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-md hover:bg-white/30 ${shape} ${baseTransition}`,
          style: {
            color: theme.textColor || "#ffffff",
          },
        };
      case "fill":
      default:
        return {
          className: `w-full flex items-center justify-between p-3.5 sm:p-4 shadow-md ${shape} ${baseTransition}`,
          style: {
            backgroundColor: theme.buttonColor || "#ffffff",
            color: theme.buttonTextColor || "#0f172a",
          },
        };
    }
  };

  const styleProps = getStyleProps();

  return (
    <a
      href={block.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styleProps.className}
      style={styleProps.style}
      aria-label={block.title}
    >
      <div className="flex items-center gap-3.5 overflow-hidden w-full min-w-0 pr-2">
        {/* 썸네일 또는 아이콘 */}
        {block.thumbnailUrl ? (
          <img
            src={block.thumbnailUrl}
            alt={block.title}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm"
          />
        ) : (
          <div className="p-2 rounded-xl bg-black/5 dark:bg-white/10 flex-shrink-0 flex items-center justify-center">
            {renderIcon(block.icon)}
          </div>
        )}

        {/* 텍스트 영역 (제목 & 서브텍스트/설명) */}
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
        </div>
      </div>

      {/* 우측 링크 아이콘 */}
      <div className="opacity-40 hover:opacity-100 flex-shrink-0 pl-1">
        <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  );
}
