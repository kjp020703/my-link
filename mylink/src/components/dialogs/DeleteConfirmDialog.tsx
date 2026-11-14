"use client";

import React, { useEffect, useState } from "react";
import { LinkBlock } from "@/types";
import { AlertTriangle, Trash2, X, Loader2, Link as LinkIcon, Clock } from "lucide-react";
import { formatUpdatedAt } from "@/lib/dateUtils";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  block: LinkBlock | null;
  onClose: () => void;
  onConfirm: (block: LinkBlock) => Promise<void>;
}

export function DeleteConfirmDialog({
  isOpen,
  block,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 모달 열릴 때 상태 초기화 및 바디 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsDeleting(false);
      setDeleteError(null);
    } else {
      document.body.style.overflow = "unset";
      setIsDeleting(false);
      setDeleteError(null);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 키 이벤트 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen || !block) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await onConfirm(block);
      onClose();
    } catch (err: unknown) {
      console.error("Firestore 링크 삭제 실패:", err);
      const message =
        err instanceof Error
          ? err.message
          : "삭제 중 오류가 발생했습니다. 다시 시도해주세요.";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* 백드롭 오버레이 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={!isDeleting ? onClose : undefined}
      />

      {/* 모달 윈도우 */}
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-neutral-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 닫기 버튼 */}
        <button
          type="button"
          onClick={!isDeleting ? onClose : undefined}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 모달 본문 */}
        <div className="p-6 text-center space-y-4 pt-8">
          {/* 경고 아이콘 */}
          <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
            <AlertTriangle className="w-7 h-7" />
          </div>

          {/* 제목: "정말 삭제하시겠습니까?" */}
          <h2
            id="delete-dialog-title"
            className="text-lg sm:text-xl font-bold text-white tracking-tight"
          >
            정말 삭제하시겠습니까?
          </h2>

          {/* 삭제할 링크 정보 (링크 이름 표시) */}
          <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/80 text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                삭제 대상 링크
              </span>
              {block.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                  {block.badge}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-white break-words">
              {block.title}
            </p>
            {block.url && (
              <p className="text-xs text-neutral-400 truncate flex items-center gap-1 font-mono">
                <LinkIcon className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{block.url}</span>
              </p>
            )}
            {block.updatedAt && (
              <p className="text-[10px] text-neutral-400/80 flex items-center gap-1 font-mono pt-0.5">
                <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                <span>최종 수정: {formatUpdatedAt(block.updatedAt)}</span>
              </p>
            )}
          </div>

          {/* 경고 문구: "이 작업은 되돌릴 수 없습니다" (빨간색) */}
          <p className="text-xs sm:text-sm text-red-500 font-medium flex items-center justify-center gap-1">
            <span>이 작업은 되돌릴 수 없습니다</span>
          </p>

          {/* 에러 발생 시 안내 배너 */}
          {deleteError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-left">
              <p className="font-semibold">삭제 실패</p>
              <p className="opacity-90">{deleteError}</p>
            </div>
          )}
        </div>

        {/* 하단 버튼 영역: [취소] [삭제하기] */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={!isDeleting ? onClose : undefined}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium cursor-pointer"
          >
            취소
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-rose-600 hover:bg-rose-500 active:scale-95 text-white transition-all shadow-lg shadow-rose-600/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>삭제하는 중...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>삭제하기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
