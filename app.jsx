import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
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
  const { currentUser, userLoading, userError } = useUser();
  console.log("App render - currentUser:", currentUser, "userLoading:", userLoading, "userError:", userError);
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
        lineNumber: 61,
        columnNumber: 17
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("main", { className: "mt-8", children: currentView === "upload" ? /* @__PURE__ */ jsxDEV(FileUpload, { currentUser, room }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 70,
      columnNumber: 25
    }, this) : /* @__PURE__ */ jsxDEV(Dashboard, { currentUser, room }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 68,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 60,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 59,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(
  /* @__PURE__ */ jsxDEV(ErrorBoundary, { children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 84,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 83,
    columnNumber: 5
  })
);
