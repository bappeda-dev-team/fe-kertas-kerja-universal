import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { TbBuildingCommunity, TbMapPin, TbTarget, TbChartBar } from 'react-icons/tb';
import { useIsOpened as useIsLinkOpened } from "../useIsOpened";

const PathNameRegex = /^\/PerencanaanOpd\/Renstra\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function Renstra() {
  const currentPath = usePathname();
  const isOpened = useIsOpened(currentPath);

  const [renstraOpen, setRenstraOpen] = useState<boolean>(false);

  useEffect(() => {
    setRenstraOpen(isOpened);
  }, [isOpened, currentPath]);

  return (
    <>
      <li className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
        onClick={() => setRenstraOpen((prev) => !prev)} >
        <TbBuildingCommunity className="text-xl" />
        <span className={`origin-left`}>Renstra</span>
      </li>
      {/* subs menu RENSTRA */}
      <div className={`transition-all duration-300 ease-in-out
        ${renstraOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <Link href="/PerencanaanOpd/Renstra/tujuanopd">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/Renstra/tujuanopd")}`}>
            <TbMapPin className="text-xl" />
            <span className="origin-left duration-200">Tujuan OPD</span>
          </li>
        </Link>
        <Link href="/PerencanaanOpd/Renstra/sasaranopd">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/Renstra/sasaranopd")}`}>
            <TbTarget className="text-xl" />
            <span className="origin-left duration-200">Sasaran OPD</span>
          </li>
        </Link>
        <Link href="/PerencanaanOpd/Renstra/ikuopd">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/Renstra/ikuopd")}`}>
            <TbChartBar className="text-xl" />
            <span className="origin-left duration-200">IKU OPD</span>
          </li>
        </Link>
      </div>
    </>
  )
}
