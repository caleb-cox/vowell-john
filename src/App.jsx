import { createContext, useState, useEffect, useContext } from "react";
import ModeSelector from "@/components/ModeSelector";
import "./App.css";

const AppContext = createContext();

const App = () => {
  const [mode, setMode] = useState("index");

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;
  }, [mode]);

  return (
    <AppContext.Provider value={{ mode, setMode }}>
      <ModeSelector />
    </AppContext.Provider>
  );
};

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
