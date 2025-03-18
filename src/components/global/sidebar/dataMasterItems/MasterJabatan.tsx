import Link from 'next/link';
import { TbBadges } from 'react-icons/tb';
import { useIsOpened } from "../useIsOpened";

const PathName = '/DataMaster/masterjabatan';

export default function MasterJabatan() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbBadges className="text-xl" />
        <span className="origin-left duration-200">Master Jabatan</span>
      </li>
    </Link>
  )
}