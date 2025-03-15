import { FaUsersBetweenLines } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const PathName = '/laporan/supportingpokin';

function useIsOpened() {
  const currentPath = usePathname();

  return currentPath == PathName ? "bg-white text-gray-800" : "hover:bg-slate-500"
}

export default function SupportingPokin() {
  return (
    <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened()}`}>
      <Link href={PathName}>
        <FaUsersBetweenLines className="text-xl" />
        <span className={`origin-left duration-200`}>Supporting Pohon Kinerja</span>
      </Link>
    </li>
  )
}
