import { FiHome } from "react-icons/fi";
import { FormEdit } from "@/components/pages/PerencanaanOpd/infoOpd/form/FormEdit";

const editOpd = () => {
  return (
    <>
      <div className="flex items-center mb-3">
        <a href="/" className="mr-1"><FiHome /></a>
        <p className="mr-1">/ Perencanaan OPD</p>
        <p className="mr-1">/ Info OPD</p>
        <p className="mr-1">/ Edit</p>
      </div>
      <FormEdit />
    </>
  )
}

export default editOpd;
