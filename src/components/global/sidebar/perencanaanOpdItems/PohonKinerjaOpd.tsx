import { TbBinaryTree } from "react-icons/tb";
import Link from "next/link";
import { useIsOpened } from "../useIsOpened"

const PathName = '/PerencanaanOpd/pohonkinerjaopd'

export default function PohonKinerjaOpd() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbBinaryTree className="text-xl" />
        <span className={`origin-left duration-200`}>Pohon Kinerja OPD</span>
      </li>
    </Link>
  )
}
