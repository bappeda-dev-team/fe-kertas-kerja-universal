import { TbChecklist } from 'react-icons/tb';
import Link from 'next/link';
import { useIsOpened } from "../useIsOpened";

const PathName = '#'

export default function RencanaKinerjaKAK() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbChecklist className="text-xl" />
        <span className={`origin-left duration-200`}>Rencana Kinerja KAK</span>
      </li>
    </Link>
  )
}