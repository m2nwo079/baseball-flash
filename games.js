// games.js — 게임 매니페스트(레지스트리)
// 새 게임 추가 = 아래 배열에 항목 하나 추가 + 게임 HTML 파일을 레포에 올리기.
// 셸(portal.js)은 이 목록만 보고 히어로(대표 게임)와 그리드를 그립니다.
//
//   id        : 고유 문자열(영문/숫자/-)
//   title     : 화면에 보일 이름
//   desc      : 카드에 들어갈 한 줄 설명
//   blurb     : 히어로 배너에 들어갈 긴 설명(선택, 없으면 desc 사용)
//   tags      : 카드 태그(선택)
//   path      : 게임 HTML 경로(index.html 기준 상대경로)
//   accent    : 카드/히어로 강조 색(선택)
//   available : false면 "준비 중"으로 표시되고 클릭 불가
//   featured  : true면 히어로에 대표로 노출(없으면 첫 available 게임이 자동 대표)

export const GAMES = [
  {
    id: "homerun-derby",
    title: "홈런 더비",
    desc: "KBO 구단으로 즐기는 3D 홈런 더비.",
    blurb: "KBO 10개 구단으로 즐기는 3D 홈런 더비. 팀을 고르고 타이밍 맞춰 스윙해 담장을 넘기세요.",
    tags: ["스포츠", "3D"],
    path: "homerun-derby.html",
    accent: "#f6b53c",
    available: true,
    featured: true
  },
  {
    id: "battle",
    title: "빠따 브롤",
    desc: "오타니 vs 은가누. 방향키로 움직이며 싸우는 격투.",
    blurb: "한 화면 경기장에서 오타니의 빠따로 은가누를 쓰러뜨리는 횡스크롤 격투. 대시·강속구·이단점프·만루 필살기까지.",
    tags: ["배틀", "격투"],
    path: "battle.html",
    accent: "#e24b4a",
    available: true
  },
  // 아래 칸은 그리드가 비어 보이지 않도록 둔 자리표시자입니다.
  // 새 게임이 생기면 이 항목을 실제 게임으로 교체하거나 삭제하세요.
  { id: "coming-3", title: "세 번째 게임", desc: "다음 게임을 준비하고 있어요.", tags: [], path: "", accent: "#475569", available: false }
];
