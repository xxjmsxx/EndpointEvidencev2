'use client';

import React from "react";

// ✅ use this in Next.js
import { useRouter, usePathname } from "next/navigation"
import {
  HomeIcon,
  CubeIcon,
  BeakerIcon,
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon,
  FolderIcon,
  DocumentMagnifyingGlassIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";


const DesktopSide = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { icon: <HomeIcon className="w-6 h-6" />, label: "HOME", path: "/home" },
    // {
    //   icon: <CubeIcon className="w-6 h-6" />,
    //   label: "GENERATORS",
    //   path: "/generators",
    // },
    {
      icon: <BeakerIcon className="w-6 h-6" />,
      label: "NEW STUDY",
      path: "/new-study",
    },
    {
      icon: <PuzzlePieceIcon className="w-6 h-6" />,
      label: "STUDIES HISTORY",
      path: "/your-studies",
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      label: "RWE CHAT",
      path: "/rwe-chat",
    },
    { separator: true },
    {
      icon: <FolderIcon className="w-6 h-6" />,
      label: "SHARED DATASETS",
      path: "/shared-datasets",
    },
    {
      icon: <DocumentMagnifyingGlassIcon className="w-6 h-6" />,
      label: "DATA REQUESTS",
      path: "/data-requests",
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full text-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        background:
          "radial-gradient(58.57% 58.57% at 50% 50%, rgba(0, 0, 0, 0.9) 50%, rgba(34, 34, 34, 0.98) 73.3%, rgba(59, 62, 88, 0.99) 94.88%, rgba(59, 62, 88, 0.97) 100%)",
      }}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <div className="flex flex-col items-center mt-6 space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <h2
              className={`text-lg font-bold transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Logo
            </h2>
          </div>

          {/* Navigation */}
          <nav className="w-full">
            <ul className="flex flex-col items-start space-y-4 px-4">
              {navItems.map((item, index) =>
                item.separator ? (
                  <hr
                    key={`separator-${index}`}
                    className="w-full border-t border-white my-2"
                  />
                ) : (
                  <li
                    key={index}
                    className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-md w-full ${
                      pathname === item.path
                        ? "bg-white text-black text-sm"
                        : "hover:text-gray-400 border-white border text-sm"
                    }`}
                    onClick={() => router.push(item.path)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start space-y-4 px-4 pb-6">
          {/* Documentation */}
          <li
            className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-md w-full ${
              pathname === "/documentation"
                ? "bg-white text-black text-sm"
                : "hover:text-gray-400 text-sm"
            }`}
            onClick={() => {
              router.push(item.path);
              setIsSidebarOpen(false);
            }}
          >
            <BookOpenIcon className="w-6 h-6" />
            {isSidebarOpen && <span>Documentation</span>}
          </li>

          {/* Collapse Sidebar */}
          <li
            className="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-md w-full hover:text-gray-400 text-sm"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            {isSidebarOpen && <span>Collapse Sidebar</span>}
          </li>
        </div>
      </div>
    </div>
  );
};

export default DesktopSide;
