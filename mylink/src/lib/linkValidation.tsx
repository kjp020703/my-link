import React from "react";
import {
  Globe,
  Coffee,
  Download,
  Mail,
  BookOpen,
  Calendar,
  Heart,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import {
  GithubIcon,
  YoutubeIcon,
  TwitterXIcon,
  InstagramIcon,
} from "@/components/icons/BrandIcons";

// 아이콘 프리셋 목록
export const ICON_OPTIONS = [
  { id: "Globe", label: "웹사이트", icon: Globe },
  { id: "Youtube", label: "유튜브", icon: YoutubeIcon, isBrand: true },
  { id: "Github", label: "깃허브", icon: GithubIcon, isBrand: true },
  { id: "Instagram", label: "인스타그램", icon: InstagramIcon, isBrand: true },
  { id: "Twitter", label: "X/트위터", icon: TwitterXIcon, isBrand: true },
  { id: "Coffee", label: "커피챗", icon: Coffee },
  { id: "Download", label: "다운로드", icon: Download },
  { id: "Mail", label: "뉴스레터", icon: Mail },
  { id: "Book", label: "아티클", icon: BookOpen },
  { id: "Calendar", label: "예약/일정", icon: Calendar },
  { id: "Heart", label: "추천/후원", icon: Heart },
  { id: "Sparkles", label: "스페셜", icon: Sparkles },
];

// 추천 뱃지 프리셋
export const BADGE_PRESETS = [
  { label: "HOT 🔥", value: "HOT 🔥" },
  { label: "NEW ✨", value: "NEW ✨" },
  { label: "FREE 🎁", value: "FREE" },
  { label: "EVENT 🎉", value: "EVENT" },
  { label: "BEST ⭐", value: "BEST" },
];

// 샘플 썸네일 이미지
export const SAMPLE_THUMBNAILS = [
  {
    label: "개발/코드",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80",
  },
  {
    label: "디자인",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&auto=format&fit=crop&q=80",
  },
  {
    label: "유튜브/영상",
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&auto=format&fit=crop&q=80",
  },
];

// URL 유효성 검사 유틸리티 함수
export function validateUrlString(rawUrl: string): {
  valid: boolean;
  formattedUrl: string;
  error?: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { valid: false, formattedUrl: "", error: "링크 URL 주소를 입력해주세요." };
  }

  // 공백 포함 여부 확인
  if (/\s/.test(trimmed)) {
    return { valid: false, formattedUrl: "", error: "URL에는 공백을 포함할 수 없습니다." };
  }

  // 안전하지 않은 스키마 차단
  if (/^(javascript|data|vbscript):/i.test(trimmed)) {
    return { valid: false, formattedUrl: "", error: "보안상 안전하지 않은 URL 프로토콜입니다." };
  }

  let formatted = trimmed;
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = "https://" + formatted;
  }

  try {
    const parsed = new URL(formatted);
    // 도메인(hostname)에 마침표(.)가 없거나 비정상적인 형태 방지 (예: abc)
    if (!parsed.hostname.includes(".") || parsed.hostname.endsWith(".") || parsed.hostname.startsWith(".")) {
      return {
        valid: false,
        formattedUrl: formatted,
        error: "올바른 도메인 주소(예: example.com)를 입력해주세요.",
      };
    }
    return { valid: true, formattedUrl: formatted };
  } catch {
    return {
      valid: false,
      formattedUrl: formatted,
      error: "올바른 URL 형식(예: https://example.com)을 입력해주세요.",
    };
  }
}

// 썸네일 이미지 URL 유효성 검사
export function validateThumbnailUrl(rawUrl: string): { valid: boolean; error?: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) return { valid: true };

  let formatted = trimmed;
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = "https://" + formatted;
  }

  try {
    const parsed = new URL(formatted);
    if (!parsed.hostname.includes(".")) {
      return { valid: false, error: "올바른 이미지 URL(도메인 포함)을 입력해주세요." };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "올바른 URL 형식(https://...)을 입력해주세요." };
  }
}

export interface LinkValidationErrors {
  title?: string;
  url?: string;
  description?: string;
  badge?: string;
  thumbnailUrl?: string;
}

export interface LinkValidationResult {
  errors: LinkValidationErrors;
  isValid: boolean;
  formattedUrl: string;
}

/**
 * 추가 및 수정 시 공통으로 사용하는 전체 링크 입력 검증
 */
export function validateLinkInputs(data: {
  title: string;
  url: string;
  description?: string;
  badge?: string;
  thumbnailUrl?: string;
}): LinkValidationResult {
  const errors: LinkValidationErrors = {};

  // 1. 제목 검증 (필수, 2자 이상, 60자 이하)
  const trimmedTitle = (data.title || "").trim();
  if (!trimmedTitle) {
    errors.title = "링크 제목을 입력해주세요.";
  } else if (trimmedTitle.length < 2) {
    errors.title = "제목은 최소 2자 이상 입력해주세요.";
  } else if (trimmedTitle.length > 60) {
    errors.title = "제목은 최대 60자까지 입력 가능합니다.";
  }

  // 2. URL 검증 (필수)
  const urlResult = validateUrlString(data.url || "");
  if (!urlResult.valid) {
    errors.url = urlResult.error;
  }

  // 3. 서브 설명 검증 (최대 80자)
  if (data.description && data.description.length > 80) {
    errors.description = "설명은 최대 80자까지 입력 가능합니다.";
  }

  // 4. 뱃지 검증 (최대 15자)
  if (data.badge && data.badge.length > 15) {
    errors.badge = "뱃지는 최대 15자까지 입력 가능합니다.";
  }

  // 5. 썸네일 URL 검증
  const thumbResult = validateThumbnailUrl(data.thumbnailUrl || "");
  if (!thumbResult.valid) {
    errors.thumbnailUrl = thumbResult.error;
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    formattedUrl: urlResult.formattedUrl,
  };
}

/**
 * 아이콘 이름에 따른 컴포넌트 반환 헬퍼
 */
export function renderLinkIcon(iconName?: string) {
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
