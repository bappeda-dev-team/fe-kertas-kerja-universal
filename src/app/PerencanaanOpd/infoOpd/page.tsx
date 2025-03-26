import { FiHome } from "react-icons/fi";
import TableInfoOpd from "@/components/pages/PerencanaanOpd/infoOpd/TableInfoOpd";

const masteruser = () => {
  return (
    <>
      <div className="flex items-center">
        <a href="/" className="mr-1"><FiHome /></a>
        <p className="mr-1">/ Perencanaan OPD</p>
        <p className="mr-1">/ Info OPD</p>
      </div>
      <div className="mt-3 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between border-b px-5 py-5">
          <div className="flex flex-col items-end">
            <h1 className="uppercase font-bold">Info OPD</h1>
          </div>
        </div>
        <TableInfoOpd />
      </div>
    </>
  )
}

export default masteruser;
