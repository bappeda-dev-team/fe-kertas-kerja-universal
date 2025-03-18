import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { TbChevronRight, TbFile3D, TbFileChart, TbFileCode, TbFileCode2, TbFileDelta, TbFileDots } from 'react-icons/tb';
import { useIsOpened as useIsLinkOpened } from "../useIsOpened";

const PathNameRegex = /^\/DataMaster\/masterprogramkegiatan\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function MasterProgramKegiatan() {

  const currentPath = usePathname();
  const isOpened = useIsOpened(currentPath);

  const [masterProgramOpen, setMasterProgramOpen] = useState<boolean>(false);

  useEffect(() => {
    setMasterProgramOpen(isOpened);
  }, [isOpened, currentPath]);

  return (
    <>
      <li className="flex gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500"
        onClick={() => setMasterProgramOpen((prev) => !prev)}>
        <TbFile3D className="text-xl mt-1" />
        <span className="origin-left duration-200">Master Program Kegiatan</span>
        <TbChevronRight className={`transition-all duration-200 ease-in-out
           ${masterProgramOpen ? "rotate-90" : ""}`} />
      </li>
      {/* DATA MASTER PROGRAM KEGIATAN */}
      <div className={`transition-all duration-300 ease-in-out 
      ${masterProgramOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <Link href="/DataMaster/masterprogramkegiatan/urusan">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/DataMaster/masterprogramkegiatan/urusan")}`}>
            <TbFileChart className="text-xl" />
            <span className="origin-left duration-200">Urusan</span>
          </li>
        </Link>
        <Link href="/DataMaster/masterprogramkegiatan/bidangurusan">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/DataMaster/masterprogramkegiatan/bidangurusan")}`}>
            <TbFileDelta className="text-xl" />
            <span className="origin-left duration-200">Bidang Urusan</span>
          </li>
        </Link>
        <Link href="/DataMaster/masterprogramkegiatan/program">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/DataMaster/masterprogramkegiatan/program")}`}>
            <TbFileDots className="text-xl" />
            <span className="origin-left duration-200">Program</span>
          </li>
        </Link>
        <Link href="/DataMaster/masterprogramkegiatan/kegiatan">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/DataMaster/masterprogramkegiatan/kegiatan")}`}>
            <TbFileCode className="text-xl" />
            <span className="origin-left duration-200">Kegiatan</span>
          </li>
        </Link>
        <Link href="/DataMaster/masterprogramkegiatan/subkegiatan">
          <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500
       ${useIsLinkOpened("/DataMaster/masterprogramkegiatan/subkegiatan")}`}>
            <TbFileCode2 className="text-xl" />
            <span className="origin-left duration-200">Sub Kegiatan</span>
          </li>
        </Link>
      </div>
    </>
  )
}