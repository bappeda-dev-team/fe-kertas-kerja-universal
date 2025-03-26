import { TbUser } from "react-icons/tb";
import Link from "next/link";
import { useIsOpened } from "../useIsOpened"

const PathName = '/PerencanaanOpd/useropd'

export default function UserOpd() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbUser className="text-xl" />
        <span className={`origin-left duration-200`}>User OPD</span>
      </li>
    </Link>
  )
}
