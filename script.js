// =========================
// ARAL AI API CONFIG
// =========================
const ARAL_AI_API_URL =
  "https://aral-ai-api.tugastrixiabelle.workers.dev";

// =========================
// SEND MESSAGE TO ARAL AI
// =========================
async function askAralAI(prompt) {
  try {
    const response = await fetch(ARAL_AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt
      })
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();

    return data.reply || data.message || data.output || "No response from AI.";

  } catch (error) {
    console.error("ARAL AI API Error:", error);

    return "Sorry, I couldn't connect to Aral AI right now.";
  }
}

// =========================
// AI ENGINE
// =========================
const AIEngine = {

  async ask(prompt) {
    return await askAralAI(prompt);
  }

};
