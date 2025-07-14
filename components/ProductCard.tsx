'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/${product.id}`} className="block p-2">
      <div className="relative w-full aspect-square mb-4">
      <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        unoptimized
        className="object-contain rounded"
      />
      </div>
      <h2 className="text-base font-medium text-gray-800 truncate">
        {product.title}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        ₩{product.price.toLocaleString('ko-KR')}
      </p>
    </Link>
  );
}
