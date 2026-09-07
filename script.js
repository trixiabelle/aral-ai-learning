/* =========================================================
   ARAL AI — Vanilla JS Learning Platform Prototype
   ---------------------------------------------------------
   Core curriculum is standardized by grade. The AI layer
   personalizes support, practice, feedback, and retry paths.
   Replace AIEngine methods with real API/ML calls in future.
   ========================================================= */

"use strict";

/* ------------------------- ARAL AI API ------------------------- */

const ARAL_AI_API_URL =
  "https://aral-ai-api.tugastrixiabelle.workers.dev";

async function askAralAI(prompt) {
  try {
    const response = await fetch(ARAL_AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt })
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || data.message || data.output || null;
  } catch (error) {
    console.error("ARAL AI API Error:", error);
    return null;
  }
}

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
      { q: "What can trees provide for birds and insects?", choices: ["Homes", "Cars", "Books", "Computers"], answer: 0 },
      { q: "What can planting trees do in cities?", choices: ["Make public spaces more pleasant.", "Remove all buildings.", "Stop all traffic.", "Make roads narrower."], answer: 0 },
      { q: "What does caring for trees require?", choices: ["Regular watering and protection.", "Cutting every branch.", "Ignoring the land.", "Removing all insects."], answer: 0 }
    ],
    activities: {
      math: [
        { q: "What is 125 + 238?", choices: ["353", "363", "373", "383"], answer: 1 },
        { q: "What is 9 × 8?", choices: ["63", "72", "81", "89"], answer: 1 },
        { q: "What is 3/4 of 20?", choices: ["10", "12", "15", "18"], answer: 2 }
      ],
      filipino: [
        { q: "Ano ang ibig sabihin ng 'responsibilidad'?", choices: ["Tungkulin na dapat gampanan", "Laruan", "Pahinga", "Paglalakbay"], answer: 0 },
        { q: "Alin ang pang-uri?", choices: ["Mabilis", "Tumakbo", "Bahay", "Kumain"], answer: 0 },
        { q: "Ano ang kasingkahulugan ng 'maganda'?", choices: ["Marumi", "Marikit", "Mabagal", "Malakas"], answer: 1 }
      ],
      english: [
        { q: "Which word is a verb?", choices: ["Care", "Beautiful", "Quickly", "Green"], answer: 0 },
        { q: "Choose the correct sentence.", choices: ["The trees gives shade.", "The trees give shade.", "The trees giving shade.", "The trees is give shade."], answer: 1 },
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
  if (!main) return;

  main.innerHTML = html;

  main.focus({ preventScroll: true });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function renderTopbar() {
  const topbar = document.getElementById("topbar");

  if (!topbar) return;

  if (!state.loggedIn) {
    topbar.classList.add("hidden");
    return;
  }

  topbar.classList.remove("hidden");

  const nameElement = document.getElementById("nav-student-name");
  const avatarElement = document.getElementById("nav-avatar");

  if (nameElement) {
    nameElement.textContent = state.student.name || "Student";
  }

  if (avatarElement) {
    avatarElement.textContent =
      (state.student.name || "S").trim().charAt(0).toUpperCase();
  }
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");

  if (menu) {
    menu.classList.add("hidden");
  }

  document
    .querySelector('[data-action="toggle-mobile-menu"]')
    ?.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");

  if (!menu) return;

  const isHidden = menu.classList.toggle("hidden");

  document
    .querySelector('[data-action="toggle-mobile-menu"]')
    ?.setAttribute("aria-expanded", String(!isHidden));
}

/* ------------------------- Navigation ------------------------- */

function go(stage) {
  if (stage === "login") {
    state.stage = "login";
  } else if (stage === "grade") {
    if (!requireLogin()) return;
    state.stage = "grade";
  } else if (stage === "dashboard") {
    if (!requireGrade()) return;
    state.stage = "dashboard";
  } else if (stage === "reading") {
    if (!requireGrade()) return;
    state.stage = "reading";
  } else if (stage === "readingAnalysis") {
    if (!requireGrade()) return;
    state.stage = "readingAnalysis";
  } else if (stage === "words") {
    if (!requireGrade()) return;
    state.stage = "words";
  } else if (stage === "assessment") {
    if (!requireGrade()) return;
    state.stage = "assessment";
  } else if (stage === "evaluation") {
    if (!requireGrade()) return;
    state.stage = "evaluation";
  } else if (stage === "feedback") {
    if (!requireGrade()) return;
    state.stage = "feedback";
  } else if (stage === "activities") {
    if (!requireGrade()) return;
    state.stage = "activities";
  } else if (stage === "activity") {
    if (!requireGrade()) return;
    state.stage = "activity";
  } else if (stage === "results") {
    if (!requireGrade()) return;
    state.stage = "results";
  } else {
    state.stage = stage;
  }

  saveState();
  render();
}

function requireLogin() {
  if (!state.loggedIn) {
    showToast("Please log in first.");
    go("login");
    return false;
  }

  return true;
}

function requireGrade() {
  if (!requireLogin()) return false;

  if (!state.grade || !gradeContent[state.grade]) {
    showToast("Please select your grade level first.");
    go("grade");
    return false;
  }

  return true;
}

/* ------------------------- Stepper ------------------------- */

function stepper(current) {
  const steps = [
    ["grade", "Grade"],
    ["reading", "Reading"],
    ["assessment", "Assessment"],
    ["evaluation", "Evaluation"],
    ["activities", "Activities"],
    ["results", "Results"]
  ];

  const order = steps.map(step => step[0]);
  const currentIndex = order.indexOf(current);

  return `
    <div class="stepper">
      ${steps
        .map(([id, label], index) => {
          const active = id === current;
          const complete = currentIndex > index;

          return `
            <div class="step ${
              active ? "active" : ""
            } ${complete ? "complete" : ""}">
              <span class="step-number">
                ${complete ? "✓" : index + 1}
              </span>
              <span class="step-label">${escapeHTML(label)}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

/* ------------------------- Main Render ------------------------- */

function render() {
  renderTopbar();

  switch (state.stage) {
    case "login":
      renderLogin();
      break;

    case "grade":
      renderGradeSelection();
      break;

    case "dashboard":
      renderDashboard();
      break;

    case "reading":
      renderReading();
      break;

    case "readingAnalysis":
      renderReadingAnalysis();
      break;

    case "words":
      renderDifficultWords();
      break;

    case "assessment":
      renderAssessment();
      break;

    case "evaluation":
      renderEvaluation();
      break;

    case "feedback":
      renderFeedback();
      break;

    case "activities":
      renderActivityMenu();
      break;

    case "activity":
      renderActivity();
      break;

    case "results":
      renderResults();
      break;

    default:
      go(
        state.loggedIn
          ? state.grade
            ? "dashboard"
            : "grade"
          : "login"
      );
  }
}

/* ------------------------- Login ------------------------- */

function renderLogin() {
  setMain(`
    <div class="page login-page">
      <section class="login-shell">
        <div class="login-brand">
          <div class="brand-mark">A</div>
          <div>
            <p class="eyebrow">Aral Program</p>
            <h1>Welcome to ARAL AI</h1>
          </div>
        </div>

        <p class="login-intro">
          Your personalized learning companion for reading,
          comprehension, and practice.
        </p>

        <form id="login-form" class="card login-card">
          <div class="field">
            <label for="student-name">Student name</label>
            <input
              id="student-name"
              name="name"
              type="text"
              placeholder="Enter your name"
              autocomplete="name"
              required
            />
          </div>

          <div class="field">
            <label for="student-id">Student ID</label>
            <input
              id="student-id"
              name="id"
              type="text"
              placeholder="Enter your student ID"
              autocomplete="off"
              required
            />
          </div>

          <button class="btn primary full" type="submit">
            Start learning
          </button>

          <p class="small-text center">
            Your learning progress is saved on this device.
          </p>
        </form>

        <div class="login-features">
          <div class="feature-mini">
            <span>📖</span>
            <strong>Read</strong>
            <small>Practice reading aloud</small>
          </div>

          <div class="feature-mini">
            <span>🧠</span>
            <strong>Understand</strong>
            <small>Check comprehension</small>
          </div>

          <div class="feature-mini">
            <span>✨</span>
            <strong>Improve</strong>
            <small>Get personalized feedback</small>
          </div>
        </div>
      </section>
    </div>
  `);

  const form = document.getElementById("login-form");

  form?.addEventListener("submit", handleLogin);
}

function handleLogin(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = String(formData.get("name") || "").trim();
  const id = String(formData.get("id") || "").trim();

  if (!name || !id) {
    showToast("Please enter your name and student ID.");
    return;
  }

  state.loggedIn = true;

  state.student = {
    name,
    id
  };

  state.sessionStartedAt =
    state.sessionStartedAt || new Date().toISOString();

  saveState();
  saveSession();

  showToast(`Welcome, ${name}!`);

  go(state.grade ? "dashboard" : "grade");
}

/* ------------------------- Grade Selection ------------------------- */

function renderGradeSelection() {
  if (!requireLogin()) return;

  const grades = Object.entries(gradeContent);

  setMain(`
    <div class="page">
      <section class="hero">
        <p class="eyebrow">Step 01 • Grade level</p>
        <h1>Choose your grade level</h1>
        <p>
          Select the grade level that matches your current learning program.
          Your lessons and activities will be adjusted to that level.
        </p>
      </section>

      <section class="grade-grid">
        ${grades
          .map(
            ([id, grade]) => `
              <button
                class="grade-card ${
                  state.grade === id ? "selected" : ""
                }"
                data-grade="${escapeHTML(id)}"
              >
                <span class="grade-icon">
                  ${id.replace("grade", "")}
                </span>

                <span class="grade-content">
                  <strong>${escapeHTML(grade.label)}</strong>
                  <span>${escapeHTML(grade.description)}</span>
                  <small>
                    ${grade.activitiesCount} practice activities
                  </small>
                </span>

                <span class="grade-arrow">→</span>
              </button>
            `
          )
          .join("")}
      </section>

      ${
        state.grade
          ? `
            <div class="action-row">
              <button
                class="btn primary"
                data-action="continue-grade"
              >
                Continue with ${escapeHTML(getGrade().label)}
              </button>
            </div>
          `
          : ""
      }
    </div>
  `);

  document.querySelectorAll("[data-grade]").forEach(card => {
    card.addEventListener("click", () => {
      selectGrade(card.dataset.grade);
    });
  });

  document
    .querySelector('[data-action="continue-grade"]')
    ?.addEventListener("click", () => go("dashboard"));
}

function selectGrade(gradeId) {
  if (!gradeContent[gradeId]) return;

  const changed = state.grade !== gradeId;

  state.grade = gradeId;

  if (changed) {
    resetLearningOnly();
  }

  saveState();
  saveSession();

  showToast(`${gradeContent[gradeId].label} selected.`);

  render();
}

function resetLearningOnly() {
  state.stage = "dashboard";

  state.reading = clone(defaultState.reading);
  state.assessment = clone(defaultState.assessment);
  state.activities = clone(defaultState.activities);
  state.progress = clone(defaultState.progress);
  state.recommendations = [];
}

/* ------------------------- Dashboard ------------------------- */

function averageProgress() {
  const values = Object.values(state.progress || {});

  if (!values.length) return 0;

  return Math.round(
    values.reduce((sum, value) => sum + Number(value || 0), 0) /
      values.length
  );
}

function currentFocus() {
  const progress = state.progress || defaultState.progress;

  return Object.entries(progress).sort(
    (a, b) => Number(a[1]) - Number(b[1])
  )[0]?.[0] || "math";
}

function getDashboardRecommendation() {
  if (!state.reading.finished) {
    return "Start the reading lesson to begin your personalized learning path.";
  }

  if (!state.assessment.submitted) {
    return "Complete the comprehension assessment to see what you understood.";
  }

  if (state.assessment.score < CONFIG.masteryThreshold) {
    return "Review the reading and practice comprehension before moving forward.";
  }

  const focus = currentFocus();

  return `Continue with ${capitalize(
    focus
  )} practice to strengthen your current focus area.`;
}

function renderDashboard() {
  if (!requireGrade()) return;

  const grade = getGrade();
  const average = averageProgress();
  const focus = currentFocus();

  setMain(`
    <div class="page">
      <section class="dashboard-welcome">
        <div>
          <p class="eyebrow">${escapeHTML(grade.label)} learning path</p>
          <h1>
            Hi, ${escapeHTML(state.student.name)}! 👋
          </h1>
          <p>
            Welcome back to your ARAL AI learning space.
          </p>
        </div>

        <div class="dashboard-score">
          <span>Overall progress</span>
          <strong>${average}%</strong>
        </div>
      </section>

      <section class="card recommendation-card">
        <div class="recommendation-icon">✨</div>

        <div>
          <p class="eyebrow">ARAL AI recommendation</p>
          <h2>Here's your next step</h2>
          <p>${escapeHTML(getDashboardRecommendation())}</p>
        </div>

        <button class="btn primary" data-action="dashboard-next">
          Continue
        </button>
      </section>

      <section class="grid grid-3" style="margin-top:16px">
        <article class="card progress-card">
          <div class="progress-card-top">
            <span>Reading</span>
            <strong>
              ${
                state.reading.finished
                  ? state.reading.analysis?.pronunciationAccuracy || 0
                  : 0
              }%
            </strong>
          </div>

          <div class="progress">
            <span
              style="width:${
                state.reading.finished
                  ? state.reading.analysis?.pronunciationAccuracy || 0
                  : 0
              }%"
            ></span>
          </div>

          <small>
            ${
              state.reading.finished
                ? "Completed"
                : "Not completed"
            }
          </small>
        </article>

        <article class="card progress-card">
          <div class="progress-card-top">
            <span>Comprehension</span>
            <strong>${state.assessment.score || 0}%</strong>
          </div>

          <div class="progress">
            <span style="width:${state.assessment.score || 0}%"></span>
          </div>

          <small>
            ${
              state.assessment.submitted
                ? "Assessment completed"
                : "Assessment pending"
            }
          </small>
        </article>

        <article class="card progress-card">
          <div class="progress-card-top">
            <span>Focus subject</span>
            <strong>${escapeHTML(capitalize(focus))}</strong>
          </div>

          <div class="progress">
            <span style="width:${state.progress[focus] || 0}%"></span>
          </div>

          <small>Current lowest practice score</small>
        </article>
      </section>

      <section class="card" style="margin-top:16px">
        <div class="section-head">
          <div>
            <p class="eyebrow">Learning journey</p>
            <h2>Keep building your skills</h2>
          </div>
        </div>

        <div class="journey-grid">
          <button class="journey-item" data-action="go-reading">
            <span>📖</span>
            <strong>Reading</strong>
            <small>Read the grade-level passage</small>
          </button>

          <button class="journey-item" data-action="go-assessment">
            <span>📝</span>
            <strong>Assessment</strong>
            <small>Check your understanding</small>
          </button>

          <button class="journey-item" data-action="go-activities">
            <span>🎯</span>
            <strong>Activities</strong>
            <small>Practice Math, Filipino, and English</small>
          </button>

          <button class="journey-item" data-action="go-results">
            <span>📊</span>
            <strong>Results</strong>
            <small>View your learning progress</small>
          </button>
        </div>
      </section>
    </div>
  `);

  document
    .querySelector('[data-action="dashboard-next"]')
    ?.addEventListener("click", () => {
      if (!state.reading.finished) {
        go("reading");
      } else if (!state.assessment.submitted) {
        go("assessment");
      } else {
        go("activities");
      }
    });

  document
    .querySelector('[data-action="go-reading"]')
    ?.addEventListener("click", () => go("reading"));

  document
    .querySelector('[data-action="go-assessment"]')
    ?.addEventListener("click", () => go("assessment"));

  document
    .querySelector('[data-action="go-activities"]')
    ?.addEventListener("click", () => go("activities"));

  document
    .querySelector('[data-action="go-results"]')
    ?.addEventListener("click", () => go("results"));
}

/* ------------------------- Reading ------------------------- */

function renderReading() {
  if (!requireGrade()) return;

  const grade = getGrade();
  const reading = grade.reading;

  const words = reading.passage
    .split(/\s+/)
    .filter(Boolean);

  setMain(`
    <div class="page">
      ${stepper("reading")}

      <section class="hero">
        <p class="eyebrow">Step 02 • Reading</p>
        <h1>${escapeHTML(reading.title)}</h1>
        <p>
          Read the passage aloud and let ARAL AI help identify
          your reading strengths and areas for improvement.
        </p>
      </section>

      <section class="card reading-card">
        <div class="reading-header">
          <div>
            <span class="badge info">${escapeHTML(grade.label)}</span>
            <span class="badge">${escapeHTML(reading.time)}</span>
          </div>

          <span id="recording-status" class="badge">
            Ready
          </span>
        </div>

        <div id="reading-passage" class="reading-passage">
          ${words
            .map(
              (word, index) =>
                `<span class="reading-word" data-word-index="${index}">
                  ${escapeHTML(word)}
                </span>`
            )
            .join(" ")}
        </div>

        <div class="reading-progress-wrap">
          <div class="progress">
            <span
              id="reading-progress-bar"
              style="width:0%"
            ></span>
          </div>

          <div class="reading-progress-label">
            <span>Reading progress</span>
            <strong id="reading-progress-text">0%</strong>
          </div>
        </div>

        <div
          id="speech-message"
          class="feedback-box"
          style="margin-top:18px"
        >
          <p>
            Press <strong>Start reading</strong> and read the
            passage naturally and clearly.
          </p>
        </div>

        <div class="action-row">
          <button
            class="btn primary"
            id="start-reading-btn"
            data-action="start-reading"
          >
            🎙️ Start reading
          </button>

          <button
            class="btn secondary hidden"
            id="stop-reading-btn"
            data-action="stop-reading"
          >
            Stop reading
          </button>

          <button
            class="btn secondary"
            id="finish-reading-btn"
            data-action="finish-reading"
          >
            Finish reading
          </button>
        </div>
      </section>
    </div>
  `);

  setupReadingEvents();
}
          <h1 style="margin:0;color:var(--navy)">${reading.title}</h1>
          <p>Estimated reading time: ${reading.time}</p>
        </div>
        <span class="badge info">${reading.difficulty}</span>
      </section>

      <section class="card reading-card">
        <div class="reading-meta">
          <span>${reading.genre}</span>
          <span>${reading.words} words</span>
        </div>

        <div class="reading-text" id="reading-text">
          ${escapeHTML(reading.text)}
        </div>

        <div class="reading-controls">
          <button class="btn primary" id="start-reading">Start Reading</button>
          <button class="btn secondary" id="finish-reading" disabled>Finish Reading</button>
        </div>

        <div class="reading-status" id="reading-status">
          Press <strong>Start Reading</strong> when you are ready.
        </div>

        <div class="progress-wrap">
          <div class="progress-label">
            <span>Reading progress</span>
            <span id="reading-progress-label">0%</span>
          </div>
          <div class="progress-bar">
            <span id="reading-progress-bar" style="width:0%"></span>
          </div>
        </div>
      </section>

      <div class="action-row">
        <button class="btn ghost" data-action="back-dashboard">Back to dashboard</button>
      </div>
    </div>
  `);

  setupReadingEvents(reading);
}

function setupReadingEvents(reading) {
  const startBtn = document.getElementById("start-reading");
  const finishBtn = document.getElementById("finish-reading");
  const status = document.getElementById("reading-status");

  let recognition = null;
  let startedAt = null;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      status.innerHTML = "<strong>Listening…</strong> Read the passage aloud clearly.";
    };

    recognition.onresult = event => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      state.reading.recognizedText += transcript;
      updateReadingProgress(reading);
    };

    recognition.onerror = error => {
      console.warn("Speech recognition error:", error);
      status.innerHTML = "Speech recognition is unavailable. You can still finish the reading activity.";
    };

    recognition.onend = () => {
      if (state.reading.started && !state.reading.finished) {
        try {
          recognition.start();
        } catch (error) {
          console.warn(error);
        }
      }
    };
  } else {
    status.innerHTML =
      "Speech recognition is not supported in this browser. You can still complete the activity.";
  }

  startBtn.addEventListener("click", () => {
    state.reading.started = true;
    state.reading.finished = false;
    state.reading.recognizedText = "";
    startedAt = Date.now();

    startBtn.disabled = true;
    finishBtn.disabled = false;

    status.innerHTML =
      "<strong>Reading in progress…</strong> Take your time and read clearly.";

    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.warn(error);
      }
    }

    saveState();
  });

  finishBtn.addEventListener("click", () => {
    state.reading.finished = true;

    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.warn(error);
      }
    }

    const elapsed = startedAt
      ? Math.max(1, Math.round((Date.now() - startedAt) / 1000))
      : 1;

    state.reading.elapsedSeconds = elapsed;
    state.reading.analysis = AIEngine.analyzeReading();

    saveState();
    go("readingAnalysis");
  });

  document.querySelector('[data-action="back-dashboard"]')
    ?.addEventListener("click", () => go("dashboard"));

  updateReadingProgress(reading);
}

function updateReadingProgress(reading) {
  const expectedWords = reading.text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const recognizedWords = state.reading.recognizedText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const progress = expectedWords
    ? Math.min(100, Math.round((recognizedWords / expectedWords) * 100))
    : 0;

  const bar = document.getElementById("reading-progress-bar");
  const label = document.getElementById("reading-progress-label");

  if (bar) bar.style.width = `${progress}%`;
  if (label) label.textContent = `${progress}%`;
}

/* ------------------------- Reading Progress ------------------------- */

function getReadingProgress() {
  const text = getGrade()?.reading?.text || "";
  const totalWords = text.trim().split(/\s+/).filter(Boolean).length;

  const spokenWords = state.reading.recognizedText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (!totalWords) return 0;

  return Math.min(
    100,
    Math.round((spokenWords / totalWords) * 100)
  );
}

function finishReading() {
  if (!requireGrade()) return;

  state.reading.finished = true;
  state.reading.analysis = AIEngine.analyzeReading();

  saveState();
  go("readingAnalysis");
}

/* ------------------------- AI Engine ------------------------- */

const AIEngine = {
  async ask(prompt) {
    return await askAralAI(prompt);
  },

  async generateAIFeedback(reading, comprehension) {
    const fallback = this.generateFeedback(reading, comprehension);
    const studentName = state.student?.name || "Student";
    const gradeLabel = getGrade()?.label || "the student's grade";
    const difficultWords =
      reading.difficultWords?.join(", ") || "none identified";

    const prompt = `You are Aral AI, a friendly educational AI tutor for Filipino students.

Student: ${studentName}
Grade: ${gradeLabel}
Reading accuracy: ${reading.pronunciationAccuracy}%
Reading fluency: ${reading.fluency}
Possible mispronunciations: ${reading.possibleMispronunciations}
Difficult words: ${difficultWords}
Comprehension score: ${comprehension.score}% (${comprehension.correct}/${comprehension.total})

Give short, encouraging, age-appropriate personalized feedback. Mention one strength, one area to improve, one specific practice suggestion, and a motivational closing. Keep it easy to understand. Do not mention APIs, Cloudflare, programming, or technical details.`;

    const response = await this.ask(prompt);
    return response || fallback.message;
  },

  analyzeReading() {
    const reading = getGrade().reading;
    const expected = normalizeText(reading.text);
    const spoken = normalizeText(state.reading.recognizedText || "");

    const expectedWords = expected.split(/\s+/).filter(Boolean);
    const spokenWords = spoken.split(/\s+/).filter(Boolean);

    let matches = 0;

    expectedWords.forEach((word, index) => {
      if (spokenWords[index] === word) {
        matches++;
      }
    });

    const pronunciationAccuracy = expectedWords.length
      ? Math.round((matches / expectedWords.length) * 100)
      : 0;

    const difficultWords = reading.difficultWords || [];

    const possibleMispronunciations = Math.max(
      0,
      expectedWords.length - matches
    );

    const skippedWords = Math.max(
      0,
      expectedWords.length - spokenWords.length
    );

    const repeatedWords = Math.max(
      0,
      spokenWords.length - expectedWords.length
    );

    const elapsed = Math.max(
      1,
      Number(state.reading.elapsedSeconds || 1)
    );

    const wordsPerMinute = Math.round(
      (spokenWords.length / elapsed) * 60
    );

    let fluency = "Needs practice";

    if (wordsPerMinute >= 100 && pronunciationAccuracy >= 85) {
      fluency = "Excellent";
    } else if (wordsPerMinute >= 70 && pronunciationAccuracy >= 70) {
      fluency = "Good";
    } else if (wordsPerMinute >= 40 && pronunciationAccuracy >= 50) {
      fluency = "Developing";
    }

    return {
      pronunciationAccuracy,
      difficultWords,
      possibleMispronunciations,
      skippedWords,
      repeatedWords,
      wordsPerMinute,
      fluency
    };
  },

  evaluateComprehension() {
    const questions = getGrade().comprehension;
    const answers = state.assessment.answers || [];

    let correct = 0;

    questions.forEach((question, index) => {
      if (Number(answers[index]) === Number(question.answer)) {
        correct++;
      }
    });

    const score = questions.length
      ? Math.round((correct / questions.length) * 100)
      : 0;

    return {
      score,
      correct,
      total: questions.length
    };
  },

  generateFeedback(reading, comprehension) {
    const strengths = [];
    const weaknesses = [];

    if (reading.pronunciationAccuracy >= 80) {
      strengths.push("Your reading accuracy is strong.");
    } else {
      weaknesses.push("Work on reading each word carefully and clearly.");
    }

    if (comprehension.score >= 80) {
      strengths.push("You understood most of the reading passage.");
    } else {
      weaknesses.push("Review the passage and focus on its main ideas.");
    }

    if (reading.fluency === "Excellent" || reading.fluency === "Good") {
      strengths.push("Your reading pace shows good fluency.");
    } else {
      weaknesses.push("Practice reading aloud at a steady and comfortable pace.");
    }

    if (!strengths.length) {
      strengths.push("You completed the activity and are building your skills.");
    }

    if (!weaknesses.length) {
      weaknesses.push("Keep practicing to make your skills even stronger.");
    }

    const score = Math.round(
      (reading.pronunciationAccuracy + comprehension.score) / 2
    );

    let message = "";

    if (score >= 90) {
      message =
        "Excellent work! You showed strong reading and comprehension skills. Keep challenging yourself with new passages.";
    } else if (score >= 80) {
      message =
        "Great job! You are developing solid reading skills. A little more practice can make your performance even stronger.";
    } else if (score >= 70) {
      message =
        "Good effort! You are making progress. Keep practicing your reading and review the parts of the passage that were difficult.";
    } else {
      message =
        "Keep going! Learning takes practice. Read the passage again, practice difficult words, and try the activities again.";
    }

    return {
      strengths,
      weaknesses,
      message,
      score
    };
  },

  recommendPractice(scores) {
    if (scores.reading < 70 && scores.comprehension < 70) {
      return "Read the passage aloud again, practice the difficult words, and review the main idea before answering the questions.";
    }

    if (scores.reading < 70) {
      return "Practice reading aloud slowly and clearly. Focus especially on difficult words.";
    }

    if (scores.comprehension < 70) {
      return "Review the passage and identify the main idea, important details, and sequence of events.";
    }

    return "Continue reading different passages and answering comprehension questions to maintain your progress.";
  }
};

function renderReadingAnalysis() {
  if (!requireGrade()) return;

  const reading = getGrade().reading;
  const analysis = state.reading.analysis || AIEngine.analyzeReading();

  state.reading.analysis = analysis;
  saveState();

  setMain(`
    <div class="page">
      ${stepper("readingAnalysis")}

      <section class="section-head">
        <div>
          <p class="eyebrow">Step 02 • Reading analysis</p>
          <h1 style="margin:0;color:var(--navy)">Your reading results</h1>
          <p>Here is your AI-assisted reading analysis for <strong>${escapeHTML(reading.title)}</strong>.</p>
        </div>
        <span class="badge ${analysis.pronunciationAccuracy >= 80 ? "success" : "warn"}">
          ${analysis.pronunciationAccuracy}% accuracy
        </span>
      </section>

      <div class="grid grid-4" style="margin-top:18px">
        <div class="card">
          <p class="small-text">Pronunciation Accuracy</p>
          <strong style="font-size:25px;color:var(--navy)">${analysis.pronunciationAccuracy}%</strong>
        </div>

        <div class="card">
          <p class="small-text">Difficult Words</p>
          <strong style="font-size:25px;color:var(--navy)">${analysis.difficultWords.length}</strong>
        </div>

        <div class="card">
          <p class="small-text">Possible Mispronunciations</p>
          <strong style="font-size:25px;color:var(--navy)">${analysis.possibleMispronunciations}</strong>
        </div>

        <div class="card">
          <p class="small-text">Fluency</p>
          <strong style="font-size:25px;color:var(--navy)">${analysis.fluency}</strong>
        </div>
      </div>

      <div class="action-row">
        <button class="btn primary" data-action="go-assessment">
          Continue to comprehension
        </button>

        <button class="btn secondary" data-action="go-reading-retry">
          Read again
        </button>
      </div>
    </div>
  `);

  document.querySelector('[data-action="go-assessment"]')
    .addEventListener("click", () => go("assessment"));

  document.querySelector('[data-action="go-reading-retry"]')
    .addEventListener("click", () => {
      state.reading.started = false;
      state.reading.finished = false;
      state.reading.recognizedText = "";
      saveState();
      go("reading");
    });
}

function runAnalysisSequence() {
  if (!requireGrade()) return;

  state.reading.analysis = AIEngine.analyzeReading();
  saveState();
  go("readingAnalysis");
}

function renderDifficultWords() {
  if (!requireGrade()) return;

  const reading = getGrade().reading;
  const analysis = state.reading.analysis || AIEngine.analyzeReading();

  setMain(`
    <div class="page">
      ${stepper("words")}

      <section class="section-head">
        <div>
          <p class="eyebrow">Vocabulary practice</p>
          <h1 style="margin:0;color:var(--navy)">Practice difficult words</h1>
          <p>Practice words from your reading passage that may need extra attention.</p>
        </div>
      </section>

      <section class="card">
        <h2>${escapeHTML(reading.title)}</h2>
        <p>${escapeHTML(analysis.note || "Practice each word slowly and clearly.")}</p>
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

        <button class="btn primary full" type="submit">
          Submit Assessment
        </button>
      </form>
    </div>
  `);

  document.getElementById("assessment-form")
    .addEventListener("submit", handleAssessmentSubmit);
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

  state.history.push({
    type: "assessment",
    score: result.score,
    at: new Date().toISOString()
  });

  saveState();

  go("evaluation");
}

/* ------------------------- Evaluation ------------------------- */

function renderEvaluation() {
  if (!requireGrade()) return;

  const reading = state.reading.analysis || AIEngine.analyzeReading();
  const comprehension = AIEngine.evaluateComprehension();

  const overall = Math.round(
    (reading.pronunciationAccuracy + comprehension.score) / 2
  );

  const feedback = AIEngine.generateFeedback(
    reading,
    comprehension
  );

  setMain(`
    <div class="page">
      ${stepper("evaluation")}

      <section class="hero">
        <p class="eyebrow">Step 04 • AI evaluation</p>

        <h1>Your learning profile is ready</h1>

        <p>
          ARAL AI combines reading and comprehension signals
          to identify strengths and areas that may benefit
          from additional support.
        </p>
      </section>

      <div class="grid grid-3" style="margin-top:18px">

        <div class="card center">
          <p class="small-text">Overall evaluation</p>

          <div class="score-ring" style="--score:${overall}">
            <div class="score-value">
              <strong>${overall}%</strong>
              <span>${masteryLabel(overall)}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Strengths</h3>

          <ul class="list-clean">
            ${feedback.strengths.map(x => `
              <li>${escapeHTML(x)}</li>
            `).join("")}
          </ul>
        </div>

        <div class="card">
          <h3>Needs improvement</h3>

          <ul class="list-clean">
            ${feedback.weaknesses.map(x => `
              <li>${escapeHTML(x)}</li>
            `).join("")}
          </ul>
        </div>

      </div>

      <div class="card" style="margin-top:18px">

        <div class="metric">
          <span>Reading accuracy</span>
          <strong>${reading.pronunciationAccuracy}%</strong>
        </div>

        <div class="metric">
          <span>Reading fluency</span>
          <strong>${reading.fluency}</strong>
        </div>

        <div class="metric">
          <span>Comprehension</span>
          <strong>${comprehension.score}%</strong>
        </div>

        <div class="metric">
          <span>Possible mispronunciations</span>
          <strong>${reading.possibleMispronunciations}</strong>
        </div>

      </div>

      <div class="action-row">
        <button class="btn primary" data-action="go-feedback">
          View personalized feedback
        </button>
      </div>

    </div>
  `);

  document.querySelector('[data-action="go-feedback"]')
    .addEventListener("click", () => {
      state.recommendations = feedback.weaknesses;
      saveState();
      go("feedback");
    });
}

/* ------------------------- Feedback ------------------------- */

async function renderFeedback() {
  if (!requireGrade()) return;

  const reading =
    state.reading.analysis || AIEngine.analyzeReading();

  const comprehension =
    AIEngine.evaluateComprehension();

  const feedback =
    AIEngine.generateFeedback(reading, comprehension);

  setMain(`
    <div class="page narrow">

      ${stepper("evaluation")}

      <section class="card">

        <p class="eyebrow">
          Personalized AI feedback
        </p>

        <h1 style="margin:0;color:var(--navy)">
          You can do this!
        </h1>

        <div class="feedback-box" style="margin-top:18px">
          <p id="ai-feedback-message">
            ARAL AI is preparing personalized feedback for you…
          </p>
        </div>

        <div class="grid grid-2" style="margin-top:18px">

          <div>
            <h3>What you're doing well</h3>

            <ul class="list-clean">
              ${feedback.strengths.map(x => `
                <li>${escapeHTML(x)}</li>
              `).join("")}
            </ul>
          </div>

          <div>
            <h3>Let's work on</h3>

            <ul class="list-clean">
              ${feedback.weaknesses.map(x => `
                <li>${escapeHTML(x)}</li>
              `).join("")}
            </ul>
          </div>

        </div>

        <div class="divider"></div>

        <h3>Recommended practice</h3>

        <p>
          ${escapeHTML(AIEngine.recommendPractice({
            reading: reading.pronunciationAccuracy,
            comprehension: comprehension.score
          }))}
        </p>

        <div class="action-row">

          <button class="btn primary" data-action="go-activities">
            Continue to activities
          </button>

          ${
            reading.difficultWords.length
              ? `<button class="btn secondary" data-action="go-words">
                   Practice difficult words
                 </button>`
              : ""
          }

        </div>

      </section>

    </div>
  `);

  document.querySelector('[data-action="go-activities"]')
    .addEventListener("click", () => go("activities"));

  document.querySelector('[data-action="go-words"]')
    ?.addEventListener("click", () => go("words"));

  const aiMessage =
    await AIEngine.generateAIFeedback(
      reading,
      comprehension
    );

  if (state.stage === "feedback") {
    const messageEl =
      document.getElementById("ai-feedback-message");

    if (messageEl) {
      messageEl.textContent = aiMessage;
    }
  }
}

/* ------------------------- Activity Menu ------------------------- */

function renderActivityMenu() {
  if (!requireGrade()) return;

  const subjects = [
    [
      "math",
      "Mathematics",
      "Basic arithmetic, patterns, and problem solving.",
      "＋"
    ],
    [
      "filipino",
      "Filipino",
      "Pagbasa, talasalitaan, at wastong paggamit ng salita.",
      "A"
    ],
    [
      "english",
      "English",
      "Vocabulary, grammar, and sentence skills.",
      "E"
    ]
  ];

  setMain(`
    <div class="page">

      ${stepper("activities")}

      <section class="hero">

        <p class="eyebrow">
          Step 05 • Interactive activities
        </p>

        <h1>Practice your skills</h1>

        <p>
          These are standardized core activities for
          ${getGrade().label}. ARAL AI uses your scores
          to recommend where you should practice more.
        </p>

      </section>

      <div class="grid grid-3" style="margin-top:18px">

        ${subjects.map(([key, name, desc, icon]) => {

          const score = state.progress[key] || 0;
          const done = state.activities.completed.includes(key);

          return `
            <article class="card subject-card">

              <div class="subject-icon">
                ${icon}
              </div>

              <h3>${name}</h3>

              <p>${desc}</p>

              <div class="subject-score">
                <strong>${score}%</strong>
                <span>${masteryLabel(score)}</span>
              </div>

              <button
                class="btn ${done ? "secondary" : "primary"} full"
                data-activity="${key}">
                ${done ? "Practice Again" : "Start Activity"}
              </button>

            </article>
          `;

        }).join("")}

      </div>

    </div>
  `);

  document.querySelectorAll("[data-activity]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.currentActivity = btn.dataset.activity;
      saveState();
      go("activity");
    });
  });
}
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

  const names = {
    math: "Mathematics",
    filipino: "Filipino",
    english: "English"
  };

  const index = Math.max(
    0,
    Math.min(
      state.currentActivityIndex || 0,
      questions.length - 1
    )
  );

  const item = questions[index];

  setMain(`
    <div class="page narrow">

      <div class="section-head">
        <div>
          <p class="eyebrow">Interactive activity</p>
          <h1 style="margin:0;color:var(--navy)">
            ${names[subject]}
          </h1>
          <p>
            Core activity ${index + 1} of ${questions.length}
            • ${getGrade().label}
          </p>
        </div>

        <span class="badge info">
          Attempt ${(state.activities.attempts[subject] || 0) + 1}
        </span>
      </div>

      <div class="card">

        <div class="progress">
          <span style="width:${((index) / questions.length) * 100}%"></span>
        </div>

        <div class="activity-question">
          <p class="question-number">
            Question ${index + 1}
          </p>

          <h3>${escapeHTML(item.q)}</h3>
        </div>

        <div id="activity-choices" class="choices">
          ${item.choices.map((choice, i) => `
            <label class="choice">
              <input
                type="radio"
                name="activity-choice"
                value="${i}">
              <span>${escapeHTML(choice)}</span>
            </label>
          `).join("")}
        </div>

        <div
          id="activity-error"
          class="alert error hidden"
          style="margin-top:14px">
        </div>

        <div class="action-row">

          <button
            class="btn primary"
            id="submit-activity">
            Submit answer
          </button>

          <button
            class="btn secondary"
            data-action="cancel-activity">
            Back to subjects
          </button>

        </div>

      </div>
    </div>
  `);

  document
    .getElementById("submit-activity")
    .addEventListener(
      "click",
      () => submitActivityAnswer(subject, index)
    );

  document
    .querySelector('[data-action="cancel-activity"]')
    .addEventListener(
      "click",
      () => go("activities")
    );
}

function submitActivityAnswer(subject, index) {
  const selected =
    document.querySelector(
      'input[name="activity-choice"]:checked'
    );

  const error =
    document.getElementById("activity-error");

  if (!selected) {
    error.textContent =
      "Choose an answer before submitting.";

    error.classList.remove("hidden");
    return;
  }

  const questions =
    getGrade().activities[subject];

  const correct =
    Number(selected.value) ===
    questions[index].answer;

  const key = `${subject}-current`;

  if (!state.activitySession) {
    state.activitySession = {};
  }

  if (!state.activitySession[key]) {
    state.activitySession[key] = [];
  }

  state.activitySession[key].push(correct);

  if (index < questions.length - 1) {
    state.currentActivityIndex = index + 1;

    saveState();
    renderActivity();

    return;
  }

  const answers =
    state.activitySession[key];

  const score =
    percent(
      answers.filter(Boolean).length,
      answers.length
    );

  state.progress[subject] = score;

  state.activities.attempts[subject] =
    (state.activities.attempts[subject] || 0) + 1;

  if (!state.activities.completed.includes(subject)) {
    state.activities.completed.push(subject);
  }

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
  const names = {
    math: "Mathematics",
    filipino: "Filipino",
    english: "English"
  };

  const meets =
    score >= CONFIG.masteryThreshold;

  setMain(`
    <div class="page narrow">

      <section class="card center">

        <p class="eyebrow">
          Activity complete
        </p>

        <div
          class="score-ring"
          style="--score:${score}">

          <div class="score-value">
            <strong>${score}%</strong>
            <span>${masteryLabel(score)}</span>
          </div>

        </div>

        <h1 style="margin:0;color:var(--navy)">
          ${names[subject]} activity
        </h1>

        <p>
          ${
            meets
              ? "Excellent! You reached the required level for this activity."
              : "You're making progress! This skill would benefit from another practice round."
          }
        </p>

        <div class="feedback-box">

          <p>
            ${
              meets
                ? "You are ready to continue. Keep the skill fresh with regular practice."
                : `Let's review the same core skill and try again. The mastery threshold is ${CONFIG.masteryThreshold}%.`
            }
          </p>

        </div>

        <div
          class="action-row"
          style="justify-content:center">

          ${
            meets
              ? `
                <button
                  class="btn success"
                  data-action="activity-continue">
                  Continue
                </button>
              `
              : `
                <button
                  class="btn warning"
                  data-action="activity-retry">
                  Retry
                </button>

                <button
                  class="btn secondary"
                  data-action="activity-review">
                  Review mistakes
                </button>
              `
          }

          <button
            class="btn secondary"
            data-action="activity-menu">
            All activities
          </button>

        </div>

      </section>

    </div>
  `);

  document
    .querySelector('[data-action="activity-continue"]')
    ?.addEventListener(
      "click",
      () => go("activities")
    );

  document
    .querySelector('[data-action="activity-retry"]')
    ?.addEventListener("click", () => {

      state.currentSubject = subject;
      state.currentActivityIndex = 0;

      saveState();
      go("activity");
    });

  document
    .querySelector('[data-action="activity-review"]')
    ?.addEventListener("click", () => {

      showToast(
        "Review mode: revisit the same standardized questions and retry."
      );

      state.currentSubject = subject;
      state.currentActivityIndex = 0;

      saveState();
      go("activity");
    });

  document
    .querySelector('[data-action="activity-menu"]')
    .addEventListener(
      "click",
      () => go("activities")
    );
}

/* ------------------------- Results ------------------------- */

function renderResults() {
  if (!requireGrade()) return;

  const reading =
    state.reading.analysis ||
    AIEngine.analyzeReading();

  const comprehension =
    state.assessment.submitted
      ? AIEngine.evaluateComprehension()
      : {
          score: 0,
          correct: 0,
          total: getGrade().comprehension.length
        };

  const mastery =
    AIEngine.evaluateMastery({
      reading: reading.pronunciationAccuracy,
      comprehension: comprehension.score,
      ...state.progress
    });

  const recommendation =
    mastery.ready
      ? "Proceed — your current performance meets the configured mastery threshold."
      : AIEngine.recommendPractice({
          reading: reading.pronunciationAccuracy,
          comprehension: comprehension.score
        });

  setMain(`
    <div class="page">

      ${stepper("results")}

      <section class="hero">

        <p class="eyebrow">
          Step 06 • Results
        </p>

        <h1>
          Learning session summary
        </h1>

        <p>
          Here is your current performance profile for
          ${getGrade().label}. Use the recommendation to
          decide your next learning step.
        </p>

      </section>

      <div
        class="grid grid-3"
        style="margin-top:18px">

        <section class="card center">

          <p class="small-text">
            Overall score
          </p>

          <div
            class="score-ring"
            style="--score:${mastery.overall}">

            <div class="score-value">
              <strong>${mastery.overall}%</strong>
              <span>${mastery.label}</span>
            </div>

          </div>

        </section>

        <section class="card">

          <h3>Reading</h3>

          <div class="metric">
            <span>Pronunciation</span>
            <strong>
              ${reading.pronunciationAccuracy}%
            </strong>
          </div>

          <div class="metric">
            <span>Fluency</span>
            <strong>${reading.fluency}</strong>
          </div>

          <div class="metric">
            <span>Difficult words</span>
            <strong>
              ${reading.difficultWords.length}
            </strong>
          </div>

          <div class="metric">
            <span>Possible issues</span>
            <strong>
              ${reading.possibleMispronunciations}
            </strong>
          </div>

        </section>

        <section class="card">

          <h3>Comprehension</h3>

          <div class="metric">
            <span>Score</span>
            <strong>${comprehension.score}%</strong>
          </div>

          <div class="metric">
            <span>Correct</span>
            <strong>
              ${comprehension.correct}/${comprehension.total}
            </strong>
          </div>

          <div class="metric">
            <span>Status</span>
            <strong>
              ${masteryLabel(comprehension.score)}
            </strong>
          </div>

        </section>

      </div>

      <section
        class="card"
        style="margin-top:18px">

        <div
          class="section-head"
          style="margin-top:0">

          <div>

            <h2>
              Subject performance
            </h2>

            <p>
              Scores from standardized core activities
            </p>

          </div>

        </div>

        ${[
          ["Mathematics", state.progress.math],
          ["Filipino", state.progress.filipino],
          ["English", state.progress.english]
        ].map(([name, score]) => `
          <div class="result-row">

            <label>${name}</label>

            <div class="progress">
              <span style="width:${score}%"></span>
            </div>

            <strong>${score}%</strong>

          </div>
        `).join("")}

      </section>

      <section
        class="card"
        style="margin-top:18px">

        <p class="eyebrow">
          AI recommendation
        </p>

        <h3>
          ${
            mastery.ready
              ? "Excellent — you're ready to continue."
              : "One more practice step can help."
          }
        </h3>

        <div class="feedback-box">

          <p>
            ${escapeHTML(recommendation)}
          </p>

        </div>

        <div class="action-row">

          ${
            mastery.ready
              ? `
                <button
                  class="btn success"
                  data-action="go-activities">
                  Continue learning
                </button>
              `
              : `
                <button
                  class="btn warning"
                  data-action="go-activities">
                  Additional practice
                </button>
              `
          }

          <button
            class="btn secondary"
            data-action="go-dashboard">
            Dashboard
          </button>

          <button
            class="btn secondary"
            data-action="logout">
            Log out
          </button>

        </div>

      </section>

      <p class="footer-note">
        AI-assisted results are prototype estimates and should
        not be treated as a clinical, diagnostic, or definitive
        pronunciation assessment.
      </p>

    </div>
  `);

  document
    .querySelector('[data-action="go-activities"]')
    .addEventListener(
      "click",
      () => go("activities")
    );

  document
    .querySelector('[data-action="go-dashboard"]')
    .addEventListener(
      "click",
      () => go("dashboard")
    );

  document
    .querySelector('[data-action="logout"]')
    .addEventListener(
      "click",
      logout
    );
}

/* ------------------------- Global Actions ------------------------- */

document.addEventListener("click", event => {

  const action =
    event.target.closest("[data-action]")
      ?.dataset.action;

  if (!action) return;

  switch (action) {

    case "go-dashboard":
      if (requireLogin()) go("dashboard");
      break;

    case "go-learning":
      if (requireGrade()) {
        go(
          state.reading.finished
            ? "activities"
            : "reading"
        );
      }
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

/* ------------------------- Safety / State Recovery ------------------------- */

window.addEventListener("error", event => {

  console.error(
    event.error || event.message
  );

  showToast(
    "Something went wrong. Your saved progress was kept when possible."
  );

});

window.addEventListener("beforeunload", () => {

  stopRecognition();
  saveState();

});

restoreSession();

if (!state.loggedIn) {
  state.stage = "login";
} else if (!state.grade) {
  state.stage = "grade";
} else if (
  !state.stage ||
  state.stage === "login"
) {
  state.stage = "dashboard";
}

render();
