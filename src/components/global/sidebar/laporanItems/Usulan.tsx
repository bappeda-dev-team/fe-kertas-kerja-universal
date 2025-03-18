import { useState, useEffect } from 'react';
import { TbApps, TbBook2, TbBulb, TbFileAlert, TbTooltip } from 'react-icons/tb';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const PathNameRegex = /^\/laporan\/usulan\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function Usulan() {
  const currentPath = usePathname();
  const isOpened = useIsOpened(currentPath);

  const [usulanOpen, setUsulanOpen] = useState<boolean>(false);

  useEffect(() => {
    setUsulanOpen(isOpened);
  }, [isOpened, currentPath]);

  return (
    <>
      <li className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
        onClick={() => setUsulanOpen((prev) => !prev)} >
        <TbApps className="text-xl" />
        <span className={`origin-left`}>Usulan</span>
      </li>
      {/* subs menu LAPORAN USULAN */}
      <div className={`transition-all duration-300 ease-in-out
        ${usulanOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <Link href="#">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl`}>
            <TbBook2 className="text-xl" />
            <span className={`origin-left duration-200`}>Musrenbang</span>
          </li>
        </Link>
      </div>
    </>
  )
}
