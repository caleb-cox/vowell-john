import "./Button.css";

const Button = ({ active, onClick, children }) => {
  return (
    <div
      className={["Button", active ? "active" : null].join(" ").trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
