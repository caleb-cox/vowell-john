import "./Button.css";

const Button = ({ disabled, onClick, className, children }) => {
  return (
    <div
      className={["Button"]
        .concat(className ? [className] : [])
        .concat(disabled ? ["disabled"] : [])
        .join(" ")}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

export default Button;
