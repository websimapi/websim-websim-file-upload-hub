import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { WebsimSocket, useQuery } from "@websim/use-query";
const room = new WebsimSocket();
function App() {
  const [currentView, setCurrentView] = useState("upload");
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        setUserLoading(true);
        const user = await window.websim.getCurrentUser();
        setCurrentUser(user);
        setUserError(null);
      } catch (error) {
        console.error("Error loading user:", error);
        setUserError(error.message);
        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    loadUser();
  }, []);
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
        lineNumber: 36,
        columnNumber: 17
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("main", { className: "mt-8", children: currentView === "upload" ? /* @__PURE__ */ jsxDEV(FileUpload, { currentUser }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 25
    }, this) : /* @__PURE__ */ jsxDEV(Dashboard, { currentUser }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 47,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 34,
    columnNumber: 9
  }, this);
}
function Header({ currentView, setCurrentView, currentUser, userLoading, userError }) {
  return /* @__PURE__ */ jsxDEV("header", { className: "text-center", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: "WebSim File Hub" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 59,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-slate-300 mb-8", children: "Upload, store, and share your files with the world" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 58,
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
          lineNumber: 68,
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
          lineNumber: 78,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 67,
      columnNumber: 13
    }, this),
    userLoading ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 92,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "Loading user..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 93,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 91,
      columnNumber: 17
    }, this) : userError ? /* @__PURE__ */ jsxDEV("div", { className: "mb-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg", children: /* @__PURE__ */ jsxDEV("p", { className: "text-yellow-300", children: [
      "\u26A0\uFE0F User loading failed: ",
      userError
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 97,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 96,
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
          lineNumber: 101,
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
          lineNumber: 107,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 106,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 100,
      columnNumber: 17
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg", children: /* @__PURE__ */ jsxDEV("p", { className: "text-blue-300", children: "\u2139\uFE0F Please log in to upload and manage files" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 112,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 111,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 57,
    columnNumber: 9
  }, this);
}
function FileUpload({ currentUser }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  const handleFile = async (file) => {
    if (!currentUser) {
      setError("Please make sure you are logged in to upload files.");
      return;
    }
    setUploading(true);
    setError(null);
    setUploadedFile(null);
    try {
      const fileUrl = await window.websim.upload(file);
      const fileRecord = await room.collection("uploaded_files").create({
        filename: file.name,
        file_url: fileUrl,
        file_size: file.size,
        content_type: file.type,
        uploader_username: currentUser.username,
        upload_date: (/* @__PURE__ */ new Date()).toISOString()
      });
      setUploadedFile({
        ...fileRecord,
        file_url: fileUrl
      });
    } catch (error2) {
      console.error("Upload failed:", error2);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "\u2705 Copied!";
      button.classList.add("bg-green-600");
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("bg-green-600");
      }, 2e3);
    });
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl mx-auto animate-slide-up", children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: `border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${dragActive ? "border-purple-400 bg-purple-500/20 scale-105" : "border-slate-600 bg-slate-800/50 hover:border-purple-500 hover:bg-slate-800/70"}`,
        onDragEnter: handleDrag,
        onDragLeave: handleDrag,
        onDragOver: handleDrag,
        onDrop: handleDrop,
        children: uploading ? /* @__PURE__ */ jsxDEV("div", { className: "animate-pulse-slow", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 225,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 224,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-white mb-2", children: "Uploading your file..." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 227,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Please wait while we process your upload" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 228,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 223,
          columnNumber: 21
        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl animate-bounce-slow", children: "\u{1F4C1}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 232,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-white mb-4", children: "Drop your files here" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 235,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Or click to browse and select files from your device" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 238,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "file",
              id: "fileInput",
              className: "hidden",
              onChange: handleFileInput
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 241,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "label",
            {
              htmlFor: "fileInput",
              className: "inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50",
              children: "Choose Files"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 247,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 231,
          columnNumber: 21
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 211,
        columnNumber: 13
      },
      this
    ),
    error && /* @__PURE__ */ jsxDEV("div", { className: "mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg animate-fade-in", children: /* @__PURE__ */ jsxDEV("p", { className: "text-red-300", children: [
      "\u274C ",
      error
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 259,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 258,
      columnNumber: 17
    }, this),
    uploadedFile && /* @__PURE__ */ jsxDEV("div", { className: "mt-8 p-6 bg-slate-800/70 rounded-2xl border border-slate-600 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xl", children: "\u2705" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 266,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-bold text-white", children: "Upload Successful!" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 270,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Your file is now available" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 271,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 269,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 265,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Filename:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 278,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2 font-mono", children: uploadedFile.filename }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 279,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 277,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Size:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 282,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: formatFileSize(uploadedFile.file_size) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 283,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 281,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Type:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 286,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: uploadedFile.content_type || "Unknown" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 287,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 285,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Uploaded:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 290,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: new Date(uploadedFile.upload_date).toLocaleString() }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 291,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 289,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 276,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 275,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "File URL (Click to copy):" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 298,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: uploadedFile.file_url,
              readOnly: true,
              className: "flex-1 bg-slate-900 border border-slate-600 rounded-l-lg px-3 py-2 text-white font-mono text-sm"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 302,
              columnNumber: 33
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => copyToClipboard(uploadedFile.file_url),
              className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg transition-colors duration-200 font-medium",
              children: "\u{1F4CB} Copy"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 308,
              columnNumber: 33
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 301,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 297,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 296,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 264,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 210,
    columnNumber: 9
  }, this);
}
function Dashboard({ currentUser }) {
  const { data: files, loading } = useQuery(
    currentUser ? room.collection("uploaded_files").filter({ uploader_username: currentUser.username }) : null
  );
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "\u2705 Copied!";
      button.classList.add("bg-green-600");
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("bg-green-600");
      }, 2e3);
    });
  };
  const deleteFile = async (fileId) => {
    if (confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      try {
        await room.collection("uploaded_files").delete(fileId);
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Failed to delete file. Please try again.");
      }
    }
  };
  if (!currentUser) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center text-2xl", children: "\u{1F510}" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 363,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "Authentication Required" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 366,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Please make sure you are logged in to view your files." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 367,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 362,
      columnNumber: 13
    }, this);
  }
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 376,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 375,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-white", children: "Loading your files..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 378,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 374,
      columnNumber: 13
    }, this);
  }
  if (!files || files.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center text-2xl", children: "\u{1F4C2}" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 386,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "No files yet" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 389,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Upload your first file to get started!" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 390,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 385,
      columnNumber: 13
    }, this);
  }
  const totalSize = files.reduce((sum, file) => sum + file.file_size, 0);
  const totalFiles = files.length;
  return /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto animate-slide-up", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F4C1}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 404,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: totalFiles }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 408,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Total Files" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 409,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 407,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 403,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 402,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F4BE}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 415,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: formatFileSize(totalSize) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 419,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Total Storage" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 420,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 418,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 414,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 413,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F464}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 426,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: [
            "@",
            currentUser.username
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 430,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Your Account" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 431,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 429,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 425,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 424,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 401,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: files.map((file) => /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl border border-slate-600 overflow-hidden hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.02]", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0", children: file.content_type?.startsWith("image/") ? "\u{1F5BC}\uFE0F" : file.content_type?.startsWith("video/") ? "\u{1F3A5}" : file.content_type?.startsWith("audio/") ? "\u{1F3B5}" : "\u{1F4C4}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 444,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-white truncate", children: file.filename }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 450,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400", children: formatFileSize(file.file_size) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 451,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 449,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 443,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => deleteFile(file.id),
            className: "text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors",
            title: "Delete file",
            children: "\u{1F5D1}\uFE0F"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 454,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 442,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs text-slate-400 mb-1", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Type: ",
          file.content_type || "Unknown"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 465,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Uploaded: ",
          new Date(file.upload_date).toLocaleDateString()
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 466,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 464,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 463,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: file.file_url,
            readOnly: true,
            className: "flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-xs"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 471,
            columnNumber: 33
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => copyToClipboard(file.file_url),
            className: "px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex-shrink-0",
            children: "\u{1F4CB}"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 477,
            columnNumber: 33
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: file.file_url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex-shrink-0",
            children: "\u{1F517}"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 483,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 470,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 441,
      columnNumber: 25
    }, this) }, file.id, false, {
      fileName: "<stdin>",
      lineNumber: 440,
      columnNumber: 21
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 438,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 399,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("root"));
try {
  root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 503,
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
