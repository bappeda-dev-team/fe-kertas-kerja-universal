'use client'
import { LoadingClip } from "@/components/global/Loading";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getOpdTahun, getToken, getUser } from "@/components/lib/Cookie";
import { useEffect, useState } from 'react';
import { TbArrowBadgeDownFilled } from "react-icons/tb";

type Target = {
  id_target: number;
  target: string;
  satuan: string;
};

type Indikator = {
  id_indikator: number;
  nama_indikator: string;
  targets: Target[];
};

type DataItem = {
  id: number;
  tema: string;
  keterangan: string;
  indikator?: Indikator[];
  childs?: DataItem[];
};


const NestedTable = ({ data, level = 0 }: { data: DataItem[], level?: number }) => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="overflow-auto m-2 rounded-t-xl border">
      <table className="w-full">
        {/* Table Header */}
        {level === 0 && (
          <thead>
            <tr className="bg-[#99CEF5] text-white">
              <th className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Tema</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Keterangan</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</th>
              <th className="border-r border-b px-6 py-3 min-w-[200px]">Target/Satuan</th>
            </tr>
          </thead>
        )}

        {/* Table Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="px-6 py-3 uppercase text-center" colSpan={5}>
                Data Kosong / Belum Ditambahkan
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <>
                {/* Parent Row */}
                <tr
                  key={item.id}
                  className={`cursor-pointer ${openItems[item.id] ? "bg-emerald-100" : "hover:bg-gray-100"}`}
                >
                  {/* No */}
                  <td className="border-r border-b px-6 py-4 text-center">{index + 1}</td>

                  {/* Tema (Expandable if has child) */}
                  <td className="border-r border-b px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {item.childs && (
                        <TbArrowBadgeDownFilled
                          className={`cursor-pointer transition-transform duration-200 ${openItems[item.id] ? "" : "-rotate-90"
                            }`}
                          onClick={() => toggleItem(item.id)}
                        />
                      )}
                      <span>{item.tema}</span>
                    </div>
                  </td>

                  {/* Keterangan */}
                  <td className="border-r border-b px-6 py-4 text-center">
                    {item.keterangan || "-"}
                  </td>

                  {/* Indikator */}
                  <td className="border-r border-b px-6 py-4 text-center">
                    {item.indikator && item.indikator.length > 0
                      ? item.indikator.map((ind) => <p key={ind.id_indikator}>{ind.nama_indikator}</p>)
                      : "-"}
                  </td>

                  {/* Target/Satuan */}
                  <td className="border-r border-b px-6 py-4 text-center">
                    {item.indikator && item.indikator.length > 0
                      ? item.indikator.map((ind) =>
                        ind.targets.map((t) => (
                          <p key={t.id_target}>
                            {t.target} / {t.satuan}
                          </p>
                        ))
                      )
                      : "-"}
                  </td>
                </tr>

                {/* Render Child Rows Recursively */}
                {openItems[item.id] && item.childs && (
                  <tr>
                    <td colSpan={5} className="p-0">
                      <NestedTable data={item.childs} level={level + 1} />
                    </td>
                  </tr>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


function SupportingPokinContent() {
  const [User, setUser] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<{ value: string; label: string } | null>(null);
  const [Tahun, setTahun] = useState<{ value: string; label: string } | null>(null);
  const token = getToken();

  const [Error, setError] = useState<boolean | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const [DataNull, setDataNull] = useState<boolean>(false);
  const [Data, setData] = useState<DataItem[]>([]);
  const [namaOpd, setNamaOpd] = useState<string | null>(null);

  // Fetch user and selected OPD & Tahun
  useEffect(() => {
    const data = getOpdTahun();
    const fetchUser = getUser();
    if (fetchUser) setUser(fetchUser.user);
    if (data.tahun) setTahun({ value: data.tahun.value, label: data.tahun.label });
    if (data.opd) setSelectedOpd({ value: data.opd.value, label: data.opd.label });
  }, []);

  // Fetch Data
  useEffect(() => {
    if (!User?.roles || !Tahun?.value || !SelectedOpd?.value) return;

    const fetchSasaran = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/laporan/supporting_pokin/${SelectedOpd.value}/${Tahun.value}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        const data = result?.data?.pohon_kinerjas ?? [];

        if (data.length === 0) {
          setDataNull(true);
          setData([]);
        } else {
          setDataNull(false);
          setData(data);
          setNamaOpd(result?.data?.nama_opd);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSasaran();
  }, [User, Tahun, SelectedOpd, token]);


  if (Loading) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <LoadingClip className="mx-5 py-5" />
      </div>
    );
  }
  if (Error) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="text-red-500 font-bold mx-5 py-5">Periksa koneksi internet atau database server</h1>
      </div>
    );
  }
  if (!Tahun?.value) {
    return <TahunNull />;
  }

  return (
    <>
      {DataNull ? (
        <div className="px-6 py-3 border w-full rounded-xl">Data Kosong / Belum Ditambahkan</div>
      ) : (
        <div className="py-5 w-full">
          <div className="flex flex-col space-y-2">
            <div className="flex px-6">
              <h2>{namaOpd} Mendukung Tema: </h2>
            </div>
            <NestedTable data={Data} />
          </div>
        </div>
      )}
    </>
  );
}

export default SupportingPokinContent;