import { getTimestampMillis } from "./firestoreLinks";

/**
 * 타임스탬프를 읽기 쉬운 형식으로 변환 (상대 시간 + 절대 시간)
 * 예: "방금 수정됨", "5분 전 수정됨", "2시간 전 수정됨", "2026.11.08 19:55 수정됨"
 */
export function formatUpdatedAt(val: any): string | null {
  const millis = getTimestampMillis(val);
  if (!millis || millis <= 0) return null;

  const date = new Date(millis);
  const now = Date.now();
  const diffSec = Math.floor((now - millis) / 1000);

  // 음수거나 1분 미만
  if (diffSec < 60) {
    return "방금 수정됨";
  }

  // 1시간 미만
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin}분 전 수정됨`;
  }

  // 24시간 미만
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour}시간 전 수정됨`;
  }

  // 7일 미만
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) {
    return `${diffDay}일 전 수정됨`;
  }

  // 절대 날짜 및 시간 포맷 (YYYY.MM.DD HH:mm)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes} 수정됨`;
}

/**
 * 절대 시간 상세 문자열 (툴팁용)
 * 예: "2026년 11월 8일 오후 7시 55분"
 */
export function formatFullDateTime(val: any): string | null {
  const millis = getTimestampMillis(val);
  if (!millis || millis <= 0) return null;

  const date = new Date(millis);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
