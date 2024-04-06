import "./Button.css";

const Button = ({ icon, disabled, onClick, className }) => {
  return (
    <div
      className={["Button", "material-symbols-outlined"]
        .concat(className ? [className] : [])
        .concat(disabled ? ["disabled"] : [])
        .join(" ")}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
    </div>
  );
};

export default Button;
