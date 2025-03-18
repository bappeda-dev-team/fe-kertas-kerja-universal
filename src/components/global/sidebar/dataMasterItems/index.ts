import MasterLembaga from "./MasterLembaga"
import MasterOpd from "./MasterOpd"
import MasterRole from "./MasterRole"
import MasterPegawai from "./MasterPegawai"
import MasterPeriode from "./MasterPeriode"
import MasterUser from "./MasterUser"
import MasterJabatan from "./MasterJabatan"
import MasterUsulan from "./MasterUsulan"
import MasterProgramKegiatan from "./MasterProgramKegiatan"

// untuk menambahkan sub menu, tambahkan file baru di folder ini
// lalu import file tersebut di sini
// dan tambahkan file tersebut ke dalam array LaporanItems sesuai urutan
export const DataMasterItems = [
  MasterLembaga,
  MasterOpd,
  MasterRole,
  MasterPegawai,
  MasterPeriode,
  MasterUser,
  MasterJabatan,
  MasterUsulan,
  MasterProgramKegiatan
]