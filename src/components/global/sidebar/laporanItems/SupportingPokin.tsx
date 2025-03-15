import { FaUsersBetweenLines } from "react-icons/fa6";
import Link from 'next/link';
import { useIsOpened } from "../useIsOpened";

const PathName = '/laporan/supportingpokin';

export default function SupportingPokin() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <FaUsersBetweenLines className="text-xl" />
        <span className={`origin-left duration-200`}>Supporting Pohon Kinerja</span>
      </li>
    </Link>
  )
}