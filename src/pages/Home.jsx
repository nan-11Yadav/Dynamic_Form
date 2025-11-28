import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadFromLocal } from "../utils/loadFromLocal";

function Home() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    let savedForms = loadFromLocal("forms") || [];

    // 🔥 Ensure savedForms is always an array
    if (!Array.isArray(savedForms)) {
      savedForms = [savedForms];
    }

    console.log("Final forms array:", savedForms);
    setForms(savedForms);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dynamic Form Builder</h1>

      <Link to="/create">
        <button>Create New Form</button>
      </Link>

      <h2 style={{ marginTop: "20px" }}>Saved Forms</h2>

      {forms.length === 0 ? (
        <p>No forms created yet.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id} style={{ marginBottom: "10px" }}>
              <strong>{form.title}</strong>
              <Link to={`/preview/${form.id}`}>
                <button style={{ marginLeft: "10px" }}>Preview</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
