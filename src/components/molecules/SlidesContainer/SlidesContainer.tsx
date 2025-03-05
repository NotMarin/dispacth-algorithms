import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

interface Slide {
  id: number;
  content: React.ReactNode;
}

interface SlidesContainerProps {
  slides: Slide[];
}

export default function SlidesContainer({ slides }: SlidesContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const changeSlide = useCallback(
    (direction: "up" | "down") => {
      setCurrentIndex((prev) =>
        direction === "down" ? Math.min(prev + 1, slides.length - 1) : Math.max(prev - 1, 0)
      );
    },
    [slides.length]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") changeSlide("down");
      if (event.key === "ArrowUp") changeSlide("up");
    };

    const handleWheel = (event: WheelEvent) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      changeSlide(event.deltaY > 0 ? "down" : "up");

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [changeSlide]);

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      {currentIndex !== 0 && (
        <button
          onClick={() => changeSlide("up")}
          className="absolute top-3 z-10"
          disabled={currentIndex === 0}
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Contenedor de slides */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.section
            className="h-full w-full"
            key={slides[currentIndex].id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {slides[currentIndex].content}
          </motion.section>
        </AnimatePresence>

        {/* Indicadores de slide */}
        <div className="absolute top-1/2 right-4 flex -translate-y-1/2 flex-col gap-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentIndex ? "bg-primary-600 scale-125 dark:bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Botón abajo */}
      {currentIndex !== slides.length - 1 && (
        <button
          onClick={() => changeSlide("down")}
          className="absolute bottom-3 z-10"
          disabled={currentIndex === slides.length - 1}
        >
          <ChevronDown size={24} />
        </button>
      )}
    </div>
  );
}
