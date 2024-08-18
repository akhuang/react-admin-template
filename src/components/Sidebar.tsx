import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import NavLink from './NavLink'

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-6">管理面板</h2>
    <nav className="flex flex-col space-y-4">
      <NavLink to="/">主页</NavLink>
      <NavLink to="/users">用户管理</NavLink>
      <NavLink to="/settings">设置</NavLink>
    </nav>
  </aside>
)

export default Sidebar;