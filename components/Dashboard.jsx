import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { useQuery } from "@websim/use-query";
import { formatFileSize, copyToClipboard } from "../utils/helpers.js";
import { removeFileFromLocalStorage, syncMissingRecords, getFilesFromLocalStorage } from "../utils/localStorage.js";
function Dashboard({ currentUser, room }) {
  const [syncStatus, setSyncStatus] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const { data: files, loading } = useQuery(
    currentUser ? room.collection("uploaded_files").filter({ uploader_username: currentUser.username }) : null
  );
  useEffect(() => {
    if (currentUser && !loading && files !== void 0) {
      performAutoSync();
    }
  }, [currentUser, loading, files]);
  const performAutoSync = async () => {
    if (!currentUser || syncing) return;
    try {
      const localFiles = getFilesFromLocalStorage();
      const userLocalFiles = localFiles.filter((file) => file.uploader_username === currentUser.username);
      const dbFileIds = new Set((files || []).map((file) => file.id));
      const missingFiles = userLocalFiles.filter((file) => !dbFileIds.has(file.id));
      if (missingFiles.length > 0) {
        setSyncing(true);
        const result = await syncMissingRecords(room, currentUser);
        if (result.synced > 0) {
          setSyncStatus({
            type: "success",
            message: `\u2705 Auto-synced ${result.synced} missing file${result.synced > 1 ? "s" : ""} from local backup`
          });
          setTimeout(() => setSyncStatus(null), 5e3);
        }
      }
    } catch (error) {
      console.error("Auto-sync failed:", error);
    } finally {
      setSyncing(false);
    }
  };
  const manualSync = async () => {
    if (!currentUser || syncing) return;
    setSyncing(true);
    setSyncStatus(null);
    try {
      const result = await syncMissingRecords(room, currentUser);
      if (result.total === 0) {
        setSyncStatus({
          type: "info",
          message: "\u2139\uFE0F No missing files found in local backup"
        });
      } else if (result.synced > 0) {
        setSyncStatus({
          type: "success",
          message: `\u2705 Successfully synced ${result.synced} of ${result.total} missing file${result.total > 1 ? "s" : ""}`
        });
      } else if (result.errors > 0) {
        setSyncStatus({
          type: "error",
          message: `\u274C Failed to sync files. Please try again later.`
        });
      }
    } catch (error) {
      setSyncStatus({
        type: "error",
        message: "\u274C Sync operation failed. Please try again."
      });
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncStatus(null), 1e4);
    }
  };
  const deleteFile = async (fileId) => {
    if (confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      try {
        await room.collection("uploaded_files").delete(fileId);
        removeFileFromLocalStorage(fileId);
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
        lineNumber: 101,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "Authentication Required" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Please make sure you are logged in to view your files." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 100,
      columnNumber: 13
    }, this);
  }
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 113,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl text-white", children: "Loading your files..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 116,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 112,
      columnNumber: 13
    }, this);
  }
  if (!files || files.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center text-2xl", children: "\u{1F4C2}" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 124,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "No files yet" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 127,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Upload your first file to get started!" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 128,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: manualSync,
          disabled: syncing,
          className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200 font-medium",
          children: syncing ? "\u{1F504} Syncing..." : "\u{1F504} Check Local Backup"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 130,
          columnNumber: 17
        },
        this
      ),
      syncStatus && /* @__PURE__ */ jsxDEV("div", { className: `mt-4 p-3 rounded-lg ${syncStatus.type === "success" ? "bg-green-500/20 border border-green-500" : syncStatus.type === "error" ? "bg-red-500/20 border border-red-500" : "bg-blue-500/20 border border-blue-500"}`, children: /* @__PURE__ */ jsxDEV("p", { className: `${syncStatus.type === "success" ? "text-green-300" : syncStatus.type === "error" ? "text-red-300" : "text-blue-300"}`, children: syncStatus.message }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 144,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 139,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 123,
      columnNumber: 13
    }, this);
  }
  const totalSize = files.reduce((sum, file) => sum + file.file_size, 0);
  const totalFiles = files.length;
  return /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto animate-slide-up", children: [
    syncStatus && /* @__PURE__ */ jsxDEV("div", { className: `mb-6 p-4 rounded-lg animate-fade-in ${syncStatus.type === "success" ? "bg-green-500/20 border border-green-500" : syncStatus.type === "error" ? "bg-red-500/20 border border-red-500" : "bg-blue-500/20 border border-blue-500"}`, children: /* @__PURE__ */ jsxDEV("p", { className: `${syncStatus.type === "success" ? "text-green-300" : syncStatus.type === "error" ? "text-red-300" : "text-blue-300"}`, children: syncStatus.message }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 169,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 164,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F4C1}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 183,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: totalFiles }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 187,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Total Files" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 188,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 186,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 182,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 181,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F4BE}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 194,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: formatFileSize(totalSize) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 198,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Total Storage" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 199,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 197,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 193,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 192,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F464}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 205,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-white", children: [
            "@",
            currentUser.username
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 209,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Your Account" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 210,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 208,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 204,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 203,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl p-6 border border-slate-600", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xl", children: "\u{1F504}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 216,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: manualSync,
              disabled: syncing,
              className: "text-lg font-bold text-white hover:text-orange-300 transition-colors disabled:opacity-50",
              children: syncing ? "Syncing..." : "Sync Backup"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 220,
              columnNumber: 29
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Local Storage" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 227,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 219,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 215,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 214,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 180,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: files.map((file) => /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/70 rounded-2xl border border-slate-600 overflow-hidden hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.02]", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0", children: file.content_type?.startsWith("image/") ? "\u{1F5BC}\uFE0F" : file.content_type?.startsWith("video/") ? "\u{1F3A5}" : file.content_type?.startsWith("audio/") ? "\u{1F3B5}" : "\u{1F4C4}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 240,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-white truncate", children: file.filename }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 246,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400", children: formatFileSize(file.file_size) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 247,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 245,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 239,
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
            lineNumber: 250,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 238,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs text-slate-400 mb-1", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Type: ",
          file.content_type || "Unknown"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 261,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Uploaded: ",
          new Date(file.upload_date).toLocaleDateString()
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 262,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 260,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 259,
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
            lineNumber: 267,
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
            lineNumber: 273,
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
            lineNumber: 279,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 266,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 237,
      columnNumber: 25
    }, this) }, file.id, false, {
      fileName: "<stdin>",
      lineNumber: 236,
      columnNumber: 21
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 234,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 161,
    columnNumber: 9
  }, this);
}
export {
  Dashboard
};
