import { TbRefreshAlert } from "react-icons/tb";
import Link from 'next/link';
import { useIsOpened } from "../useIsOpened";

const PathName = '/laporan/manajemenresiko';

export default function ManajemenResiko() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbRefreshAlert className="text-xl" />
        <span className={`origin-left duration-200`}>Manajemen Resiko</span>
      </li>
    </Link>
  )
}