// import create from "zustand";

// const useInputStore = create((set) => ({
//   inputs: { email: "", password: "" },
//   setInputs: (name, value) => set((state) => ({ inputs: { ...state.inputs, [name]: value } })),
// }));

// const [inputsEmptyCheck, setinputsEmptyCheck] = useState({ email: false, password: false });

// const onEmptyCheck = () => {
//   if (inputs.email.length <= 0 && inputs.password.length <= 0) {
//     setinputsEmptyCheck({ email: true, password: true });
//   } else if (inputs.email.length <= 0 && inputs.password.length > 0) {
//     setinputsEmptyCheck({ email: true, password: false });
//   } else if (inputs.email.length > 0 && inputs.password.length <= 0) {
//     setinputsEmptyCheck({ email: false, password: true });
//   } else {
//     setinputsEmptyCheck({ email: false, password: false });
//   }
// };

// const useInputsEmptyCheckStore = create((set) => ({
//   inputsEmptyCheck: { email: false, password: false },
//   setinputsEmptyCheck: (emailLength, passwordLength) => set((state) => ({inputsEmptyCheck: }))
// }))

// export default useInputStore;
