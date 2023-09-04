import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/redux/store";

type MenuState = {
  menuId: string;
  button: string;
  conTime: string;
};

const initialState = {
  menuId: "M-1",
  button: "",
  conTime: ""
} as MenuState;

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    setMenuClick: (
      state: MenuState,
      action: PayloadAction<{ menuId: string; conTime: string }>
    ) => {
      return {
        menuId: action.payload.menuId,
        button: "", // 메뉴변경시 버튼 컨트롤 초기화
        conTime: action.payload.conTime
      };
    },
    setMenuButtons: (
      state: MenuState,
      action: PayloadAction<{ button: string; conTime: string }>
    ) => {
      return {
        menuId: state.menuId,
        button: action.payload.button,
        conTime: action.payload.conTime
      };
    }
  }
});

// actions
export const { setMenuClick, setMenuButtons } = menuSlice.actions;

export default menuSlice.reducer;
