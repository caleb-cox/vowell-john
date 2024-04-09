import { createContext, useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import ModeSelector from "@/components/ModeSelector";
import IndexView from "@/components/IndexView";
import ReadView from "@/components/ReadView";
import EditView from "@/components/EditView";
import LoadingView from "@/components/LoadingView";
import PasswordForm from "@/components/PasswordForm";
import "./App.css";

const AppContext = createContext();

const App = () => {
  const [state, updateState] = useImmer({
    loading: false,
    mode: "locked",
    password: undefined,
    pages: undefined,
    lastSyncTime: undefined,
    currentPage: undefined,
  });

  const { loading, mode, password, pages } = state;

  useEffect(() => {
    if (password) getPages();
  }, [password]);

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;
  }, [mode]);

  const setLoading = (loading) => {
    updateState((draft) => {
      draft.loading = loading;
    });
  };

  const setMode = (mode) => {
    updateState((draft) => {
      draft.mode = mode;
    });
  };

  const setPassword = (password) => {
    updateState((draft) => {
      draft.password = password;
    });
  };

  const viewPage = (page) => {
    updateState((draft) => {
      draft.mode = "read";
      draft.currentPage = page;
    });
  };

  const viewNewPage = () => {
    updateState((draft) => {
      draft.mode = "edit";
      draft.currentPage = undefined;
    });
  };

  const findPageByTitle = (title) => {
    return pages.find((p) => p.title === title);
  };

  const getPages = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://vowell-john-back-end.glitch.me/pages",
      headers: { password },
    })
      .then(({ data }) => {
        if (data.success) {
          updateState((draft) => {
            draft.loading = false;
            draft.mode = "index";
            draft.pages = data.pages;
            draft.lastSyncTime = new Date();
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const createPage = (title) => {
    setLoading(true);
    axios({
      method: "post",
      url: "https://vowell-john-back-end.glitch.me/page",
      headers: { password },
      data: { title },
    })
      .then(({ data }) => {
        if (data.success) {
          updateState((draft) => {
            draft.loading = false;
            draft.mode = "edit";
            draft.pages.push(data.newPage);
            draft.currentPage = data.newPage;
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const updatePage = (page) => {
    setLoading(true);
    axios({
      method: "put",
      url: "https://vowell-john-back-end.glitch.me/page",
      headers: { password },
      data: page,
    })
      .then(({ data }) => {
        if (data.success) {
          updateState((draft) => {
            draft.loading = false;
            draft.mode = "read";
            draft.pages[draft.pages.findIndex((p) => p.id === page.id)] = page;
            draft.currentPage = page;
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const deletePage = (page) => {
    setLoading(true);
    axios({
      method: "delete",
      url: "https://vowell-john-back-end.glitch.me/page",
      headers: { password },
      data: { id: page.id },
    })
      .then(({ data }) => {
        if (data.success) {
          updateState((draft) => {
            draft.loading = false;
            draft.mode = "index";
            draft.pages = draft.pages.filter((p) => p.id !== page.id);
            draft.currentPage = undefined;
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading) return <LoadingView />;

  return (
    <AppContext.Provider
      value={{
        ...state,
        setMode,
        setPassword,
        viewPage,
        viewNewPage,
        findPageByTitle,
        getPages,
        createPage,
        updatePage,
        deletePage,
      }}
    >
      {pages ? (
        <>
          <ModeSelector />
          {mode === "index" && <IndexView />}
          {mode === "read" && <ReadView />}
          {mode === "edit" && <EditView />}
        </>
      ) : (
        <PasswordForm />
      )}
    </AppContext.Provider>
  );
};

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
