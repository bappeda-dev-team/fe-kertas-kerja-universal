import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { TbApps, TbBook2, TbBulb, TbFileAlert, TbTooltip } from 'react-icons/tb';
import { useIsOpened as useIsLinkOpened } from "../useIsOpened";

const PathNameRegex = /^\/PerencanaanOpd\/UsulanOpd\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function MasterUsulan() {
  const currentPath = usePathname();
  const isOpened = useIsOpened(currentPath);

  const [masterUsulanOpen, setMasterUsulanOpen] = useState<boolean>(false);

  useEffect(() => {
    setMasterUsulanOpen(isOpened);
  }, [isOpened, currentPath]);

  return (
    <>
      <li className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
        onClick={() => setMasterUsulanOpen((prev) => !prev)} >
        <TbApps className="text-xl" />
        <span className={`origin-left`}>Master Usulan OPD</span>
      </li>
      {/* subs menu RENSTRA */}
      <div className={`transition-all duration-300 ease-in-out
        ${masterUsulanOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <Link href="/PerencanaanOpd/UsulanOpd/musrenbang">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/UsulanOpd/musrenbang")}`}>
            <TbBook2 className="text-xl" />
            <span className="origin-left duration-200">Musrenbang</span>
          </li>
        </Link>
        <Link href="/PerencanaanOpd/UsulanOpd/pokokpikiran">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/UsulanOpd/pokokpikiran")}`}>
            <TbBulb className="text-xl" />
            <span className="origin-left duration-200">Pokok Pikiran</span>
          </li>
        </Link>
        <Link href="/PerencanaanOpd/UsulanOpd/mandatori">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/UsulanOpd/mandatori")}`}>
            <TbFileAlert className="text-xl" />
            <span className="origin-left duration-200">Mandatori</span>
          </li>
        </Link>
        <Link href="/PerencanaanOpd/UsulanOpd/inisiatif">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/PerencanaanOpd/UsulanOpd/inisiatif")}`}>
            <TbTooltip className="text-xl" />
            <span className="origin-left duration-200">Inisiatif Kepala Daerah</span>
          </li>
        </Link>
      </div>
    </>
  )
}
