'use client'

import { ButtonGreen } from "@/components/global/Button";
import { useState, useEffect } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken, getUser, getOpdTahun } from "@/components/lib/Cookie";

interface opd {
  id: string;
  kode_opd: string;
  nama_opd: string;
  kode_urusan1: string;
  nama_urusan1: string;
  kode_urusan2: string;
  nama_urusan2: string;
  kode_urusan3: string;
  nama_urusan3: string;
  kode_bidang_urusan1: string;
  nama_bidang_urusan1: string;
  kode_bidang_urusan2: string;
  nama_bidang_urusan2: string;
  kode_bidang_urusan3: string;
  nama_bidang_urusan3: string;
  nama_kepala_opd: string;
  nip_kepala_opd: string;
  pangkat_kepala: string;
  nama_admin: string;
  no_wa_admin: string;
}

export default function TableInfoOpd() {

  const [Opd, setOpd] = useState<opd>();
  const [Error, setError] = useState<boolean | null>(null);
  const [Loading, setLoading] = useState<boolean | null>(null);
  const [DataNull, setDataNull] = useState<boolean | null>(null);
  const [kodeOpd, setSelectedOpd] = useState<any>(null);
  const [kodeLembaga, setSelectedLembaga] = useState<any>(null);
  const token = getToken();

  useEffect(() => {
    if (!token) return;
    const userData = getUser();
    if (userData) {
      setSelectedLembaga(userData.user.kode_lembaga)
      setSelectedOpd(userData.user.kode_opd)
    }
  }, [])
  console.log('kodelembaga', kodeLembaga)
  console.log('kodeopd', kodeOpd)
  console.log('opd', Opd)

  useEffect(() => {
    if (!kodeOpd || !kodeLembaga || !token) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchOpd = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/opd/info/${kodeOpd}/${kodeLembaga}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        const data = result.data;
        if (data == null) {
          setDataNull(true);
        } else if (result.code === 401) {
          setError(true);
        } else {
          setDataNull(false);
          setOpd(data.data);
          setError(false);
        }
        setOpd(data);
      } catch (err) {
        setError(true);
        console.error(err)
      } finally {
        setLoading(false);
      }
    }
    fetchOpd();
  }, [kodeOpd, kodeLembaga, token]);

  if (Loading) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <LoadingClip className="mx-5 py-5" />
      </div>
    );
  } else if (Error) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="text-red-500 mx-5 py-5">Periksa koneksi internet</h1>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-auto m-2 rounded-t-xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-[#99CEF5] text-white">
              <th className="border-r border-b px-6 py-3 min-w-[50px]">No</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Kode Perangkat Daerah</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Perangkat Daerah</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Urusan</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Bidang Urusan</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Kepala Perangkat Daerah</th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">NIP Kepala Perangkat Daerah</th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">Pangkat Kepala Perangkat Daerah</th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">Nama Admin</th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">No WA Admin</th>
              <th className="border-l border-b px-6 py-3 min-w-[200px]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DataNull ?
              <tr>
                <td className="px-6 py-3 uppercase" colSpan={13}>
                  Data Kosong / Belum Ditambahkan
                </td>
              </tr>
              :
              <tr key={Opd?.id}>
                <td className="border-r border-b px-6 py-4">1</td>
                <td className="border-r border-b px-6 py-4">{Opd?.kode_opd || "-"}</td>
                <td className="border-r border-b px-6 py-4">{Opd?.nama_opd || "-"}</td>
                <td className="border-r border-b px-6 py-4">
                  <div className="bidang-urusans flex flex-col gap-5">
                    <p>
                      <span className="me-2">{Opd?.kode_urusan1}</span>
                      {Opd?.nama_urusan1 || "-"}
                    </p>
                    <p>
                      <span className="me-2">{Opd?.kode_urusan2}</span>
                      {Opd?.nama_urusan2}
                    </p>
                    <p>
                      <span className="me-2">{Opd?.kode_urusan3}</span>
                      {Opd?.nama_urusan3}
                    </p>
                  </div>
                </td>
                <td className="border-r border-b px-6 py-4">
                  <div className="bidang-urusans flex flex-col gap-5">
                    <p>
                      <span className="me-2">{Opd?.kode_bidang_urusan1}</span>
                      {Opd?.nama_bidang_urusan1 || "-"}
                    </p>
                    <p>
                      <span className="me-2">{Opd?.kode_bidang_urusan2}</span>
                      {Opd?.nama_bidang_urusan2}
                    </p>
                    <p>
                      <span className="me-2">{Opd?.kode_bidang_urusan3}</span>
                      {Opd?.nama_bidang_urusan3}
                    </p>
                  </div>
                </td>
                <td className="border-r border-b px-6 py-4">{Opd?.nama_kepala_opd || "-"}</td>
                <td className="border-r border-b px-6 py-4">{Opd?.nip_kepala_opd || "-"}</td>
                <td className="border-r border-b px-6 py-4">{Opd?.pangkat_kepala || "-"}</td>
                <td className="border-r border-b px-6 py-4">{Opd?.nama_admin || "-"}</td>
                <td className="border-r border-b px-6 py-4">{Opd?.no_wa_admin || "-"}</td>
                <td className="border-r border-b px-6 py-4">
                  <div className="flex flex-col jutify-center items-center gap-2">
                    <ButtonGreen className="w-full" halaman_url={`/PerencanaanOpd/infoOpd/${Opd?.id}/edit`}>Edit</ButtonGreen>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
