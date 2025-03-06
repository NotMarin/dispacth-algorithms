"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MarinDevLogo from "../../../../public/MarinDevLogo";
import UTPLogo from "../../../../public/UTPLogo";
import { GitHub, Moon, Sun } from "react-feather";
import { useTheme } from "next-themes";
import { memo, useCallback, useMemo } from "react";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const tabs = useMemo(
    () => [
      { name: "INICIO", path: "/dashboard" },
      { name: "FIFO", path: "/fifo" },
      { name: "SJF", path: "/sjf" },
      { name: "PCB", path: "/pcb" },
      { name: "SRTF", path: "/srtf" },
      { name: "RR", path: "/rr" },
    ],
    []
  );

  return (
    <header className="grid w-full grid-cols-[auto_1fr_auto] items-center px-8 py-2">
      <Link
        href="https://github.com/NotMarin"
        aria-label="Perfil De GitHub"
        title="Perfil De GitHub"
        className="flex items-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MarinDevLogo className="h-14 w-14" />
      </Link>

      <nav className="flex justify-center gap-6">
        {tabs.map(({ name, path }) => (
          <Link key={path} href={path}>
            <span
              className={clsx(
                "flex w-28 cursor-pointer items-center justify-center px-8 pb-1",
                pathname === path
                  ? "border-b-2 border-gray-900 font-semibold dark:border-white"
                  : "dark:text-primary-200 dark:hover:border-primary-200 text-gray-600 hover:border-b-2 hover:border-gray-600"
              )}
            >
              {name}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-lg p-2"
          aria-label="Cambiar Tema"
          title="Cambiar Tema"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <Link
          href="https://github.com/NotMarin/dispacth-algorithms"
          aria-label="Repository De GitHub"
          title="Repository De GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub size={20} />
        </Link>
        <Link
          href="https://www.utp.edu.co/"
          aria-label="Portal UTP"
          title="Portal UTP"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UTPLogo className="h-14 w-14" />
        </Link>
      </div>
    </header>
  );
}
memo(Header);
