import { useState } from "react";
import { saveToLocal } from "../utils/saveToLocal";
import { loadFromLocal } from "../utils/loadFromLocal";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import FieldCard from "../components/FieldCard";

function CreateForm() {
  const navigate = useNavigate();

  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState([]);

  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    required: false,
    options: "",
  });

  const addField = () => {
    if (!newField.label) {
      alert("Label is required");
      return;
    }

    const id = uuid();

    const fieldData = {
      id,
      label: newField.label,
      type: newField.type,
      required: newField.required,
      options:
        newField.type === "radio" || newField.type === "checkbox" || newField.type === "select"
          ? newField.options.split(",").map((o) => o.trim())
          : [],
    };

    setFields((prev) => [...prev, fieldData]);

    setNewField({
      label: "",
      type: "text",
      required: false,
      options: "",
    });
  };

  const deleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...fields];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setFields(updated);
  };

  const moveDown = (index) => {
    if (index === fields.length - 1) return;
    const updated = [...fields];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setFields(updated);
  };

  const saveForm = () => {
  if (!formTitle) {
    alert("Form title is required");
    return;
  }

  const formId = uuid();

  const formData = {
    id: formId,
    title: formTitle,
    fields,
  };

  // Load existing forms
  const existingForms = loadFromLocal("forms");

  let updatedForms = [];

  if (Array.isArray(existingForms)) {
    updatedForms = [...existingForms, formData];
  } else if (existingForms) {
    // if only ONE object was saved earlier, convert it to array
    updatedForms = [existingForms, formData];
  } else {
    updatedForms = [formData];
  }

  // Save updated array
  saveToLocal("forms", updatedForms);

  alert("Form saved!");
  navigate("/");
};


  return (
    <div className="container">
      <h1>Create Form</h1>

      <input
        type="text"
        placeholder="Form Title"
        className="input"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />

      <h2>Add Field</h2>

      <div className="fieldBuilder">
        <input
          type="text"
          placeholder="Field Label"
          className="input"
          value={newField.label}
          onChange={(e) =>
            setNewField({ ...newField, label: e.target.value })
          }
        />

        <select
          className="input"
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="radio">Radio Group</option>
          <option value="checkbox">Checkbox</option>
          <option value="select">Dropdown</option>
          <option value="file">File Upload</option>
        </select>

        {(newField.type === "radio" ||
          newField.type === "checkbox" ||
          newField.type === "select") && (
          <input
            type="text"
            placeholder="Options (comma separated)"
            className="input"
            value={newField.options}
            onChange={(e) =>
              setNewField({ ...newField, options: e.target.value })
            }
          />
        )}

        <label style={{ display: "flex", gap: "8px" }}>
          <input
            type="checkbox"
            checked={newField.required}
            onChange={(e) =>
              setNewField({ ...newField, required: e.target.checked })
            }
          />
          Required?
        </label>

        <button className="btn" onClick={addField}>
          Add Field
        </button>
      </div>

      <h2>Form Fields</h2>

      {fields.length === 0 && <p>No fields added yet</p>}

      {fields.map((field, index) => (
        <FieldCard
          key={field.id}
          field={field}
          index={index}
          moveUp={moveUp}
          moveDown={moveDown}
          deleteField={deleteField}
        />
      ))}

      <button className="btnPrimary" onClick={saveForm}>
        Save Form
      </button>
    </div>
  );
}

export default CreateForm;
