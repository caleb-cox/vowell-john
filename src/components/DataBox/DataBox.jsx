import "./DataBox.css";

const DataBox = ({ label, value }) => {
  return (
    <div className="DataBox">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default DataBox;
