import Link from 'next/link';
import { TbHexagonLetterR } from "react-icons/tb";
import { useIsOpened } from "../useIsOpened";

const PathName = '/DataMaster/masterrole';

export default function MasterRole() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbHexagonLetterR className="text-xl" />
        <span className="origin-left duration-200">Master Role</span>
      </li>
    </Link>
  )
}