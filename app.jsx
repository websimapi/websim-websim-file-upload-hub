import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { WebsimSocket } from "@websim/use-query";
import { useUser } from "./hooks/useUser.js";
import { Header } from "./components/Header.jsx";
import { FileUpload } from "./components/FileUpload.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
const room = new WebsimSocket();
function App() {
  const [currentView, setCurrentView] = useState("upload");
  const { currentUser, userLoading, userError } = useUser();
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
        lineNumber: 18,
        columnNumber: 17
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("main", { className: "mt-8", children: currentView === "upload" ? /* @__PURE__ */ jsxDEV(FileUpload, { currentUser, room }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 27,
      columnNumber: 25
    }, this) : /* @__PURE__ */ jsxDEV(Dashboard, { currentUser, room }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 25,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 17,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 16,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("root"));
try {
  root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 40,
    columnNumber: 17
  }));
} catch (error) {
  console.error("Failed to render app:", error);
  document.getElementById("root").innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div class="text-center text-white">
                <h1 class="text-4xl font-bold mb-4">WebSim File Hub</h1>
                <p class="text-red-300">Error loading application. Please refresh the page.</p>
                <p class="text-sm text-slate-400 mt-2">Error: ${error.message}</p>
            </div>
        </div>
    `;
}
