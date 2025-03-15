import { TbRefreshAlert } from "react-icons/tb";
import Link from 'next/link';

function isOpened() {
  return true ? "bg-white text-gray-800" : "hover:bg-slate-500"
}

export default function ManajemenResiko() {
  return (
    <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${isOpened()}`}>
      <Link href="/manajemenresiko">
        <TbRefreshAlert className="text-xl" />
        <span className={`origin-left duration-200`}>Manajemen Resiko</span>
      </Link>
    </li>
  )
}