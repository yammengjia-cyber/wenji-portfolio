const intro = document.getElementById("intro");
const diceShell = document.getElementById("diceShell");
const diceCore = document.getElementById("diceCore");
const introInfo = document.getElementById("introInfo");
const mainContent = document.getElementById("mainContent");

const baseFaceTransforms = [
  "rotateY(0deg) translateZ(44px)",
  "rotateY(180deg) translateZ(44px)",
  "rotateY(90deg) translateZ(44px)",
  "rotateY(-90deg) translateZ(44px)",
  "rotateX(90deg) translateZ(44px)",
  "rotateX(-90deg) translateZ(44px)",
];

const rollSteps = [
  { x: 860, y: 420, rx: -20, ry: 0 },
  { x: 700, y: 344, rx: 10, ry: -90 },
  { x: 560, y: 280, rx: 80, ry: -90 },
  { x: 430, y: 220, rx: 80, ry: -180 },
  { x: 310, y: 164, rx: 150, ry: -180 },
  { x: 206, y: 112, rx: 150, ry: -270 },
  { x: 118, y: 64, rx: 230, ry: -270 },
  { x: 52, y: 30, rx: 230, ry: -360 },
  { x: 0, y: 0, rx: 310, ry: -360 },
];

const rollDurations = [260, 300, 340, 390, 440, 500, 560, 640, 760];

function setPhase(phaseName) {
  intro.classList.remove("phase-rolling", "phase-settle", "phase-unfold", "phase-enlarge", "phase-reflow");
  intro.classList.add(phaseName);
}

function setStep(step, duration = 380) {
  diceShell.style.transition = `transform ${duration}ms cubic-bezier(0.16, 0.82, 0.2, 1)`;
  diceCore.style.transition = `transform ${duration}ms cubic-bezier(0.16, 0.82, 0.2, 1)`;
  diceShell.style.transform = `translate3d(${step.x}px, ${step.y}px, 0) rotateX(14deg) rotateZ(-14deg)`;
  diceCore.style.transform = `rotateX(${step.rx}deg) rotateY(${step.ry}deg)`;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setupInitialFaces() {
  const faces = diceCore.querySelectorAll(".dice-face");
  faces.forEach((face, idx) => {
    face.style.transform = baseFaceTransforms[idx];
    face.style.transformOrigin = "center center";
  });
}

function setFoldedHingeFaces() {
  const faces = diceCore.querySelectorAll(".dice-face");
  if (faces.length !== 6) return;

  faces[0].style.transformOrigin = "center center";
  faces[0].style.transform = "translate3d(0, 0, 0)";

  faces[2].style.transformOrigin = "left center";
  faces[2].style.transform = "translate3d(88px, 0, 0) rotateY(-90deg)";

  faces[3].style.transformOrigin = "right center";
  faces[3].style.transform = "translate3d(-88px, 0, 0) rotateY(90deg)";

  faces[5].style.transformOrigin = "top center";
  faces[5].style.transform = "translate3d(0, 88px, 0) rotateX(-90deg)";

  faces[1].style.transformOrigin = "top center";
  faces[1].style.transform = "translate3d(0, 176px, 0) rotateX(-180deg)";

  faces[4].style.transformOrigin = "bottom center";
  faces[4].style.transform = "translate3d(0, -88px, 0) rotateX(90deg)";
}

async function playIntro() {
  setupInitialFaces();
  setPhase("phase-rolling");

  // rolling: 按 90 度翻滚+位移同步
  for (let i = 0; i < rollSteps.length; i += 1) {
    const duration = rollDurations[i] ?? 520;
    setStep(rollSteps[i], duration);
    await wait(duration + 50);
  }

  // settle
  setPhase("phase-settle");
  diceShell.classList.add("is-settle");
  await wait(360);
  diceShell.classList.remove("is-settle");

  // unfold
  setPhase("phase-unfold");
  setFoldedHingeFaces();
  await wait(80);
  diceCore.classList.add("is-unfold");
  diceCore.style.transition = "transform 820ms cubic-bezier(0.22, 0.72, 0.2, 1)";
  diceCore.style.transform = "rotateX(34deg) rotateY(-22deg)";
  await wait(980);

  // seed: 文字先贴在平面上，避免突兀出现
  introInfo.classList.add("is-seed");
  await wait(620);

  // enlargeInfo
  setPhase("phase-enlarge");
  diceCore.style.transition = "transform 720ms cubic-bezier(0.23, 0.7, 0.2, 1)";
  diceCore.style.transform = "rotateX(18deg) rotateY(-10deg)";
  introInfo.classList.add("is-enlarge");
  await wait(900);

  // reflowInfo
  setPhase("phase-reflow");
  diceCore.style.transition = "transform 680ms ease";
  diceCore.style.transform = "rotateX(0deg) rotateY(0deg)";
  introInfo.classList.add("is-reflow");
  await wait(1000);

  // revealMain (auto)
  mainContent.classList.remove("is-hidden");
  intro.classList.add("is-exit");
  await wait(760);
  intro.remove();
}

playIntro();
