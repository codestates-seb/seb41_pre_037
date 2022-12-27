import create from "zustand";

const useInputStore = create((set) => ({
  inputs: { email: "", password: "" },
  setInputs: (name, value) => set((state) => ({ inputs: { ...state.inputs, [name]: value } })),
}));

export default useInputStore;
