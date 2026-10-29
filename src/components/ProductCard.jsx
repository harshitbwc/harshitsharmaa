import { Link } from "react-router-dom";

// Honest placeholder, not a fake screenshot — a plain initial on the
// surface color plus a small "No image yet" label, so it reads clearly as
// "not photographed yet" rather than pretending to be a real preview.
export const ProductImage = ({ product }) => {
  if (product.image) {
    return <img src={product.image} alt='' className='w-full h-full object-cover' />;
  }
  return (
    <div className='relative w-full h-full flex items-center justify-center bg-surface overflow-hidden'>
      <span className='font-serif text-white/10 text-[64px] leading-none select-none'>
        {product.name.charAt(0).toUpperCase()}
      </span>
      <span className='absolute bottom-2 right-3 font-mono text-[9px] tracking-[0.12em] uppercase text-muted/70'>
        No image yet
      </span>
    </div>
  );
};

// One card shape, shared by the home teaser and the full /products grid —
// image, name, one-line description, nothing else at this density. Keeping
// it in one place means the two pages can't quietly drift apart again.
const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product.slug}`}
    className='group flex flex-col h-full rounded-xl border border-line overflow-hidden hover:border-accent transition-colors'
  >
    <div className='relative aspect-[4/3] w-full'>
      <ProductImage product={product} />
      {product.logo && (
        <img
          src={product.logo}
          alt=''
          className='absolute bottom-2 left-2 w-7 h-7 rounded-md border border-line2 bg-ink object-cover'
        />
      )}
    </div>
    <div className='p-4'>
      <h3 className='font-serif text-lg text-paper mb-1'>{product.name}</h3>
      <p className='font-sans text-muted text-sm leading-relaxed'>
        {product.tagline || "Writeup coming soon."}
      </p>
    </div>
  </Link>
);

export default ProductCard;
