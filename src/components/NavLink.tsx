import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "./ui/button"

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to}>
      <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
        {children}
      </Button>
    </Link>
  );
};

export default NavLink;