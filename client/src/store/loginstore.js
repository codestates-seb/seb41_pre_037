import create from "zustand";

const useErrorMessageStore = create((set) => ({
  errorMessage: "",
  setErrorMessage: (messageContent) => set(() => ({ errorMessage: messageContent })),
}));

const useIsLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (loginstate) => set(() => ({ isLogin: loginstate })),
}));

export { useErrorMessageStore, useIsLoginStore };
