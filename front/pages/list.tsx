import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";

type ContentsObj = {
  title: string;
  singer?: string;
  album?: string;
  url: string;
  section?: SectionObj[];
};

type SectionObj = {
  point: string;
  name: string;
};

function ListPage() {
  const currentMenu = useSelector((state: RootState) => state.menu.menuId);
  const currentBtn = useSelector((state: RootState) => state.menu.button);
  const currentConTime = useSelector((state: RootState) => state.menu.conTime);

  const router = useRouter();
  const { type } = router.query;

  const videoRef = useRef<any>(null);
  const [listHeight, setListHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // react-player option
  const [playState, setPlayState] = useState({
    width: "100%",
    height: "100%",
    playing: true,
    muted: false,
    controls: false,
    volume: 1,
    light: false,
    pip: false
  });
  // 페이지 정보
  const [page, setPage] = useState({
    pageNm: "",
    pageTy: ""
  });
  // 선택된 콘텐츠
  const [contents, setContents] = useState<ContentsObj>({
    title: "",
    singer: "",
    album: "",
    url: "",
    section: []
  });
  const [contentsIdx, setContentsIdx] = useState({
    idx: 0,
    lastIdx: 0
  });
  // 메뉴1 영상 목록
  const playGroundList = [
    {
      title: "새천년건강체조",
      url: "https://youtu.be/s6qi8dbyHVM",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "챕터1" },
        { point: "02:30", name: "챕터2" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "플레이리스트",
      url: "https://youtu.be/dBD54EZIrZo",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "챕터1" },
        { point: "02:30", name: "챕터2" },
        { point: "03:30", name: "마무리" }
      ]
    }
  ];
  // 메뉴2 영상 목록
  const streamingList = [
    {
      title: "2023-05-30",
      url: "http://192.168.101.44:9980/hls/obs_stream.m3u8"
    },
    { title: "2023-05-31", url: "https://youtu.be/S2AAFahNo_Y" },
    { title: "2023-06-01", url: "https://youtu.be/2QgmWsKy4Mo" }
  ];
  // 메뉴3 영상 목록
  const songList = [
    {
      title: "test",
      singer: "뉴진스",
      album: "Hype boy",
      url: "/video/sample1.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "test2",
      singer: "뉴진스",
      album: "Hype boy",
      url: "/video/sample3.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "test3",
      singer: "악뮤",
      album: "test album",
      url: "/video/sample44.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "test4",
      singer: "홍길동",
      album: "test album",
      url: "/video/sample55.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "test5",
      singer: "김길동",
      album: "test album",
      url: "/video/sample55.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "test6",
      singer: "망고",
      album: "test album",
      url: "/video/sample55.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    },
    {
      title: "test7",
      singer: "김이박",
      album: "test album",
      url: "/video/sample55.mp4",
      section: [
        { point: "00:30", name: "인트로" },
        { point: "01:00", name: "1절 시작" },
        { point: "02:30", name: "2절 시작" },
        { point: "03:30", name: "마무리" }
      ]
    }
  ];
  // 선택된 영상 구간
  const [section, setSection] = useState({
    idx: -1,
    lastIdx: 0
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    if (currentMenu === process.env.NEXT_PUBLIC_BTN_LIST) {
      return;
    }
    if (currentBtn !== "") {
      setPlayControl();
    }
  }, [currentConTime]);

  useEffect(() => {
    if (
      type === process.env.NEXT_PUBLIC_BTN_PLAYGRD ||
      currentMenu === process.env.NEXT_PUBLIC_BTN_PLAYGRD
    ) {
      setPage({
        pageNm: "메뉴1",
        pageTy: "PL"
      });
      setContentsIdx({ idx: 0, lastIdx: playGroundList.length - 1 });
      setContents(_.head(playGroundList));
      setSection({
        ...section,
        lastIdx: _.head(playGroundList).section.length - 1
      });
    } else if (
      type === process.env.NEXT_PUBLIC_BTN_SONG ||
      currentMenu === process.env.NEXT_PUBLIC_BTN_SONG
    ) {
      setPage({
        pageNm: "메뉴2",
        pageTy: "SO"
      });
      setContentsIdx({ idx: 0, lastIdx: songList.length - 1 });
      setContents(_.head(songList));
      setSection({
        ...section,
        lastIdx: _.head(songList).section.length - 1
      });
    } else if (
      type === process.env.NEXT_PUBLIC_BTN_STUDIO ||
      currentMenu === process.env.NEXT_PUBLIC_BTN_STUDIO
    ) {
      setPage({
        pageNm: "메뉴3",
        pageTy: "ST"
      });
      setContentsIdx({ idx: 0, lastIdx: streamingList.length - 1 });
      setContents(_.head(streamingList));
    }
  }, [type, currentMenu]);

  function setPlayControl() {
    // 재생
    if (currentBtn === process.env.NEXT_PUBLIC_BTN_PLAY) {
      setPlayState({ ...playState, playing: !playState.playing });
    } else if (currentBtn === process.env.NEXT_PUBLIC_BTN_STOP) {
      // 정지
      setPlayState({ ...playState, playing: false });
    } else if (
      currentBtn === process.env.NEXT_PUBLIC_BTN_SKIP_PRV ||
      currentBtn === process.env.NEXT_PUBLIC_BTN_SKIP_NXT
    ) {
      skipClicked(currentBtn === process.env.NEXT_PUBLIC_BTN_SKIP_PRV);
    } else {
      btnClicked();
    }
  }

  function skipClicked(prev: boolean) {
    let findIdx = prev ? section.idx - 1 : section.idx + 1;

    if (findIdx < 0 && videoRef.current != null) {
      videoRef.current.seekTo(0);
      return;
    } else if (findIdx > section.lastIdx) {
      return;
    }

    setSection({ ...section, idx: findIdx });
    let sectionPoint = "";
    if (contents.section !== undefined) {
      sectionPoint = contents.section[findIdx].point;
    }

    let sectionSplit = sectionPoint.split(":");
    const times =
      parseFloat(sectionSplit[0]) * 60 + parseFloat(sectionSplit[1]);

    if (videoRef.current != null) {
      videoRef.current.seekTo(times);
    }
  }

  function btnClicked() {
    let findIdx = 0;
    const isPrev = currentBtn === process.env.NEXT_PUBLIC_BTN_PREV;
    if (isPrev) {
      // 이전
      findIdx = contentsIdx.idx - 1 < 0 ? 0 : contentsIdx.idx - 1;
    } else if (!isPrev) {
      // 다음
      findIdx =
        contentsIdx.idx + 1 > contentsIdx.lastIdx
          ? contentsIdx.idx
          : contentsIdx.idx + 1;
    }

    setContentsIdx({ ...contentsIdx, idx: findIdx });
    const el = document.getElementById(`focus${findIdx}`);

    if (el === null) {
      return;
    }

    // contents list를 감싼 div의 높이값
    const wrapperEl = document.getElementById("contents-list-wrapper");
    if (wrapperEl != null) {
      const wrapperHeight =
        listHeight === 0 ? wrapperEl.offsetHeight : listHeight;
      const focusPosition = el.offsetHeight * (findIdx + 1);

      if (
        (isPrev && focusPosition <= wrapperHeight + focusPosition) ||
        (!isPrev && focusPosition >= wrapperHeight)
      ) {
        el.scrollIntoView();
        setListHeight(() => {
          return wrapperEl.offsetHeight + focusPosition;
        });
      }
    }
    // click event 강제 발생
    el.dispatchEvent(new Event("click", { bubbles: true }));
  }

  function selectContents(params: ContentsObj) {
    setContents(params);
    setPlayState({ ...playState, volume: 0 });
    // 노래교실일 경우 section 정보 추가
    if (page.pageTy === "SO" && params.section !== undefined) {
      setSection({ ...section, lastIdx: params.section?.length - 1 });
    }

    playingAfter();
  }

  function playingAfter() {
    setPlayState((playState) => {
      return { ...playState, playing: false };
    });
    // 5초후 재생
    setTimeout(() => {
      setPlayState((playState) => {
        return { ...playState, playing: true };
      });
      // 재생시간 처음으로
      if (videoRef.current != null) {
        videoRef.current.seekTo(0);
      }
    }, 5000);
  }

  const contentsListRender = () => {
    if (page.pageTy === "PL") {
      return (
        <ul>
          {playGroundList.map((s: ContentsObj, idx: number) => (
            <li
              key={`play_${s.title}`}
              onClick={() => selectContents(s)}
              className={contentsIdx.idx === idx ? "active" : ""}
              id={`focus${idx}`}
            >
              <a>
                <div className="">
                  <dl>
                    <dt className="subject">
                      <p
                        className={
                          "track" +
                          (s.title.length > 5 ? " long_title" : " short_title")
                        }
                      >
                        {s.title}
                      </p>
                    </dt>
                  </dl>
                </div>
              </a>
            </li>
          ))}
        </ul>
      );
    } else if (page.pageTy === "SO") {
      return (
        <ul>
          {songList.map((s: ContentsObj, idx: number) => (
            <li
              key={`stream_${s.title}`}
              onClick={() => selectContents(s)}
              className={contentsIdx.idx === idx ? "active" : ""}
              id={`focus${idx}`}
            >
              <a>
                <div className="">
                  <dl>
                    <dt className="subject">
                      <p
                        className={
                          "track" +
                          (s.title.length > 5 ? " long_title" : " short_title")
                        }
                      >
                        {s.title}
                      </p>
                    </dt>
                    <dd className="name">{s.singer}</dd>
                    <dd className="album">{s.album}</dd>
                  </dl>
                </div>
              </a>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul>
          {streamingList.map((s: ContentsObj, idx: number) => (
            <li
              key={`stream_${s.title}`}
              onClick={() => selectContents(s)}
              className={contentsIdx.idx === idx ? "active" : ""}
              id={`focus${idx}`}
            >
              <a>
                <div className="">
                  <dl>
                    <dt className="subject">
                      <p
                        className={
                          "track" +
                          (s.title.length > 5 ? " long_title" : " short_title")
                        }
                      >
                        {s.title}
                      </p>
                    </dt>
                  </dl>
                </div>
              </a>
            </li>
          ))}
        </ul>
      );
    }
  };

  if (isLoading) return <div>로딩중입니다.</div>;

  return (
    <main className="main-sub">
      <div className="lnb lnb-song">
        <h2>
          <span>{page.pageNm}</span>
        </h2>
        <div className="list" id="contents-list-wrapper">
          {contentsListRender()}
        </div>
      </div>
      <div className="main-container">
        <div className="video">
          <ReactPlayer
            ref={videoRef}
            id="reactPlayer"
            className="react-player"
            width={playState.width}
            height={playState.height}
            url={contents.url} // 플레이어 url
            playing={playState.playing} // 자동 재생 on
            muted={playState.muted} // 자동 재생 on
            controls={playState.controls} // 플레이어 컨트롤 노출 여부
            volume={playState.volume}
            light={playState.light} // 플레이어 모드
            pip={playState.pip} // pip 모드 설정 여부
          />
        </div>
      </div>
    </main>
  );
}

export default ListPage;
