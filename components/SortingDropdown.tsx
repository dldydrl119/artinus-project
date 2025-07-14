'use client';

import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const options = [
  { name: '기본 정렬', value: 'default' },
  { name: '가격 낮은순', value: 'price_asc' },
  { name: '가격 높은순', value: 'price_desc' },
  { name: '평점 높은순', value: 'rating_desc' },
];

export default function SortingDropdown({ onChange }: { onChange: (value: string) => void }) {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (option: typeof selected) => {
    setSelected(option);
    onChange(option.value);
  };

  return (
    <div className="w-48 text-sm">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="w-full border border-gray-300 bg-white rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none">
            <span>{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? 'bg-gray-100 text-black' : 'text-gray-700'
                  }`
                }
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
