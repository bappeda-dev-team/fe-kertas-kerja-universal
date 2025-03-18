import Link from 'next/link';
import { TbBuilding } from "react-icons/tb";
import { useIsOpened } from "../useIsOpened";

const PathName = '/DataMaster/masteropd';

export default function MasterOpd() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbBuilding className="text-xl" />
        <span className="origin-left duration-200">Master OPD</span>
      </li>
    </Link>
  )
}