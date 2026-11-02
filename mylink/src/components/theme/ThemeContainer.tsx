"use client";

import React, { ReactNode } from "react";
import { MyLinkTheme } from "@/types";

interface ThemeContainerProps {
  theme: MyLinkTheme;
  children: ReactNode;
}

export function ThemeContainer({ theme, children }: ThemeContainerProps) {
  // 배경 스타일 계산
  const getBackgroundStyle = (): React.CSSProperties => {
    if (theme.backgroundType === "gradient") {
      const start = theme.gradientStart || "#3b82f6";
      const end = theme.gradientEnd || "#8b5cf6";
      return {
        background: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`,
        color: theme.textColor || "#ffffff",
      };
    }

    return {
      backgroundColor: theme.backgroundColor || "#0f172a",
      color: theme.textColor || "#ffffff",
    };
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 relative flex justify-center selection:bg-white/30 selection:text-white"
      style={getBackgroundStyle()}
    >
      {/* 은은한 배경 오버레이 효과 */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* 모바일 컨테이너 (Max 480px, 중앙 정렬) */}
      <main className="relative z-10 w-full max-w-[480px] min-h-screen px-4 py-8 sm:py-12 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
