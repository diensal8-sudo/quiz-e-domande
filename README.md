# Web Quiz

A multiple-choice quiz game built from scratch with **HTML, CSS and JavaScript**. No libraries, no frameworks.

> 🎮 **Play it:** add your GitHub Pages link here (`https://your-name.github.io/web-quiz/`)

Part of the *Feral Frame Studio* series: small projects built step by step.

## How to play

- 10 questions about web basics (HTML, CSS, JavaScript), in a different order every game.
- Click an answer. The right one turns **green**, a wrong one turns **red** (and the right one is shown).
- Press **Next** to continue. At the end you see your score.
- Your **best score** is saved in the browser.
- Works on **phones** too: you just tap. On a computer you can also press **1–4** to answer and **Enter** for the next question.

## The files

| File | What it does |
|---|---|
| `index.html` | Title, score, progress bar, the question, the answers and the buttons |
| `style.css` | The look: dark card, colored answers, progress bar |
| `script.js` | The questions and the logic of the game |

## The main ideas

**1. The questions are data.** A list of objects. Each one has the text, four answers and the *index* of the correct one:

```js
const QUESTIONS = [
  { q: "Which tag is the biggest heading in HTML?",
    answers: ["<h6>", "<h1>", "<head>", "<title>"], correct: 1 },
  // ...
];
```

To add a question you only add one object. The game code does not change.

**2. Shuffle.** The questions are shuffled with the classic Fisher–Yates method, on a *copy* of the list, so the original stays safe.

**3. Showing a question.** One function, `showQuestion()`, writes the text, updates the progress bar and creates one button for each answer with `document.createElement`.

**4. Choosing an answer.** `choose(i)` compares `i` with `correct`. Right: score +1 and the button gets the class `correct`. Wrong: the button gets `wrong` and we also light up the right one. Then all buttons are disabled, so you cannot answer twice (the variable `answered` also protects the game).

**5. Next question.** `next()` adds 1 to `index`. If there are more questions, we show the next one; if not, `finish()` shows the result screen.

**6. The result.** The message depends on the score (perfect, great, not bad, keep learning). If the score is higher than the best one, we save it.

**7. The best score** lives in `localStorage`, the small memory of the browser:

```js
localStorage.setItem("quiz-best", best);
```

It is wrapped in `try/catch`, so the game still works if the browser blocks it.

## Make it yours

- Replace the questions with your own topic (movies, geography, English words...).
- Change the number of questions: the game uses `QUESTIONS.length`.

## Run it on your computer

Download the three files in the same folder and open `index.html` in a browser.

## Put it online (GitHub Pages)

1. Create a new public repository on GitHub (for example `web-quiz`).
2. Upload `index.html`, `style.css` and `script.js`.
3. Go to **Settings → Pages**, choose branch **main**, folder **/ (root)**, and save.
4. After a minute or two your link appears. Paste it in the repository's **Website** field.

## Ideas to extend it

- A timer for each question
- Shuffle the answers too
- Categories and difficulty levels
- Load the questions from a JSON file

---

## 🇮🇹 In italiano

Un **quiz a risposta multipla** fatto da zero con HTML, CSS e JavaScript.

**Come si gioca:** 10 domande sul web (HTML, CSS, JavaScript) in ordine casuale. Clicca una risposta: quella giusta diventa **verde**, quella sbagliata **rossa**. Alla fine vedi il punteggio. Il **record** resta salvato nel browser. Funziona anche da **telefono**; sul computer puoi usare i tasti **1–4** e **Invio**.

**Le idee principali:** le domande sono **dati** (una lista di oggetti con testo, 4 risposte e l'indice di quella giusta); si **mescolano** con Fisher–Yates; `showQuestion()` crea i bottoni; `choose(i)` confronta la risposta con quella giusta; il record vive in **localStorage**.

**Per provarlo:** metti i tre file nella stessa cartella e apri `index.html`. Per metterlo online usa **GitHub Pages**.
