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
    </div>
  );
}

export default Landing;
