'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { key: 'all', label: '전체' },
  { key: 'smartphones', label: '스마트폰' },
  { key: 'laptops', label: '노트북' },
  { key: 'fragrances', label: '향수' },
  { key: 'skincare', label: '스킨케어' },
];

export default function Header() {
  const pathname = usePathname() ?? '';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white text-black">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ARTINUS
        </Link>
        <nav className="space-x-6 text-sm font-medium">
          {categories.map(({ key, label }) => (
            <Link
              key={key}
              href={key === 'all' ? '/' : `/?category=${key}`}
              className={`hover:underline ${
                pathname.includes(key) ? 'font-semibold underline' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
