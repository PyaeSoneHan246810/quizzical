function IntroPage({ onStart }) {
  return (
    <div className="intro-container">
      <h1>Quizzical</h1>
      <p>Welcome! Play to test your knowledge.</p>
      <button onClick={onStart} className="btn-primary">
        Start Quiz
      </button>
    </div>
  );
}

export default IntroPage;
