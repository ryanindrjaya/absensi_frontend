import { atom } from "recoil";

const loadingState = atom({
    key: "loadingState",
    default: {
        loadingBackdrop: false,
        loadingPage: false,
    }
});

export default loadingState;