import { motion } from "framer-motion";

import { styles } from "../styles";
import { visibleProducts as products } from "../constants";
import ProductCard from "./ProductCard";

// A real page now, not a section in the scroll flow — animates in on load
// (mount) rather than on scroll-into-view, since there's no scrolling to
// trigger it: this is the first thing on the page when you land here.
// Same card as the home teaser (see ProductCard.jsx), just all 11 of them
// instead of a preview slice.
const ProductsPage = () => {
  return (
    <div className={`${styles.container} pt-32 sm:pt-40 pb-24 min-h-screen`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.sectionEyebrow}
      >
        Products · {products.length}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className='font-serif text-paper leading-snug text-[clamp(34px,4.6vw,56px)] max-w-3xl mt-4 text-balance'
      >
        Outside client work: tools, experiments, and stuff I build because I
        wanted it to exist.
      </motion.h1>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-14'>
        {products.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
