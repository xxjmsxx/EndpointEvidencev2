// InteractiveLayout.tsx
'use client'

import { useState } from 'react'
import DesktopNav from './DesktopNavbar'
import DesktopSide from './DesktopSide'

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <div className="flex h-screen bg-white">
      <DesktopSide
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DesktopNav
          toggleSidebar={toggleSidebar}
        />
        <div>{children}</div>
      </div>
    </div>
  )
}
