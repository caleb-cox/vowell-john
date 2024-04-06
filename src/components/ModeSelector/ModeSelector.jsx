import "./ModeSelector.css";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";

const ModeSelector = () => {
  const { mode, setMode } = useAppContext();

  return (
    <div className="ModeSelector">
      <Button
        className="material-symbols-outlined"
        disabled={mode === "index"}
        onClick={() => {
          setMode("index");
        }}
      >
        folder_open
      </Button>
      <Button
        className="material-symbols-outlined"
        disabled={mode === "read"}
        onClick={() => {
          setMode("read");
        }}
      >
        draft
      </Button>
      <Button
        className="material-symbols-outlined"
        disabled={mode === "edit"}
        onClick={() => {
          setMode("edit");
        }}
      >
        edit
      </Button>
    </div>
  );
};

export default ModeSelector;
