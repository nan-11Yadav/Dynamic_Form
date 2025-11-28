import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Dynamic Form Builder</h2>

      <div style={styles.links}>
        <NavLink
          to="/"
          style={styles.link}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/create"
          style={styles.link}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          Create Form
        </NavLink>

        <NavLink
          to="/forms"
          style={styles.link}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          Saved Forms
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2c3e50",
    color: "white",
    padding: "14px 22px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
    flexWrap: "wrap", // ← makes it responsive
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
  },
  link: {
    color: "white",
    fontSize: "16px",
    textDecoration: "none",
    fontWeight: "500",
    padding: "6px 0",
    transition: "0.2s",
  },
};

// Inject Global CSS for active & hover
const css = `
.activeNav {
  font-weight: 700 !important;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 3px;
}

nav a:hover {
  opacity: 0.8;
}

/* ---------- MOBILE RESPONSIVE ---------- */
@media (max-width: 600px) {
  nav {
    padding: 12px 18px !important;
  }

  nav h2 {
    font-size: 19px !important;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  nav div {
    width: 100%;
    justify-content: center !important;
    gap: 18px !important;
  }

  nav a {
    font-size: 15px !important;
    padding: 6px;
  }
}
`;

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);
}

export default Navbar;
