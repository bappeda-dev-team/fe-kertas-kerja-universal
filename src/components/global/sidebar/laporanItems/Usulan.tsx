import { TbApps, TbBook2, TbBulb, TbFileAlert, TbTooltip } from 'react-icons/tb';
import Link from 'next/link';

function isOpened() {
  return true ? "bg-white text-gray-800" : "hover:bg-slate-500"
}

function setLaporanUsulan() {
  return !true
}

export default function Usulan() {
  return (
    <li className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
      onClick={() => setLaporanUsulan()} >
      <TbApps className="text-xl" />
      <span className={`origin-left`}>Usulan</span>
      {/* subs menu LAPORAN USULAN */}
      <div className={`transition-all duration-300 ease-in-out ${isOpened() ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${isOpened() ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
          <Link href="#">
            <TbBook2 className="text-xl" />
            <span className={`origin-left duration-200`}>Musrenbang</span>
          </Link>
        </li>
        <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${isOpened() ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
          <Link href="#">
            <TbBulb className="text-xl" />
            <span className={`origin-left duration-200`}>Pokok Pikiran</span>
          </Link>
        </li>
        <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${isOpened() ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
          <Link href="#">
            <TbFileAlert className="text-xl" />
            <span className={`origin-left duration-200`}>Mandatori</span>
          </Link>
        </li>
        <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${isOpened() ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
          <Link href="#">
            <TbTooltip className="text-xl" />
            <span className={`origin-left duration-200`}>Inisiatif Bupati</span>
          </Link>
        </li>
      </div>
    </li>
  )
}
