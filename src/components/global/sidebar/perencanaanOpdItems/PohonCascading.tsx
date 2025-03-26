import { TbBinaryTree2 } from "react-icons/tb";
import Link from "next/link";
import { useIsOpened } from "../useIsOpened"

const PathName = '/PerencanaanOpd/pohoncascadingopd'

export default function PohonCascading() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbBinaryTree2 className="text-xl" />
        <span className={`origin-left duration-200`}>Pohon Cascading</span>
      </li>
    </Link>
  )
}
