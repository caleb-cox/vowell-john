import { useEffect } from "react";
import { useStateContext } from "@/contexts/StateContext";
import ModeSelector from "@/components/ModeSelector";
import IndexView from "@/components/IndexView";
import ReadView from "@/components/ReadView";
import EditView from "@/components/EditView";
import LoadingView from "@/components/LoadingView";
import PasswordForm from "@/components/PasswordForm";
import "./App.css";

const App = () => {
  const { password, getPages, mode, loading, pages } = useStateContext();

  useEffect(() => {
    if (password) getPages();
  }, [password]);

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;
  }, [mode]);

  if (loading) return <LoadingView />;

  return pages ? (
    <>
      <ModeSelector />
      {mode === "index" && <IndexView />}
      {mode === "read" && <ReadView />}
      {mode === "edit" && <EditView />}
    </>
  ) : (
    <PasswordForm />
  );
};

export default App;
