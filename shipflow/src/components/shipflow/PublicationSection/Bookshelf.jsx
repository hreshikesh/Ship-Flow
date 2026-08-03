// Bookshelf.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { publications } from "./publications";
import Book from "./Book";
import Shelf from "./Shelf";
import CategoryFilter from "./CategoryFilter";

export default function Bookshelf() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? publications
      : publications.filter((b) => b.category === activeFilter);

  return (
    <div className="relative mx-auto max-w-6xl">
      <CategoryFilter active={activeFilter} onChange={setActiveFilter} />

      <div className="relative">
        {/* ✅ Added pt-20 so hovering books don't clip against filter */}
        <div className="flex flex-wrap justify-center items-end gap-1.5 px-4 pt-20 sm:gap-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((book, i) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Book book={book} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Shelf />
      </div>

      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 text-center text-slate-500"
          >
            No publications in this category.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}