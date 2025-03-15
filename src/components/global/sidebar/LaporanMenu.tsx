import { useState, useEffect } from 'react';
import { TbBook } from "react-icons/tb";
import { usePathname } from "next/navigation";

import { LaporanItems } from './laporanItems';

const PathNameRegex = /^\/laporan\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function LaporanMenu() {
  const currentPath = usePathname();
  const isOpened = useIsOpened(currentPath);

  const [laporanOpen, setLaporanOpen] = useState<boolean | null>(false);

  useEffect(() => {
    setLaporanOpen(isOpened);
  }, [isOpened, currentPath]);

  return (
    <>
      <li onClick={() => setLaporanOpen((prev) => !prev)}
        className="flex font-medium items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out" >
        <TbBook className="text-xl" />
        <span className={`origin-left duration-200`}>Laporan</span>
      </li>
      {/* SUB MENU LAPORAN */}
      <div className={`transition-all duration-300 ease-in-out 
        ${laporanOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {/* LABEL LAPORAN USULAN */}
        {LaporanItems.map((Item, index) => (
          <Item key={`laporan-item-${index}`} />
        ))}
      </div >
    </>
  )
}