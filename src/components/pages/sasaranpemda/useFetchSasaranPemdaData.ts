import { useEffect, useState } from "react";
import { useAPIPohonKinerjaAdmin } from './useAPIPohonKinerjaAdmin';

interface TematikData {
  nama_pohon: string,
  jenis_pohon: string,
  tahun: string,
  indikator: IndikatorTematik[]
}

interface IndikatorTematik {
  nama_indikator: string,
  targets: TargetTematik[]
}

interface TargetTematik {
  tahun: string,
  target: string,
  satuan: string
}

function useFetchTematikData(tematikID: number): TematikData | null {
  const [tematikData, setTematikData] = useState<TematikData | null>(null)

  const api = useAPIPohonKinerjaAdmin();
  useEffect(() => {
    api
      .fetchDetail(tematikID)
      .then((response) => response.json())
      .then((data) => setTematikData(data.data))
      .catch((error) => {
        console.error("unable to fetch tematik data: ", error);
        setTematikData(null)
      });
  }, [api, tematikID]);

  return tematikData;
}

// extending logic later
export function useTematikData(tematikID: number): TematikData | null {
  return useFetchTematikData(tematikID);
}

// Sasaran Pemda
interface SasaranPemdaResponse {
  sasaran_pemda?: string;
  tujuan_pemda?: string;
  tujuan_pemda_id?: number;
  indikator?: Array<{
    id: number;
    indikator: string;
    rumus_perhitungan: string;
    sumber_data: string;
    target: Array<{ target: string; satuan: string }>;
  }>;
}

interface UseFetchSasaranPemdaProps {
  id: number;
  token: string;
  isOpen: boolean;
  metode: "lama" | "baru";
  reset: (data: any) => void;
  replace: (data: any) => void;
}

export function useFetchSasaranPemda({
  id,
  token,
  isOpen,
  metode,
  reset,
  replace,
}: UseFetchSasaranPemdaProps) {
  const [loading, setLoading] = useState(false);
  const [idNotFound, setIdNotFound] = useState(false);
  const [tujuanNotFound, setTujuanNotFound] = useState(false);
  const [sasaranPemda, setSasaranPemda] = useState<string | null>(null);
  const [tujuanPemda, setTujuanPemda] = useState<{ value: number; label: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchDetailSasaranPemda = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/sasaran_pemda/detail/${id}`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.code === 200 || result.code === 201) {
          setIdNotFound(false);
          setTujuanNotFound(false);
          const hasil: SasaranPemdaResponse = result.data;

          if (hasil.sasaran_pemda) {
            setSasaranPemda(hasil.sasaran_pemda);
          }

          if (hasil.tujuan_pemda) {
            setTujuanPemda({
              value: hasil.tujuan_pemda_id!,
              label: hasil.tujuan_pemda,
            });
          }

          // Mapping data ke form
          const indikatorData = hasil.indikator?.map((item) => ({
            id: item.id,
            indikator: item.indikator,
            rumus_perhitungan: item.rumus_perhitungan,
            sumber_data: item.sumber_data,
            target: item.target.map((t) => ({
              target: t.target,
              satuan: t.satuan,
            })),
          })) || [];

          reset({ indikator: indikatorData });
          replace(indikatorData);
        } else if (result.code === 400) {
          setIdNotFound(true);
          setTujuanNotFound(false);
        } else if (result.code === 404) {
          setIdNotFound(false);
          setTujuanNotFound(true);
        } else {
          console.log("Error fetching:", result);
        }
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (metode === "lama") {
      fetchDetailSasaranPemda();
    } else {
      reset({ indikator: [] });
    }
  }, [id, token, isOpen, metode, reset, replace]);

  return { loading, idNotFound, tujuanNotFound, sasaranPemda, tujuanPemda };
}
