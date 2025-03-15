import { useCallback, useMemo } from "react";
import { getToken } from "@/components/lib/Cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getToken();

interface APIPohonKinerjaAdmin {
  fetchDetail: (tematikID: number) => Promise<Response>
}

export function useAPIPohonKinerjaAdmin(): APIPohonKinerjaAdmin {
  return useMemo(() => {
    return {
      fetchDetail: (tematikID: number) => {
        return fetch(`${API_URL}/pohon_kinerja_admin/detail/${tematikID}`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
      },
    };
  }, [])
}
