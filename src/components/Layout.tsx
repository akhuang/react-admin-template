import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import NavLink from './NavLink'

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* 主要内容区域 */}
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold mb-4">欢迎来到管理面板</h1>
        <Outlet />
      </main>

    </div>
  )
}

export default Layout;