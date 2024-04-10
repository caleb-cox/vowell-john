import { createContext, useContext } from "react";
import { useImmer } from "use-immer";
import axios from "axios";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [state, updateState] = useImmer({
    loading: false,
    mode: "locked",
    password: undefined,
    pages: undefined,
    lastSyncTime: undefined,
    currentPage: undefined,
  });

  const { password } = state;

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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
  };

  const findPageByTitle = (title) => {
    return state.pages.find((p) => p.title === title);
  };

  return (
    <StateContext.Provider
      value={{
        ...state,
        setLoading,
        setMode,
        setPassword,
        viewPage,
        viewNewPage,
        getPages,
        createPage,
        updatePage,
        deletePage,
        findPageByTitle,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;

export const useStateContext = () => {
  return useContext(StateContext);
};
