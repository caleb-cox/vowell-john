import "./Button.css";

const Button = ({ active, onClick, children }) => {
  return (
    <div
      className={["Button"].concat(active ? ["active"] : []).join(" ")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
