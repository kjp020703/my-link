import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Block, LinkBlock, MyLinkProfile, MyLinkTheme, MyLinkStoreData } from "../types";
import { defaultMockData } from "../mockData";
import {
  addLinkToFirestore,
  deleteLinkFromFirestore,
  updateLinkInFirestore,
  sortLinksByCreatedAtDesc,
  UpdateLinkInput,
} from "@/lib/firestoreLinks";

export interface MyLinkState extends MyLinkStoreData {
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  // 액션들
  resetToDefault: () => void;
  setProfile: (profile: Partial<MyLinkProfile>) => void;
  setTheme: (theme: Partial<MyLinkTheme>) => void;
  toggleBlock: (id: string) => void;
  addBlock: (block: Block) => void;
  addLinkBlock: (data: {
    title: string;
    url: string;
    description?: string;
    badge?: string;
    icon?: string;
    thumbnailUrl?: string;
  }) => Promise<LinkBlock>;
  syncFirestoreLinks: (firestoreLinks: LinkBlock[]) => void;
  deleteBlock: (id: string) => void;
  updateBlock: (id: string, updatedBlock: Partial<Block>) => void;
  updateLinkBlock: (id: string, updates: UpdateLinkInput) => Promise<void>;
  deleteLinkBlock: (id: string) => Promise<void>;
}

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set, get) => ({
      ...defaultMockData,
      blocks: [], // Firestore (users/anonymous/links)에서 로드된 링크들이 저장됨
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      resetToDefault: () => {
        set({
          profile: { ...defaultMockData.profile },
          theme: { ...defaultMockData.theme },
        });
      },

      setProfile: (newProfile) => {
        set((state) => ({
          profile: { ...state.profile, ...newProfile },
        }));
      },

      setTheme: (newTheme) => {
        set((state) => ({
          theme: { ...state.theme, ...newTheme },
        }));
      },

      toggleBlock: (id) => {
        const block = get().blocks.find((b) => b.id === id);
        if (!block) return;
        const newEnabled = !block.enabled;

        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, enabled: newEnabled } : b
          ),
        }));

        // Firestore에 저장된 링크인 경우 enabled 속성 동기화
        if (!id.startsWith("blk-") && block.type === "link") {
          updateLinkInFirestore(id, { enabled: newEnabled }).catch((err) => {
            console.warn(`Firestore 링크 활성화 상태 동기화 실패 (id: ${id}):`, err);
          });
        }
      },

      addBlock: (block) => {
        set((state) => ({
          blocks: [...state.blocks, block],
        }));
      },

      // Firestore (users/anonymous/links) 컬렉션에 영속화
      addLinkBlock: async (data) => {
        const currentBlocks = get().blocks;
        const nextOrder =
          currentBlocks.length > 0
            ? Math.max(...currentBlocks.map((b) => b.order || 0)) + 1
            : 1;

        // Firestore에 링크 문서 추가
        const newBlock = await addLinkToFirestore(data, nextOrder);

        // 로컬 상태 즉각 동기화 (createdAt 기준 최신순 정렬)
        set((state) => {
          const exists = state.blocks.some((b) => b.id === newBlock.id);
          const updated = exists
            ? state.blocks.map((b) => (b.id === newBlock.id ? newBlock : b))
            : [newBlock, ...state.blocks];
          return {
            blocks: sortLinksByCreatedAtDesc(updated as LinkBlock[]),
          };
        });

        return newBlock;
      },

      // Firestore에서 조회한 최신 링크 목록을 로컬 상태와 동기화 (createdAt 최신순 정렬)
      syncFirestoreLinks: (firestoreLinks) => {
        set(() => {
          if (!firestoreLinks || firestoreLinks.length === 0) {
            return { blocks: [] };
          }
          return { blocks: sortLinksByCreatedAtDesc(firestoreLinks) };
        });
      },

      deleteBlock: (id) => {
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id),
        }));

        // Firestore에 저장된 링크라면 Firestore에서도 삭제 시도
        if (!id.startsWith("blk-")) {
          deleteLinkFromFirestore(id).catch((err) => {
            console.warn(`Firestore 링크 삭제 실패 (id: ${id}):`, err);
          });
        }
      },

      updateBlock: (id, updatedBlock) => {
        const block = get().blocks.find((b) => b.id === id);
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? ({ ...b, ...updatedBlock } as Block) : b
          ),
        }));

        if (!id.startsWith("blk-") && (block?.type === "link" || updatedBlock.type === "link")) {
          updateLinkInFirestore(id, updatedBlock as UpdateLinkInput).catch((err) => {
            console.warn(`Firestore 링크 수정 동기화 실패 (id: ${id}):`, err);
          });
        }
      },

      // Firestore 연동 링크 수정 비동기 액션
      updateLinkBlock: async (id: string, updates: UpdateLinkInput) => {
        // Firestore에 업데이트 반영
        await updateLinkInFirestore(id, updates);

        // 로컬 상태 동기화
        set((state) => ({
          blocks: state.blocks.map((b) => {
            if (b.id === id) {
              return {
                ...b,
                ...updates,
                updatedAt: new Date(),
              } as Block;
            }
            return b;
          }),
        }));
      },

      // Firestore 연동 링크 삭제 비동기 액션
      deleteLinkBlock: async (id: string) => {
        // Firestore에서 삭제
        await deleteLinkFromFirestore(id);

        // 로컬 상태 동기화
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: "mylink-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
