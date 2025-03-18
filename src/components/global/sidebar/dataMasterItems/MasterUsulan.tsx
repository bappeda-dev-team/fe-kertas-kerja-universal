import Link from 'next/link';
import { TbApps } from 'react-icons/tb';
import { useIsOpened } from "../useIsOpened";

const PathName = '/DataMaster/masterusulan';

export default function MasterUsulan() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbApps className="text-xl" />
        <span className="origin-left duration-200">Master Usulan</span>
      </li>
    </Link>
  )
}