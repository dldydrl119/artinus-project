'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';
import ProductCard from '@/components/ProductCard';
import SidebarCategory from '@/components/SidebarCategory';
import SortingDropdown, { SortKey } from '@/components/SortingDropdown';
import type { Product } from '@/types/product';
import LoadingSpinner from '@/components/LoadingSpinner';

const LIMIT = 20;
const KRW_RATE = 1350;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<SortKey>('default');

  const searchParams = useSearchParams();
  const category = searchParams?.get('category') || '';
  const sentryRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const query = category ? `&category=${category}` : '';
    const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}${query}`);
    const data = await res.json();
    const list: Product[] = data.products;

    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating_desc') list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    setProducts(prev => {
      const existing = new Set(prev.map(p => p.id));
      const unique = list.filter(p => !existing.has(p.id));
      return [...prev, ...unique];
    });

    setSkip(prev => prev + LIMIT);
    setTotal(data.total);
    setLoading(false);
  }, [category, skip, sort, loading]);

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setTotal(null);
  }, [category, sort]);

  useEffect(() => {
    if (products.length === 0 && skip === 0) {
      fetchProducts();
    }
  }, [products.length, skip, fetchProducts]);

  useEffect(() => {
    const node = sentryRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      debounce(([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          (total === null || products.length < total)
        ) {
          fetchProducts();
        }
      }, 150),
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [fetchProducts, loading, products.length, total]);

  return (
    <main className="flex w-full max-w-screen-xl mx-auto px-4 py-6">
      <SidebarCategory />
      <section className="flex-1 flex flex-col">
        <div className="mb-6 flex justify-end">
          <SortingDropdown value={sort} onChange={setSort} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <ProductCard key={p.id} product={{ ...p, price: p.price * KRW_RATE }} />
          ))}
        </div>

        <div ref={sentryRef} className="h-24 flex items-center justify-center">
          {loading && <LoadingSpinner />}
        </div>
      </section>
    </main>
  );
}
