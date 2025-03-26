import { FaBuildingCircleExclamation } from "react-icons/fa6";
import Link from "next/link";
import { useIsOpened } from "../useIsOpened"

const PathName = '/PerencanaanOpd/infoOpd'

export default function InfoOpd() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <FaBuildingCircleExclamation className="text-xl" />
        <span className={`origin-left duration-200`}>Info OPD</span>
      </li>
    </Link>
  )
}
