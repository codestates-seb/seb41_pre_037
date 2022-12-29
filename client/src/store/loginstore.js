import create from "zustand";
import { persist } from "zustand/middleware";

const useInputStore = create((set) => ({
  inputs: { username: "", password: "" },
  setInputs: (name, value) => set((state) => ({ inputs: { ...state.inputs, [name]: value } })),
}));

const useErrorMessageStore = create((set) => ({
  errorMessage: "",
  setErrorMessage: (messageContent) => set(() => ({ errorMessage: messageContent })),
}));

const useIsLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (loginstate) => set(() => ({ isLogin: loginstate })),
}));

const useUserInfoStore = create((set) => ({
  userInfo: null,
  setUserInfo: (data) => set(() => ({ userInfo: data })),
}));

export { useInputStore, useErrorMessageStore, useIsLoginStore, useUserInfoStore };
