import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { WebsimSocket } from "@websim/use-query";
import { useUser } from "./hooks/useUser.js";
import { Header } from "./components/Header.jsx";
import { FileUpload } from "./components/FileUpload.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
const room = new WebsimSocket();
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center text-white max-w-md", children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-bold mb-4", children: "WebSim File Hub" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 31,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-red-300 mb-2", children: "\u274C Application Error" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 33,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-red-200", children: this.state.error?.message || "Unknown error occurred" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 34,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 32,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => window.location.reload(),
            className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors",
            children: "\u{1F504} Reload Page"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 36,
            columnNumber: 25
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 30,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 29,
        columnNumber: 17
      }, this);
    }
    return this.props.children;
  }
}
function App() {
  const [currentView, setCurrentView] = useState("upload");
  const [fileServing, setFileServing] = useState(null);
  const [fileServingError, setFileServingError] = useState(null);
  const { currentUser, userLoading, userError } = useUser();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    const filename = urlParams.get("filename");
    if (username && filename) {
      handleFileServing(username, filename);
    }
  }, []);
  const handleFileServing = async (username, filename) => {
    setFileServing({ username, filename, loading: true });
    setFileServingError(null);
    try {
      const files = await room.query(
        "SELECT file_url, filename, content_type, file_size, upload_date FROM public.uploaded_files WHERE uploader_username = $1 AND filename = $2",
        [username, filename]
      );
      if (files.length === 0) {
        setFileServingError(`File "${filename}" not found for user @${username}`);
        setFileServing(null);
        return;
      }
      const file = files[0];
      window.location.href = file.file_url;
    } catch (error) {
      console.error("Error fetching file:", error);
      setFileServingError(`Error loading file: ${error.message}`);
      setFileServing(null);
    }
  };
  console.log("App render - currentUser:", currentUser, "userLoading:", userLoading, "userError:", userError);
  if (fileServing) {
    if (fileServing.loading) {
      return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 107,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-white mb-2", children: "Loading File" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 109,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300", children: [
          "Fetching ",
          fileServing.filename,
          " from @",
          fileServing.username,
          "..."
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 17
      }, this);
    }
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900", children: /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: [
          "File: ",
          fileServing.filename
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 121,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-slate-300", children: [
          "Uploaded by @",
          fileServing.username
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 124,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 120,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl border border-slate-600 p-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4 mb-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl", children: fileServing.file.content_type?.startsWith("image/") ? "\u{1F5BC}\uFE0F" : fileServing.file.content_type?.startsWith("video/") ? "\u{1F3A5}" : fileServing.file.content_type?.startsWith("audio/") ? "\u{1F3B5}" : "\u{1F4C4}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 131,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-white", children: fileServing.file.filename }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 137,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: formatFileSize(fileServing.file.file_size) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 138,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 136,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 130,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Type:" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 145,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: fileServing.file.content_type || "Unknown" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 146,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 144,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Uploaded:" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 149,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: new Date(fileServing.file.upload_date).toLocaleString() }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 150,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 148,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 143,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 142,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: fileServing.file.file_url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50 text-center",
              children: "\u{1F517} View File"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 156,
              columnNumber: 33
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: (e) => copyToClipboard(fileServing.file.file_url, e),
              className: "px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200 font-medium",
              children: "\u{1F4CB} Copy URL"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 164,
              columnNumber: 33
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 155,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-6 pt-6 border-t border-slate-600", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setFileServing(null);
              setFileServingError(null);
              window.history.replaceState({}, "", window.location.pathname);
            },
            className: "text-slate-400 hover:text-white transition-colors",
            children: "\u2190 Back to File Hub"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 173,
            columnNumber: 33
          },
          this
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 172,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 129,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 119,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 118,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 117,
      columnNumber: 13
    }, this);
  }
  if (fileServingError) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-md mx-auto text-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center text-2xl", children: "\u274C" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 196,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-white mb-4", children: "File Not Found" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 199,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-red-300 mb-6", children: fileServingError }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 200,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            setFileServingError(null);
            window.history.replaceState({}, "", window.location.pathname);
          },
          className: "px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50",
          children: "Go to File Hub"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 201,
          columnNumber: 21
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 195,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 194,
      columnNumber: 13
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900", children: /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxDEV(
      Header,
      {
        currentView,
        setCurrentView,
        currentUser,
        userLoading,
        userError
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 218,
        columnNumber: 17
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("main", { className: "mt-8", children: currentView === "upload" ? /* @__PURE__ */ jsxDEV(FileUpload, { currentUser, room }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 227,
      columnNumber: 25
    }, this) : /* @__PURE__ */ jsxDEV(Dashboard, { currentUser, room }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 229,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 225,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 217,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 216,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(
  /* @__PURE__ */ jsxDEV(ErrorBoundary, { children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 241,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 240,
    columnNumber: 5
  })
);
