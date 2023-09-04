import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDisPatch, RootState } from "@/store/redux/store";
import {
  setMenuButtons,
  setMenuClick
} from "@/store/redux/features/menu-slice";
import { useRouter } from "next/router";

let client: any;
let logs = [] as any;

export default function Socket() {
  const router = useRouter();
  const dispatch = useDispatch<AppDisPatch>();
  const currentMenu = useSelector((state: RootState) => state.menu.menuId);

  // 소켓 연결
  useEffect(() => {
    connectSocket();
  }, []);

  // 메뉴 버튼 클릭시 메뉴 이동
  useEffect(() => {
    console.log("currentMenu >> ", currentMenu);
    if (currentMenu === process.env.NEXT_PUBLIC_BTN_LIST) {
      router.push("/");
    } else {
      router.push(`/list?type=${currentMenu}`);
    }
  }, [currentMenu]);

  function connectSocket() {
    let socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_SOCKET_PREFIX}`
    );
    client = Stomp.over(socket);

    client.connect(
      {},
      (frame: any) => {
        console.log("_app 소켓 연결 성공", frame);
        client.subscribe("/sub", (res: any) => {
          const message = JSON.parse(res.body);
          logs.push(message);
          console.log("_app logs > ", logs);

          const splitBtn = message.btn.split("-");
          if (splitBtn[0] === "M") {
            dispatch(
              setMenuClick({
                menuId: message.btn,
                conTime: message.conTime
              })
            );
          } else {
            dispatch(
              setMenuButtons({
                button: message.btn,
                conTime: message.conTime
              })
            );
          }
        });
      },
      (error: any) => {
        console.log("소켓 연결 실패", error);
      }
    );
  }

  return <div></div>;
}
