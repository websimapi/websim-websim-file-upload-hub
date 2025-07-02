import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
function Header({ currentView, setCurrentView, currentUser, userLoading, userError }) {
  return /* @__PURE__ */ jsxDEV("header", { className: "text-center", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: "WebSim File Hub" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 7,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-slate-300 mb-8", children: "Upload, store, and share your files with the world" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 10,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 6,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("nav", { className: "flex justify-center space-x-4 mb-8", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setCurrentView("upload"),
          className: `px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${currentView === "upload" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
          children: "\u{1F4E4} Upload Files"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 16,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setCurrentView("dashboard"),
          className: `px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${currentView === "dashboard" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
          children: "\u{1F4CA} My Files"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 26,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 15,
      columnNumber: 13
    }, this),
    userLoading ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 40,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "Loading user..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 41,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 39,
      columnNumber: 17
    }, this) : userError ? /* @__PURE__ */ jsxDEV("div", { className: "mb-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg", children: /* @__PURE__ */ jsxDEV("p", { className: "text-yellow-300", children: [
      "\u26A0\uFE0F User loading failed: ",
      userError
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 44,
      columnNumber: 17
    }, this) : currentUser ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [
      /* @__PURE__ */ jsxDEV(
        "img",
        {
          src: `https://images.websim.com/avatar/${currentUser.username}`,
          alt: currentUser.username,
          className: "w-8 h-8 rounded-full border-2 border-purple-400"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 49,
          columnNumber: 21
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: [
        "Welcome, ",
        /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-semibold", children: [
          "@",
          currentUser.username
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 55,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 48,
      columnNumber: 17
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg", children: /* @__PURE__ */ jsxDEV("p", { className: "text-blue-300", children: "\u2139\uFE0F Please log in to upload and manage files" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 60,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 5,
    columnNumber: 9
  }, this);
}
export {
  Header
};
