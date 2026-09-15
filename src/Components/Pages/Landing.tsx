import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <span className="landing-icon"> 🛒 </span>
        <h1> Shopping List App </h1>
        <p>
          Create, organise and share your shopping lists in one place. Add items with
          categories, notes and images then search and sort to find what you need fast.
        </p>
        <div className="landing-actions">
          <Link to="/login">
            <button className="btn btn-primary"> Sign In </button>
          </Link>
          <Link to="/register">
            <button className="btn btn-outline"> Create Account </button>
          </Link>
        </div>
      </section>

      <section className="landing-features">
        <div className="feature-card">
          <span> 📝 </span>
          <h3> Add & Organise </h3>
          <p> Add items with quantity, category, notes and an image. </p>
        </div>
        <div className="feature-card">
          <span> 🔍 </span>
          <h3> Search & Sort </h3>
          <p> Quickly find items by name, category or the date they were added. </p>
        </div>
        <div className="feature-card">
          <span> 🔗 </span>
          <h3> Share Lists </h3>
          <p> Share a list by email, link or your device's native share options. </p>
        </div>
      </section>

      <section className="landing-how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create an account</h3>
            <p>Register with your email and a few details, then sign in securely.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Build your lists</h3>
            <p>Group items into categories like Groceries or Electronics, each with quantity, notes, and an image.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Search, sort & share</h3>
            <p>Find what you need instantly, and share any list with family or housemates.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <span className="landing-icon-small">🛒</span>
        <p>Shopping List App — built with React, TypeScript, and Redux.</p>
      </footer>
    </div>
  );
}

export default Landing;
