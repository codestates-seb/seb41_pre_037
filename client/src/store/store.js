import create from "zustand";

const useSearchPopUpStore = create((set) => ({
  showPopUp: false,
  handlePopUp: () => set((state) => ({ showPopUp: !state.showPopUp })),
}));

const useMobileSearchPopUpStore = create((set) => ({
  showMobilePopUp: false,
  handleMobilePopUp: () => set((state) => ({ showMobilePopUp: !state.showMobilePopUp })),
}));

const useLeftNavStore = create((set) => ({
  showLeftNav: false,
  handleLeftNav: () => set((state) => ({ showLeftNav: !state.showLeftNav })),
}));

const useShareSheetStore = create((set) => ({
  showShareSheet: false,
  handleShareSheet: () => set((state) => ({ showShareSheet: !state.showShareSheet })),
}));

export { useSearchPopUpStore, useLeftNavStore, useMobileSearchPopUpStore, useShareSheetStore };
