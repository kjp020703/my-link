import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Block, LinkBlock, MyLinkProfile, MyLinkTheme, MyLinkStoreData } from "../types";
import { defaultMockData } from "../mockData";
import {
  addLinkToFirestore,
  deleteLinkFromFirestore,
  updateLinkInFirestore,
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
}

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set, get) => ({
      ...defaultMockData,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      resetToDefault: () => {
        set({
          profile: { ...defaultMockData.profile },
          theme: { ...defaultMockData.theme },
          blocks: [...defaultMockData.blocks],
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
            ? Math.max(...currentBlocks.map((b) => b.order)) + 1
            : 1;

        // Firestore에 링크 문서 추가
        const newBlock = await addLinkToFirestore(data, nextOrder);

        // 로컬 상태 동기화 (중복 방지)
        set((state) => {
          const exists = state.blocks.some((b) => b.id === newBlock.id);
          if (exists) {
            return {
              blocks: state.blocks.map((b) =>
                b.id === newBlock.id ? newBlock : b
              ),
            };
          }
          return {
            blocks: [...state.blocks, newBlock].sort((a, b) => a.order - b.order),
          };
        });

        return newBlock;
      },

      // Firestore에서 조회한 최신 링크 목록을 로컬 상태와 병합
      syncFirestoreLinks: (firestoreLinks) => {
        set((state) => {
          if (!firestoreLinks) return state;

          // mock 블록(blk-로 시작) 중 firestoreLinks와 ID가 겹치지 않는 기본 블록들 유지
          const baseBlocks = state.blocks.filter(
            (b) => b.id.startsWith("blk-") && !firestoreLinks.some((fl) => fl.id === b.id)
          );

          // 기본 블록들과 Firestore 링크들을 합쳐서 order 순서대로 정렬
          const merged = [...baseBlocks, ...firestoreLinks].sort(
            (a, b) => a.order - b.order
          );

          return { blocks: merged };
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
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? ({ ...b, ...updatedBlock } as Block) : b
          ),
        }));

        if (!id.startsWith("blk-") && updatedBlock.type === "link") {
          updateLinkInFirestore(id, updatedBlock).catch((err) => {
            console.warn(`Firestore 링크 수정 동기화 실패 (id: ${id}):`, err);
          });
        }
      },
    }),
    {
      name: "mylink-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
