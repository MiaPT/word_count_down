import { useRef } from "react";
import { useState } from "react";
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import { wordsRemainingToday } from "./calculations";
import { WritingProject } from "~/types";

export const useConfetti = (project: WritingProject) => {
  const [confettiConductor, setConfettiConductor] =
    useState<null | TConductorInstance>(null);
  const [fireworksConductor, setFireworksConductor] =
    useState<null | TConductorInstance>(null);

  const [SmallConfettiShot, setSmallConfettiShot] = useState(
    wordsRemainingToday(project) === 0,
  );

  const [fireworksShot, setFireworksShot] = useState(
    project.currentCount >= project.goalCount,
  );

  const checkmarkContainerRef = useRef<HTMLSpanElement | null>(null);

  const computeConfettiPosition = () => {
    const checkmarkPosition =
      checkmarkContainerRef.current?.getBoundingClientRect();
    const confettiPosition = {
      x: checkmarkPosition
        ? (checkmarkPosition.x + checkmarkPosition.width / 2) /
          window.innerWidth
        : 0.5,
      y: checkmarkPosition
        ? (checkmarkPosition.y + checkmarkPosition.height / 2) /
          window.innerHeight
        : 0.5,
    };
    return confettiPosition;
  };

  function shootConfetti() {
    if (!SmallConfettiShot) {
      confettiConductor?.shoot();

      setSmallConfettiShot(true);
    }
  }

  function shootFireworks(i: number) {
    if (i > 0 && !fireworksShot) {
      fireworksConductor?.shoot();
      fireworksConductor?.shoot();
      setTimeout(() => shootFireworks(i - 1), 600);
    }
    setFireworksShot(true);
  }

  return {
    checkmarkContainerRef,
    computeConfettiPosition,
    shootConfetti,
    shootFireworks,
    setConfettiConductor,
    setFireworksConductor,
  };
};
