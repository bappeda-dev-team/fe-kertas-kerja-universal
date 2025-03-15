import { TbExclamationMark } from "react-icons/tb";
import Link from 'next/link';
import { useIsOpened } from "../useIsOpened";

const PathName = '#';

export default function Inovasi() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbExclamationMark className="text-xl" />
        <span className={`origin-left duration-200`}>Inovasi</span>
      </li>
    </Link>
  )
}