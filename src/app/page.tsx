"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCloud, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fredoka, montserrat } from "./lib/fonts";
import { getAllFiles } from "@/utils/All_files";
import { getImages } from "@/utils/Images";
import { fetchSEs } from "@/utils/SEs";

export default function CDNWorking() {
  const [activeTab, setActiveTab] = useState<"All" | "Images" | "SEs">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const tabClass = (tab: "All" | "Images" | "SEs") =>
      `text-sm font-semibold rounded-full px-4 py-2 transition ${
          activeTab === tab
              ? "bg-[#c12727] text-white"
              : "bg-[#7a7a7a] text-gray-300"
      }`;

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        let fetchedFiles: { name: string; url: string }[] = [];
        if (activeTab === "All") {
          fetchedFiles = await getAllFiles(searchTerm);
        } else if (activeTab === "Images") {
          fetchedFiles = await getImages(searchTerm);
        } else if (activeTab === "SEs") {
          fetchedFiles = await fetchSEs(searchTerm);
        }
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [activeTab, searchTerm]);

  return (
      <div
          className={`min-h-screen flex flex-col justify-between items-center px-6 pt-20 text-base ${montserrat.variable} ${fredoka.variable}`}
          style={{
            background: "radial-gradient(circle, #7a1a17 0%, #0f0c0b 80%)",
          }}
      >
        <img
            alt="Logo"
            className="mb-4"
            height={100}
            src="https://practa.tech/Logo.png"
        />
        <h2
            className="text-white text-4xl font-extrabold mb-12"
            style={{ fontFamily: "var(--font-fredoka)" }}
        >
          CDN - Working
        </h2>

        <div className="w-full max-w-xl bg-[#2f2a28] rounded-2xl px-6 py-5 flex flex-col space-y-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
            <input
                className="flex-grow bg-transparent text-gray-300 placeholder-gray-500 text-base focus:outline-none"
                placeholder="Search for a file here"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faCloud} className="text-gray-400 text-xl" />
          </div>

          <div className="flex space-x-3 justify-start">
            {(["All", "Images", "SEs"] as const).map((tab) => (
                <button
                    key={tab}
                    className={tabClass(tab)}
                    onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
            ))}
          </div>

          <div className="flex items-center text-gray-300 space-x-2">
            <label htmlFor="visibleCount">Show:</label>
            <input
                type="number"
                id="visibleCount"
                min={1}
                max={files.length}
                value={visibleCount}
                onChange={(e) => setVisibleCount(Number(e.target.value))}
                className="bg-[#444] text-white text-sm rounded px-2 py-1 w-20 focus:outline-none"
            />
            <span>of {files.length} files</span>
          </div>
        </div>

        <div className="flex-grow w-full flex flex-col items-center mt-6">
          <div className="w-full max-w-xl bg-[#2f2a28] rounded-2xl px-6 py-5 mt-6 shadow-lg">
            {loading ? (
                <p className="text-gray-300 text-center">Loading...</p>
            ) : files.length > 0 ? (
                <div
                    style={{
                      maxHeight: "192px",
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#555 transparent",
                    }}
                >
                  {files.slice(0, visibleCount).map((file) => {
                    const nameWithoutExt = file.name
                        .replace(/\.(\w+)$/, "")
                        .replace(/\./g, " ");
                    const fileType =
                        file.name.split(".").pop()?.toUpperCase() || "FILE";
                    return (
                        <a
                            key={file.url}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-between items-center border-b border-gray-600 py-2 px-3 hover:bg-[#3b3533] rounded-md transition text-sm text-gray-200"
                        >
                          <span className="truncate">{nameWithoutExt}</span>
                          <span className="text-gray-400 text-xs">Type: {fileType}</span>
                        </a>
                    );
                  })}
                </div>
            ) : (
                <p className="text-gray-300 text-center">No files found.</p>
            )}
          </div>
        </div>

        <div className="w-full max-w-xl flex justify-between mt-6 pb-6 px-2">
          <button
              onClick={() => (window.location.href = "https://practa.tech")}
              className="flex items-center space-x-2 border border-gray-400 text-gray-300 text-sm rounded px-4 py-2 hover:bg-gray-800 transition"
              type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            <span>Go Back</span>
          </button>
          <button
              onClick={() => (window.location.href = "https://status.practa.tech")}
              className="text-sm bg-white text-black rounded px-4 py-2 font-semibold"
              type="button"
          >
            Status Page
          </button>
        </div>
      </div>
  );
}
