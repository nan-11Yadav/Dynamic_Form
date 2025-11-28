import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadFromLocal } from "../utils/loadFromLocal";

function Preview() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedForms = loadFromLocal("forms") || [];
    const found = savedForms.find((f) => f.id === id);
    setForm(found);
  }, [id]);

  if (!form) {
    return <p style={styles.loading}>Loading form...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{form.title} – Preview</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          {form.fields.map((field) => (
            <div key={field.id} style={styles.fieldGroup}>
              <label style={styles.label}>{field.label}</label>

              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.label}
                  style={styles.input}
                  required={field.required}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  placeholder={field.label}
                  style={styles.textarea}
                  required={field.required}
                ></textarea>
              )}

              {field.type === "select" && (
                <select style={styles.input} required={field.required}>
                  <option>Select option</option>
                  {field.options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}

          {/* ⭐ Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={styles.backButton}
            >
              ⬅ Back
            </button>

            <button type="submit" style={styles.submitButton}>
              Submit ✔
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🌟 Beautiful Modern Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  card: {
    width: "70%",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#34495e",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical",
    minHeight: "120px",
    fontSize: "16px",
  },

  // ⭐ Buttons
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },

  backButton: {
    padding: "12px 20px",
    background: "#bdc3c7",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },

  submitButton: {
    padding: "12px 20px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },

  loading: {
    fontSize: "20px",
    padding: "40px",
    textAlign: "center",
  },
};

export default Preview;
