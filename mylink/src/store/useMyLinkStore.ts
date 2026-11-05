import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Block, MyLinkProfile, MyLinkTheme, MyLinkStoreData } from "../types";
import { defaultMockData } from "../mockData";

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
  }) => void;
  deleteBlock: (id: string) => void;
  updateBlock: (id: string, updatedBlock: Partial<Block>) => void;
}

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set) => ({
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
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, enabled: !b.enabled } : b
          ),
        }));
      },

      addBlock: (block) => {
        set((state) => ({
          blocks: [...state.blocks, block],
        }));
      },

      addLinkBlock: (data) => {
        set((state) => {
          const nextOrder =
            state.blocks.length > 0
              ? Math.max(...state.blocks.map((b) => b.order)) + 1
              : 1;
          const newBlock: Block = {
            id: `blk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            type: "link",
            enabled: true,
            order: nextOrder,
            title: data.title,
            url: data.url,
            description: data.description,
            badge: data.badge,
            icon: data.icon,
            thumbnailUrl: data.thumbnailUrl,
          };
          return {
            blocks: [...state.blocks, newBlock],
          };
        });
      },

      deleteBlock: (id) => {
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id),
        }));
      },

      updateBlock: (id, updatedBlock) => {
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? ({ ...b, ...updatedBlock } as Block) : b
          ),
        }));
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
