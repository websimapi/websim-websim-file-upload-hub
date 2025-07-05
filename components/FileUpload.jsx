import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { formatFileSize, copyToClipboard } from "../utils/helpers.js";
function FileUpload({ currentUser, room }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadMode, setUploadMode] = useState("file");
  const [textContent, setTextContent] = useState("");
  const [textFileName, setTextFileName] = useState("");
  const [textFileType, setTextFileType] = useState("txt");
  const fileTypeOptions = [
    { value: "txt", label: "Plain Text (.txt)", mimeType: "text/plain" },
    { value: "md", label: "Markdown (.md)", mimeType: "text/markdown" },
    { value: "html", label: "HTML (.html)", mimeType: "text/html" },
    { value: "css", label: "CSS (.css)", mimeType: "text/css" },
    { value: "js", label: "JavaScript (.js)", mimeType: "text/javascript" },
    { value: "json", label: "JSON (.json)", mimeType: "application/json" },
    { value: "xml", label: "XML (.xml)", mimeType: "text/xml" },
    { value: "csv", label: "CSV (.csv)", mimeType: "text/csv" }
  ];
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
  const handleTextUpload = async () => {
    if (!currentUser) {
      setError("Please make sure you are logged in to upload files.");
      return;
    }
    if (!textContent.trim()) {
      setError("Please enter some text content to upload.");
      return;
    }
    if (!textFileName.trim()) {
      setError("Please enter a filename for your text file.");
      return;
    }
    setUploading(true);
    setError(null);
    setUploadedFile(null);
    try {
      const fileTypeInfo = fileTypeOptions.find((option) => option.value === textFileType);
      const filename = textFileName.includes(".") ? textFileName : `${textFileName}.${textFileType}`;
      const blob = new Blob([textContent], { type: fileTypeInfo.mimeType });
      const file = new File([blob], filename, { type: fileTypeInfo.mimeType });
      const fileUrl = await window.websim.upload(file);
      const fileRecord = await room.collection("uploaded_files").create({
        filename,
        file_url: fileUrl,
        file_size: blob.size,
        content_type: fileTypeInfo.mimeType,
        uploader_username: currentUser.username,
        upload_date: (/* @__PURE__ */ new Date()).toISOString()
      });
      setUploadedFile({
        ...fileRecord,
        file_url: fileUrl
      });
      setTextContent("");
      setTextFileName("");
    } catch (error2) {
      console.error("Upload failed:", error2);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl mx-auto animate-slide-up", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800 rounded-full p-1 flex", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setUploadMode("file"),
          className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${uploadMode === "file" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "text-slate-300 hover:text-white"}`,
          children: "\u{1F4C1} Upload File"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 145,
          columnNumber: 21
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setUploadMode("text"),
          className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${uploadMode === "text" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "text-slate-300 hover:text-white"}`,
          children: "\u{1F4DD} Create Text File"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 155,
          columnNumber: 21
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 144,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 143,
      columnNumber: 13
    }, this),
    uploadMode === "file" ? /* @__PURE__ */ jsxDEV(
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
            lineNumber: 183,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 182,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-white mb-2", children: "Uploading your file..." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 185,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Please wait while we process your upload" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 186,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 181,
          columnNumber: 25
        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl animate-bounce-slow", children: "\u{1F4C1}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 190,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-white mb-4", children: "Drop your files here" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 193,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Or click to browse and select files from your device" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 196,
            columnNumber: 29
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
              lineNumber: 199,
              columnNumber: 29
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
              lineNumber: 205,
              columnNumber: 29
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 189,
          columnNumber: 25
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 17
      },
      this
    ) : /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/50 rounded-2xl p-8 border border-slate-600", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl", children: "\u{1F4DD}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 217,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-white mb-2", children: "Create Text File" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 220,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Paste your text content and choose a file type" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 221,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 216,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "Filename" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 227,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: textFileName,
                onChange: (e) => setTextFileName(e.target.value),
                placeholder: "Enter filename (without extension)",
                className: "w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 230,
                columnNumber: 33
              },
              this
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 226,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "File Type" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 239,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: textFileType,
                onChange: (e) => setTextFileType(e.target.value),
                className: "w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none",
                children: fileTypeOptions.map((option) => /* @__PURE__ */ jsxDEV("option", { value: option.value, children: option.label }, option.value, false, {
                  fileName: "<stdin>",
                  lineNumber: 248,
                  columnNumber: 41
                }, this))
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 242,
                columnNumber: 33
              },
              this
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 238,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 225,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "Text Content" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 257,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              value: textContent,
              onChange: (e) => setTextContent(e.target.value),
              placeholder: "Paste or type your text content here...",
              rows: 12,
              className: "w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-vertical font-mono text-sm"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 260,
              columnNumber: 29
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: [
            textContent.length,
            " characters"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 267,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 256,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleTextUpload,
            disabled: uploading || !textContent.trim() || !textFileName.trim(),
            className: "w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
            children: uploading ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 279,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Creating File..." }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 280,
                columnNumber: 37
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 278,
              columnNumber: 33
            }, this) : "\u{1F4BE} Create & Upload File"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 272,
            columnNumber: 25
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 224,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 215,
      columnNumber: 17
    }, this),
    error && /* @__PURE__ */ jsxDEV("div", { className: "mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg animate-fade-in", children: /* @__PURE__ */ jsxDEV("p", { className: "text-red-300", children: [
      "\u274C ",
      error
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 292,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 291,
      columnNumber: 17
    }, this),
    uploadedFile && /* @__PURE__ */ jsxDEV("div", { className: "mt-8 p-6 bg-slate-800/70 rounded-2xl border border-slate-600 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xl", children: "\u2705" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 299,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-bold text-white", children: "Upload Successful!" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 303,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Your file is now available" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 304,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 302,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 298,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Filename:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 311,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2 font-mono", children: uploadedFile.filename }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 312,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 310,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Size:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 315,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: formatFileSize(uploadedFile.file_size) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 316,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 314,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Type:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 319,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: uploadedFile.content_type || "Unknown" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 320,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 318,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Uploaded:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 323,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white ml-2", children: new Date(uploadedFile.upload_date).toLocaleString() }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 324,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 322,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 309,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 308,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "File URL (Click to copy):" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 331,
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
              lineNumber: 335,
              columnNumber: 33
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: (e) => copyToClipboard(uploadedFile.file_url, e),
              className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg transition-colors duration-200 font-medium",
              children: "\u{1F4CB} Copy"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 341,
              columnNumber: 33
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 334,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 330,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 329,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 297,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 141,
    columnNumber: 9
  }, this);
}
export {
  FileUpload
};
