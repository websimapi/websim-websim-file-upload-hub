import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { useQuery } from "@websim/use-query";
import { formatFileSize, copyToClipboard } from "../utils/helpers.js";
function Dashboard({ currentUser, room }) {
  const { data: files, loading } = useQuery(
    currentUser ? room.collection("uploaded_files").filter({ uploader_username: currentUser.username }) : null
  );
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
        lineNumber: 24,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "Authentication Required" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 27,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Please make sure you are logged in to view your files." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 28,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 13
    }, this);
  }
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-white", children: "Loading your files..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 39,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 13
    }, this);
  }
  if (!files || files.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center text-2xl", children: "\u{1F4C2}" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "No files yet" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 50,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Upload your first file to get started!" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 46,
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
          lineNumber: 65,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: totalFiles }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 69,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Total Files" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 70,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 68,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 64,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 63,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F4BE}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 76,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: formatFileSize(totalSize) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 80,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Total Storage" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 81,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 79,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 75,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 74,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F464}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 87,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: [
            "@",
            currentUser.username
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 91,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Your Account" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 92,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 90,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 86,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 85,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 62,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: files.map((file) => /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl border border-slate-600 overflow-hidden hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.02]", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0", children: file.content_type?.startsWith("image/") ? "\u{1F5BC}\uFE0F" : file.content_type?.startsWith("video/") ? "\u{1F3A5}" : file.content_type?.startsWith("audio/") ? "\u{1F3B5}" : "\u{1F4C4}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 105,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-white truncate", children: file.filename }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 111,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400", children: formatFileSize(file.file_size) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 112,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 110,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 104,
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
            lineNumber: 115,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 103,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs text-slate-400 mb-1", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Type: ",
          file.content_type || "Unknown"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 126,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Uploaded: ",
          new Date(file.upload_date).toLocaleDateString()
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 125,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 124,
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
            lineNumber: 132,
            columnNumber: 33
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: (e) => copyToClipboard(file.file_url, e),
            className: "px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex-shrink-0",
            children: "\u{1F4CB}"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 138,
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
            lineNumber: 144,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 131,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 102,
      columnNumber: 25
    }, this) }, file.id, false, {
      fileName: "<stdin>",
      lineNumber: 101,
      columnNumber: 21
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 99,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 60,
    columnNumber: 9
  }, this);
}
export {
  Dashboard
};
