import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./PasswordForm.css";

const PasswordForm = () => {
  const { setPassword } = useAppContext();

  const [fieldValue, setFieldValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(fieldValue);
  };

  return (
    <div className="PasswordForm">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
        <Button icon="lock" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default PasswordForm;
