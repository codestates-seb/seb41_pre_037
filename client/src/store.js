import create from "zustand";

const useSearchPopUpStore = create((set) => ({
  showPopUp: false,
  handlePopUp: () => set((state) => ({ showPopUp: !state.showPopUp })),
}));

const useLeftNavStore = create((set) => ({
  showLeftNav: false,
  handleLeftNav: () => set((state) => ({ showLeftNav: !state.showLeftNav })),
}));

export { useSearchPopUpStore, useLeftNavStore };
