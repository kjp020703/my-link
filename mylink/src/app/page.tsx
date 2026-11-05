"use client";

import { useEffect, useState } from "react";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { defaultMockData } from "@/mockData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { ThemeContainer } from "@/components/theme/ThemeContainer";
import { AddLinkDialog } from "@/components/dialogs/AddLinkDialog";
import { RotateCcw, Check, Sparkles, Plus } from "lucide-react";

export default function MyLinkProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const { profile, theme, blocks, resetToDefault, addLinkBlock } =
    useMyLinkStore();

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
    setNotification("기본 데이터로 복원되었습니다.");
    setTimeout(() => {
      setResetSuccess(false);
      setNotification(null);
    }, 2500);
  };

  const handleAddLink = (data: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => {
    addLinkBlock(data);
    setNotification(`"${data.title}" 링크가 추가되었습니다!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <ThemeContainer theme={currentTheme}>
      {/* 알림 토스트 배너 */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/90 text-white text-xs font-medium shadow-xl border border-white/20 backdrop-blur-md">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* 상단 컨트롤 바 */}
      <div className="w-full flex justify-between items-center mb-6 px-1 gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>MyLink Profile</span>
        </div>

        <div className="flex items-center gap-2">
          {/* 링크 추가 버튼 */}
          <button
            onClick={() => setIsAddDialogOpen(true)}
            title="새로운 링크 추가하기"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white transition-all backdrop-blur-md border border-violet-400/40 text-xs font-semibold shadow-md shadow-violet-600/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>링크 추가</span>
          </button>

          {/* 기본값 복원 버튼 */}
          <button
            onClick={handleReset}
            title="기본 목(Mock) 데이터로 복원"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/20 text-xs font-medium cursor-pointer"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>복원됨</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>기본값 복원</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. 프로필 헤더 영역 */}
      <ProfileHeader profile={currentProfile} />

      {/* 크리에이터용 빠른 링크 추가 배너 카드 */}
      <div className="w-full mb-4">
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold backdrop-blur-sm cursor-pointer group"
        >
          <div className="p-1 rounded-full bg-white/10 group-hover:bg-violet-500 group-hover:text-white transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="opacity-90 group-hover:opacity-100">
            새로운 링크 블록 추가하기
          </span>
        </button>
      </div>

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

      {/* 링크 추가 다이얼로그 모달 */}
      <AddLinkDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddLink}
        currentTheme={currentTheme}
      />
    </ThemeContainer>
  );
}
