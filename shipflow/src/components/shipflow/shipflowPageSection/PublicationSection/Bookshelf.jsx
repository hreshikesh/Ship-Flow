import { AnimatePresence, motion } from "framer-motion";
import { publications } from "./publications";
import Book from "./Book";
import Shelf from "./Shelf";

export default function Bookshelf() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="relative">
        <div className="flex flex-wrap items-end justify-center gap-1.5 px-4 pt-20 sm:gap-2">
          <AnimatePresence mode="popLayout">
            {publications.map((book, i) => (
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
    </div>
  );
}