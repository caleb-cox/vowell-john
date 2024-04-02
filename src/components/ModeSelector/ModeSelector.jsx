import "./ModeSelector.css";
import { useAppContext } from "@/App";
import Button from "@/components/Button";

const ModeSelector = () => {
  const { mode, setMode } = useAppContext();

  return (
    <div className="ModeSelector">
      <Button
        active={mode === "index"}
        onClick={() => {
          setMode("index");
        }}
      >
        Index
      </Button>
      <Button
        active={mode === "read"}
        onClick={() => {
          setMode("read");
        }}
      >
        Read
      </Button>
      <Button
        active={mode === "edit"}
        onClick={() => {
          setMode("edit");
        }}
      >
        Edit
      </Button>
    </div>
  );
};

export default ModeSelector;
