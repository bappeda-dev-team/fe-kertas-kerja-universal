import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { TbDatabaseCog, TbBuildingEstate, TbBuilding, TbHexagonLetterR, TbUsers, TbCalendar, TbUser, TbBadges, TbApps, TbFile3D, TbFileChart, TbFileDelta, TbFileDots, TbFileCode, TbFileCode2 } from 'react-icons/tb';

import { DataMasterItems } from './dataMasterItems';

const PathNameRegex = /^\/DataMaster\/.*/;

function useIsOpened(currentPath: string): boolean {
  return PathNameRegex.test(currentPath);
}

export default function DataMasterMenu() {
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
        <TbDatabaseCog className="text-xl" />
        <span className="origin-left duration-200">Data Master</span>
      </li>
      {/* SUB MENU DATA MASTER */}
      <div className={`transition-all duration-300 ease-in-out
               ${dataMasterOpen
          ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {DataMasterItems.map((Item, index) => (
          <Item key={`data-master-item-${index}`} />
        ))}
      </div>
    </>
  )
}