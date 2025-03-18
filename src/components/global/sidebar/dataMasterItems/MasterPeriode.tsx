import Link from 'next/link';
import { TbCalendar } from "react-icons/tb";
import { useIsOpened } from "../useIsOpened";

const PathName = '/DataMaster/masterperiode';

export default function MasterPeriode() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbCalendar className="text-xl" />
        <span className="origin-left duration-200">Master Periode</span>
      </li>
    </Link>
  )
}