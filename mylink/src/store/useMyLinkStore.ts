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
