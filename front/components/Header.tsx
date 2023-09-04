import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";

export default function Header() {
  const currentMenu = useSelector((state: RootState) => state.menu.menuId);
  return (
    <header>
      {currentMenu === process.env.NEXT_PUBLIC_BTN_LIST && (
          <div>헤더 보이기</div>
      )}
    </header>
  );
}
