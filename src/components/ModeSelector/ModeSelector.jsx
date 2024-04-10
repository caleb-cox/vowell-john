import "./ModeSelector.css";
import { useStateContext } from "@/contexts/StateContext";
import Button from "@/components/Button";

const ModeSelector = () => {
  const { mode, setMode } = useStateContext();

  return (
    <div className="ModeSelector">
      <Button
        icon="folder_open"
        disabled={mode === "index"}
        onClick={() => setMode("index")}
      />
      <Button
        icon="draft"
        disabled={mode === "read"}
        onClick={() => setMode("read")}
      />
      <Button
        icon="edit"
        disabled={mode === "edit"}
        onClick={() => setMode("edit")}
      />
    </div>
  );
};

export default ModeSelector;
