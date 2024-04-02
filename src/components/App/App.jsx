import { createContext, useState, useEffect, useContext } from "react";
import ModeSelector from "@/components/ModeSelector";
import "./App.css";

const localStorageIsAvailable = (() => {
  try {
    localStorage.setItem("__test", "__test");
    localStorage.removeItem("__test");
    return true;
  } catch {
    return false;
  }
})();

const AppContext = createContext();

const App = () => {
  const [mode, setMode] = useState("index");

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;
  }, [mode]);

  const [pages, setPages] = useState({
    "Hello world": "This is the first page, isn't it neat?",
    "What else?": "This is another page. We have so many beautiful pages.",
    "A THIRD page!": "Lorem ipsum blah blah butts",
  });

  const [currentPage, setCurrentPage] = useState(
    (localStorageIsAvailable && localStorage.getItem("currentPage")) ||
      Object.keys(pages)[0]
  );

  useEffect(() => {
    if (!localStorageIsAvailable) return;
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <AppContext.Provider
      value={{ mode, setMode, pages, setPages, currentPage, setCurrentPage }}
    >
      <ModeSelector />
      {mode === "index" && <h1>INDEX PLACEHOLDER</h1>}
      {mode === "read" && <h1>READ PLACEHOLDER</h1>}
      {mode === "edit" && <h1>EDIT PLACEHOLDER</h1>}
    </AppContext.Provider>
  );
};

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
