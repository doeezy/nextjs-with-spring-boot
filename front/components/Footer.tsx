import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";

export default function Footer() {
  const currentMenu = useSelector((state: RootState) => state.menu.menuId);

  return (
    <footer>
      {currentMenu === process.env.NEXT_PUBLIC_BTN_LIST && (
        <div>
        </div>
      )}
    </footer>
  );
}
