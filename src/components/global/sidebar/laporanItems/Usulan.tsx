import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { TbApps, TbBook2, TbChevronRight } from 'react-icons/tb';

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
        <span className="origin-left">Usulan</span>
        <TbChevronRight className={`transition-all duration-200 ease-in-out
           ${usulanOpen ? "rotate-90" : ""}`} />
      </li>
      {/* subs menu LAPORAN USULAN */}
      <div className={`transition-all duration-300 ease-in-out
        ${usulanOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <Link href="#">
          <li className="flex items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500">
            <TbBook2 className="text-xl" />
            <span className="origin-left duration-200 text-red-600">Musrenbang</span>
          </li>
        </Link>
      </div>
    </>
  )
}
