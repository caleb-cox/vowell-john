import "./Button.css";

const Button = ({ icon, disabled, onClick }) => {
  return (
    <div
      className={["Button", "material-symbols-outlined"]
        .concat(disabled ? ["disabled"] : [])
        .join(" ")}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
    </div>
  );
};

export default Button;
