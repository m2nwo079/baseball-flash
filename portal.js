// portal.js — 포털 셸 로직(진입점)
// 책임: 매니페스트로 그리드 렌더 → 게임 선택 시 iframe 로드 → 전체화면/나가기.
// 랭킹은 각 게임이 자체적으로 처리합니다(홈런 더비는 내부 Firebase 랭킹 사용).

import { GAMES } from "./games.js";

const $ = (id) => document.getElementById(id);
const grid = $("grid");
const player = $("player");
const frameHost = $("frameHost");
const playerTitle = $("playerTitle");

let activeFrame = null;
let activeGame = null;

renderGrid();

function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderGrid() {
  grid.innerHTML = "";
  for (const g of GAMES) {
    const card = document.createElement("article");
    card.className = "card" + (g.available ? "" : " card--soon");
    card.style.setProperty("--accent", g.accent || "#7c8cff");
    const tags = (g.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    card.innerHTML = `
      <div class="card__top">
        <h3 class="card__title">${escapeHtml(g.title)}</h3>
        <div class="card__tags">${tags}</div>
      </div>
      <p class="card__desc">${escapeHtml(g.desc)}</p>
      <div class="card__foot"><div class="card__actions"></div></div>`;
    const actions = card.querySelector(".card__actions");
    if (g.available) {
      actions.appendChild(btn("플레이", "btn btn--play", () => openGame(g)));
    } else {
      const soon = document.createElement("span");
      soon.className = "soon-label";
      soon.textContent = "준비 중";
      actions.appendChild(soon);
    }
    grid.appendChild(card);
  }
}

function btn(label, cls, onClick) {
  const b = document.createElement("button");
  b.className = cls; b.textContent = label; b.addEventListener("click", onClick);
  return b;
}

function openGame(g) {
  activeGame = g;
  playerTitle.textContent = g.title;
  const f = document.createElement("iframe");
  f.src = g.path;
  f.title = g.title;
  f.className = "frame";
  f.setAttribute("allow", "fullscreen; autoplay; gamepad");
  f.setAttribute("allowfullscreen", "");
  frameHost.innerHTML = "";
  frameHost.appendChild(f);
  activeFrame = f;
  player.hidden = false;
  document.body.classList.add("is-playing");
}

function closeGame() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  frameHost.innerHTML = "";   // iframe 파기 → WebGL/오디오 자원 즉시 해제
  activeFrame = null; activeGame = null;
  player.hidden = true;
  document.body.classList.remove("is-playing");
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else if (player.requestFullscreen) player.requestFullscreen().catch(() => {});
}

// 게임이 셸에 종료를 요청하면 처리(현재 게임은 사용하지 않아도 무방).
window.addEventListener("message", (e) => {
  if (!activeFrame || e.source !== activeFrame.contentWindow) return;
  if (e.origin !== location.origin) return;
  const msg = e.data;
  if (msg && typeof msg === "object" && msg.type === "bbflash:exit") closeGame();
});

$("exitBtn").addEventListener("click", closeGame);
$("fsBtn").addEventListener("click", toggleFullscreen);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !player.hidden && !document.fullscreenElement) closeGame();
});
