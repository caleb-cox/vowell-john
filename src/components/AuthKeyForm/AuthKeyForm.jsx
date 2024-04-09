import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./AuthKeyForm.css";

const AuthKeyForm = () => {
  const { setAuthKey } = useAppContext();

  const [fieldValue, setFieldValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthKey(fieldValue);
  };

  return (
    <div className="AuthKeyForm">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Password"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
        <Button icon="lock" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AuthKeyForm;
