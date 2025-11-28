import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadFromLocal } from "../utils/loadFromLocal";
import { saveToLocal } from "../utils/saveToLocal";



function FormList() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = loadFromLocal("forms") || [];
    setForms(storedForms);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      const updatedForms = forms.filter((f) => f.id !== id);
      saveToLocal("forms", updatedForms);
      setForms(updatedForms);
      // Also remove associated entries
      const entries = loadFromLocal("entries") || {};
      delete entries[id];
      saveToLocal("entries", entries);
    }
  };

  const handleClone = (form) => {
    const clonedForm = { ...form, id: Date.now().toString(), title: form.title + " (Copy)" };
    const updatedForms = [...forms, clonedForm];
    saveToLocal("forms", updatedForms);
    setForms(updatedForms);
  };

  return (
    <div className="container">
      <h1>Form Library</h1>
      <button onClick={() => navigate("/create")} className="btnPrimary">
        + Create New Form
      </button>

      {forms.length === 0 ? (
        <p>No forms found. Create a new one!</p>
      ) : (
        <table className="formTable">
          <thead>
            <tr>
              <th>Form Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td>{form.title}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${form.id}`)}>Edit</button>
                  <button onClick={() => navigate(`/preview/${form.id}`)}>Fill</button>
                  <button onClick={() => navigate(`/entries/${form.id}`)}>Entries</button>
                  <button onClick={() => handleClone(form)}>Clone</button>
                  <button onClick={() => handleDelete(form.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FormList;
