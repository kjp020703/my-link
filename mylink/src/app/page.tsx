"use client";

import { useEffect, useState } from "react";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { defaultMockData } from "@/mockData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { ThemeContainer } from "@/components/theme/ThemeContainer";
import { AddLinkDialog } from "@/components/dialogs/AddLinkDialog";
import { DeleteConfirmDialog } from "@/components/dialogs/DeleteConfirmDialog";
import { subscribeLinksFromFirestore } from "@/lib/firestoreLinks";
import { LinkBlock } from "@/types";
import { RotateCcw, Check, Sparkles, Plus, Loader2, AlertCircle } from "lucide-react";

export default function MyLinkProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<LinkBlock | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const {
    profile,
    theme,
    blocks,
    resetToDefault,
    addLinkBlock,
    updateLinkBlock,
    deleteLinkBlock,
    syncFirestoreLinks,
  } = useMyLinkStore();

  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
    setFetchError(null);

    // Firestore (users/anonymous/links) createdAt 최신순 실시간 링크 구독 및 로드
    const unsubscribe = subscribeLinksFromFirestore(
      (firestoreLinks) => {
        syncFirestoreLinks(firestoreLinks);
        setIsLoading(false);
      },
      (error) => {
        console.warn("Firestore 링크 구독 오류:", error);
        setIsLoading(false);
        setFetchError("Firestore에서 링크를 불러오지 못했습니다.");
      }
    );

    return () => {
      unsubscribe();
    };
  }, [syncFirestoreLinks]);

  // SSR 단계나 초기 렌더 단계에서는 defaultMockData를 사용하여 Hydration 불일치 방지
  const currentProfile = mounted ? profile : defaultMockData.profile;
  const currentTheme = mounted ? theme : defaultMockData.theme;
  const currentBlocks = blocks;

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleReset = () => {
    resetToDefault();
    setResetSuccess(true);
    showToast("기본 데이터로 복원되었습니다.");
    setTimeout(() => {
      setResetSuccess(false);
    }, 2500);
  };

  const handleAddLink = async (data: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => {
    await addLinkBlock(data);
    showToast(`"${data.title}" 링크가 Firebase에 추가되었습니다!`);
  };

  const handleUpdateLink = async (
    id: string,
    updates: {
      title: string;
      url: string;
      description?: string;
      badge?: string;
      icon?: string;
      thumbnailUrl?: string;
    }
  ) => {
    await updateLinkBlock(id, updates);
    showToast(`"${updates.title}" 링크가 수정되었습니다!`);
  };

  const handleDeleteRequest = (block: LinkBlock) => {
    setLinkToDelete(block);
  };

  const handleConfirmDelete = async (block: LinkBlock) => {
    await deleteLinkBlock(block.id);
    showToast(`"${block.title}" 링크가 삭제되었습니다.`);
    setLinkToDelete(null);
  };

  return (
    <ThemeContainer theme={currentTheme}>
      {/* 알림 토스트 배너 */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-none">
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

      {/* 2. 블록 목록 렌더링 영역 (Firestore users/anonymous/links) */}
      <div className="w-full flex-1">
        {isLoading ? (
          <div className="w-full flex flex-col space-y-3 py-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-16 rounded-2xl bg-white/10 border border-white/15 animate-pulse"
              />
            ))}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs opacity-70">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Firestore에서 링크 목록을 불러오는 중...</span>
            </div>
          </div>
        ) : fetchError ? (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <p>{fetchError}</p>
            </div>
            <button
              onClick={() => {
                setIsLoading(true);
                setFetchError(null);
                import("@/lib/firestoreLinks").then(({ getLinksFromFirestore }) => {
                  getLinksFromFirestore()
                    .then((links) => {
                      syncFirestoreLinks(links);
                      setIsLoading(false);
                    })
                    .catch((err) => {
                      setIsLoading(false);
                      setFetchError(err.message);
                    });
                });
              }}
              className="px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-white font-medium cursor-pointer transition-colors"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <BlockRenderer
            blocks={currentBlocks}
            theme={currentTheme}
            onUpdateLink={handleUpdateLink}
            onDeleteLinkRequest={handleDeleteRequest}
          />
        )}
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

      {/* 삭제 확인 모달 */}
      <DeleteConfirmDialog
        isOpen={Boolean(linkToDelete)}
        block={linkToDelete}
        onClose={() => setLinkToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </ThemeContainer>
  );
}
