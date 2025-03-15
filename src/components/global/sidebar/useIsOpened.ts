import { usePathname } from "next/navigation";

// fungsi untuk menambahkan highlight pada menu yang sedang aktif
export function useIsOpened(pathName: string): string {
  const currentPath = usePathname();

  return currentPath == pathName ? "bg-white text-gray-800" : "hover:bg-slate-500"
}