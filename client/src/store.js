import create from "zustand";

const useStore = create((set) => ({
  popUp: false,
  handlePopUp: () => set((state) => ({ popUp: !state.popUp })),
}));

export default useStore;
