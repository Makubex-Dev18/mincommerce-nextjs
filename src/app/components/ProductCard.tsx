"use client"
import "notyf/notyf.min.css";
import { getNotyf } from '../../lib/notyf';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '../models/products';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '../utils/price';
import { useCartStore } from '../../store/useCartStore';
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const { addToCart } = useCartStore();
  const productUrl = `/product/${product.id}`;

  const cardClasses = `
    bg-bg-main 
    border border-border-default 
    p-4 
    transition-all duration-300 
    hover:border-primary-500
    hover:shadow-neon-sm
    max-w-xs w-full
    relative 
    flex flex-col
    cursor-pointer
  `;

  const shadowClass = 'shadow-xl shadow-bg-app/50';

  // Manejador para añadir al carrito
  const handleAddToCart = () => {
    addToCart(product, 1);
    try {
      getNotyf().success(`${product.name} ha sido añadido al carrito.`);
    } catch {}
  };

  return (

    <Card className={`${cardClasses} ${shadowClass} relative`}>

      <CardContent className="p-3 flex flex-col flex-grow">
        <Link href={productUrl} className="flex flex-col flex-grow min-h-0">
          <div className="flex justify-center items-center h-56 mb-3 relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain rounded-md transform hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col flex-grow text-center">
            <h3 className="text-text-inverse text-xl font-bold mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-text-secondary text-sm font-extrabold uppercase tracking-wider mb-3">{product.category}</p>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="flex justify-center items-center gap-3 pt-2 border-t border-border-default">
        <p className={
          product.onSale
            ? "text-primary-500 text-2xl font-extrabold"
            : "text-text-primary text-2xl font-bold"
        }>
          {formatPrice(product.price)}
        </p>

        <Button className="mt-2"  onClick={() => handleAddToCart()} variant="default" size="default">
          <ShoppingCart size={30} className="mr-2" />
          Comprar
        </Button>
      </CardFooter>

    </Card>
  );
};

export default ProductCard;