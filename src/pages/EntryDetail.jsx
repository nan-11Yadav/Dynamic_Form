import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadFromLocal } from "../utils/loadFromLocal";

function EntryDetail() {
  const { formId, entryId } = useParams();
  const [entry, setEntry] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const forms = loadFromLocal("forms") || [];
    const form = forms.find((f) => f.id === formId);
    if (form) setFormTitle(form.title);

    const allEntries = loadFromLocal("entries") || {};
    const currentEntry = (allEntries[formId] || []).find((e) => e.id === entryId);
    setEntry(currentEntry);
  }, [formId, entryId]);

  if (!entry) return <p>Loading entry details...</p>;

  return (
    <div className="container">
      <h1>Entry Details for: {formTitle}</h1>
      <button onClick={() => navigate(-1)}>Back to Entries</button>

      <table className="formTable">
        <thead>
          <tr>
            <th>Field Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(entry.values).map(([fieldName, value]) => (
            <tr key={fieldName}>
              <td>{fieldName}</td>
              <td>
                {typeof value === "object" && value.name ? value.name : value.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntryDetail;
