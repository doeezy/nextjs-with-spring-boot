import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDisPatch, RootState } from "@/store/redux/store";
import { setMenuClick } from "@/store/redux/features/menu-slice";

type MenuObj = {
  kor_name: string;
  class_name: string;
  id: string;
};

export default function Main() {
  const dispatch = useDispatch<AppDisPatch>();

  const currentMenu = useSelector((state: RootState) => state.menu.menuId);
  const currentBtn = useSelector((state: RootState) => state.menu.button);
  const currentConTime = useSelector((state: RootState) => state.menu.conTime);

  const menuList: Array<MenuObj> = [
    {
      kor_name: "메뉴1",
      class_name: "live",
      id: process.env.NEXT_PUBLIC_BTN_STUDIO as string
    },
    {
      kor_name: "메뉴2",
      class_name: "song",
      id: process.env.NEXT_PUBLIC_BTN_SONG as string
    },
    {
      kor_name: "메뉴3",
      class_name: "play",
      id: process.env.NEXT_PUBLIC_BTN_PLAYGRD as string
    }
  ];
  const [menu, setMenu] = useState(() => {
    return { idx: 0, lastIdx: menuList.length - 1, ...menuList[0] };
  });

  useEffect(() => {
    if (currentMenu != process.env.NEXT_PUBLIC_BTN_LIST) {
      return;
    } else {
      btnClicked();
    }
  }, [currentConTime]);

  function btnClicked() {
    if (currentBtn === process.env.NEXT_PUBLIC_BTN_CONFIRM) {
      confirmMenu();
    } else {
      controlMenu();
    }
  }

  // 메뉴 컨트롤
  function controlMenu() {
    let findIdx = 0;
    if (currentBtn === process.env.NEXT_PUBLIC_BTN_PREV) {
      // 이전
      findIdx = menu.idx - 1 < 0 ? 0 : menu.idx - 1;
    } else if (currentBtn === process.env.NEXT_PUBLIC_BTN_NEXT) {
      // 다음
      findIdx = menu.idx + 1 > menu.lastIdx ? 0 : menu.idx + 1;
    }

    const sMenu = menuList[findIdx];

    setMenu((menu) => {
      return { ...menu, ...sMenu, idx: findIdx };
    });
  }

  // 메뉴 선택
  function confirmMenu() {
    dispatch(
      setMenuClick({
        menuId: menu.id,
        conTime: String(new Date())
      })
    );
  }

  return (
    <main>
      <div className="main-container">
        <div className="main-menu">
          <ul>
            {menuList.map((m: MenuObj, idx: number) => (
              <li
                className={menu.idx === idx ? "active" : ""}
                key={`menuLink_${idx}`}
                id={`menu${idx}`}
              >
                <div className={m.class_name}>
                  <a>
                    <span>{m.kor_name}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
