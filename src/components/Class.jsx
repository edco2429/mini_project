// Class.jsx
function Class({ status, title, onClick }) {
  return (
    <button
      className={`class ${status}`}
      title={title}
      onClick={onClick}
      disabled={status !== "available"}
    >
      <span className="tooltip">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      {title}
    </button>
  );
}

export default Class;
