"use client";

import { useEffect, useState } from "react";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { defaultMockData } from "@/mockData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { ThemeContainer } from "@/components/theme/ThemeContainer";
import { RotateCcw, Check, Sparkles } from "lucide-react";

export default function MyLinkProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { profile, theme, blocks, resetToDefault } = useMyLinkStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 단계나 초기 렌더 단계에서는 defaultMockData를 사용하여 Hydration 불일치 방지
  const currentProfile = mounted ? profile : defaultMockData.profile;
  const currentTheme = mounted ? theme : defaultMockData.theme;
  const currentBlocks = mounted ? blocks : defaultMockData.blocks;

  const handleReset = () => {
    resetToDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
    }, 2000);
  };

  return (
    <ThemeContainer theme={currentTheme}>
      {/* 상단 시연용 컨트롤 바 (기본값 복원 버튼 등) */}
      <div className="w-full flex justify-between items-center mb-6 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>MyLink Profile</span>
        </div>

        <button
          onClick={handleReset}
          title="기본 목(Mock) 데이터로 복원"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/20 text-xs font-medium cursor-pointer"
        >
          {resetSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span>복원 완료!</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본값 복원</span>
            </>
          )}
        </button>
      </div>

      {/* 1. 프로필 헤더 영역 */}
      <ProfileHeader profile={currentProfile} />

      {/* 2. 블록 목록 렌더링 영역 (링크, 헤더, 텍스트, 디바이더) */}
      <div className="w-full flex-1">
        <BlockRenderer blocks={currentBlocks} theme={currentTheme} />
      </div>

      {/* 3. 하단 브랜딩 풋터 */}
      <footer className="mt-12 mb-4 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-xs opacity-60 hover:opacity-100 transition-opacity font-medium tracking-wide"
        >
          <span>🔗</span>
          <span>MyLink로 제작됨</span>
        </a>
      </footer>
    </ThemeContainer>
  );
}
