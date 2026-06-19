// games.js — 게임 매니페스트(레지스트리)
// 새 게임 추가 = 아래 배열에 항목 하나 추가 + 게임 HTML 파일을 레포에 올리기.
// 셸(portal.js)은 오직 이 목록만 보고 그리드와 로딩을 처리합니다.
//
//   id        : 고유 문자열(영문/숫자/-)
//   title     : 화면에 보일 이름
//   desc      : 한 줄 설명
//   tags      : 카드에 보일 태그(선택)
//   path      : 게임 HTML 경로(index.html 기준 상대경로)
//   accent    : 카드 강조 색(선택)
//   available : false면 "준비 중"으로 표시되고 클릭 불가

export const GAMES = [
  {
    id: "homerun-derby",
    title: "홈런 더비",
    desc: "KBO 10개 구단으로 즐기는 3D 홈런 더비. 팀을 고르고 타이밍 맞춰 스윙하세요.",
    tags: ["스포츠", "3D"],
    path: "homerun-derby.html",
    accent: "#f6b53c",
    available: true
  }
];
