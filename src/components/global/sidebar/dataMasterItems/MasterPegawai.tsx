import Link from 'next/link';
import { TbUsers } from 'react-icons/tb';
import { useIsOpened } from '../useIsOpened';

const PathName = '/DataMaster/masterpegawai';

export default function MasterPegawai() {
  return (
    <Link href={PathName}>
      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out 
        ${useIsOpened(PathName)}`}>
        <TbUsers className="text-xl" />
        <span className='origin-left duration-200'>Master Pegawai</span>
      </li>
    </Link>
  )
}