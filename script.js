/* =========================================================
   ARAL AI — Vanilla JS Learning Platform Prototype
   ---------------------------------------------------------
   Core curriculum is standardized by grade. The AI layer
   personalizes support, practice, feedback, and retry paths.
   Replace AIEngine methods with real API/ML calls in future.
   ========================================================= */

"use strict";

/* ------------------------- Configuration ------------------------- */

const CONFIG = Object.freeze({
  masteryThreshold: 80,              // Change this to configure adaptive practice.
  maxAssessmentQuestions: 10,
  storageKey: "aralAIStateV1",
  sessionKey: "aralAISessionV1",
  useSpeechRecognition: true,
  analysisDelay: 650
});

/* ------------------------- Standardized Curriculum ------------------------- */
/* Students selecting the same grade receive the same core material. */

const gradeContent = {
  grade1: {
    label: "Grade 1",
    description: "Foundational reading, numbers, words, and simple ideas.",
    activitiesCount: 9,
    reading: {
      title: "The Little Garden",
      time: "2–3 min",
      passage:
        "Mia has a little garden beside her home. Every morning, she waters the plants before she goes to school. One day, she sees a small yellow flower. She is happy because she planted its seed many days ago. Mia tells her brother that plants need water, sunlight, and care. Together, they keep the garden clean."
    },
    comprehension: [
      { q: "Where is Mia's garden?", choices: ["Beside her home", "Inside her classroom", "Near the river", "At the market"], answer: 0 },
      { q: "What does Mia do every morning?", choices: ["She plays outside.", "She waters the plants.", "She buys flowers.", "She cleans her room."], answer: 1 },
      { q: "What color is the flower?", choices: ["Blue", "Red", "Yellow", "Purple"], answer: 2 },
      { q: "What did Mia plant many days ago?", choices: ["A tree", "A seed", "A fruit", "A leaf"], answer: 1 },
      { q: "What do plants need?", choices: ["Water, sunlight, and care", "Only toys", "Only food", "Music and books"], answer: 0 }
    ],
    activities: {
      math: [
        { q: "What is 3 + 2?", choices: ["4", "5", "6", "7"], answer: 1 },
        { q: "Which number comes after 7?", choices: ["6", "8", "9", "5"], answer: 1 },
        { q: "What is 5 - 2?", choices: ["2", "3", "4", "7"], answer: 1 }
      ],
      filipino: [
        { q: "Alin ang kasingkahulugan ng 'masaya'?", choices: ["Malungkot", "Magalak", "Galit", "Pagod"], answer: 1 },
        { q: "Alin ang tamang pangungusap?", choices: ["Si Ana ay nagbabasa.", "Nagbabasa Ana si.", "Ay Ana nagbabasa si.", "Si nagbabasa ay Ana."], answer: 0 },
        { q: "Ano ang unang letra ng salitang 'bahay'?", choices: ["b", "h", "a", "y"], answer: 0 }
      ],
      english: [
        { q: "Which word names a color?", choices: ["Run", "Yellow", "Jump", "Eat"], answer: 1 },
        { q: "Choose the correct sentence.", choices: ["She are happy.", "She is happy.", "She am happy.", "She be happy."], answer: 1 },
        { q: "What is the opposite of 'big'?", choices: ["Tall", "Small", "Long", "Wide"], answer: 1 }
      ]
    }
  },
  grade2: {
    label: "Grade 2",
    description: "Build reading fluency, comprehension, vocabulary, and basic problem solving.",
    activitiesCount: 9,
    reading: {
      title: "A Rainy School Day",
      time: "3–4 min",
      passage:
        "Rain fell early on Monday morning. Carlo packed his umbrella before leaving for school. When he arrived, he saw that the school garden looked fresh and bright. His teacher asked the class why plants looked healthier after the rain. Carlo answered that plants receive water from the rain. During recess, the rain stopped, so the children played a quiet indoor game."
    },
    comprehension: [
      { q: "When did the rain begin?", choices: ["Monday morning", "Friday afternoon", "Sunday night", "Tuesday morning"], answer: 0 },
      { q: "What did Carlo bring?", choices: ["A ball", "An umbrella", "A book bag only", "A raincoat for his teacher"], answer: 1 },
      { q: "How did the school garden look?", choices: ["Dry and dusty", "Dark and empty", "Fresh and bright", "Broken"], answer: 2 },
      { q: "Why did Carlo say plants became healthier?", choices: ["They received rain water.", "They received toys.", "They stayed indoors.", "They received new pots."], answer: 0 },
      { q: "What did the children do during recess?", choices: ["They went swimming.", "They played an indoor game.", "They planted trees.", "They went home."], answer: 1 }
    ],
    activities: {
      math: [
        { q: "What is 24 + 15?", choices: ["29", "39", "49", "35"], answer: 1 },
        { q: "What is 40 - 17?", choices: ["21", "22", "23", "24"], answer: 2 },
        { q: "Which number is even?", choices: ["13", "17", "21", "28"], answer: 3 }
      ],
      filipino: [
        { q: "Ano ang kasingkahulugan ng 'mabilis'?", choices: ["Mabagal", "Matulin", "Tahimik", "Maliit"], answer: 1 },
        { q: "Alin ang pangngalan?", choices: ["Tumakbo", "Maganda", "Guro", "Mabilis"], answer: 2 },
        { q: "Ano ang kabaligtaran ng 'mataas'?", choices: ["Malaki", "Mababa", "Mahaba", "Malawak"], answer: 1 }
      ],
      english: [
        { q: "Choose the noun.", choices: ["School", "Quickly", "Run", "Happy"], answer: 0 },
        { q: "Choose the correct plural.", choices: ["bookes", "books", "book's", "book"], answer: 1 },
        { q: "Which word means the opposite of 'early'?", choices: ["Soon", "Late", "Fast", "First"], answer: 1 }
      ]
    }
  },
  grade3: {
    label: "Grade 3",
    description: "Strengthen reading comprehension, vocabulary, grammar, and multi-step thinking.",
    activitiesCount: 9,
    reading: {
      title: "The Helpful Class",
      time: "3–4 min",
      passage:
        "The students in Room 4 noticed that their reading corner was becoming messy. Instead of waiting for someone else to clean it, they made a simple plan. Ana arranged the books by topic, Ben wiped the shelves, and Lito labeled the boxes. Their teacher praised the class for working together. The students learned that a small task becomes easier when everyone shares responsibility."
    },
    comprehension: [
      { q: "What problem did the students notice?", choices: ["The classroom was too cold.", "The reading corner was messy.", "The books were missing.", "The teacher was late."], answer: 1 },
      { q: "What did Ana do?", choices: ["She labeled boxes.", "She wiped shelves.", "She arranged books.", "She watered plants."], answer: 2 },
      { q: "What did Lito do?", choices: ["He labeled boxes.", "He arranged books.", "He read a story.", "He closed the room."], answer: 0 },
      { q: "Why did the teacher praise the class?", choices: ["They finished early.", "They worked together.", "They brought new books.", "They played quietly."], answer: 1 },
      { q: "What lesson did the students learn?", choices: ["Tasks are easier when responsibility is shared.", "Reading corners should be closed.", "Only teachers can clean.", "Labels are unnecessary."], answer: 0 }
    ],
    activities: {
      math: [
        { q: "What is 36 ÷ 4?", choices: ["7", "8", "9", "10"], answer: 2 },
        { q: "What is 7 × 6?", choices: ["36", "42", "48", "56"], answer: 1 },
        { q: "Which fraction is equal to one half?", choices: ["1/3", "2/4", "3/5", "4/6"], answer: 1 }
      ],
      filipino: [
        { q: "Ano ang pangunahing ideya ng isang talata?", choices: ["Pinakamaliit na detalye", "Pangunahing mensahe", "Pamagat lamang", "Huling salita"], answer: 1 },
        { q: "Alin ang pandiwa?", choices: ["Masaya", "Bahay", "Tumalon", "Mabait"], answer: 2 },
        { q: "Ano ang kasalungat ng 'maayos'?", choices: ["Maganda", "Magulo", "Malinis", "Tahimik"], answer: 1 }
      ],
      english: [
        { q: "Which sentence uses the past tense?", choices: ["I walk home.", "I walked home.", "I am walking home.", "I will walk home."], answer: 1 },
        { q: "Which word is an adjective?", choices: ["Beautiful", "Run", "School", "Quickly"], answer: 0 },
        { q: "What is the main idea of a paragraph?", choices: ["The central message", "One spelling word", "The last punctuation mark", "A random detail"], answer: 0 }
      ]
    }
  },
  grade4: {
    label: "Grade 4",
    description: "Develop deeper comprehension, vocabulary, grammar, and practical problem solving.",
    activitiesCount: 9,
    reading: {
      title: "Why Trees Matter",
      time: "4–5 min",
      passage:
        "Trees provide many benefits to communities. Their leaves help shade people and buildings, while their roots help hold soil in place. Trees can also provide homes for birds and insects. In cities, planting trees can make public spaces more pleasant. Caring for trees requires regular watering, protection, and responsible use of the land around them."
    },
    comprehension: [
      { q: "What do tree leaves help provide?", choices: ["Shade", "Plastic", "Noise", "Buildings"], answer: 0 },
      { q: "How do roots help?", choices: ["They make roads.", "They hold soil in place.", "They remove birds.", "They create buildings."], answer: 1 },
      { q: "Which animals may live in trees?", choices: ["Only fish", "Birds and insects", "Only dogs", "Only humans"], answer: 1 },
      { q: "How can trees improve cities?", choices: ["By making public spaces more pleasant", "By removing roads", "By stopping all rain", "By making buildings smaller"], answer: 0 },
      { q: "Which action supports tree care?", choices: ["Breaking branches", "Wasting water", "Regular watering", "Damaging roots"], answer: 2 }
    ],
    activities: {
      math: [
        { q: "What is 125 × 4?", choices: ["400", "450", "500", "550"], answer: 2 },
        { q: "What is 3/4 + 1/4?", choices: ["1/2", "1", "2/4", "3/8"], answer: 1 },
        { q: "A book costs ₱80. You pay ₱100. What is the change?", choices: ["₱10", "₱15", "₱20", "₱25"], answer: 2 }
      ],
      filipino: [
        { q: "Ano ang layunin ng pangunahing ideya?", choices: ["Ipaliwanag ang sentrong mensahe", "Magbigay ng isang titik", "Tanggalin ang detalye", "Palitan ang paksa"], answer: 0 },
        { q: "Alin ang pang-uri?", choices: ["Mabilis", "Tumakbo", "Guro", "Kahapon"], answer: 0 },
        { q: "Alin ang nagpapakita ng sanhi?", choices: ["Dahil umulan, nabasa ang lupa.", "Maganda ang bulaklak.", "Nagbasa siya.", "Pumunta kami roon."], answer: 0 }
      ],
      english: [
        { q: "Which word is a conjunction?", choices: ["And", "Quickly", "Beautiful", "Teacher"], answer: 0 },
        { q: "Choose the correct sentence.", choices: ["They was ready.", "They were ready.", "They is ready.", "They be ready."], answer: 1 },
        { q: "What does 'responsible' mean?", choices: ["Careless", "Able to be trusted with duties", "Very noisy", "Unable to decide"], answer: 1 }
      ]
    }
  },
  grade5: {
    label: "Grade 5",
    description: "Build stronger inference, vocabulary, language, and mathematical reasoning.",
    activitiesCount: 9,
    reading: {
      title: "The Community Library",
      time: "4–5 min",
      passage:
        "A small community library opened near the town plaza. At first, only a few children visited because they did not know what the library offered. The librarian began a weekly storytelling hour and invited students to recommend books. Soon, more families started visiting. The library became a place where children could read, ask questions, and discover new interests. Its success showed how shared community spaces can encourage learning."
    },
    comprehension: [
      { q: "Why did only a few children initially visit?", choices: ["The library had no books.", "They did not know what it offered.", "It was always closed.", "It was far away."], answer: 1 },
      { q: "What weekly event did the librarian start?", choices: ["A sports contest", "A storytelling hour", "A cooking class", "A music show"], answer: 1 },
      { q: "What did students recommend?", choices: ["Books", "Food", "Games", "Buildings"], answer: 0 },
      { q: "What did the library become?", choices: ["A place for learning and discovering interests", "A store", "A playground only", "A private office"], answer: 0 },
      { q: "What can be inferred about community spaces?", choices: ["They can encourage learning.", "They always replace schools.", "They should be used only by adults.", "They discourage reading."], answer: 0 }
    ],
    activities: {
      math: [
        { q: "What is 25% of 200?", choices: ["25", "40", "50", "75"], answer: 2 },
        { q: "A rectangle is 8 cm long and 5 cm wide. What is its area?", choices: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"], answer: 2 },
        { q: "What is 2.5 + 1.75?", choices: ["3.25", "4.25", "4.75", "5.25"], answer: 1 }
      ],
      filipino: [
        { q: "Ano ang hinuha?", choices: ["Konklusyong batay sa pahiwatig", "Direktang kopya", "Pamagat", "Isang letra"], answer: 0 },
        { q: "Alin ang pang-abay?", choices: ["Mabilis", "Mabilis na tumakbo", "Mesa", "Maganda"], answer: 1 },
        { q: "Ano ang kasingkahulugan ng 'mahalaga'?", choices: ["Walang saysay", "Importante", "Maliit", "Mabagal"], answer: 1 }
      ],
      english: [
        { q: "What is an inference?", choices: ["A conclusion based on clues", "A title only", "A spelling mark", "A copied sentence"], answer: 0 },
        { q: "Which is an adverb?", choices: ["Carefully", "Careful", "Care", "Caring"], answer: 0 },
        { q: "Choose the best transition: 'I studied hard; ___, I felt prepared.'", choices: ["however", "therefore", "although", "instead"], answer: 1 }
      ]
    }
  },
  grade6: {
    label: "Grade 6",
    description: "Practice higher-order comprehension, reasoning, academic vocabulary, and communication.",
    activitiesCount: 9,
    reading: {
      title: "Learning Through Questions",
      time: "5–6 min",
      passage:
        "Learning does not always begin with an answer. Often, it begins with a useful question. When students ask why something happens, they become more active participants in learning. A good question can lead to observation, research, discussion, and testing of ideas. This process helps students distinguish evidence from assumptions. Learning through questions also encourages curiosity because students see that uncertainty can be the beginning of discovery."
    },
    comprehension: [
      { q: "According to the passage, what can begin learning?", choices: ["A useful question", "A final answer", "A long test", "A classroom rule"], answer: 0 },
      { q: "What can a good question lead to?", choices: ["Observation and research", "Less curiosity", "Fewer ideas", "Avoiding evidence"], answer: 0 },
      { q: "Why is evidence important?", choices: ["It helps distinguish evidence from assumptions.", "It removes all questions.", "It makes discussion unnecessary.", "It replaces observation."], answer: 0 },
      { q: "What attitude does questioning encourage?", choices: ["Curiosity", "Carelessness", "Silence", "Avoidance"], answer: 0 },
      { q: "What is the main message?", choices: ["Questions can actively support learning and discovery.", "Students should avoid uncertainty.", "Answers are always more useful than questions.", "Research is unnecessary."], answer: 0 }
    ],
    activities: {
      math: [
        { q: "If 3x + 5 = 20, what is x?", choices: ["3", "5", "7", "15"], answer: 1 },
        { q: "What is 0.75 as a fraction in simplest form?", choices: ["1/2", "2/3", "3/4", "4/5"], answer: 2 },
        { q: "A ₱500 item is discounted by 20%. What is the sale price?", choices: ["₱380", "₱400", "₱420", "₱450"], answer: 1 }
      ],
      filipino: [
        { q: "Ano ang pinakamainam na batayan ng isang konklusyon?", choices: ["Sapat na ebidensya", "Haka-haka lamang", "Isang salita", "Pamagat lamang"], answer: 0 },
        { q: "Alin ang nagpapakita ng sanhi at bunga?", choices: ["Nag-aral siya kaya mataas ang marka niya.", "Maganda ang araw.", "Nasa silid siya.", "Mahaba ang aklat."], answer: 0 },
        { q: "Ano ang pinakamalapit na kahulugan ng 'mapanuri'?", choices: ["Maingat sa pagsusuri", "Laging tahimik", "Mabilis tumakbo", "Mahilig matulog"], answer: 0 }
      ],
      english: [
        { q: "Which statement best describes evidence?", choices: ["Information that supports a conclusion", "A random opinion", "A title", "A question with no context"], answer: 0 },
        { q: "Choose the sentence with correct subject-verb agreement.", choices: ["The students studies.", "The students study.", "The student study.", "The students studying."], answer: 1 },
        { q: "Which word best completes: 'The claim was supported ___ evidence.'", choices: ["by", "at", "on", "to"], answer: 0 }
      ]
    }
  }
};

/* ------------------------- Application State ------------------------- */

const defaultState = {
  loggedIn: false,
  student: { name: "", id: "" },
  grade: null,
  stage: "login",
  reading: {
    started: false,
    finished: false,
    recognizedText: "",
    analysis: null,
    difficultWords: []
  },
  assessment: {
    answers: [],
    score: null,
    submitted: false
  },
  activities: {
    scores: {},
    attempts: {},
    completed: []
  },
  progress: {
    math: 0,
    filipino: 0,
    english: 0
  },
  recommendations: [],
  history: [],
  sessionStartedAt: null
};

let state = loadState();
let speechRecognition = null;
let isRecording = false;
let analysisTimer = null;

/* ------------------------- Utilities ------------------------- */

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function saveState() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
  } catch (error) {
    console.warn("localStorage unavailable:", error);
    showToast("Your browser could not save progress. You can continue this session.");
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);
    return saved ? { ...clone(defaultState), ...JSON.parse(saved) } : clone(defaultState);
  } catch (error) {
    console.warn("Could not load saved state:", error);
    return clone(defaultState);
  }
}

function saveSession() {
  try {
    localStorage.setItem(CONFIG.sessionKey, JSON.stringify({
      loggedIn: state.loggedIn,
      student: state.student,
      grade: state.grade
    }));
  } catch (_) {}
}

function clearSession() {
  try { localStorage.removeItem(CONFIG.sessionKey); } catch (_) {}
}

function restoreSession() {
  try {
    const raw = localStorage.getItem(CONFIG.sessionKey);
    if (!raw) return;
    const session = JSON.parse(raw);
    if (session.loggedIn && session.student?.name) {
      state.loggedIn = true;
      state.student = session.student;
      state.grade = session.grade || null;
      state.stage = session.grade ? "dashboard" : "grade";
    }
  } catch (_) {}
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

function getGrade() {
  return state.grade ? gradeContent[state.grade] : null;
}

function getAllReadingWords() {
  return getGrade().reading.passage
    .toLowerCase()
    .replace(/[.,!?;:"'()]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function percent(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}

function masteryLabel(score) {
  if (score >= 90) return "Strong";
  if (score >= CONFIG.masteryThreshold) return "Ready";
  if (score >= 60) return "Developing";
  return "Needs Support";
}

function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.classList.remove("show"), 2800);
}

function setMain(html) {
  const main = document.getElementById("main");
  main.innerHTML = html;
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderTopbar() {
  const topbar = document.getElementById("topbar");
  if (!state.loggedIn) {
    topbar.classList.add("hidden");
    return;
  }
  topbar.classList.remove("hidden");
  document.getElementById("nav-student-name").textContent = state.student.name || "Student";
  document.getElementById("nav-avatar").textContent = (state.student.name || "S").trim().charAt(0).toUpperCase();
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.add("hidden");
  document.querySelector('[data-action="toggle-mobile-menu"]')?.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const open = menu.classList.toggle("hidden") === false;
  document.querySelector('[data-action="toggle-mobile-menu"]')?.setAttribute("aria-expanded", String(open));
}

function go(stage) {
  state.stage = stage;
  saveState();
  closeMobileMenu();
  render();
}

function requireLogin() {
  if (!state.loggedIn) {
    go("login");
    return false;
  }
  return true;
}

function requireGrade() {
  if (!requireLogin()) return false;
  if (!state.grade || !gradeContent[state.grade]) {
    go("grade");
    return false;
  }
  return true;
}

/* ------------------------- Navigation ------------------------- */

function render() {
  renderTopbar();

  switch (state.stage) {
    case "login": renderLogin(); break;
    case "grade": renderGradeSelection(); break;
    case "dashboard": renderDashboard(); break;
    case "reading": renderReading(); break;
    case "readingAnalysis": renderReadingAnalysis(); break;
    case "words": renderDifficultWords(); break;
    case "assessment": renderAssessment(); break;
    case "evaluation": renderEvaluation(); break;
    case "feedback": renderFeedback(); break;
    case "activities": renderActivityMenu(); break;
    case "activity": renderActivity(); break;
    case "results": renderResults(); break;
    default: go(state.loggedIn ? (state.grade ? "dashboard" : "grade") : "login");
  }
}

/* ------------------------- Login ------------------------- */

function renderLogin() {
  setMain(`
    <section class="login-wrap">
      <div class="login-card" aria-labelledby="login-title">
        <div class="login-brand">
          <span class="brand-mark" aria-hidden="true">A</span>
          <div>
            <strong style="font-size:20px;color:var(--navy)">ARAL<span style="color:var(--blue)"> AI</span></strong>
            <small style="display:block;color:var(--muted)">Learning Companion</small>
          </div>
        </div>

        <p class="eyebrow">Student learning portal</p>
        <h1 id="login-title" style="margin:0 0 8px;color:var(--navy)">Learn at your pace.</h1>
        <p style="margin:0 0 22px;color:var(--muted)">
          Your grade level provides the same core lessons and assessments for everyone. AI assistance adapts the support you receive.
        </p>

        <div id="login-error" class="alert error hidden" role="alert"></div>

        <form id="login-form" novalidate>
          <div class="form-group">
            <label for="student-name">Student name or ID</label>
            <input id="student-name" class="input" autocomplete="username" placeholder="e.g., Maria Santos" required>
          </div>

          <div class="form-group">
            <label for="access-code">Password / access code</label>
            <input id="access-code" class="input" type="password" autocomplete="current-password" placeholder="Enter your access code" required>
          </div>

          <label class="check-row">
            <input id="remember-session" type="checkbox" checked>
            Remember this session on this device
          </label>

          <button class="btn primary full" style="margin-top:20px" type="submit">Log in to ARAL AI</button>
        </form>

        <div class="footer-note">
          Prototype mode • No real student credentials are transmitted.
        </div>
      </div>
    </section>
  `);

  document.getElementById("login-form").addEventListener("submit", handleLogin);
}

function handleLogin(event) {
  event.preventDefault();
  const name = document.getElementById("student-name").value.trim();
  const code = document.getElementById("access-code").value.trim();
  const error = document.getElementById("login-error");

  if (!name || !code) {
    error.textContent = "Please enter your student name/ID and access code.";
    error.classList.remove("hidden");
    return;
  }

  error.classList.add("hidden");

  const id = name.toLowerCase().replace(/\s+/g, "-").slice(0, 40);
  state.loggedIn = true;
  state.student = { name, id };
  state.stage = state.grade ? "dashboard" : "grade";
  state.sessionStartedAt = new Date().toISOString();

  if (document.getElementById("remember-session").checked) saveSession();
  saveState();
  showToast(`Welcome, ${name}!`);
  render();
}

/* ------------------------- Grade Selection ------------------------- */

function renderGradeSelection() {
  if (!requireLogin()) return;

  const cards = Object.entries(gradeContent).map(([key, grade]) => `
    <article class="card grade-card">
      <div class="grade-number">${grade.label.replace("Grade ", "")}</div>
      <h3>${grade.label}</h3>
      <p>${grade.description}</p>
      <div class="meta-row">
        <span class="badge info">${grade.activitiesCount} core activities</span>
        <span class="badge">1 standardized reading</span>
      </div>
      <button class="btn primary full" data-grade="${key}">${state.grade === key ? "Continue with this grade" : "Select grade"}</button>
    </article>
  `).join("");

  setMain(`
    <div class="page">
      <section class="hero">
        <p class="eyebrow">Step 01 • Grade level</p>
        <h1>Choose your learning level</h1>
        <p>Pick the grade level that matches your current learning program. Your selection loads a standardized core curriculum for that grade.</p>
      </section>

      <div class="section-head">
        <div>
          <h2>Available grade levels</h2>
          <p>Same grade • Same core content • Personalized support</p>
        </div>
      </div>

      <div class="grid grid-3">${cards}</div>
      <p class="footer-note">You can return to your dashboard later. Changing grade level resets the active learning path.</p>
    </div>
  `);

  document.querySelectorAll("[data-grade]").forEach(btn => {
    btn.addEventListener("click", () => selectGrade(btn.dataset.grade));
  });
}

function selectGrade(key) {
  if (!gradeContent[key]) return;
  const changing = state.grade && state.grade !== key;

  if (changing) {
    const confirmed = window.confirm("Changing grade level will start that grade's standardized learning path. Continue?");
    if (!confirmed) return;
    resetLearningOnly();
  }

  state.grade = key;
  state.stage = "dashboard";
  state.history.push({ type: "grade-selected", grade: key, at: new Date().toISOString() });
  saveState();
  saveSession();
  showToast(`${gradeContent[key].label} curriculum loaded.`);
  render();
}

function resetLearningOnly() {
  state.reading = clone(defaultState.reading);
  state.assessment = clone(defaultState.assessment);
  state.activities = clone(defaultState.activities);
  state.progress = clone(defaultState.progress);
  state.recommendations = [];
}

/* ------------------------- Stepper ------------------------- */

function stepper(active) {
  const steps = [
    ["grade", "01 Grade Level"],
    ["reading", "02 Reading"],
    ["assessment", "03 Assessment"],
    ["evaluation", "04 AI Evaluation"],
    ["activities", "05 Activities"],
    ["results", "06 Results"]
  ];
  const order = steps.map(s => s[0]);
  const activeIndex = order.indexOf(active);

  return `
    <div class="stepper" aria-label="Learning progress">
      ${steps.map(([key, label], i) => `
        <div class="step ${i < activeIndex ? "done" : ""} ${i === activeIndex ? "active" : ""}">
          <span aria-hidden="true"></span>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

/* ------------------------- Dashboard ------------------------- */

function averageProgress() {
  const scores = Object.values(state.progress).filter(Number.isFinite);
  return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
}

function currentFocus() {
  const entries = Object.entries(state.progress);
  entries.sort((a, b) => a[1] - b[1]);
  const [subject, score] = entries[0] || ["math", 0];
  return { subject, score };
}

function renderDashboard() {
  if (!requireGrade()) return;
  const grade = getGrade();
  const avg = averageProgress();
  const focus = currentFocus();

  const subjectNames = { math: "Mathematics", filipino: "Filipino", english: "English" };
  const subjectIcons = { math: "＋", filipino: "A", english: "E" };

  setMain(`
    <div class="page">
      ${stepper("grade")}

      <section class="dashboard-hero">
        <div class="hero welcome-copy">
          <p class="eyebrow">AI learning dashboard</p>
          <h1>Hello, ${escapeHTML(state.student.name)}!</h1>
          <p>You are enrolled in <strong>${grade.label}</strong>. Your core learning materials are standardized for this level, while ARAL AI adjusts practice and feedback around your needs.</p>
          <div class="action-row">
            <button class="btn primary" data-action="start-learning">Start learning</button>
            <button class="btn secondary" data-action="go-results">View results</button>
          </div>
        </div>

        <div class="card">
          <div class="kpi">
            <div>
              <p class="eyebrow">Overall progress</p>
              <div class="kpi-number">${avg}%</div>
              <span class="small-text">${masteryLabel(avg)} mastery</span>
            </div>
            <div class="badge ${avg >= CONFIG.masteryThreshold ? "good" : "warn"}">${avg >= CONFIG.masteryThreshold ? "On track" : "Practice needed"}</div>
          </div>
          <div class="progress" style="margin-top:18px"><span style="width:${avg}%"></span></div>
          <div class="divider"></div>
          <div class="focus-card">
            <strong style="color:var(--navy)">Current AI focus</strong>
            <p style="margin:4px 0">${subjectNames[focus.subject]} — ${focus.score < CONFIG.masteryThreshold ? "Needs more practice" : "Maintain mastery"}</p>
          </div>
        </div>
      </section>

      <div class="section-head">
        <div>
          <h2>AI Learning Monitor</h2>
          <p>Live snapshot of your current learning profile</p>
        </div>
        <span class="badge purple">AI-assisted</span>
      </div>

      <div class="grid grid-3">
        ${Object.entries(state.progress).map(([subject, score]) => `
          <article class="card subject-card">
            <div class="subject-icon" aria-hidden="true">${subjectIcons[subject]}</div>
            <h3>${subjectNames[subject]}</h3>
            <div class="subject-score"><strong>${score}%</strong><span>${masteryLabel(score)}</span></div>
            <div class="progress"><span style="width:${score}%"></span></div>
          </article>
        `).join("")}
      </div>

      <div class="grid grid-2" style="margin-top:16px">
        <section class="card">
          <div class="section-head" style="margin-top:0">
            <div>
              <h3>Recommended next step</h3>
              <p>Based on your latest performance</p>
            </div>
          </div>
          <div class="feedback-box">
            <p>${escapeHTML(getDashboardRecommendation())}</p>
          </div>
          <div class="action-row">
            <button class="btn primary" data-action="start-learning">Follow recommendation</button>
          </div>
        </section>

        <section class="card">
          <div class="section-head" style="margin-top:0">
            <div>
              <h3>Session progress</h3>
              <p>What you have completed</p>
            </div>
          </div>
          <div class="timeline">
            ${[
              ["Reading", state.reading.finished ? "Completed" : "Not completed"],
              ["Comprehension", state.assessment.submitted ? `${state.assessment.score}%` : "Not completed"],
              ["Core activities", `${state.activities.completed.length}/3 subjects completed`]
            ].map(([a,b]) => `
              <div class="timeline-item">
                <span class="timeline-dot"></span>
                <div><strong>${a}</strong><span>${b}</span></div>
              </div>
            `).join("")}
          </div>
        </section>
      </div>

      <p class="footer-note">Core content is fixed by grade. AI personalization changes assistance, not the standardized curriculum.</p>
    </div>
  `);

  document.querySelectorAll('[data-action="start-learning"]').forEach(btn => {
    btn.addEventListener("click", () => {
      if (!state.reading.finished) go("reading");
      else if (!state.assessment.submitted) go("assessment");
      else go("activities");
    });
  });
}

function getDashboardRecommendation() {
  const focus = currentFocus();
  const names = { math: "Mathematics", filipino: "Filipino", english: "English" };

  if (!state.reading.finished) return "Begin with the standardized reading passage. Read it aloud so ARAL AI can provide an AI-assisted reading analysis.";
  if (!state.assessment.submitted) return "Complete the comprehension assessment to show what you understood from the reading.";
  if (focus.score < CONFIG.masteryThreshold) return `Let's give ${names[focus.subject]} another practice round. A short retry can strengthen this skill.`;
  return "Great progress. Continue with the next core activity and keep practicing consistently.";
}

/* ------------------------- Reading Module ------------------------- */

function renderReading() {
  if (!requireGrade()) return;
  const reading = getGrade().reading;
  const words = reading.passage.split(/\s+/);

  setMain(`
    <div class="page">
      ${stepper("reading")}

      <section class="section-head">
        <div>
          <p class="eyebrow">Step 02 • Reading & comprehension</p>
          <h1 style="margin:0;color:var(--navy)">${reading.title}</h1>
          <p>Estimated reading time: ${reading.time}</p>
        </div>
        <span class="badge info">${getGrade().label}</span>
      </section>

      <div class="reading-layout">
        <article class="card">
          <div class="reading-passage" aria-label="Reading passage">
            <p>${words.map((word, i) => `<span class="read-word" data-word-index="${i}">${escapeHTML(word)}</span>`).join(" ")}</p>
          </div>

          <div class="section-head" style="margin-bottom:8px">
            <div>
              <h3>Reading progress</h3>
              <p id="reading-progress-label">${state.reading.started ? "Recording is ready." : "Press Start Reading when you are ready."}</p>
            </div>
            <strong id="reading-progress-value">0%</strong>
          </div>
          <div class="progress"><span id="reading-progress-bar" style="width:0%"></span></div>

          <div class="action-row">
            <button id="start-reading" class="btn primary">${state.reading.started ? "Reading started" : "Start Reading"}</button>
            <button id="finish-reading" class="btn success" ${state.reading.started ? "" : "disabled"}>Stop / Finish Reading</button>
          </div>
        </article>

        <aside class="card record-panel">
          <div class="center">
            <p class="eyebrow">AI listening</p>
            <h3>Read aloud</h3>
            <p class="small-text">Speak clearly while the AI-assisted listener monitors your reading. Browser speech recognition is only an aid and is not a perfect pronunciation test.</p>

            <button id="mic-button" class="mic" aria-label="Start microphone">🎙</button>
            <strong id="recording-status">Microphone ready</strong>
            <p id="speech-support" class="small-text">Checking browser speech support…</p>

            <div class="divider"></div>
            <p class="small-text" id="recognized-preview">No speech captured yet.</p>
          </div>
        </aside>
      </div>

      <div class="card" style="margin-top:18px">
        <strong style="color:var(--navy)">Student instruction</strong>
        <p style="margin:5px 0 0">Read the complete passage aloud at a comfortable pace. When you finish, ARAL AI will simulate an analysis of reading accuracy, fluency, and possible difficult words.</p>
      </div>
    </div>
  `);

  setupReadingEvents();
}

function setupReadingEvents() {
  const startBtn = document.getElementById("start-reading");
  const finishBtn = document.getElementById("finish-reading");
  const micBtn = document.getElementById("mic-button");
  const support = document.getElementById("speech-support");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (CONFIG.useSpeechRecognition && SpeechRecognition) {
    support.textContent = "Speech recognition is available. Results are AI-assisted, not a perfect pronunciation measurement.";
    speechRecognition = new SpeechRecognition();
    speechRecognition.lang = "en-US";
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;

    speechRecognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add("recording");
      micBtn.setAttribute("aria-label", "Stop microphone");
      document.getElementById("recording-status").textContent = "Listening…";
    };

    speechRecognition.onresult = event => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      state.reading.recognizedText += " " + transcript;
      state.reading.recognizedText = state.reading.recognizedText.trim().replace(/\s+/g, " ");
      document.getElementById("recognized-preview").textContent =
        state.reading.recognizedText.slice(-260) || "Listening…";
      updateReadingProgressFromSpeech();
    };

    speechRecognition.onerror = event => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        showToast("Microphone access was denied. You can still finish the reading activity.");
      } else {
        showToast("Speech recognition could not continue. The simulated analysis is still available.");
      }
      stopRecognition();
    };

    speechRecognition.onend = () => {
      isRecording = false;
      micBtn.classList.remove("recording");
      micBtn.setAttribute("aria-label", "Start microphone");
      document.getElementById("recording-status").textContent = "Microphone ready";
    };
  } else {
    support.textContent = "Speech recognition is not available in this browser. You can continue with AI-assisted simulated analysis.";
  }

  startBtn.addEventListener("click", () => {
    state.reading.started = true;
    saveState();
    startBtn.disabled = true;
    finishBtn.disabled = false;
    document.getElementById("reading-progress-label").textContent = "Reading in progress. Take your time.";
    showToast("Reading session started.");

    if (speechRecognition && !isRecording) {
      try { speechRecognition.start(); } catch (_) {}
    }

    startReadingProgressFallback();
  });

  micBtn.addEventListener("click", () => {
    if (!state.reading.started) {
      showToast("Press Start Reading first.");
      return;
    }

    if (!speechRecognition) {
      showToast("Microphone speech recognition is unavailable. Continuing with simulated analysis.");
      return;
    }

    if (isRecording) stopRecognition();
    else {
      try { speechRecognition.start(); }
      catch (_) { showToast("The microphone is already being used."); }
    }
  });

  finishBtn.addEventListener("click", finishReading);
}

let readingProgressTimer = null;

function startReadingProgressFallback() {
  clearInterval(readingProgressTimer);
  let progress = 0;
  readingProgressTimer = setInterval(() => {
    if (!state.reading.started || state.reading.finished) {
      clearInterval(readingProgressTimer);
      return;
    }
    progress = Math.min(92, progress + 2);
    updateReadingProgress(progress);
  }, 500);
}

function updateReadingProgressFromSpeech() {
  const target = getAllReadingWords();
  const spoken = state.reading.recognizedText.toLowerCase().split(/\s+/).filter(Boolean);
  if (!target.length) return;
  const rough = Math.min(96, Math.round((spoken.length / target.length) * 100));
  updateReadingProgress(rough);
}

function updateReadingProgress(value) {
  const safe = Math.max(0, Math.min(100, value));
  const bar = document.getElementById("reading-progress-bar");
  const label = document.getElementById("reading-progress-value");
  if (bar) bar.style.width = `${safe}%`;
  if (label) label.textContent = `${safe}%`;
}

function stopRecognition() {
  try { speechRecognition?.stop(); } catch (_) {}
  isRecording = false;
  document.getElementById("mic-button")?.classList.remove("recording");
}

function finishReading() {
  if (!state.reading.started) {
    showToast("Start the reading first.");
    return;
  }
  stopRecognition();
  clearInterval(readingProgressTimer);
  state.reading.finished = true;
  saveState();
  showToast("Reading captured. ARAL AI is analyzing your performance.");
  go("readingAnalysis");
}

/* ------------------------- AI Engine ------------------------- */
/* This layer is intentionally isolated from UI. Replace these
   rule-based methods with a real backend/API/ML service later. */

const AIEngine = {
  analyzeReading() {
    const passageWords = getAllReadingWords();
    const spokenWords = state.reading.recognizedText
      .toLowerCase()
      .replace(/[.,!?;:"'()]/g, "")
      .split(/\s+/)
      .filter(Boolean);

    let accuracy = 84;
    if (spokenWords.length > 0) {
      const expected = new Set(passageWords);
      const matches = spokenWords.filter(w => expected.has(w)).length;
      const coverage = Math.min(1, matches / Math.max(1, passageWords.length));
      accuracy = Math.round(72 + coverage * 25);
    }

    const difficultPool = ["environment", "beautiful", "responsibility", "responsible", "community", "classroom", "questions", "evidence", "discovery", "together"];
    const present = difficultPool.filter(word => passageWords.includes(word));
    const count = Math.min(4, present.length || 2);
    const difficultWords = present.length
      ? present.slice(0, count)
      : passageWords.filter(w => w.length > 7).slice(0, 4);

    const possibleMispronunciations = spokenWords.length
      ? Math.max(1, Math.round((100 - accuracy) / 7))
      : Math.min(3, difficultWords.length);

    const fluency = accuracy >= 90 ? "Strong" : accuracy >= 80 ? "Good" : "Developing";

    return {
      pronunciationAccuracy: accuracy,
      difficultWords,
      possibleMispronunciations,
      skippedWords: spokenWords.length ? Math.max(0, passageWords.length - spokenWords.length) : 2,
      repeatedWords: spokenWords.length ? Math.max(0, spokenWords.length - new Set(spokenWords).size) : 1,
      fluency,
      performance: accuracy >= 85 ? "Good" : accuracy >= 70 ? "Developing" : "Needs Support",
      note: spokenWords.length
        ? "Speech recognition provided a rough transcript that was used for AI-assisted analysis."
        : "No reliable transcript was available, so the prototype used a simulated AI reading analysis."
    };
  },

  evaluateComprehension() {
    const questions = getGrade().comprehension;
    const answers = state.assessment.answers;
    let correct = 0;
    questions.forEach((item, i) => {
      if (Number(answers[i]) === item.answer) correct++;
    });
    return {
      correct,
      total: questions.length,
      score: percent(correct, questions.length)
    };
  },

  identifyWeaknesses(reading, comprehension) {
    const weaknesses = [];
    if (reading.pronunciationAccuracy < CONFIG.masteryThreshold) weaknesses.push("pronunciation");
    if (reading.fluency === "Developing") weaknesses.push("reading fluency");
    if (comprehension.score < CONFIG.masteryThreshold) weaknesses.push("detail-based comprehension");
    if (!weaknesses.length) weaknesses.push("continued practice for consistency");
    return weaknesses;
  },

  generateFeedback(reading, comprehension) {
    const weaknesses = this.identifyWeaknesses(reading, comprehension);
    const strengths = [];
    if (comprehension.score >= CONFIG.masteryThreshold) strengths.push("good comprehension");
    if (reading.pronunciationAccuracy >= CONFIG.masteryThreshold) strengths.push("clear reading performance");
    if (reading.difficultWords.length <= 2) strengths.push("strong vocabulary recognition");
    if (!strengths.length) strengths.push("willingness to practice and improve");

    const message = comprehension.score >= CONFIG.masteryThreshold && reading.pronunciationAccuracy >= CONFIG.masteryThreshold
      ? "Great job! You understood the main ideas and showed a solid reading performance. Keep practicing to make your skills even stronger."
      : "You're making progress! You understood important parts of the lesson. Let's practice the areas that were more difficult, then try another short activity.";

    return { strengths, weaknesses, message };
  },

  recommendPractice(profile) {
    if (profile.comprehension < CONFIG.masteryThreshold) return "Review the reading and retry the comprehension questions.";
    if (profile.reading < CONFIG.masteryThreshold) return "Practice the difficult words and read the passage aloud again.";
    const focus = currentFocus();
    return `Continue with ${capitalize(focus.subject)} practice to strengthen your current lowest subject score.`;
  },

  evaluateMastery(scores) {
    const values = Object.values(scores);
    const overall = values.length ? Math.round(values.reduce((a,b) => a+b, 0) / values.length) : 0;
    return { overall, label: masteryLabel(overall), ready: overall >= CONFIG.masteryThreshold };
  }
};

/* ------------------------- Reading Analysis ------------------------- */

function renderReadingAnalysis() {
  if (!requireGrade()) return;

  setMain(`
    <div class="page narrow">
      ${stepper("reading")}

      <section class="card analysis-card">
        <div class="ai-status">
          <div>
            <div class="ai-orb">✦</div>
            <p class="eyebrow">AI-assisted analysis</p>
            <h1 id="analysis-title" style="margin:0;color:var(--navy)">Listening to your reading…</h1>
            <p id="analysis-description" style="color:var(--muted)">The prototype is reviewing reading signals and preparing feedback.</p>
          </div>
        </div>

        <div class="analysis-stages" id="analysis-stages">
          <div class="analysis-stage active">Listening</div>
          <div class="analysis-stage">Analyzing</div>
          <div class="analysis-stage">Evaluating</div>
          <div class="analysis-stage">Feedback</div>
        </div>
      </section>
    </div>
  `);

  runAnalysisSequence();
}

function runAnalysisSequence() {
  const stages = [...document.querySelectorAll(".analysis-stage")];
  const title = document.getElementById("analysis-title");
  const description = document.getElementById("analysis-description");

  let index = 0;
  clearTimeout(analysisTimer);

  const labels = [
    ["Listening…", "Checking the reading session and available speech signals."],
    ["Analyzing…", "Estimating accuracy, fluency, difficult words, and possible reading issues."],
    ["Evaluating…", "Building an AI-assisted reading profile."],
    ["Preparing results…", "Your reading analysis is almost ready."]
  ];

  const tick = () => {
    if (index > 0) {
      stages[index - 1]?.classList.remove("active");
      stages[index - 1]?.classList.add("done");
    }
    if (index < stages.length) {
      stages[index]?.classList.add("active");
      [title.textContent, description.textContent] = labels[index];
      index++;
      analysisTimer = setTimeout(tick, CONFIG.analysisDelay);
    } else {
      const analysis = AIEngine.analyzeReading();
      state.reading.analysis = analysis;
      state.reading.difficultWords = analysis.difficultWords;
      saveState();
      go("words");
    }
  };

  tick();
}

/* ------------------------- Difficult Words ------------------------- */

function renderDifficultWords() {
  if (!requireGrade()) return;
  const analysis = state.reading.analysis || AIEngine.analyzeReading();

  setMain(`
    <div class="page">
      ${stepper("reading")}

      <section class="hero">
        <p class="eyebrow">AI-assisted reading analysis</p>
        <h1>Your reading snapshot</h1>
        <p>${escapeHTML(analysis.note)}</p>
      </section>

      <div class="grid grid-4" style="margin-top:18px">
        ${[
          ["Pronunciation Accuracy", `${analysis.pronunciationAccuracy}%`],
          ["Difficult Words", analysis.difficultWords.length],
          ["Possible Mispronunciations", analysis.possibleMispronunciations],
          ["Fluency", analysis.fluency]
        ].map(([label,value]) => `
          <div class="card">
            <p class="small-text">${label}</p>
            <strong style="font-size:25px;color:var(--navy)">${value}</strong>
          </div>
        `).join("")}
      </div>

      <div class="grid grid-2" style="margin-top:18px">
        <section class="card">
          <div class="section-head" style="margin-top:0">
            <div>
              <h2>Difficult word check</h2>
              <p>Practice words that may need extra attention.</p>
            </div>
          </div>

          <div class="word-list">
            ${analysis.difficultWords.length ? analysis.difficultWords.map((word, i) => `
              <div class="word-item">
                <div>
                  <strong>${escapeHTML(word)}</strong>
                  <small style="display:block">Detected difficulty ${i + 1}</small>
                </div>
                <span class="badge warn">Needs Practice</span>
                <button class="btn small secondary" data-practice-word="${escapeHTML(word)}">Practice</button>
              </div>
            `).join("") : `<div class="empty">No specific difficult words were detected.</div>`}
          </div>
        </section>

        <section class="card">
          <h3>Reading performance</h3>
          <div class="metric"><span>Accuracy</span><strong>${analysis.pronunciationAccuracy}%</strong></div>
          <div class="metric"><span>Skipped words</span><strong>${analysis.skippedWords}</strong></div>
          <div class="metric"><span>Repeated words</span><strong>${analysis.repeatedWords}</strong></div>
          <div class="metric"><span>Fluency</span><strong>${analysis.fluency}</strong></div>
          <div class="feedback-box" style="margin-top:16px">
            <p>These results are <strong>AI-assisted estimates</strong> in this prototype. A future backend can use specialized speech and pronunciation models for more reliable assessment.</p>
          </div>
        </section>
      </div>

      <div class="action-row">
        <button class="btn primary" data-action="go-assessment">Continue to comprehension</button>
        <button class="btn secondary" data-action="go-reading-retry">Read again</button>
      </div>
    </div>
  `);

  document.querySelectorAll("[data-practice-word]").forEach(btn => {
    btn.addEventListener("click", () => practiceWord(btn.dataset.practiceWord));
  });
  document.querySelector('[data-action="go-assessment"]').addEventListener("click", () => go("assessment"));
  document.querySelector('[data-action="go-reading-retry"]').addEventListener("click", () => {
    state.reading.started = false;
    state.reading.finished = false;
    state.reading.recognizedText = "";
    saveState();
    go("reading");
  });
}

function practiceWord(word) {
  window.alert(`Practice word: "${word}"\n\nSay it slowly, listen to yourself, then repeat it 3 times.\n\nPrototype note: a future pronunciation API can score each attempt.`);
}

/* ------------------------- Assessment ------------------------- */

function renderAssessment() {
  if (!requireGrade()) return;
  const questions = getGrade().comprehension;
  const answers = state.assessment.answers;

  setMain(`
    <div class="page narrow">
      ${stepper("assessment")}

      <section class="section-head">
        <div>
          <p class="eyebrow">Step 03 • Comprehension assessment</p>
          <h1 style="margin:0;color:var(--navy)">Show what you understood</h1>
          <p>These questions are fixed for ${getGrade().label} to keep the core assessment consistent.</p>
        </div>
        <span class="badge info">${questions.length} questions</span>
      </section>

      <form id="assessment-form">
        ${questions.map((item, i) => `
          <article class="card question-card">
            <div class="question-number">Question ${i + 1} of ${questions.length}</div>
            <h3>${escapeHTML(item.q)}</h3>
            <div class="choices">
              ${item.choices.map((choice, c) => `
                <label class="choice">
                  <input type="radio" name="q${i}" value="${c}" ${Number(answers[i]) === c ? "checked" : ""}>
                  <span>${escapeHTML(choice)}</span>
                </label>
              `).join("")}
            </div>
          </article>
        `).join("")}

        <div id="assessment-error" class="alert error hidden" role="alert"></div>
        <button class="btn primary full" type="submit">Submit Assessment</button>
      </form>
    </div>
  `);

  document.getElementById("assessment-form").addEventListener("submit", handleAssessmentSubmit);
}

function handleAssessmentSubmit(event) {
  event.preventDefault();
  const questions = getGrade().comprehension;
  const answers = questions.map((_, i) => {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    return checked ? Number(checked.value) : null;
  });

  const error = document.getElementById("assessment-error");
  if (answers.some(v => v === null)) {
    error.textContent = "Please answer every question before submitting.";
    error.classList.remove("hidden");
    const firstMissing = answers.findIndex(v => v === null);
    document.querySelector(`input[name="q${firstMissing}"]`)?.focus();
    return;
  }

  state.assessment.answers = answers;
  state.assessment.submitted = true;
  const result = AIEngine.evaluateComprehension();
  state.assessment.score = result.score;
  state.history.push({ type: "assessment", score: result.score, at: new Date().toISOString() });
  saveState();
  go("evaluation");
}

/* ------------------------- Evaluation ------------------------- */

function renderEvaluation() {
  if (!requireGrade()) return;
  const reading = state.reading.analysis || AIEngine.analyzeReading();
  const comprehension = AIEngine.evaluateComprehension();
  const overall = Math.round((reading.pronunciationAccuracy + comprehension.score) / 2);
  const feedback = AIEngine.generateFeedback(reading, comprehension);

  setMain(`
    <div class="page">
      ${stepper("evaluation")}

      <section class="hero">
        <p class="eyebrow">Step 04 • AI evaluation</p>
        <h1>Your learning profile is ready</h1>
        <p>ARAL AI combines reading and comprehension signals to identify strengths and areas that may benefit from additional support.</p>
      </section>

      <div class="grid grid-3" style="margin-top:18px">
        <div class="card center">
          <p class="small-text">Overall evaluation</p>
          <div class="score-ring" style="--score:${overall}">
            <div class="score-value"><strong>${overall}%</strong><span>${masteryLabel(overall)}</span></div>
          </div>
        </div>

        <div class="card">
          <h3>Strengths</h3>
          <ul class="list-clean">
            ${feedback.strengths.map(x => `<li>${escapeHTML(x)}</li>`).join("")}
          </ul>
        </div>

        <div class="card">
          <h3>Needs improvement</h3>
          <ul class="list-clean">
            ${feedback.weaknesses.map(x => `<li>${escapeHTML(x)}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="card" style="margin-top:18px">
        <div class="metric"><span>Reading accuracy</span><strong>${reading.pronunciationAccuracy}%</strong></div>
        <div class="metric"><span>Reading fluency</span><strong>${reading.fluency}</strong></div>
        <div class="metric"><span>Comprehension</span><strong>${comprehension.score}%</strong></div>
        <div class="metric"><span>Possible mispronunciations</span><strong>${reading.possibleMispronunciations}</strong></div>
      </div>

      <div class="action-row">
        <button class="btn primary" data-action="go-feedback">View personalized feedback</button>
      </div>
    </div>
  `);

  document.querySelector('[data-action="go-feedback"]').addEventListener("click", () => {
    state.recommendations = feedback.weaknesses;
    saveState();
    go("feedback");
  });
}

/* ------------------------- Feedback ------------------------- */

function renderFeedback() {
  if (!requireGrade()) return;
  const reading = state.reading.analysis || AIEngine.analyzeReading();
  const comprehension = AIEngine.evaluateComprehension();
  const feedback = AIEngine.generateFeedback(reading, comprehension);

  setMain(`
    <div class="page narrow">
      ${stepper("evaluation")}

      <section class="card">
        <p class="eyebrow">Personalized AI feedback</p>
        <h1 style="margin:0;color:var(--navy)">You can do this!</h1>
        <div class="feedback-box" style="margin-top:18px">
          <p>“${escapeHTML(feedback.message)}”</p>
        </div>

        <div class="grid grid-2" style="margin-top:18px">
          <div>
            <h3>What you're doing well</h3>
            <ul class="list-clean">
              ${feedback.strengths.map(x => `<li>${escapeHTML(x)}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h3>Let's work on</h3>
            <ul class="list-clean">
              ${feedback.weaknesses.map(x => `<li>${escapeHTML(x)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="divider"></div>

        <h3>Recommended practice</h3>
        <p>${escapeHTML(AIEngine.recommendPractice({
          reading: reading.pronunciationAccuracy,
          comprehension: comprehension.score
        }))}</p>

        <div class="action-row">
          <button class="btn primary" data-action="go-activities">Continue to activities</button>
          ${reading.difficultWords.length ? `<button class="btn secondary" data-action="go-words">Practice difficult words</button>` : ""}
        </div>
      </section>
    </div>
  `);

  document.querySelector('[data-action="go-activities"]').addEventListener("click", () => go("activities"));
  document.querySelector('[data-action="go-words"]')?.addEventListener("click", () => go("words"));
}

/* ------------------------- Activity Menu ------------------------- */

function renderActivityMenu() {
  if (!requireGrade()) return;
  const subjects = [
    ["math", "Mathematics", "Basic arithmetic, patterns, and problem solving.", "＋"],
    ["filipino", "Filipino", "Pagbasa, talasalitaan, at wastong paggamit ng salita.", "A"],
    ["english", "English", "Vocabulary, grammar, and sentence skills.", "E"]
  ];

  setMain(`
    <div class="page">
      ${stepper("activities")}

      <section class="hero">
        <p class="eyebrow">Step 05 • Interactive activities</p>
        <h1>Practice your skills</h1>
        <p>These are standardized core activities for ${getGrade().label}. ARAL AI uses your scores to recommend where you should practice more.</p>
      </section>

      <div class="grid grid-3" style="margin-top:18px">
        ${subjects.map(([key, name, desc, icon]) => {
          const score = state.progress[key] || 0;
          const done = state.activities.completed.includes(key);
          return `
            <article class="card subject-card">
              <div class="subject-icon">${icon}</div>
              <h3>${name}</h3>
              <p>${desc}</p>
              <div class="subject-score"><strong>${score}%</strong><span>${masteryLabel(score)}</span></div>
              <div class="progress"><span style="width:${score}%"></span></div>
              <div class="action-row">
                <button class="btn ${done ? "secondary" : "primary"} full" data-subject="${key}">
                  ${done ? "Practice again" : "Start activity"}
                </button>
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <div class="card" style="margin-top:18px">
        <div class="kpi">
          <div>
            <strong style="color:var(--navy)">Adaptive practice rule</strong>
            <p style="margin:4px 0">Scores below ${CONFIG.masteryThreshold}% receive a retry or additional-practice recommendation.</p>
          </div>
          <span class="badge info">Threshold: ${CONFIG.masteryThreshold}%</span>
        </div>
      </div>

      <div class="action-row">
        <button class="btn success" data-action="go-results">Finish & view results</button>
      </div>
    </div>
  `);

  document.querySelectorAll("[data-subject]").forEach(btn => {
    btn.addEventListener("click", () => startActivity(btn.dataset.subject));
  });
  document.querySelector('[data-action="go-results"]').addEventListener("click", () => go("results"));
}

function startActivity(subject) {
  if (!getGrade().activities[subject]) {
    showToast("This activity is not available.");
    return;
  }
  state.currentSubject = subject;
  state.currentActivityIndex = 0;
  saveState();
  go("activity");
}

/* ------------------------- Activities ------------------------- */

function renderActivity() {
  if (!requireGrade()) return;
  const subject = state.currentSubject;
  const questions = getGrade().activities[subject];

  if (!subject || !questions) {
    go("activities");
    return;
  }

  const names = { math: "Mathematics", filipino: "Filipino", english: "English" };
  const index = Math.max(0, Math.min(state.currentActivityIndex || 0, questions.length - 1));
  const item = questions[index];

  setMain(`
    <div class="page narrow">
      <div class="section-head">
        <div>
          <p class="eyebrow">Interactive activity</p>
          <h1 style="margin:0;color:var(--navy)">${names[subject]}</h1>
          <p>Core activity ${index + 1} of ${questions.length} • ${getGrade().label}</p>
        </div>
        <span class="badge info">Attempt ${(state.activities.attempts[subject] || 0) + 1}</span>
      </div>

      <div class="card">
        <div class="progress"><span style="width:${((index) / questions.length) * 100}%"></span></div>

        <div class="activity-question">
          <p class="question-number">Question ${index + 1}</p>
          <h3>${escapeHTML(item.q)}</h3>
        </div>

        <div id="activity-choices" class="choices">
          ${item.choices.map((choice, i) => `
            <label class="choice">
              <input type="radio" name="activity-choice" value="${i}">
              <span>${escapeHTML(choice)}</span>
            </label>
          `).join("")}
        </div>

        <div id="activity-error" class="alert error hidden" style="margin-top:14px"></div>
        <div class="action-row">
          <button class="btn primary" id="submit-activity">Submit answer</button>
          <button class="btn secondary" data-action="cancel-activity">Back to subjects</button>
        </div>
      </div>
    </div>
  `);

  document.getElementById("submit-activity").addEventListener("click", () => submitActivityAnswer(subject, index));
  document.querySelector('[data-action="cancel-activity"]').addEventListener("click", () => go("activities"));
}

function submitActivityAnswer(subject, index) {
  const selected = document.querySelector('input[name="activity-choice"]:checked');
  const error = document.getElementById("activity-error");

  if (!selected) {
    error.textContent = "Choose an answer before submitting.";
    error.classList.remove("hidden");
    return;
  }

  const questions = getGrade().activities[subject];
  const correct = Number(selected.value) === questions[index].answer;
  const key = `${subject}-current`;

  if (!state.activitySession) state.activitySession = {};
  if (!state.activitySession[key]) state.activitySession[key] = [];
  state.activitySession[key].push(correct);

  if (index < questions.length - 1) {
    state.currentActivityIndex = index + 1;
    saveState();
    renderActivity();
    return;
  }

  const answers = state.activitySession[key];
  const score = percent(answers.filter(Boolean).length, answers.length);

  state.progress[subject] = score;
  state.activities.attempts[subject] = (state.activities.attempts[subject] || 0) + 1;

  if (!state.activities.completed.includes(subject)) state.activities.completed.push(subject);

  state.history.push({
    type: "activity",
    subject,
    score,
    attempt: state.activities.attempts[subject],
    at: new Date().toISOString()
  });

  delete state.activitySession[key];
  state.currentActivityIndex = 0;
  saveState();

  showActivityResult(subject, score);
}

function showActivityResult(subject, score) {
  const names = { math: "Mathematics", filipino: "Filipino", english: "English" };
  const meets = score >= CONFIG.masteryThreshold;

  setMain(`
    <div class="page narrow">
      <section class="card center">
        <p class="eyebrow">Activity complete</p>
        <div class="score-ring" style="--score:${score}">
          <div class="score-value"><strong>${score}%</strong><span>${masteryLabel(score)}</span></div>
        </div>
        <h1 style="margin:0;color:var(--navy)">${names[subject]} activity</h1>
        <p>${meets
          ? "Excellent! You reached the required level for this activity."
          : "You're making progress! This skill would benefit from another practice round."}</p>

        <div class="feedback-box">
          <p>${meets
            ? "You are ready to continue. Keep the skill fresh with regular practice."
            : `Let's review the same core skill and try again. The mastery threshold is ${CONFIG.masteryThreshold}%.`}</p>
        </div>

        <div class="action-row" style="justify-content:center">
          ${meets
            ? `<button class="btn success" data-action="activity-continue">Continue</button>`
            : `<button class="btn warning" data-action="activity-retry">Retry</button>
               <button class="btn secondary" data-action="activity-review">Review mistakes</button>`}
          <button class="btn secondary" data-action="activity-menu">All activities</button>
        </div>
      </section>
    </div>
  `);

  document.querySelector('[data-action="activity-continue"]')?.addEventListener("click", () => go("activities"));
  document.querySelector('[data-action="activity-retry"]')?.addEventListener("click", () => {
    state.currentSubject = subject;
    state.currentActivityIndex = 0;
    saveState();
    go("activity");
  });
  document.querySelector('[data-action="activity-review"]')?.addEventListener("click", () => {
    showToast("Review mode: revisit the same standardized questions and retry.");
    state.currentSubject = subject;
    state.currentActivityIndex = 0;
    saveState();
    go("activity");
  });
  document.querySelector('[data-action="activity-menu"]').addEventListener("click", () => go("activities"));
}

/* ------------------------- Results ------------------------- */

function renderResults() {
  if (!requireGrade()) return;

  const reading = state.reading.analysis || AIEngine.analyzeReading();
  const comprehension = state.assessment.submitted ? AIEngine.evaluateComprehension() : { score: 0, correct: 0, total: getGrade().comprehension.length };
  const mastery = AIEngine.evaluateMastery({
    reading: reading.pronunciationAccuracy,
    comprehension: comprehension.score,
    ...state.progress
  });

  const recommendation = mastery.ready
    ? "Proceed — your current performance meets the configured mastery threshold."
    : AIEngine.recommendPractice({
        reading: reading.pronunciationAccuracy,
        comprehension: comprehension.score
      });

  setMain(`
    <div class="page">
      ${stepper("results")}

      <section class="hero">
        <p class="eyebrow">Step 06 • Results</p>
        <h1>Learning session summary</h1>
        <p>Here is your current performance profile for ${getGrade().label}. Use the recommendation to decide your next learning step.</p>
      </section>

      <div class="grid grid-3" style="margin-top:18px">
        <section class="card center">
          <p class="small-text">Overall score</p>
          <div class="score-ring" style="--score:${mastery.overall}">
            <div class="score-value"><strong>${mastery.overall}%</strong><span>${mastery.label}</span></div>
          </div>
        </section>

        <section class="card">
          <h3>Reading</h3>
          <div class="metric"><span>Pronunciation</span><strong>${reading.pronunciationAccuracy}%</strong></div>
          <div class="metric"><span>Fluency</span><strong>${reading.fluency}</strong></div>
          <div class="metric"><span>Difficult words</span><strong>${reading.difficultWords.length}</strong></div>
          <div class="metric"><span>Possible issues</span><strong>${reading.possibleMispronunciations}</strong></div>
        </section>

        <section class="card">
          <h3>Comprehension</h3>
          <div class="metric"><span>Score</span><strong>${comprehension.score}%</strong></div>
          <div class="metric"><span>Correct</span><strong>${comprehension.correct}/${comprehension.total}</strong></div>
          <div class="metric"><span>Status</span><strong>${masteryLabel(comprehension.score)}</strong></div>
        </section>
      </div>

      <section class="card" style="margin-top:18px">
        <div class="section-head" style="margin-top:0">
          <div>
            <h2>Subject performance</h2>
            <p>Scores from standardized core activities</p>
          </div>
        </div>

        ${[
          ["Mathematics", state.progress.math],
          ["Filipino", state.progress.filipino],
          ["English", state.progress.english]
        ].map(([name, score]) => `
          <div class="result-row">
            <label>${name}</label>
            <div class="progress"><span style="width:${score}%"></span></div>
            <strong>${score}%</strong>
          </div>
        `).join("")}
      </section>

      <section class="card" style="margin-top:18px">
        <p class="eyebrow">AI recommendation</p>
        <h3>${mastery.ready ? "Excellent — you're ready to continue." : "One more practice step can help."}</h3>
        <div class="feedback-box">
          <p>${escapeHTML(recommendation)}</p>
        </div>
        <div class="action-row">
          ${mastery.ready
            ? `<button class="btn success" data-action="go-activities">Continue learning</button>`
            : `<button class="btn warning" data-action="go-activities">Additional practice</button>`}
          <button class="btn secondary" data-action="go-dashboard">Dashboard</button>
          <button class="btn secondary" data-action="logout">Log out</button>
        </div>
      </section>

      <p class="footer-note">AI-assisted results are prototype estimates and should not be treated as a clinical, diagnostic, or definitive pronunciation assessment.</p>
    </div>
  `);

  document.querySelector('[data-action="go-activities"]').addEventListener("click", () => go("activities"));
  document.querySelector('[data-action="go-dashboard"]').addEventListener("click", () => go("dashboard"));
  document.querySelector('[data-action="logout"]').addEventListener("click", logout);
}

/* ------------------------- Global Actions ------------------------- */

document.addEventListener("click", event => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  switch (action) {
    case "go-dashboard":
      if (requireLogin()) go("dashboard");
      break;
    case "go-learning":
      if (requireGrade()) go(state.reading.finished ? "activities" : "reading");
      break;
    case "go-results":
      if (requireGrade()) go("results");
      break;
    case "toggle-mobile-menu":
      toggleMobileMenu();
      break;
    case "logout":
      logout();
      break;
    case "go-assessment":
      if (requireGrade()) go("assessment");
      break;
  }
});

function logout() {
  stopRecognition();
  clearInterval(readingProgressTimer);
  clearTimeout(analysisTimer);

  const keepData = window.confirm("Log out while keeping your saved learning progress on this device?\n\nOK = Keep progress\nCancel = Clear progress");
  if (!keepData) {
    try { localStorage.removeItem(CONFIG.storageKey); } catch (_) {}
    state = clone(defaultState);
  } else {
    state.loggedIn = false;
    state.stage = "login";
    saveState();
  }
  clearSession();
  showToast("You have been logged out.");
  render();
}

/* ------------------------- Safety / State Recovery ------------------------- */

window.addEventListener("error", event => {
  console.error(event.error || event.message);
  showToast("Something went wrong. Your saved progress was kept when possible.");
});

window.addEventListener("beforeunload", () => {
  stopRecognition();
  saveState();
});

restoreSession();

if (!state.loggedIn) state.stage = "login";
else if (!state.grade) state.stage = "grade";
else if (!state.stage || state.stage === "login") state.stage = "dashboard";

render();
