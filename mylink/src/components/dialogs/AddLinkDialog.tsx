"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { LinkBlock, MyLinkTheme } from "@/types";
import { LinkCard } from "@/components/blocks/LinkCard";
import {
  X,
  Plus,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  AlertCircle,
  HelpCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  validateLinkInputs,
  ICON_OPTIONS,
  BADGE_PRESETS,
  SAMPLE_THUMBNAILS,
} from "@/lib/linkValidation";

interface AddLinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => Promise<void> | void;
  currentTheme: MyLinkTheme;
}

export function AddLinkDialog({
  isOpen,
  onClose,
  onAdd,
  currentTheme,
}: AddLinkDialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Globe");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // 각 필드의 터치(포커스 아웃) 여부 상태
  const [touched, setTouched] = useState<{
    title?: boolean;
    url?: boolean;
    description?: boolean;
    badge?: boolean;
    thumbnailUrl?: boolean;
  }>({});

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 초기화 및 포커스, 바디 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
      // 리셋
      setTitle("");
      setUrl("");
      setDescription("");
      setBadge("");
      setSelectedIcon("Globe");
      setThumbnailUrl("");
      setTouched({});
      setSubmitAttempted(false);
      setIsSubmitting(false);
      setSubmitError(null);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 키 이벤트 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // 실시간 유효성 검사 계산 (Memoized)
  const validation = useMemo(() => {
    return validateLinkInputs({
      title,
      url,
      description,
      badge,
      thumbnailUrl,
    });
  }, [title, url, description, badge, thumbnailUrl]);

  if (!isOpen) return null;

  // 실시간 미리보기용 Mock Block
  const previewBlock: LinkBlock = {
    id: "preview-id",
    type: "link",
    enabled: true,
    order: 0,
    title: title.trim() || "링크 제목 미리보기",
    url: validation.formattedUrl || "https://example.com",
    description: description.trim() || undefined,
    badge: badge.trim() || undefined,
    icon: selectedIcon,
    thumbnailUrl:
      !validation.errors.thumbnailUrl && thumbnailUrl.trim()
        ? thumbnailUrl.trim()
        : undefined,
  };

  const handleBlur = (field: "title" | "url" | "description" | "badge" | "thumbnailUrl") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    if (!validation.isValid) {
      if (validation.errors.title) {
        titleInputRef.current?.focus();
      }
      return;
    }

    try {
      setIsSubmitting(true);
      await onAdd({
        title: title.trim(),
        url: validation.formattedUrl,
        description: description.trim() || undefined,
        badge: badge.trim() || undefined,
        icon: selectedIcon,
        thumbnailUrl: thumbnailUrl.trim() || undefined,
      });

      onClose();
    } catch (err: unknown) {
      console.error("Firestore 링크 추가 오류:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Firestore에 링크를 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 필드별 에러 표시 여부 (터치되었거나 폼 제출을 시도했을 때)
  const showTitleError = (touched.title || submitAttempted) && validation.errors.title;
  const showTitleSuccess = (touched.title || submitAttempted) && !validation.errors.title && title.trim().length >= 2;

  const showUrlError = (touched.url || submitAttempted) && validation.errors.url;
  const showUrlSuccess = (touched.url || submitAttempted) && !validation.errors.url && url.trim().length > 0;

  const showThumbError = (touched.thumbnailUrl || submitAttempted) && validation.errors.thumbnailUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={!isSubmitting ? onClose : undefined}
      />

      {/* 2. Dialog Modal Window */}
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 text-neutral-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 id="dialog-title" className="text-base font-bold text-white">
                새 링크 블록 추가
              </h2>
              <p className="text-xs text-neutral-400">
                프로필에 노출될 링크와 상세 정보를 입력해주세요.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={!isSubmitting ? onClose : undefined}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Firestore 저장 에러 안내 배너 */}
        {submitError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <div className="flex-1">
              <span className="font-semibold block text-rose-200">저장 중 오류 발생</span>
              <span className="opacity-90">{submitError}</span>
            </div>
          </div>
        )}

        {/* 모달 본문 (스크롤 가능 영역) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm custom-scrollbar">
          {/* 실시간 미리보기 카드 섹션 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                실시간 미리보기
              </span>
              <span className="text-[11px] text-neutral-500">현재 테마 스타일 적용됨</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 transition-all">
              <LinkCard block={previewBlock} theme={currentTheme} />
            </div>
          </div>

          <form id="add-link-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* 1. 링크 제목 (필수) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="link-title"
                  className="block text-xs font-semibold text-neutral-300"
                >
                  링크 제목 <span className="text-rose-400">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    title.length > 50
                      ? "text-amber-400"
                      : title.length > 60
                      ? "text-rose-400"
                      : "text-neutral-500"
                  }`}
                >
                  {title.length}/60자
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  id="link-title"
                  ref={titleInputRef}
                  type="text"
                  placeholder="예: 나의 포트폴리오 웹사이트, 신규 유튜브 채널"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => handleBlur("title")}
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-neutral-800/90 border transition-all text-white placeholder-neutral-500 focus:outline-none focus:ring-2 ${
                    showTitleError
                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20"
                      : showTitleSuccess
                      ? "border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/20"
                      : "border-neutral-700 focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                  maxLength={65}
                />
                <div className="absolute right-3 pointer-events-none flex items-center">
                  {showTitleError && <AlertCircle className="w-4 h-4 text-rose-400" />}
                  {showTitleSuccess && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
              </div>
              {showTitleError ? (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{validation.errors.title}</span>
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500">
                  방문자에게 표시될 대표 링크 이름입니다 (2자 이상).
                </p>
              )}
            </div>

            {/* 2. 링크 URL (필수) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="link-url"
                  className="block text-xs font-semibold text-neutral-300"
                >
                  연결할 웹 URL <span className="text-rose-400">*</span>
                </label>
                {validation.formattedUrl && validation.formattedUrl !== url.trim() && (
                  <span className="text-[11px] text-violet-400 truncate max-w-[200px]">
                    자동 보정: {validation.formattedUrl}
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
                <input
                  id="link-url"
                  type="text"
                  placeholder="https://example.com 또는 alexkim.dev"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onBlur={() => handleBlur("url")}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-800/90 border transition-all text-white placeholder-neutral-500 focus:outline-none focus:ring-2 ${
                    showUrlError
                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20"
                      : showUrlSuccess
                      ? "border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/20"
                      : "border-neutral-700 focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                />
                <div className="absolute right-3 pointer-events-none flex items-center">
                  {showUrlError && <AlertCircle className="w-4 h-4 text-rose-400" />}
                  {showUrlSuccess && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
              </div>
              {showUrlError ? (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{validation.errors.url}</span>
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-neutral-500" />
                  <span>http:// 가 없어도 자동으로 https:// 가 적용됩니다.</span>
                </p>
              )}
            </div>

            {/* 3. 서브 설명 / 부제 (선택) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="link-desc"
                  className="block text-xs font-semibold text-neutral-300"
                >
                  서브 설명 / 부제 <span className="text-neutral-500 font-normal">(선택)</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    description.length > 70
                      ? "text-amber-400"
                      : description.length > 80
                      ? "text-rose-400"
                      : "text-neutral-500"
                  }`}
                >
                  {description.length}/80자
                </span>
              </div>
              <input
                id="link-desc"
                type="text"
                placeholder="예: 최신 작업물과 케이스 스터디 보러가기"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
                maxLength={85}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-neutral-500 focus:outline-none transition-all"
              />
              {validation.errors.description && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{validation.errors.description}</span>
                </p>
              )}
            </div>

            {/* 4. 아이콘 선택 (선택) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-300">
                아이콘 선택 <span className="text-neutral-500 font-normal">(선택)</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {ICON_OPTIONS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedIcon === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedIcon(item.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-violet-600/30 border-violet-500 text-white shadow-sm ring-1 ring-violet-500"
                          : "bg-neutral-800/60 border-neutral-700/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      <IconComp className="w-4 h-4 mb-1" />
                      <span className="text-[10px] truncate max-w-full">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. 강조 뱃지 (선택) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="link-badge"
                  className="block text-xs font-semibold text-neutral-300"
                >
                  강조 뱃지 <span className="text-neutral-500 font-normal">(선택)</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-500">
                  {badge.length}/15자
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="link-badge"
                  type="text"
                  placeholder="예: HOT 🔥, NEW, FREE"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  onBlur={() => handleBlur("badge")}
                  maxLength={15}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-800/90 border border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-neutral-500 focus:outline-none transition-all"
                />
                {badge && (
                  <button
                    type="button"
                    onClick={() => setBadge("")}
                    className="text-xs text-neutral-400 hover:text-neutral-200 px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-colors"
                  >
                    지우기
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {BADGE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setBadge(preset.value)}
                    className={`px-2.5 py-1 rounded-full text-[11px] border transition-all cursor-pointer ${
                      badge === preset.value
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold"
                        : "bg-neutral-800/60 text-neutral-400 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {validation.errors.badge && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{validation.errors.badge}</span>
                </p>
              )}
            </div>

            {/* 6. 썸네일 이미지 URL (선택) */}
            <div className="space-y-1.5">
              <label
                htmlFor="link-thumb"
                className="block text-xs font-semibold text-neutral-300"
              >
                썸네일 이미지 URL <span className="text-neutral-500 font-normal">(선택)</span>
              </label>
              <div className="relative flex items-center">
                <ImageIcon className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
                <input
                  id="link-thumb"
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  onBlur={() => handleBlur("thumbnailUrl")}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-800/90 border transition-all text-white placeholder-neutral-500 focus:outline-none focus:ring-2 ${
                    showThumbError
                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20"
                      : "border-neutral-700 focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                />
                {thumbnailUrl && (
                  <button
                    type="button"
                    onClick={() => setThumbnailUrl("")}
                    className="absolute right-3 text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {showThumbError ? (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{validation.errors.thumbnailUrl}</span>
                </p>
              ) : (
                <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                  <span>샘플 이미지:</span>
                  {SAMPLE_THUMBNAILS.map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => {
                        setThumbnailUrl(sample.url);
                        setTouched((prev) => ({ ...prev, thumbnailUrl: true }));
                      }}
                      className="px-2 py-0.5 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/70 transition-colors cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* 모달 하단 푸터 (취소 및 추가 버튼) */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-between sticky bottom-0 z-10">
          <div className="text-[11px] text-neutral-400">
            {submitAttempted && !validation.isValid && (
              <span className="text-rose-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                입력 항목을 확인해주세요
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={!isSubmitting ? onClose : undefined}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              form="add-link-form"
              disabled={isSubmitting || (submitAttempted && !validation.isValid)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                isSubmitting || (submitAttempted && !validation.isValid)
                  ? "bg-neutral-700 text-neutral-400 cursor-not-allowed opacity-60 shadow-none"
                  : "bg-violet-600 hover:bg-violet-500 active:scale-95 text-white shadow-violet-600/30 cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Firestore에 저장 중...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>링크 추가하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
