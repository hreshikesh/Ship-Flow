import { useEffect, useState } from "react";
import { SYSTEMS, TIMINGS } from "../libs/systems";


export function useLoaderSequence() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = now - start;
      setElapsed(t);
      if (t < TIMINGS.totalDuration + 500) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const phase =
    elapsed < TIMINGS.darkness ? "darkness" :
    elapsed < TIMINGS.bootStart ? "awaken" :
    elapsed < TIMINGS.freezeAt ? "boot" :
    elapsed < TIMINGS.transitionAt ? "freeze" :
    elapsed < TIMINGS.arrivalAt ? "transition" :
    elapsed < TIMINGS.typographyAt ? "arrival" :
    "settled";

  const readyIds = new Set();
  let activeId = null;
  for (const s of SYSTEMS) {
    if (elapsed >= s.completeAt) readyIds.add(s.id);
    else if (activeId === null) activeId = s.id;
  }

  return {
    phase,
    elapsed,
    readyIds,
    activeId,
    readyCount: readyIds.size,
    totalCount: SYSTEMS.length,
    done: phase === "settled",
  };
}
