import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadFromLocal } from "../utils/loadFromLocal";
import { saveToLocal } from "../utils/saveToLocal";


function FormEntries() {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const forms = loadFromLocal("forms") || [];
    const form = forms.find((f) => f.id === id);
    if (form) setFormTitle(form.title);

    const allEntries = loadFromLocal("entries") || {};
    setEntries(allEntries[id] || []);
  }, [id]);

  const handleDelete = (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const allEntries = loadFromLocal("entries") || {};
      const updatedEntries = (allEntries[id] || []).filter((e) => e.id !== entryId);
      allEntries[id] = updatedEntries;
      saveToLocal("entries", allEntries);
      setEntries(updatedEntries);
    }
  };

  return (
    <div className="container">
      <h1>Entries for: {formTitle}</h1>
      <button onClick={() => navigate(-1)}>Back to Forms</button>

      {entries.length === 0 ? (
        <p>No entries submitted yet.</p>
      ) : (
        <table className="formTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>
                  <button onClick={() => navigate(`/entry/${id}/${entry.id}`)}>View</button>
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FormEntries;
