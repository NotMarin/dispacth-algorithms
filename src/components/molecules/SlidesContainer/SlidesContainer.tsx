import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
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

  const changeSlide = useCallback(
    (direction: "up" | "down") => {
      setCurrentIndex((prev) =>
        direction === "down" ? Math.min(prev + 1, slides.length - 1) : Math.max(prev - 1, 0)
      );
    },
    [slides.length]
  );

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") changeSlide("down");
      if (event.key === "ArrowUp") changeSlide("up");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeSlide]);

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      {currentIndex !== 0 && (
        <button
          onClick={() => changeSlide("up")}
          className="absolute top-3 z-10 cursor-pointer"
          disabled={currentIndex === 0}
        >
          <ChevronUp size={40} />
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
        <div className="absolute top-1/2 left-4 flex -translate-y-1/2 flex-col gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-all focus:outline-none ${
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
          className="absolute bottom-3 z-10 cursor-pointer"
          disabled={currentIndex === slides.length - 1}
        >
          <ChevronDown size={40} />
        </button>
      )}
    </div>
  );
}
