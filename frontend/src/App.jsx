import { useEffect, useState } from "react";
import "./App.css";

const questionsByCategory = {
  GK: [
    {
      question: "Bharat ki rajdhani kya hai?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      question: "Duniya ka sabse bada mahasagar kaunsa hai?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: 2,
    },
    {
      question: "Bharat ka rashtriya pashu kaunsa hai?",
      options: ["Sher", "Hathi", "Bengal Tiger", "Leopard"],
      answer: 2,
    },
  ],
  Sports: [
    {
      question: "Cricket ki ek team mein kitne players hote hain?",
      options: ["9", "10", "11", "12"],
      answer: 2,
    },
    {
      question: "Football ke ek match mein regular time kitna hota hai?",
      options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"],
      answer: 2,
    },
    {
      question: "Olympic Games aam taur par kitne saal mein hote hain?",
      options: ["2 saal", "3 saal", "4 saal", "5 saal"],
      answer: 2,
    },
  ],
  Science: [
    {
      question: "Paani ka chemical formula kya hai?",
      options: ["CO2", "O2", "H2O", "NaCl"],
      answer: 2,
    },
    {
      question: "Plants apna food kis process se banate hain?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Evaporation"],
      answer: 1,
    },
    {
      question: "Solar system ka sabse bada planet kaunsa hai?",
      options: ["Earth", "Mars", "Saturn", "Jupiter"],
      answer: 3,
    },
  ],
  History: [
    {
      question: "Bharat ko independence kis saal mili?",
      options: ["1942", "1945", "1947", "1950"],
      answer: 2,
    },
    {
      question: "Taj Mahal kisne banwaya tha?",
      options: ["Akbar", "Shah Jahan", "Humayun", "Aurangzeb"],
      answer: 1,
    },
    {
      question: "Quit India Movement kis saal shuru hua?",
      options: ["1930", "1935", "1942", "1947"],
      answer: 2,
    },
  ],
};

const categories = [
  { name: "GK", icon: "🌍", desc: "General Knowledge" },
  { name: "Sports", icon: "🏏", desc: "Sports Quiz" },
  { name: "Science", icon: "🔬", desc: "Science Quiz" },
  { name: "History", icon: "🏛️", desc: "History Quiz" },
];

function App() {
  const [page, setPage] = useState("login");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
  });
  const [category, setCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [demoPaymentComplete, setDemoPaymentComplete] = useState(false);

  const questions = category ? questionsByCategory[category] : [];
  const question = questions[currentQuestion];
  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  useEffect(() => {
    if (page !== "quiz" || selectedAnswer !== null) return;

    if (timeLeft <= 0) {
      setSelectedAnswer(-1);
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [page, selectedAnswer, timeLeft]);

  function handleLogin(event) {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Valid 10-digit Indian mobile number enter karo.");
      return;
    }

    sessionStorage.setItem("quizDemoPhone", phone);
    setMessage("");
    setPage("category");
  }

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
  }

  function handleProfileSubmit(event) {
    event.preventDefault();

    sessionStorage.setItem(
      "quizDemoProfile",
      JSON.stringify({
        ...profile,
        phone: sessionStorage.getItem("quizDemoPhone"),
      }),
    );

    setMessage("");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setPage("quiz");
  }

  function handleAnswer(index) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
  }

  function handleNext() {
    if (selectedAnswer === null || !questions.length) return;

    const isCorrect = selectedAnswer === question.answer;
    const updatedAnswers = [...answers, selectedAnswer];
    const updatedScore = score + (isCorrect ? 1 : 0);

    setAnswers(updatedAnswers);
    setScore(updatedScore);

    if (currentQuestion === questions.length - 1) {
      setPage("result");
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
    setTimeLeft(30);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setMessage("");
    setTimeLeft(30);
    setPage("quiz");
  }

  function backToLogin() {
    setProfile({ name: "", email: "", age: "", city: "" });
    setPhone("");
    setCategory("");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setMessage("");
    setTimeLeft(30);
    sessionStorage.removeItem("quizDemoPhone");
    sessionStorage.removeItem("quizDemoProfile");
    setPage("login");
  }

  return (
    <main className="login-page">
      <div className="ambient-shape ambient-shape-one" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-two" aria-hidden="true" />

      <section className={`login-card ${page === "quiz" ? "quiz-card" : ""}`}>
        <div className="login-icon" aria-hidden="true">🧠</div>
        <p className="login-label">WELCOME TO</p>
        <h1>
          Quiz <span>Challenge</span>
        </h1>

        {page === "login" && (
          <>
            <p className="login-description">
              Apna mobile number daalo aur GK challenge shuru karo!
            </p>

            <form onSubmit={handleLogin}>
              <label htmlFor="phone">Mobile number</label>
              <div className="phone-input">
                <span>🇮🇳 +91</span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  aria-describedby="phone-help"
                  required
                />
              </div>
              <button className="login-button" type="submit">
                Login &amp; Continue <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="trust-row" id="phone-help">
              <span className="trust-pill">🔒 Demo experience</span>
              <span className="trust-pill">✨ No payment required</span>
            </div>
          </>
        )}

        {page === "category" && (
          <div className="category-content">
            <p className="login-description">
              Apni favourite quiz category choose karo!
            </p>
            <div className="category-grid">
              {categories.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="category-button"
                  onClick={() => {
                    setCategory(item.name);
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setScore(0);
                    setAnswers([]);
                    setTimeLeft(30);
                    setDemoPaymentComplete(false);
                    setMessage("");
                    setPage("profile");
                  }}
                >
                  <span className="category-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <strong>{item.name}</strong>
                  <small>{item.desc}</small>
                </button>
              ))}
            </div>
            <button className="back-button" type="button" onClick={backToLogin}>
              ← Back to login
            </button>
          </div>
        )}

        {page === "profile" && (
          <>
            <p className="login-description">
              Apni details fill karo aur quiz ke liye ready ho jao!
            </p>
            <form onSubmit={handleProfileSubmit}>
              <label htmlFor="name">Full name</label>
              <input
                className="profile-input"
                id="name"
                name="name"
                autoComplete="name"
                value={profile.name}
                onChange={handleProfileChange}
                maxLength={80}
                placeholder="Enter your name"
                required
              />

              <label htmlFor="email">Email address</label>
              <input
                className="profile-input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                required
              />

              <label htmlFor="age">Age</label>
              <input
                className="profile-input"
                id="age"
                name="age"
                type="number"
                min="13"
                max="100"
                value={profile.age}
                onChange={handleProfileChange}
                placeholder="Enter your age"
                required
              />

              <label htmlFor="city">City</label>
              <input
                className="profile-input"
                id="city"
                name="city"
                autoComplete="address-level2"
                value={profile.city}
                onChange={handleProfileChange}
                maxLength={80}
                placeholder="Enter your city"
                required
              />

              <button className="login-button" type="submit">
                Start {category} Quiz <span aria-hidden="true">→</span>
              </button>
            </form>
            <button
              className="back-button"
              type="button"
              onClick={() => setPage("category")}
            >
              ← Change category
            </button>
          </>
        )}

        {page === "quiz" && question && (
          <div className="quiz-content">
            <div className="quiz-topline">
              <span>{category.toUpperCase()} QUIZ</span>
              <span>
                QUESTION {currentQuestion + 1} OF {questions.length}
              </span>
            </div>

            <div className="timer-row">
              <span>⏱️ Time Left</span>
              <strong className={timeLeft <= 10 ? "timer-warning" : ""}>
                00:{String(timeLeft).padStart(2, "0")}
              </strong>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={currentQuestion + 1}
            >
              <div
                className="progress-fill"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <h2 className="question-title">{question.question}</h2>

            <div className="options-list">
              {question.options.map((option, index) => {
                let className = "quiz-option";

                if (selectedAnswer !== null) {
                  if (index === question.answer) className += " correct";
                  else if (index === selectedAnswer) className += " incorrect";
                }

                return (
                  <button
                    type="button"
                    className={className}
                    key={option}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    aria-pressed={selectedAnswer === index}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {selectedAnswer !== null && index === question.answer && (
                      <span className="answer-symbol" aria-label="Correct answer">✓</span>
                    )}
                    {selectedAnswer === index && index !== question.answer && (
                      <span className="answer-symbol" aria-label="Incorrect answer">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <p className="answer-feedback" role="status">
                {selectedAnswer === -1
                  ? `Time up! ⏰ Sahi jawab: ${question.options[question.answer]}`
                  : selectedAnswer === question.answer
                    ? "Sahi jawab! 🎉"
                    : `Galat jawab! Sahi jawab: ${question.options[question.answer]}`}
              </p>
            )}

            <button
              className="login-button"
              type="button"
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              {currentQuestion === questions.length - 1
                ? "See Result"
                : "Next Question"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {page === "result" && (
          <div className="result-content">
            <div className="success-icon" aria-hidden="true">
              {percentage >= 70 ? "🏆" : percentage >= 40 ? "👏" : "💪"}
            </div>
            <p className="login-label">{category} QUIZ</p>
            <h2>Quiz Completed!</h2>
            <p className="login-description">
              Well done, {profile.name}!
            </p>

            <div className="score-circle">
              <strong>{percentage}%</strong>
              <span>Your Score</span>
            </div>

            <div className="result-stats">
              <div>
                <strong>{score}/{questions.length}</strong>
                <span>Correct answers</span>
              </div>
              <div>
                <strong>{questions.length - score}</strong>
                <span>Incorrect / timed out</span>
              </div>
            </div>

            <button
              className="login-button"
              type="button"
              onClick={() => {
                setDemoPaymentComplete(false);
                setPage("reward");
              }}
            >
              View Demo Reward <span aria-hidden="true">🎁</span>
            </button>
            <button className="secondary-action" type="button" onClick={restartQuiz}>
              Play Again <span aria-hidden="true">↻</span>
            </button>
            <button className="back-button" type="button" onClick={backToLogin}>
              Back to Login
            </button>
          </div>
        )}

        {page === "reward" && (
          <div className="reward-content">
            <div className="reward-hero-icon" aria-hidden="true">🎁</div>
            <p className="login-label">DEMO REWARD CENTER</p>
            <h2>{demoPaymentComplete ? "Demo Claim Complete!" : "Your Demo Reward"}</h2>
            <p className="login-description">
              {demoPaymentComplete
                ? "Demo flow complete hai. Koi payment ya real reward process nahi hua."
                : "Yeh sirf UI demonstration hai — is screen par koi real payment ya cash prize nahi hai."}
            </p>

            <div className="reward-summary">
              <div>
                <span>Quiz category</span>
                <strong>{category || "GK"}</strong>
              </div>
              <div>
                <span>Your quiz score</span>
                <strong>{score}/{questions.length}</strong>
              </div>
              <div className="reward-amount">
                <span>Illustrative reward value</span>
                <strong>$200 <small>DEMO ONLY</small></strong>
              </div>
              <div>
                <span>Illustrative entry fee</span>
                <strong>$50 <small>NOT CHARGED</small></strong>
              </div>
            </div>

            <div className="demo-disclosure">
              <strong>⚠️ Demo only</strong>
              <p>No payment gateway is connected. Do not enter UPI PIN, card details, bank details, or any payment credentials.</p>
            </div>

            {!demoPaymentComplete ? (
              <button
                className="login-button"
                type="button"
                onClick={() => setDemoPaymentComplete(true)}
              >
                Simulate Demo Payment <span aria-hidden="true">→</span>
              </button>
            ) : (
              <div className="demo-success" role="status">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Demo payment simulated</strong>
                  <p>₹0 charged · No real reward issued</p>
                </div>
              </div>
            )}

            <button
              className="secondary-action"
              type="button"
              onClick={() => setPage("result")}
            >
              ← Back to Result
            </button>
            <button className="back-button" type="button" onClick={backToLogin}>
              Finish Demo
            </button>
          </div>
        )}

        {message && <p className="login-message" role="alert">{message}</p>}

        <p className="demo-note">
          Demo experience only. Mobile number verify nahi hota.
          No real payments, cash prizes, or reward collection.
        </p>
      </section>
    </main>
  );
}

export default App;
