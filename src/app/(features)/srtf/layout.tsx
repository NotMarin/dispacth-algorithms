"use client";
import SlidesContainer from "@/components/molecules/SlidesContainer/SlidesContainer";
import { useMemo } from "react";
import Intro from "./components/Intro/Intro";
import Aplication from "./components/Aplication/Aplication";

export default function SRTFTemplate() {
  const slides = useMemo(
    () => [
      { id: 1, content: <Intro /> },
      { id: 2, content: <Aplication /> },
    ],
    []
  );
  return <SlidesContainer slides={slides} />;
}
