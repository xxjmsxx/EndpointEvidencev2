'use client';

import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import { UserIcon } from "@heroicons/react/24/outline"; // Avatar icon for fallback

// Clerk authentication components
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

const DesktopNav = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const handleNav = () => {
    router.push('/chat'); // navigate to /chat route
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-xl z-50 flex items-center px-4">
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="p-1 cursor-pointer text-zinc-600 hover:bg-zinc-200 rounded"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Title or Logo */}
      <h1 className="ml-4 text-lg text-gray-800 tracking-widest">
        <span className="font-bold">ENDPOINT </span>| EVIDENCE
      </h1>

      {/* Space between title and the right-side buttons */}
      <div className="flex items-center ml-auto gap-x-4">
          <div className="flex justify-end items-center p-4 gap-4 h-16">
            {/* Clerk authentication components */}
            <SignedIn>
              <UserButton afterSignOutUrl="/sign-in"/>
            </SignedIn>
          </div>
      </div>
    </div>
  );
};

export default DesktopNav;
