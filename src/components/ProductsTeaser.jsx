import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { products } from "../constants";
import ProductCard from "./ProductCard";

const ProductsTeaser = () => {
  return (
    <div className={styles.container}>
      <motion.p variants={textVariant()} className={styles.sectionEyebrow}>
        Products · {products.length}
      </motion.p>

      <div className='flex flex-wrap items-end justify-between gap-4 mt-4'>
        <motion.p
          variants={fadeIn("up", "tween", 0.05, 0.6)}
          className='font-serif text-paper leading-snug text-[clamp(26px,3vw,34px)] max-w-[560px] text-pretty'
        >
          Outside client work: tools, experiments, and stuff I build because
          I wanted it to exist.
        </motion.p>
        <motion.div variants={fadeIn("up", "tween", 0.1, 0.6)}>
          <Link
            to='/products'
            className='font-sans text-sm text-accent hover:text-accent2 transition-colors whitespace-nowrap'
          >
            View all on /products →
          </Link>
        </motion.div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {products.map((product, i) => (
          <motion.div key={product.slug} variants={fadeIn("up", "tween", 0.08 + i * 0.04, 0.6)}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(ProductsTeaser, "products-preview");
