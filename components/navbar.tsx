"use client";

import { Button } from "@/components/ui/button";
import { Bot, Menu, Shirt } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react"; // Added import for React

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <div className="flex space-x-12">
        <Link href="/" className="flex items-center space-x-2">
          <Shirt className="w-8 h-8 text-purple-500" />
          <span className="text-white font-medium text-xl">
            StyleSync {"  "}
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <NavLink href="/mainpage">Home</NavLink>
          <NavLink href="/about">About us</NavLink>
          <NavLink href="/comingSoon">Coming Soon</NavLink>
          {/* <NavLink href="/pricing">Pricing</NavLink> */}
        </div>

        {/* <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-purple-400">
            Sign In
          </Button>
          
        </div> */}

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  );
}
