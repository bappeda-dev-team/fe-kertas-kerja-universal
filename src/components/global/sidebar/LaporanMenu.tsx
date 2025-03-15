import { useState, useEffect } from 'react';
import { TbBook } from "react-icons/tb";
import SupportingPokin from './laporanItems/SupportingPokin';
import { usePathname } from "next/navigation";

const PathNameRegex = /^\/laporan\/.*/;

function useIsOpened() {
  const currentPath = usePathname();

  return PathNameRegex.test(currentPath) ? "bg-white text-gray-800" : "hover:bg-slate-500";
}

export default function LaporanMenu() {

  const [Laporan, setLaporan] = useState<boolean | null>(false);
  const isOpened = useIsOpened();

  useEffect(() => {
    setLaporan(isOpened === "bg-white text-gray-800");
  }, [isOpened]);

  return (
    <>
      <li onClick={() => setLaporan(!Laporan)}
        className="flex font-medium items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out" >
        <TbBook className="text-xl" />
        <span className={`origin-left duration-200`}>Laporan</span>
      </li>
      {/* SUB MENU LAPORAN */}
      <div className={`transition-all duration-300 ease-in-out ${Laporan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {/* LABEL LAPORAN USULAN */}
        <SupportingPokin />
      </div >
    </>
  )
}