import {
  collection,
  doc,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { LinkBlock } from "../types";

// Firestore 저장 경로: users/anonymous/links
export const FIRESTORE_LINKS_PATH = "users/anonymous/links";

export interface CreateLinkInput {
  title: string;
  url: string;
  description?: string;
  badge?: string;
  icon?: string;
  thumbnailUrl?: string;
  order?: number;
}

export interface UpdateLinkInput {
  title?: string;
  url?: string;
  description?: string;
  badge?: string;
  icon?: string;
  thumbnailUrl?: string;
  enabled?: boolean;
  order?: number;
}

/**
 * Firestore 객체에서 undefined 값을 제거하는 유틸리티
 */
function sanitizeForFirestore<T extends Record<string, any>>(data: T): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * 다양한 형태의 타임스탬프 값을 밀리초(number)로 변환하는 유틸리티
 */
export function getTimestampMillis(val: any): number {
  if (!val) return 0;
  if (typeof val.toMillis === "function") {
    return val.toMillis();
  }
  if (typeof val.toDate === "function") {
    return val.toDate().getTime();
  }
  if (val instanceof Date) {
    return val.getTime();
  }
  if (typeof val.seconds === "number") {
    return val.seconds * 1000 + Math.floor((val.nanoseconds || 0) / 1000000);
  }
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    const parsed = Date.parse(val);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * 링크 목록을 createdAt 기준 최신순(내림차순)으로 정렬
 */
export function sortLinksByCreatedAtDesc<T extends { createdAt?: any; order?: number }>(
  links: T[]
): T[] {
  return [...links].sort((a, b) => {
    const timeA = getTimestampMillis(a.createdAt);
    const timeB = getTimestampMillis(b.createdAt);
    if (timeA !== timeB) {
      return timeB - timeA; // 최신순 (내림차순)
    }
    return (b.order || 0) - (a.order || 0);
  });
}

/**
 * Firestore DocumentData를 LinkBlock 타입으로 변환
 */
export function convertDocToLinkBlock(id: string, data: DocumentData): LinkBlock {
  return {
    id,
    type: "link",
    title: data.title || "",
    url: data.url || "",
    enabled: typeof data.enabled === "boolean" ? data.enabled : true,
    order: typeof data.order === "number" ? data.order : 1,
    description: data.description || undefined,
    badge: data.badge || undefined,
    icon: data.icon || undefined,
    thumbnailUrl: data.thumbnailUrl || undefined,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * 새로운 링크를 Firestore (users/anonymous/links) 컬렉션에 추가
 */
export async function addLinkToFirestore(
  input: CreateLinkInput,
  currentMaxOrder: number = 0
): Promise<LinkBlock> {
  const linksCol = collection(db, "users", "anonymous", "links");

  const order = typeof input.order === "number" ? input.order : currentMaxOrder + 1;

  const rawData = {
    type: "link",
    title: input.title.trim(),
    url: input.url.trim(),
    enabled: true,
    order,
    description: input.description?.trim() || undefined,
    badge: input.badge?.trim() || undefined,
    icon: input.icon || undefined,
    thumbnailUrl: input.thumbnailUrl?.trim() || undefined,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const payload = sanitizeForFirestore(rawData);
  const docRef = await addDoc(linksCol, payload);

  return {
    id: docRef.id,
    type: "link",
    title: rawData.title,
    url: rawData.url,
    enabled: true,
    order,
    description: rawData.description,
    badge: rawData.badge,
    icon: rawData.icon,
    thumbnailUrl: rawData.thumbnailUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Firestore (users/anonymous/links) 컬렉션의 링크 목록 조회 (createdAt 최신순 정렬)
 */
export async function getLinksFromFirestore(): Promise<LinkBlock[]> {
  try {
    const linksCol = collection(db, "users", "anonymous", "links");
    const q = query(linksCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const links: LinkBlock[] = [];
    snapshot.forEach((docSnap) => {
      links.push(
        convertDocToLinkBlock(
          docSnap.id,
          docSnap.data({ serverTimestamps: "estimate" })
        )
      );
    });

    return sortLinksByCreatedAtDesc(links);
  } catch (error) {
    console.error("Firestore 링크 목록 조회 실패 (orderBy createdAt):", error);
    // fallback: order 쿼리 또는 기본 조회 후 수동 정렬
    try {
      const linksCol = collection(db, "users", "anonymous", "links");
      const snapshot = await getDocs(linksCol);
      const links: LinkBlock[] = [];
      snapshot.forEach((docSnap) => {
        links.push(
          convertDocToLinkBlock(
            docSnap.id,
            docSnap.data({ serverTimestamps: "estimate" })
          )
        );
      });
      return sortLinksByCreatedAtDesc(links);
    } catch (fallbackError) {
      console.error("Firestore fallback 링크 목록 조회 실패:", fallbackError);
      throw fallbackError;
    }
  }
}

/**
 * Firestore (users/anonymous/links) 실시간 구독 (onSnapshot, createdAt 최신순 정렬)
 */
export function subscribeLinksFromFirestore(
  onUpdate: (links: LinkBlock[]) => void,
  onError?: (error: Error) => void
): () => void {
  const linksCol = collection(db, "users", "anonymous", "links");
  const q = query(linksCol, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const links: LinkBlock[] = [];
      snapshot.forEach((docSnap) => {
        links.push(
          convertDocToLinkBlock(
            docSnap.id,
            docSnap.data({ serverTimestamps: "estimate" })
          )
        );
      });
      const sorted = sortLinksByCreatedAtDesc(links);
      onUpdate(sorted);
    },
    (error) => {
      console.error("Firestore 실시간 링크 구독 오류 (createdAt 쿼리):", error);
      // fallback: 전체 컬렉션 구독 후 수동 정렬
      const fallbackUnsub = onSnapshot(
        linksCol,
        (fallbackSnap) => {
          const links: LinkBlock[] = [];
          fallbackSnap.forEach((docSnap) => {
            links.push(
              convertDocToLinkBlock(
                docSnap.id,
                docSnap.data({ serverTimestamps: "estimate" })
              )
            );
          });
          onUpdate(sortLinksByCreatedAtDesc(links));
        },
        (fallbackErr) => {
          if (onError) onError(fallbackErr);
        }
      );
      return fallbackUnsub;
    }
  );
}

/**
 * Firestore 링크 삭제
 */
export async function deleteLinkFromFirestore(id: string): Promise<void> {
  try {
    const linkDocRef = doc(db, "users", "anonymous", "links", id);
    await deleteDoc(linkDocRef);
  } catch (error) {
    console.error(`Firestore 링크 삭제 실패 (id: ${id}):`, error);
    throw error;
  }
}

/**
 * Firestore 링크 정보 수정
 */
export async function updateLinkInFirestore(
  id: string,
  updates: UpdateLinkInput
): Promise<void> {
  try {
    const linkDocRef = doc(db, "users", "anonymous", "links", id);
    const payload = sanitizeForFirestore({
      ...updates,
      updatedAt: serverTimestamp(),
    });
    await updateDoc(linkDocRef, payload);
  } catch (error) {
    console.error(`Firestore 링크 수정 실패 (id: ${id}):`, error);
    throw error;
  }
}
