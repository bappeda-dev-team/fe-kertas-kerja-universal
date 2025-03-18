import Usulan from "./Usulan";
import ManajemenResiko from "./ManajemenResiko";
import RincianBelanja from "./RincianBelanja";
import SupportingPokin from "./SupportingPokin";

// untuk menambahkan sub menu, tambahkan file baru di folder ini
// lalu import file tersebut di sini
// dan tambahkan file tersebut ke dalam array LaporanItems sesuai urutan
export const LaporanItems = [
  Usulan,
  SupportingPokin,
  RincianBelanja,
  ManajemenResiko
]