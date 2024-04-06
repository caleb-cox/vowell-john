import "./Button.css";

const Button = ({ active, onClick, className, children }) => {
  return (
    <div
      className={["Button"]
        .concat(className ? [className] : [])
        .concat(active ? ["active"] : [])
        .join(" ")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
