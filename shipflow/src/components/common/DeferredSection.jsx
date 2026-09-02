// src/components/common/DeferredSection.jsx
import { useEffect, useRef, useState } from "react";

/**
 * Global queue so only ONE deferred section mounts at a time.
 * Prevents mobile freezes when several sections unlock together.
 */
let queue = Promise.resolve();

function enqueue(task, gapMs = 140) {
  queue = queue.then(
    () =>
      new Promise((resolve) => {
        const run = () => {
          try {
            task();
          } finally {
            setTimeout(resolve, gapMs);
          }
        };

        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(run, { timeout: 600 });
        } else {
          setTimeout(run, 50);
        }
      })
  );
  return queue;
}

/**
 * @param {number} index - section order on the page (0, 1, 2...)
 * @param {number|string} minHeight - placeholder height before mount
 * @param {boolean} eager - if true, load ASAP after first paint (good for first below-fold block)
 */
export default function DeferredSection({
  children,
  minHeight = 320,
  index = 0,
  eager = false,
  rootMargin = "300px 0px",
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const startLoad = () => {
      if (cancelled || started.current) return;
      started.current = true;

      enqueue(() => {
        if (!cancelled) setReady(true);
      });
    };

    // 1) First below-fold section(s): load quickly after paint (no scroll needed)
    //    Later sections: still progressive, but not only-on-deep-scroll.
    const eagerDelay = eager ? 200 : 450 + index * 350;
    const eagerTimer = setTimeout(startLoad, eagerDelay);

    // 2) Also load earlier if user scrolls near it
    const el = ref.current;
    let obs;
    if (el && typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startLoad();
            obs?.disconnect();
          }
        },
        { root: null, rootMargin, threshold: 0.01 }
      );
      obs.observe(el);
    }

    return () => {
      cancelled = true;
      clearTimeout(eagerTimer);
      obs?.disconnect();
    };
  }, [eager, index, rootMargin]);

  const placeholderHeight =
    typeof minHeight === "number" ? `${minHeight}px` : minHeight;

  return (
    <div
      ref={ref}
      style={{
        minHeight: ready ? undefined : placeholderHeight,
        // Helps browser skip layout work for offscreen placeholders
        contentVisibility: ready ? "visible" : "auto",
        containIntrinsicSize: ready ? undefined : `1px ${placeholderHeight}`,
      }}
    >
      {ready ? children : null}
    </div>
  );
}