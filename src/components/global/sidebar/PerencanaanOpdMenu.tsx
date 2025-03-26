import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { TbBuildingCommunity } from 'react-icons/tb'

import { PerencanaanOpdItems } from './perencanaanOpdItems';

const PathNameRegex = /^\/PerencanaanOpd\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function PerencanaanOpdMenu() {
  const currentPath = usePathname();
  const isOpened = useIsOpened(currentPath);

  const [dataMasterOpen, setDataMasterOpen] = useState<boolean>(false);

  useEffect(() => {
    setDataMasterOpen(isOpened);
  }, [isOpened, currentPath]);

  return (
    <>
      <li onClick={() => setDataMasterOpen((prev) => !prev)}
        className="flex items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out">
        <TbBuildingCommunity className="text-xl" />
        <span className="origin-left duration-200">Perencanaan OPD</span>
      </li>
      {/* SUB MENU DATA MASTER */}
      <div className={`transition-all duration-300 ease-in-out
               ${dataMasterOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {PerencanaanOpdItems.map((Item, index) => (
          <Item key={`data-master-item-${index}`} />
        ))}
      </div>
    </>
  )
}
