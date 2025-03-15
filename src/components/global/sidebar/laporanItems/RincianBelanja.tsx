import { TbShoppingCartDollar } from "react-icons/tb";
import Link from 'next/link';
import { useIsOpened } from "../useIsOpened";

const PathName = '/laporan/rincianbelanja';

export default function RincianBelanja() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${useIsOpened(PathName)}`}>
        <TbShoppingCartDollar className="text-xl" />
        <span className={`origin-left duration-200`}>Rincian Belanja</span>
      </li>
    </Link>
  )
}