import "./ModeSelector.css";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";

const ModeSelector = () => {
  const { mode, setMode } = useAppContext();

  return (
    <div className="ModeSelector">
      <Button
        icon="folder_open"
        disabled={mode === "index"}
        onClick={() => {
          setMode("index");
        }}
      />
      <Button
        icon="draft"
        disabled={mode === "read"}
        onClick={() => {
          setMode("read");
        }}
      />
      <Button
        icon="edit"
        disabled={mode === "edit"}
        onClick={() => {
          setMode("edit");
        }}
      />
    </div>
  );
};

export default ModeSelector;
