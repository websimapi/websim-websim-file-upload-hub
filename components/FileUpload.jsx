import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { formatFileSize, copyToClipboard } from "../utils/helpers.js";
function FileUpload({ currentUser, room }) {
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
            lineNumber: 86,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 85,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-white mb-2", children: "Uploading your file..." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 88,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Please wait while we process your upload" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 89,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 21
        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl animate-bounce-slow", children: "\u{1F4C1}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 93,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-white mb-4", children: "Drop your files here" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 96,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Or click to browse and select files from your device" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 99,
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
              lineNumber: 102,
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
              lineNumber: 108,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 92,
          columnNumber: 21
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 72,
        columnNumber: 13
      },
      this
    ),
    error && /* @__PURE__ */ jsxDEV("div", { className: "mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg animate-fade-in", children: /* @__PURE__ */ jsxDEV("p", { className: "text-red-300", children: [
      "\u274C ",
      error
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 120,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 119,
      columnNumber: 17
    }, this),
    uploadedFile && /* @__PURE__ */ jsxDEV("div", { className: "mt-8 p-6 bg-slate-800/70 rounded-2xl border border-slate-600 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xl", children: "\u2705" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-bold text-white", children: "Upload Successful!" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 131,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Your file is now available" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 132,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 130,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 126,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Filename:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 139,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2 font-mono", children: uploadedFile.filename }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 140,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 138,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Size:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 143,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: formatFileSize(uploadedFile.file_size) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 144,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 142,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Type:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 147,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: uploadedFile.content_type || "Unknown" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 148,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 146,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Uploaded:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 151,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: new Date(uploadedFile.upload_date).toLocaleString() }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 152,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 150,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 136,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "File URL (Click to copy):" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 159,
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
              lineNumber: 163,
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
              lineNumber: 169,
              columnNumber: 33
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 162,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 158,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 157,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 125,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 71,
    columnNumber: 9
  }, this);
}
export {
  FileUpload
};
