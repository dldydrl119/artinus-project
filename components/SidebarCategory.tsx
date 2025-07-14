'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = [
  { key: 'all', label: '전체' },
  { key: 'smartphones', label: '스마트폰' },
  { key: 'laptops', label: '노트북' },
  { key: 'fragrances', label: '향수' },
  { key: 'skincare', label: '스킨케어' },
  { key: 'groceries', label: '식료품' },
  { key: 'home-decoration', label: '홈데코' },
];

export default function SidebarCategory() {
  const searchParams = useSearchParams();
  const current = searchParams?.get('category') ?? 'all'; 

  return (
    <aside className="sticky top-[72px] h-[calc(100vh-72px)] w-48 hidden lg:block border-r bg-white px-4 py-6">
      <h2 className="text-sm font-semibold mb-4 text-gray-700">카테고리</h2>
      <ul className="space-y-3 text-sm">
        {categories.map(({ key, label }) => {
          const active = current === key;
          return (
            <li key={key}>
              <Link
                href={key === 'all' ? '/' : `/?category=${key}`}
                className={`block px-2 py-1 rounded hover:bg-gray-100 ${
                  active ? 'font-semibold text-black bg-gray-100' : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
