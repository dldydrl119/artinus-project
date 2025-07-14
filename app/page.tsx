import { Suspense } from 'react';
import HomeContent from './home-content';

export default function HomePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HomeContent />
    </Suspense>
  );
}
