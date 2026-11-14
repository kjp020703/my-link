"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { LinkBlock, MyLinkTheme } from "@/types";
import {
  validateLinkInputs,
  ICON_OPTIONS,
  BADGE_PRESETS,
  SAMPLE_THUMBNAILS,
} from "@/lib/linkValidation";
import {
  X,
  Check,
  Link as LinkIcon,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Pencil,
} from "lucide-react";
import { formatUpdatedAt } from "@/lib/dateUtils";

interface InlineLinkEditProps {
  block: LinkBlock;
  theme: MyLinkTheme;
  onSave: (updates: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export function InlineLinkEdit({
  block,
  theme,
  onSave,
  onCancel,
}: InlineLinkEditProps) {
  const [title, setTitle] = useState(block.title || "");
  const [url, setUrl] = useState(block.url || "");
  const [description, setDescription] = useState(block.description || "");
  const [badge, setBadge] = useState(block.badge || "");
  const [selectedIcon, setSelectedIcon] = useState(block.icon || "Globe");
  const [thumbnailUrl, setThumbnailUrl] = useState(block.thumbnailUrl || "");

  const [touched, setTouched] = useState<{
    title?: boolean;
    url?: boolean;
    description?: boolean;
    badge?: boolean;
    thumbnailUrl?: boolean;
  }>({});

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 인라인 편집 진입 시 제목 인풋에 포커스
    titleInputRef.current?.focus();
  }, []);

  // 추가할 때와 완전히 동일한 검증 로직 적용
  const validation = useMemo(() => {
    return validateLinkInputs({
      title,
      url,
      description,
      badge,
      thumbnailUrl,
    });
  }, [title, url, description, badge, thumbnailUrl]);

  const handleBlur = (field: "title" | "url" | "description" | "badge" | "thumbnailUrl") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setSaveError(null);

    if (!validation.isValid) {
      if (validation.errors.title) {
        titleInputRef.current?.focus();
      }
      return;
    }

    try {
      setIsSaving(true);
      await onSave({
        title: title.trim(),
        url: validation.formattedUrl,
        description: description.trim() || undefined,
        badge: badge.trim() || undefined,
        icon: selectedIcon,
        thumbnailUrl: thumbnailUrl.trim() || undefined,
      });
      onCancel(); // 성공 시 편집 닫기
    } catch (err: unknown) {
      console.error("Firestore 링크 수정 오류:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Firebase에 링크를 수정하는 중 오류가 발생했습니다. 다시 시도해주세요.";
      setSaveError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const showTitleError = (touched.title || submitAttempted) && validation.errors.title;
  const showTitleSuccess = (touched.title || submitAttempted) && !validation.errors.title && title.trim().length >= 2;

  const showUrlError = (touched.url || submitAttempted) && validation.errors.url;
  const showUrlSuccess = (touched.url || submitAttempted) && !validation.errors.url && url.trim().length > 0;

  const showThumbError = (touched.thumbnailUrl || submitAttempted) && validation.errors.thumbnailUrl;

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-neutral-900/95 border-2 border-violet-500/80 shadow-2xl backdrop-blur-md text-neutral-100 transition-all animate-in fade-in duration-200">
      {/* 인라인 에디터 헤더 */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
            <Pencil className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">링크 인라인 수정</h3>
            <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 flex-wrap">
              <span>수정된 내용은 즉시 Firebase에 반영됩니다.</span>
              {block.updatedAt && (
                <span className="text-[10px] text-violet-300 font-mono">
                  ({formatUpdatedAt(block.updatedAt)})
                </span>
              )}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={!isSaving ? onCancel : undefined}
          disabled={isSaving}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-40 cursor-pointer"
          title="편집 취소"
          aria-label="편집 취소"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 에러 배너 */}
      {saveError && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <div className="flex-1">
            <span className="font-semibold block text-rose-200">수정 실패</span>
            <span>{saveError}</span>
          </div>
        </div>
      )}

      {/* 인라인 수정 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* 1. 링크 제목 (필수) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-neutral-300">
              링크 제목 <span className="text-rose-400">*</span>
            </label>
            <span
              className={`text-[10px] font-mono ${
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
              ref={titleInputRef}
              type="text"
              placeholder="링크 제목 (2자 이상)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleBlur("title")}
              maxLength={65}
              className={`w-full px-3 py-2 pr-9 rounded-xl bg-neutral-800/90 border text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                showTitleError
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20"
                  : showTitleSuccess
                  ? "border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/20"
                  : "border-neutral-700 focus:border-violet-500 focus:ring-violet-500/20"
              }`}
            />
            <div className="absolute right-2.5 pointer-events-none flex items-center">
              {showTitleError && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
              {showTitleSuccess && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
          </div>
          {showTitleError && (
            <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{validation.errors.title}</span>
            </p>
          )}
        </div>

        {/* 2. 링크 URL (필수) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-neutral-300">
              연결할 웹 URL <span className="text-rose-400">*</span>
            </label>
            {validation.formattedUrl && validation.formattedUrl !== url.trim() && (
              <span className="text-[10px] text-violet-400 truncate max-w-[180px]">
                보정: {validation.formattedUrl}
              </span>
            )}
          </div>
          <div className="relative flex items-center">
            <LinkIcon className="w-3.5 h-3.5 text-neutral-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => handleBlur("url")}
              className={`w-full pl-9 pr-9 py-2 rounded-xl bg-neutral-800/90 border text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                showUrlError
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20"
                  : showUrlSuccess
                  ? "border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/20"
                  : "border-neutral-700 focus:border-violet-500 focus:ring-violet-500/20"
              }`}
            />
            <div className="absolute right-2.5 pointer-events-none flex items-center">
              {showUrlError && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
              {showUrlSuccess && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
          </div>
          {showUrlError && (
            <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{validation.errors.url}</span>
            </p>
          )}
        </div>

        {/* 3. 서브 설명 / 부제 (선택) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-neutral-300">
              서브 설명 <span className="text-neutral-500 font-normal">(선택)</span>
            </label>
            <span className="text-[10px] font-mono text-neutral-500">
              {description.length}/80자
            </span>
          </div>
          <input
            type="text"
            placeholder="상세 설명 또는 부제"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => handleBlur("description")}
            maxLength={85}
            className="w-full px-3 py-2 rounded-xl bg-neutral-800/90 border border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-all"
          />
          {validation.errors.description && (
            <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{validation.errors.description}</span>
            </p>
          )}
        </div>

        {/* 4. 아이콘 선택 (선택) */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-300">
            아이콘 선택
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-28 overflow-y-auto custom-scrollbar p-1 rounded-xl bg-neutral-950/40 border border-neutral-800">
            {ICON_OPTIONS.map((item) => {
              const IconComp = item.icon;
              const isSelected = selectedIcon === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIcon(item.id)}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                    isSelected
                      ? "bg-violet-600/30 border-violet-500 text-white shadow-sm ring-1 ring-violet-500"
                      : "bg-neutral-800/60 border-neutral-700/60 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 mb-0.5" />
                  <span className="text-[9px] truncate max-w-full">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. 뱃지 (선택) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-neutral-300">
              강조 뱃지 <span className="text-neutral-500 font-normal">(선택)</span>
            </label>
            <span className="text-[10px] font-mono text-neutral-500">
              {badge.length}/15자
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="예: HOT, NEW, FREE"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              onBlur={() => handleBlur("badge")}
              maxLength={15}
              className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-800/90 border border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all"
            />
            {badge && (
              <button
                type="button"
                onClick={() => setBadge("")}
                className="text-[11px] text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-colors"
              >
                지우기
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {BADGE_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setBadge(preset.value)}
                className={`px-2 py-0.5 rounded-full text-[10px] border transition-all cursor-pointer ${
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
            <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{validation.errors.badge}</span>
            </p>
          )}
        </div>

        {/* 6. 썸네일 이미지 URL (선택) */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-300">
            썸네일 이미지 URL <span className="text-neutral-500 font-normal">(선택)</span>
          </label>
          <div className="relative flex items-center">
            <ImageIcon className="w-3.5 h-3.5 text-neutral-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              onBlur={() => handleBlur("thumbnailUrl")}
              className={`w-full pl-9 pr-8 py-2 rounded-xl bg-neutral-800/90 border text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                showThumbError
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-neutral-700 focus:border-violet-500 focus:ring-violet-500/20"
              }`}
            />
            {thumbnailUrl && (
              <button
                type="button"
                onClick={() => setThumbnailUrl("")}
                className="absolute right-2.5 text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          {showThumbError ? (
            <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{validation.errors.thumbnailUrl}</span>
            </p>
          ) : (
            <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-neutral-400">
              <span>샘플:</span>
              {SAMPLE_THUMBNAILS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => {
                    setThumbnailUrl(sample.url);
                    setTouched((prev) => ({ ...prev, thumbnailUrl: true }));
                  }}
                  className="px-1.5 py-0.5 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/70 transition-colors cursor-pointer"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 폼 하단 액션 버튼 */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-800">
          <button
            type="button"
            onClick={!isSaving ? onCancel : undefined}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-40 cursor-pointer"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSaving || (submitAttempted && !validation.isValid)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md ${
              isSaving || (submitAttempted && !validation.isValid)
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed opacity-60 shadow-none"
                : "bg-violet-600 hover:bg-violet-500 active:scale-95 text-white shadow-violet-600/30 cursor-pointer"
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>저장 중...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>저장하기</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
