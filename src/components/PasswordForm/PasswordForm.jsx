import { useState } from "react";
import { useStateContext } from "@/contexts/StateContext";
import Button from "@/components/Button";
import "./PasswordForm.css";

const PasswordForm = () => {
  const { setPassword } = useStateContext();

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(inputValue);
  };

  return (
    <div className="PasswordForm">
      <h1>\\°˖✧ vowellJohn ✧˖°//</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button icon="lock" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default PasswordForm;
