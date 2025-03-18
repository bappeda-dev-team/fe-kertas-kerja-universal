import Link from 'next/link';
import { TbBuildingEstate } from "react-icons/tb";
import { useIsOpened } from "../useIsOpened";

const PathName = '/DataMaster/masterlembaga';

export default function MasterLembaga() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbBuildingEstate className="text-xl" />
        <span className="origin-left duration-200">Master Lembaga</span>
      </li>
    </Link>

  )
}