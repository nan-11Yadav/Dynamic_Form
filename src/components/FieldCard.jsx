function FieldCard({ field, index, onEdit, onDelete, onMoveUp, onMoveDown }) {
  return (
    <div className="field-card">
      <h4>{index + 1}. {field.label}</h4>

      <p><strong>Type:</strong> {field.type}</p>
      {field.required && <p>Required: Yes</p>}
      {!field.required && <p>Required: No</p>}

      {field.options && field.options.length > 0 && (
        <p><strong>Options:</strong> {field.options.join(", ")}</p>
      )}

      <div className="actions">
        <button onClick={() => onMoveUp(index)}>↑ Move Up</button>
        <button onClick={() => onMoveDown(index)}>↓ Move Down</button>
        <button onClick={() => onEdit(index)}>Edit</button>
        <button onClick={() => onDelete(index)}>Delete</button>
      </div>
    </div>
  );
}

export default FieldCard;
