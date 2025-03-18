import Link from 'next/link';
import { useIsOpened } from "../useIsOpened";
import { TbUser } from 'react-icons/tb';

const PathName = '/DataMaster/masteruser';

export default function MasterUser() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out
                   ${useIsOpened(PathName)}`}>
        <TbUser className="text-xl" />
        <span className="origin-left duration-200">Master User</span>
      </li>
    </Link>
  )
}