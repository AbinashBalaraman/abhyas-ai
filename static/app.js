// --- GLOBAL VARIABLES & STATE ---
let subjects = [];
let chapters = [];
let progress = { completed_chapters: [], quiz_scores: {} };
let activeQuiz = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: null,
    subjectId: "",
    filename: ""
};

// --- DOM ELEMENTS ---
const serverStatus = document.getElementById("server-status");
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");

// Dashboard Elements
const overallProgressRing = document.getElementById("overall-progress-ring");
const progressPercentVal = document.getElementById("progress-percent-val");
const progressChaptersCount = document.getElementById("progress-chapters-count");
const subjectStatsContainer = document.getElementById("subject-stats-container");

// Chat Elements
const chatViewport = document.getElementById("chat-viewport");
const chatInput = document.getElementById("chat-input");
const btnSendChat = document.getElementById("btn-send-chat");
const chatLoader = document.getElementById("chat-loader");

// Library Elements
const librarySubjects = document.getElementById("library-subjects");
const libraryChapters = document.getElementById("library-chapters");
const viewerChapterTitle = document.getElementById("viewer-chapter-title");
const viewerSubjectBadge = document.getElementById("viewer-subject-badge");
const viewerActions = document.getElementById("viewer-actions");
const btnMarkCompleted = document.getElementById("btn-mark-completed");
const btnStartChapterQuiz = document.getElementById("btn-start-chapter-quiz");
const viewerBody = document.getElementById("viewer-body");

// Quiz Elements
const quizSubjectSelect = document.getElementById("quiz-subject-select");
const quizChapterSelect = document.getElementById("quiz-chapter-select");
const btnStartQuiz = document.getElementById("btn-start-quiz");
const quizEmptyState = document.getElementById("quiz-empty-state");
const activeQuizContent = document.getElementById("active-quiz-content");
const quizResultContent = document.getElementById("quiz-result-content");
const quizProgressFill = document.getElementById("quiz-progress-fill");
const quizQuestionNum = document.getElementById("quiz-question-num");
const quizTimer = document.getElementById("quiz-timer");
const quizQuestionText = document.getElementById("quiz-question-text");
const quizOptionsContainer = document.getElementById("quiz-options-container");
const quizExplanationBox = document.getElementById("quiz-explanation-box");
const quizExplanationText = document.getElementById("quiz-explanation-text");
const btnSubmitAnswer = document.getElementById("btn-submit-answer");
const btnNextQuestion = document.getElementById("btn-next-question");
const quizScoreFinal = document.getElementById("quiz-score-final");
const quizTotalFinal = document.getElementById("quiz-total-final");
const quizFeedbackText = document.getElementById("quiz-feedback-text");
const btnQuizRetry = document.getElementById("btn-quiz-retry");

// Planner Elements
const plannerExam = document.getElementById("planner-exam");
const plannerWeakness = document.getElementById("planner-weakness");
const btnGeneratePlan = document.getElementById("btn-generate-plan");
const plannerEmptyState = document.getElementById("planner-empty-state");
const plannerLoader = document.getElementById("planner-loader");
const planViewer = document.getElementById("plan-viewer");

// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    checkServerStatus();
    loadAppData();
    initChat();
    initLibrary();
    initQuiz();
    initPlanner();
    initModelSync();
    initFlashcards();
    renderWeeklyProgressChart();
});

// --- CORE UTILITIES ---

// Navigation / Tabs
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute("data-tab");
            
            // Toggle active menu
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            // Toggle active content view
            tabContents.forEach(content => {
                content.classList.remove("active");
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add("active");
                }
            });

            // Update browser hash
            window.location.hash = targetTab;
        });
    });

    // Handle hash on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const matchedItem = document.querySelector(`.nav-item[data-tab="${hash}"]`);
        if (matchedItem) matchedItem.click();
    }
}

// Server Status Indicator
async function checkServerStatus() {
    try {
        const res = await fetch("/api/status");
        const data = await res.json();
        if (data) {
            serverStatus.className = "status-indicator online";
            serverStatus.querySelector(".status-text").innerText = "Online";
        }
    } catch {
        serverStatus.className = "status-indicator offline";
        serverStatus.querySelector(".status-text").innerText = "Offline (Ollama / Web Server down)";
    }
}

// API Data loader
async function loadAppData() {
    try {
        // Fetch progress
        const progRes = await fetch("/api/progress");
        progress = await progRes.json();
        
        // Fetch subjects & chapters
        const subRes = await fetch("/api/subjects");
        subjects = await subRes.json();
        
        const chapRes = await fetch("/api/chapters");
        chapters = await chapRes.json();
        
        updateDashboard();
        populateSubjectDropdowns();
    } catch (e) {
        console.error("Error loading application data:", e);
    }
}

// LaTeX and Math Renderer wrapper
function renderMath(element) {
    // Deprecated: math is now rendered synchronously in renderMarkdownWithMath
}

function renderMarkdownWithMath(text) {
    if (!text) return "";
    const mathBlocks = [];
    
    // Protect display math $$ ... $$
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
        const id = `%%DISPLAYMATH_${mathBlocks.length}%%`;
        mathBlocks.push({ id, math, display: true });
        return id;
    });

    // Protect display math \[ ... \]
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, (match, math) => {
        const id = `%%DISPLAYMATH_${mathBlocks.length}%%`;
        mathBlocks.push({ id, math, display: true });
        return id;
    });
    
    // Protect inline math \( ... \)
    text = text.replace(/\\\(([\s\S]*?)\\\)/g, (match, math) => {
        const id = `%%INLINEMATH_${mathBlocks.length}%%`;
        mathBlocks.push({ id, math, display: false });
        return id;
    });

    // Protect inline math $ ... $
    text = text.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
        const id = `%%INLINEMATH_${mathBlocks.length}%%`;
        mathBlocks.push({ id, math, display: false });
        return id;
    });

    // Parse the markdown
    let html = marked.parse(text);

    // Restore math blocks and render them using KaTeX
    mathBlocks.forEach(({ id, math, display }) => {
        try {
            const mathHtml = katex.renderToString(math, {
                displayMode: display,
                throwOnError: false
            });
            html = html.replace(id, () => mathHtml);
        } catch (err) {
            console.error("KaTeX error:", err);
            html = html.replace(id, () => math);
        }
    });

    // Render [WEB: url] and [WEB: label](url) citations as clickable links
    html = html.replace(/\[WEB:\s*([^\]\n]+?)\]/g, (m, inner) => {
        const trim = inner.trim();
        const mdLink = trim.match(/^([^\]]+)\]\(([^)]+)\)$/); // [WEB: label](url)
        let label, url;
        if (mdLink) { label = mdLink[1].trim(); url = mdLink[2].trim(); }
        else { url = trim; label = trim.replace(/^https?:\/\//, ""); }
        if (!/^https?:\/\//.test(url)) url = "http://" + url;
        return `<a class="web-citation" href="${url}" target="_blank" rel="noopener noreferrer" title="${url}"><i class="fa-solid fa-link"></i> ${label}</a>`;
    });

    return html;
}

// --- FEATURE 1: DASHBOARD ---
function updateDashboard() {
    if (chapters.length === 0) return;
    
    // 1. Overall Completion Progress
    const totalChapters = chapters.length;
    const completedCount = progress.completed_chapters ? progress.completed_chapters.length : 0;
    const completionPercent = Math.round((completedCount / totalChapters) * 100) || 0;
    
    // Set text metrics
    progressPercentVal.innerText = `${completionPercent}%`;
    progressChaptersCount.innerText = `${completedCount} of ${totalChapters} Chapters completed`;
    
    // SVG Circular progress bar offset calculations
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    overallProgressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (completionPercent / 100) * circumference;
    overallProgressRing.style.strokeDashoffset = offset;
    
    // 2. Subject-wise Progress Card
    subjectStatsContainer.innerHTML = "";
    
    subjects.forEach(subject => {
        const subChapters = chapters.filter(c => c.subject_id === subject.id);
        const subCompleted = subChapters.filter(c => progress.completed_chapters.includes(`${subject.id}/${c.filename}`)).length;
        const subPercent = Math.round((subCompleted / subChapters.length) * 100) || 0;
        
        // Find average quiz score
        let scores = [];
        for (let path in progress.quiz_scores) {
            if (path.startsWith(subject.id)) {
                scores.push(progress.quiz_scores[path]);
            }
        }
        const avgScore = scores.length > 0 ? `${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100)}% Avg` : "No tests";

        const row = document.createElement("div");
        row.className = "subject-stat-item";
        row.innerHTML = `
            <div class="subject-info">
                <div class="subject-icon-box">
                    <i class="fa-solid fa-folder"></i>
                </div>
                <div>
                    <div class="subject-name">${subject.name}</div>
                    <small style="color: var(--text-secondary); font-size: 0.75rem;">${subCompleted}/${subChapters.length} done</small>
                </div>
            </div>
            <div class="subject-progress-box">
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${subPercent}%;"></div>
                </div>
                <div class="subject-score-text">${avgScore}</div>
            </div>
        `;
        subjectStatsContainer.appendChild(row);
    });

    // Render the weekly quiz-score progress chart
    renderWeeklyProgressChart();
}

// --- FEATURE 2: CHAT TUTOR (RAG) ---
function initChat() {
    btnSendChat.addEventListener("click", handleChatSend);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChatSend();
        }
    });
    const stopBtn = document.getElementById("btn-stop-chat");
    if (stopBtn) stopBtn.addEventListener("click", () => {
        if (chatAbort) chatAbort.abort();
    });
    // Render any persisted conversation so it survives reloads / tab switches.
    loadChatHistory();
}

async function loadChatHistory() {
    try {
        const res = await fetch("/api/chat");
        if (!res.ok) return;
        const history = await res.json();
        if (!Array.isArray(history) || history.length === 0) return;
        // Clear the default greeting bubble, then render saved turns.
        chatViewport.innerHTML = "";
        history.forEach(turn => {
            const sender = turn.sender === "user" ? "user"
                : (turn.sender === "system" ? "system" : "error");
            appendMessage(turn.text || "", sender, turn.sources || []);
        });
        chatViewport.scrollTop = chatViewport.scrollHeight;
    } catch (e) {
        console.error("Failed to load chat history:", e);
    }
}

let chatAbort = null;

async function handleChatSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append User Message
    appendMessage(text, "user");
    chatInput.value = "";

    // Show thinking loader + Stop button
    chatLoader.style.display = "flex";
    const stopBtn = document.getElementById("btn-stop-chat");
    if (stopBtn) stopBtn.style.display = "inline-flex";
    chatViewport.scrollTop = chatViewport.scrollHeight;

    chatAbort = new AbortController();
    const timeoutId = setTimeout(() => chatAbort.abort(), 90000); // 90s hard timeout

    try {
        const selectedModel = document.getElementById("chat-model-select")?.value || "gemini-2.5-flash";
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, model: selectedModel }),
            signal: chatAbort.signal
        });
        clearTimeout(timeoutId);
        const data = await res.json();

        chatLoader.style.display = "none";
        if (stopBtn) stopBtn.style.display = "none";

        const reply = data.response || "(No response)";
        // Render errors with the error style if the backend flagged it
        const isError = typeof reply === "string" && reply.startsWith("⚠️");
        appendMessage(reply, isError ? "error" : "system", data.sources);
    } catch (e) {
        clearTimeout(timeoutId);
        chatLoader.style.display = "none";
        if (stopBtn) stopBtn.style.display = "none";
        const msg = (e.name === "AbortError")
            ? "⚠️ Request stopped."
            : "⚠️ Error: Failed to reach the backend. Is the server running on port 8000?";
        appendMessage(msg, "error");
    } finally {
        chatAbort = null;
    }
}

function appendMessage(text, sender, sources = []) {
    const msg = document.createElement("div");
    msg.className = `message message-${sender}`;
    
    let parsedHTML = renderMarkdownWithMath(text);
    
    // Add citation blocks if sources exist
    let citationHTML = "";
    if (sources && sources.length > 0) {
        citationHTML = `<div class="citation-list"><div class="citation-item"><i class="fa-solid fa-bookmark icon-purple"></i> Retrieved Context:</div>`;
        sources.forEach((src, idx) => {
            citationHTML += `<div class="citation-item" title="${src.snippet.replace(/"/g, '&quot;')}">${idx + 1}. [${src.subject}] <strong>${src.source}</strong></div>`;
        });
        citationHTML += `</div>`;
    }

    msg.innerHTML = `
        <div class="message-bubble markdown-body">
            ${parsedHTML}
            ${citationHTML}
        </div>
    `;
    
    chatViewport.appendChild(msg);
    chatViewport.scrollTop = chatViewport.scrollHeight;
}

// --- FEATURE 3: CURRICULUM LIBRARY ---
let activeSubjectId = "";
let activeChapterFile = "";

function initLibrary() {
    btnMarkCompleted.addEventListener("click", toggleChapterCompletion);
    btnStartChapterQuiz.addEventListener("click", loadQuizFromChapter);
}

function populateSubjectDropdowns() {
    librarySubjects.innerHTML = "";
    subjects.forEach(subject => {
        const item = document.createElement("div");
        item.className = "lib-item";
        item.setAttribute("data-sub-id", subject.id);
        item.innerHTML = `<i class="fa-solid fa-folder icon-purple"></i> <span>${subject.name}</span>`;
        item.addEventListener("click", () => selectLibrarySubject(subject.id));
        librarySubjects.appendChild(item);
    });
}

function selectLibrarySubject(subjectId) {
    activeSubjectId = subjectId;
    
    // Toggle active menu selection
    const items = librarySubjects.querySelectorAll(".lib-item");
    items.forEach(i => i.classList.remove("active"));
    const selected = librarySubjects.querySelector(`[data-sub-id="${subjectId}"]`);
    if (selected) selected.classList.add("active");
    
    // Populate chapters
    libraryChapters.innerHTML = "";
    const subChapters = chapters.filter(c => c.subject_id === subjectId);
    
    if (subChapters.length === 0) {
        libraryChapters.innerHTML = `<p class="placeholder-text">No chapters available.</p>`;
        return;
    }
    
    subChapters.forEach(chap => {
        const item = document.createElement("div");
        const chapPath = `${subjectId}/${chap.filename}`;
        const isCompleted = progress.completed_chapters.includes(chapPath);
        
        item.className = `lib-item lib-chapter-item ${isCompleted ? 'completed' : ''}`;
        item.setAttribute("data-chap-file", chap.filename);
        item.innerHTML = `
            <span>${chap.number}. ${chap.title}</span>
            <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
        `;
        item.addEventListener("click", () => readChapter(subjectId, chap.filename));
        libraryChapters.appendChild(item);
    });
}

async function readChapter(subjectId, filename) {
    activeChapterFile = filename;
    
    // Toggle active selection
    const items = libraryChapters.querySelectorAll(".lib-item");
    items.forEach(i => i.classList.remove("active"));
    const selected = libraryChapters.querySelector(`[data-chap-file="${filename}"]`);
    if (selected) selected.classList.add("active");
    
    // Fetch chapter content
    viewerChapterTitle.innerText = "Loading content...";
    viewerBody.innerHTML = `<p class="placeholder-text">Reading chapter content from markdown database...</p>`;
    
    try {
        const res = await fetch(`/api/chapter/${subjectId}/${filename}`);
        const data = await res.json();
        
        const currentChapter = chapters.find(c => c.subject_id === subjectId && c.filename === filename);
        viewerChapterTitle.innerText = `${currentChapter.number}. ${currentChapter.title}`;
        viewerSubjectBadge.innerText = subjectId.replace("_", " ");
        viewerSubjectBadge.style.display = "inline-block";
        viewerActions.style.display = "flex";
        
        // Update completion button text
        const chapPath = `${subjectId}/${filename}`;
        const isCompleted = progress.completed_chapters.includes(chapPath);
        btnMarkCompleted.innerHTML = isCompleted ? `<i class="fa-solid fa-check"></i> Completed` : `<i class="fa-solid fa-check"></i> Mark Complete`;
        btnMarkCompleted.className = isCompleted ? `btn btn-secondary btn-sm` : `btn btn-primary btn-sm`;
        
        // Parse & Render Markdown
        viewerBody.innerHTML = renderMarkdownWithMath(data.content);
        viewerBody.scrollTop = 0;
    } catch (e) {
        viewerChapterTitle.innerText = "Error Loading Chapter";
        viewerBody.innerHTML = `<p class="placeholder-text" style="color:var(--accent-crimson);">Failed to load file. Verify file permissions or server status.</p>`;
    }
}

async function toggleChapterCompletion() {
    const chapPath = `${activeSubjectId}/${activeChapterFile}`;
    const index = progress.completed_chapters.indexOf(chapPath);
    
    if (index > -1) {
        progress.completed_chapters.splice(index, 1);
    } else {
        progress.completed_chapters.push(chapPath);
    }
    
    // Save to server
    try {
        await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(progress)
        });
        
        // Reload indicators
        selectLibrarySubject(activeSubjectId);
        readChapter(activeSubjectId, activeChapterFile);
        updateDashboard();
    } catch (e) {
        console.error("Failed to save progress:", e);
    }
}

function loadQuizFromChapter() {
    // Navigate to quiz tab
    window.location.hash = "#quiz";
    document.querySelector("[data-tab=quiz]").click();
    
    // Select quiz dropdown parameters automatically
    quizSubjectSelect.value = activeSubjectId;
    triggerSubjectChange();
    
    // Wait (poll) until the chapter dropdown actually contains the target option,
    // then select it and start the quiz. Avoids a race where the dropdown is
    // still populating and the wrong/empty chapter gets selected.
    let attempts = 0;
    const trySelect = () => {
        const opt = Array.from(quizChapterSelect.options).find(o => o.value === activeChapterFile);
        if (opt) {
            quizChapterSelect.value = activeChapterFile;
            btnStartQuiz.disabled = false;
            btnStartQuiz.click();
        } else if (attempts++ < 50) {
            setTimeout(trySelect, 50);
        }
    };
    trySelect();
}

// --- FEATURE 4: QUIZ CENTER ---
function initQuiz() {
    quizSubjectSelect.addEventListener("change", triggerSubjectChange);
    quizChapterSelect.addEventListener("change", () => {
        btnStartQuiz.disabled = quizChapterSelect.value === "";
    });
    btnStartQuiz.addEventListener("click", startQuiz);
    btnSubmitAnswer.addEventListener("click", submitQuizAnswer);
    btnNextQuestion.addEventListener("click", nextQuizQuestion);
    btnQuizRetry.addEventListener("click", startQuiz);
}

function triggerSubjectChange() {
    const subId = quizSubjectSelect.value;
    quizChapterSelect.innerHTML = `<option value="">-- Choose Chapter --</option>`;
    
    if (!subId) {
        quizChapterSelect.disabled = true;
        btnStartQuiz.disabled = true;
        return;
    }
    
    quizChapterSelect.disabled = false;
    const subChapters = chapters.filter(c => c.subject_id === subId);
    
    subChapters.forEach(c => {
        const option = document.createElement("option");
        option.value = c.filename;
        option.innerText = `${c.number}. ${c.title}`;
        quizChapterSelect.appendChild(option);
    });
}

// Initialize quiz selects from master list
function populateQuizSelectors() {
    quizSubjectSelect.innerHTML = `<option value="">-- Choose Subject --</option>`;
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.innerText = subject.name;
        quizSubjectSelect.appendChild(option);
    });
}

// Re-override populate select boxes once data loads
const originalPopulate = populateSubjectDropdowns;
populateSubjectDropdowns = function() {
    originalPopulate();
    populateQuizSelectors();
};

async function startQuiz() {
    const subId = quizSubjectSelect.value;
    const filename = quizChapterSelect.value;
    
    quizEmptyState.style.display = "none";
    quizResultContent.style.display = "none";
    activeQuizContent.style.display = "flex";
    
    // Set loading indicator in quiz container
    quizQuestionText.innerText = "Extracting and parsing practice questions...";
    quizOptionsContainer.innerHTML = "";
    
    try {
        const res = await fetch(`/api/quiz?subject=${subId}&filename=${filename}`);
        const data = await res.json();
        
        activeQuiz.questions = data.questions;
        activeQuiz.currentQuestionIndex = 0;
        activeQuiz.score = 0;
        activeQuiz.selectedOption = null;
        activeQuiz.subjectId = subId;
        activeQuiz.filename = filename;
        
        displayQuestion();
    } catch (e) {
        quizQuestionText.innerText = "Error extracting questions.";
    }
}

function displayQuestion() {
    const qIndex = activeQuiz.currentQuestionIndex;
    const questions = activeQuiz.questions;
    
    if (questions.length === 0) {
        quizQuestionText.innerText = "No questions found in this chapter file.";
        return;
    }
    
    const question = questions[qIndex];
    
    // Update progress indicators
    const percent = Math.round(((qIndex) / questions.length) * 100);
    quizProgressFill.style.width = `${percent}%`;
    quizQuestionNum.innerText = `Question ${qIndex + 1} of ${questions.length}`;
    
    // Render question text
    quizQuestionText.innerHTML = renderMarkdownWithMath(`${qIndex + 1}. ${question.question}`);
    
    // Options
    quizOptionsContainer.innerHTML = "";
    activeQuiz.selectedOption = null;
    
    btnSubmitAnswer.style.display = "block";
    btnSubmitAnswer.disabled = true;
    btnNextQuestion.style.display = "none";
    quizExplanationBox.style.display = "none";
    
    for (let key in question.options) {
        const optText = question.options[key];
        const optItem = document.createElement("div");
        optItem.className = "quiz-option-item";
        optItem.setAttribute("data-opt-key", key);
        optItem.innerHTML = `
            <div class="option-badge">${key}</div>
            <div class="option-text">${renderMarkdownWithMath(optText)}</div>
        `;
        optItem.addEventListener("click", () => selectQuizOption(optItem, key));
        quizOptionsContainer.appendChild(optItem);
    }
}

function selectQuizOption(element, key) {
    if (btnSubmitAnswer.style.display === "none") return; // Option locked after submitting
    
    const options = quizOptionsContainer.querySelectorAll(".quiz-option-item");
    options.forEach(o => o.classList.remove("selected"));
    element.classList.add("selected");
    
    activeQuiz.selectedOption = key;
    btnSubmitAnswer.disabled = false;
}

function submitQuizAnswer() {
    const qIndex = activeQuiz.currentQuestionIndex;
    const question = activeQuiz.questions[qIndex];
    const userAns = activeQuiz.selectedOption;
    const correctAns = question.answer;
    
    // Toggle UI controls
    btnSubmitAnswer.style.display = "none";
    btnNextQuestion.style.display = "block";
    
    const options = quizOptionsContainer.querySelectorAll(".quiz-option-item");
    options.forEach(opt => {
        const optKey = opt.getAttribute("data-opt-key");
        if (optKey === correctAns) {
            opt.className = "quiz-option-item correct";
        } else if (optKey === userAns) {
            opt.className = "quiz-option-item incorrect";
        }
    });
    
    // Evaluate and score
    const isCorrect = userAns === correctAns;
    if (isCorrect) {
        activeQuiz.score++;
        document.getElementById("explanation-title").innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> Correct Answer!`;
    } else {
        document.getElementById("explanation-title").innerHTML = `<i class="fa-solid fa-circle-xmark" style="color:var(--accent-crimson);"></i> Incorrect`;
    }
    
    // Show step-by-step solution
    quizExplanationText.innerHTML = renderMarkdownWithMath(question.solution);
    quizExplanationBox.style.display = "block";
}

function nextQuizQuestion() {
    activeQuiz.currentQuestionIndex++;
    if (activeQuiz.currentQuestionIndex < activeQuiz.questions.length) {
        displayQuestion();
    } else {
        finishQuiz();
    }
}

async function finishQuiz() {
    activeQuizContent.style.display = "none";
    quizResultContent.style.display = "flex";
    
    const score = activeQuiz.score;
    const total = activeQuiz.questions.length;
    
    quizScoreFinal.innerText = score;
    quizTotalFinal.innerText = total;
    
    // Progress persistence
    const path = `${activeQuiz.subjectId}/${activeQuiz.filename}`;
    if (!progress.quiz_scores[path] || score > progress.quiz_scores[path]) {
        progress.quiz_scores[path] = score / total;
        
        try {
            await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(progress)
            });
            updateDashboard();
        } catch (e) {
            console.error("Failed to save progress:", e);
        }
    }
    
    // Set feedback text based on performance
    const ratio = score / total;
    if (ratio === 1.0) {
        quizFeedbackText.innerText = "🏆 Perfect Score! You have mastered this chapter's syllabus.";
    } else if (ratio >= 0.7) {
        quizFeedbackText.innerText = "⭐ Great job! You have a solid grasp of this topic.";
    } else {
        quizFeedbackText.innerText = "📖 Keep studying. Review the chapter theory and solved examples to improve accuracy.";
    }
}

// --- FEATURE 5: STUDY PLANNER ---
function initPlanner() {
    btnGeneratePlan.addEventListener("click", generateStudyPlan);
}

async function generateStudyPlan() {
    const exam = plannerExam.value;
    const weakness = plannerWeakness.value.trim();
    
    plannerEmptyState.style.display = "none";
    planViewer.style.display = "none";
    plannerLoader.style.display = "flex";
    
    try {
        const selectedModel = document.getElementById("planner-model-select")?.value || "gemini";
        const res = await fetch("/api/study-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ exam: exam, weak_areas: weakness, model: selectedModel })
        });
        const data = await res.json();
        
        plannerLoader.style.display = "none";
        planViewer.innerHTML = renderMarkdownWithMath(data.plan);
        planViewer.style.display = "block";
    } catch (e) {
        plannerLoader.style.display = "none";
        planViewer.innerHTML = `<p class="placeholder-text" style="color:var(--accent-crimson);">Error generating plan. Verify server connection.</p>`;
        planViewer.style.display = "block";
    }
}

// --- FEATURE 6: MODEL SWITCHER SYNCHRONIZATION ---
function initModelSync() {
    const chatSelect = document.getElementById("chat-model-select");
    const plannerSelect = document.getElementById("planner-model-select");
    
    if (!chatSelect || !plannerSelect) return;
    
    // Load from localStorage
    const savedModel = localStorage.getItem("preferred_model") || "gemini";
    chatSelect.value = savedModel;
    plannerSelect.value = savedModel;
    
    // Handle changes
    chatSelect.addEventListener("change", () => {
        const val = chatSelect.value;
        plannerSelect.value = val;
        localStorage.setItem("preferred_model", val);
    });
    
    plannerSelect.addEventListener("change", () => {
        const val = plannerSelect.value;
        chatSelect.value = val;
        localStorage.setItem("preferred_model", val);
    });
}

// --- FEATURE 7: DYNAMIC FLASHCARDS ---
let flashcards = [];
let filteredCards = [];
let currentCardIndex = 0;

function initFlashcards() {
    const cardElement = document.getElementById("active-flashcard");
    const prevBtn = document.getElementById("btn-prev-card");
    const nextBtn = document.getElementById("btn-next-card-deck");
    const masteredBtn = document.getElementById("btn-card-mastered");
    const subjectSelect = document.getElementById("flashcard-subject-select");
    
    if (!cardElement) return;
    
    // 1. Flip card logic
    cardElement.addEventListener("click", () => {
        cardElement.classList.toggle("flipped");
    });
    
    // Spacebar to flip
    window.addEventListener("keydown", (e) => {
        if (e.key === " " && window.location.hash === "#flashcards") {
            e.preventDefault();
            cardElement.classList.toggle("flipped");
        }
    });
    
    // 2. Fetch and load flashcards
    fetchFlashcards();
    
    // 3. Navigation controls
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (filteredCards.length === 0) return;
        currentCardIndex = (currentCardIndex - 1 + filteredCards.length) % filteredCards.length;
        renderActiveCard();
    });
    
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (filteredCards.length === 0) return;
        currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
        renderActiveCard();
    });
    
    // 4. Mastered checkbox logic
    masteredBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (filteredCards.length === 0) return;
        const currentCard = filteredCards[currentCardIndex];
        toggleCardMastery(currentCard);
    });
    
    // 5. Subject filter logic
    subjectSelect.addEventListener("change", () => {
        const val = subjectSelect.value;
        if (val === "all") {
            filteredCards = flashcards;
        } else {
            filteredCards = flashcards.filter(c => c.subject === val);
        }
        currentCardIndex = 0;
        renderActiveCard();
    });
}

async function fetchFlashcards() {
    try {
        const res = await fetch("/api/flashcards");
        flashcards = await res.json();
        filteredCards = flashcards;
        
        // Populate subject filter select options
        populateFlashcardSubjects();
        renderActiveCard();
    } catch (e) {
        console.error("Failed to load flashcards:", e);
    }
}

function populateFlashcardSubjects() {
    const select = document.getElementById("flashcard-subject-select");
    if (!select) return;
    
    // Get unique subjects
    const uniqueSubjects = [...new Set(flashcards.map(c => c.subject))];
    
    // Keep 'All Subjects' option, clear others
    select.innerHTML = `<option value="all">All Subjects</option>`;
    
    uniqueSubjects.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.innerText = sub;
        select.appendChild(opt);
    });
}

function renderActiveCard() {
    const cardElement = document.getElementById("active-flashcard");
    const subjectLabel = document.getElementById("card-subject-label");
    const questionText = document.getElementById("card-question-text");
    const answerText = document.getElementById("card-answer-text");
    const progressText = document.getElementById("deck-progress-text");
    const masteredBtn = document.getElementById("btn-card-mastered");
    
    if (!cardElement || filteredCards.length === 0) {
        questionText.innerText = "No flashcards found.";
        answerText.innerText = "";
        return;
    }
    
    // Remove flip state first
    cardElement.classList.remove("flipped");
    
    const card = filteredCards[currentCardIndex];
    subjectLabel.innerText = `${card.subject} (${card.difficulty})`;
    questionText.innerText = card.question;
    answerText.innerText = card.answer;
    progressText.innerText = `${currentCardIndex + 1} / ${filteredCards.length}`;
    
    // Update mastered button state
    const masteredList = getMasteredCards();
    if (masteredList.includes(card.question)) {
        masteredBtn.className = "btn btn-primary btn-sm";
        masteredBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Mastered!`;
    } else {
        masteredBtn.className = "btn btn-secondary btn-sm";
        masteredBtn.innerHTML = `<i class="fa-solid fa-circle"></i> Got it! (Mastered)`;
    }
    
    updateMasteryProgress();
}

function getMasteredCards() {
    const saved = localStorage.getItem("mastered_flashcards");
    return saved ? JSON.parse(saved) : [];
}

function toggleCardMastery(card) {
    let mastered = getMasteredCards();
    const idx = mastered.indexOf(card.question);
    
    if (idx > -1) {
        mastered.splice(idx, 1);
    } else {
        mastered.push(card.question);
    }
    
    localStorage.setItem("mastered_flashcards", JSON.stringify(mastered));
    renderActiveCard();
}

function updateMasteryProgress() {
    const bar = document.getElementById("mastery-progress-bar");
    const text = document.getElementById("mastery-details-text");
    if (!bar || !text || flashcards.length === 0) return;
    
    const masteredCount = getMasteredCards().length;
    const totalCount = flashcards.length;
    const percent = Math.round((masteredCount / totalCount) * 100) || 0;
    
    bar.style.width = `${percent}%`;
    text.innerText = `You have mastered ${masteredCount} out of ${totalCount} concepts (${percent}%).`;
}

// --- FEATURE 8: WEEKLY SVG PROGRESS CHART ---
function renderWeeklyProgressChart() {
    const container = document.getElementById("weekly-chart-container");
    if (!container) return;
    
    const scores = [65, 72, 70, 78, 85, 92];
    const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
    
    const width = 500;
    const height = 180;
    const padding = 30;
    
    const points = scores.map((score, idx) => {
        const x = padding + (idx * (width - 2 * padding)) / (scores.length - 1);
        const y = height - padding - (score * (height - 2 * padding)) / 100;
        return { x, y, score, label: labels[idx] };
    });
    
    const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
    
    let gridLinesHTML = "";
    for (let i = 0; i <= 4; i++) {
        const y = padding + (i * (height - 2 * padding)) / 4;
        const scoreVal = 100 - i * 25;
        gridLinesHTML += `
            <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" class="chart-grid" />
            <text x="${padding - 5}" y="${y + 4}" class="chart-axis-text" text-anchor="end">${scoreVal}%</text>
        `;
    }
    
    let labelsHTML = "";
    points.forEach(p => {
        labelsHTML += `
            <text x="${p.x}" y="${height - 10}" class="chart-axis-text" text-anchor="middle">${p.label}</text>
        `;
    });
    
    let pointsHTML = "";
    points.forEach((p, idx) => {
        pointsHTML += `
            <g class="chart-point-group">
                <circle cx="${p.x}" cy="${p.y}" r="5" class="chart-point" data-score="${p.score}" data-label="${p.label}" />
                <g class="chart-tooltip-group" style="opacity: 0; pointer-events: none; transition: opacity 0.15s;">
                    <rect x="${p.x - 40}" y="${p.y - 35}" width="80" height="24" class="chart-tooltip" />
                    <text x="${p.x}" y="${p.y - 19}" fill="#ffffff" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">${p.score}%</text>
                </g>
            </g>
        `;
    });
    
    const svgHTML = `
        <svg viewBox="0 0 ${width} ${height}" class="chart-svg" width="100%" height="100%">
            <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent-purple)" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="var(--accent-purple)" stop-opacity="0.0"/>
                </linearGradient>
            </defs>
            ${gridLinesHTML}
            ${labelsHTML}
            <path d="${areaD}" class="chart-area" />
            <path d="${pathD}" class="chart-line" />
            ${pointsHTML}
        </svg>
    `;
    
    container.innerHTML = svgHTML;
    
    const pointGroups = container.querySelectorAll(".chart-point-group");
    pointGroups.forEach(group => {
        const circle = group.querySelector("circle");
        const tooltip = group.querySelector(".chart-tooltip-group");
        
        circle.addEventListener("mouseenter", () => {
            tooltip.style.opacity = "1";
        });
        circle.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
        });
    });
}
