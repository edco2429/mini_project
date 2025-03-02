// Floor.jsx
import Class from "./Class";

function Floor({ floorNumber, classes, onClassClick }) {
  return (
    <div className="row">
      <h2>Floor {floorNumber}</h2>
      {classes.map((classItem, index) => (
        <Class
          key={index}
          status={classItem.status}
          title={classItem.title}
          onClick={() => onClassClick(classItem.title)}
        />
      ))}
    </div>
  );
}

export default Floor;
