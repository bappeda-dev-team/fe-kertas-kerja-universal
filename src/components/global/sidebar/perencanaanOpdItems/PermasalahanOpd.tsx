import Link from "next/link";
import { TbMessageReport } from "react-icons/tb";
import { useIsOpened } from "../useIsOpened";

const PathName = '/#'

export default function PermasalahanOpd() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbMessageReport className="text-xl" />
        <span className={`origin-left duration-200`}>Permasalahan OPD</span>
      </li>
    </Link>
  )
}
