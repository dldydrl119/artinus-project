import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

async function fetchProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await fetchProduct(params.id);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* 왼쪽 썸네일 이미지 */}
      <div className="md:col-span-6 flex flex-col gap-2">
        <div className="relative w-full aspect-square bg-white border rounded-lg overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        {/* 썸네일 리스트 */}
        <div className="flex gap-2 overflow-x-auto">
          {product.images?.slice(0, 4).map((img: string, i: number) => (
            <div key={i} className="relative w-20 h-20 rounded overflow-hidden border">
              <Image src={img} alt={`thumb-${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 정보 패널 */}
      <div className="md:col-span-6">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-xl text-green-600 mb-4">
          ₩{(product.price * 1350).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>

        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mt-2">
          {product.tags?.map((tag: string) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              장바구니
            </button>
            <button className="flex-1 py-3 border border-gray-300 rounded-md hover:bg-gray-100">
              바로구매
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
