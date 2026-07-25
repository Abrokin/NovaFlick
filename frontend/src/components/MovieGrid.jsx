import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function MovieGrid({ children }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
whileInView="show"
viewport={{
  once: true,
  amount: 0.2,
}}
      className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      {children}
    </motion.div>
  );
}