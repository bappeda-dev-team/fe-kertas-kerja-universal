'use client'

import { AlertNotification } from "@/components/global/Alert";
import { ButtonGreen, ButtonRed } from "@/components/global/Button";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import InputField from './InputField';

interface OptionTypeString {
  value: string;
  label: string;
}
interface FormValue {
  id: string;
  kode_opd: string;
  nama_opd: string;
  nama_admin: string;
  no_wa_admin: string;
  singkatan: string;
  alamat: string;
  telepon: string;
  fax: string;
  email: string;
  website: string;
  nama_kepala_opd: string;
  nip_kepala_opd: string;
  pangkat_kepala: string;
  id_lembaga: OptionTypeString;
}

interface lembaga {
  id: string;
  nama_lembaga: string;
  is_active: boolean;
}

// TODO: refactor why this need separated ?
export const FormEdit = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();
  const [KodeOpd, setKodeOpd] = useState<string>('');
  const [NamaOpd, setNamaOpd] = useState<string>('');
  const [NamaKepalaOpd, setNamaKepalaOpd] = useState<string>('');
  const [NipKepalaOpd, setNipKepalaOpd] = useState<string>('');
  const [PangkatKepalaOpd, setPangkatKepalaOpd] = useState<string>('');
  const [NamaAdmin, setNamaAdmin] = useState<string>('');
  const [NoWaAdmin, setNoWaAdmin] = useState<string>('');
  const [KodeLembaga, setKodeLembaga] = useState<OptionTypeString | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [idNull, setIdNull] = useState<boolean | null>(null);
  const { id } = useParams();
  const [OpdOption, setOpdOption] = useState<OptionTypeString[]>([]);
  const router = useRouter();
  const token = getToken();

  // TODO: what is this used for ??
  // disable this
  const fetchLembaga = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/lembaga/findall`, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('cant fetch data opd');
      }
      const data = await response.json();
      const opd = data.data.map((item: any) => ({
        value: item.id,
        label: item.nama_lembaga,
      }));
      setOpdOption(opd);
    } catch (err) {
      console.log('gagal mendapatkan data opd');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchIdOpd = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/opd/detail/${id}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('terdapat kesalahan di koneksi backend');
        }
        const result = await response.json();
        if (result.code == 500) {
          setIdNull(true);
        } else {
          const data = result.data;
          if (data.kode_opd) {
            setKodeOpd(data.kode_opd);
            reset((prev) => ({ ...prev, kode_opd: data.kode_opd }))
          }
          if (data.nama_opd) {
            setNamaOpd(data.nama_opd);
            reset((prev) => ({ ...prev, nama_opd: data.nama_opd }))
          }
          if (data.nama_kepala_opd) {
            setNamaKepalaOpd(data.nama_kepala_opd);
            reset((prev) => ({ ...prev, nama_kepala_opd: data.nama_kepala_opd }))
          }
          if (data.pangkat_kepala) {
            setPangkatKepalaOpd(data.pangkat_kepala);
            reset((prev) => ({ ...prev, pangkat_kepala: data.pangkat_kepala }))
          }
          if (data.nip_kepala_opd) {
            setNipKepalaOpd(data.nip_kepala_opd);
            reset((prev) => ({ ...prev, nip_kepala_opd: data.nip_kepala_opd }))
          }
          if (data.nama_admin) {
            setNamaAdmin(data.nama_admin);
            reset((prev) => ({ ...prev, nama_admin: data.nama_admin }))
          }
          // TODO: add guard nomor wa valid
          if (data.no_wa_admin) {
            setNoWaAdmin(data.no_wa_admin);
            reset((prev) => ({ ...prev, no_wa_admin: data.no_wa_admin }))
          }
          if (data.id_lembaga) {
            const lembaga = {
              value: data.id_lembaga.id,
              label: data.id_lembaga.nama_lembaga,
            }
            setKodeLembaga(lembaga);
            reset((prev) => ({ ...prev, id_lembaga: lembaga }))
          }
        }
      } catch (err) {
        setError('gagal mendapatkan data, periksa koneksi internet atau database server')
      } finally {
        setLoading(false);
      }
    }
    fetchIdOpd();
  }, [id, reset, token]);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = {
      //key : value
      kode_opd: data.kode_opd,
      nama_opd: data.nama_opd,
      nama_kepala_opd: data.nama_kepala_opd,
      nip_kepala_opd: data.nip_kepala_opd,
      pangkat_kepala: data.pangkat_kepala,
      nama_admin: data.nama_admin,
      no_wa_admin: data.no_wa_admin,
      id_lembaga: data.id_lembaga?.value,
    };

    try {
      const response = await fetch(`${API_URL}/opd/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        AlertNotification("Berhasil", "Berhasil menambahkan data master perangkat daerah", "success", 1000);
        router.push("/PerencanaanOpd/infoOpd");
      } else {
        AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
      }
    } catch (err) {
      AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
    }
  };

  if (loading) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bold">Form Edit OPD :</h1>
        <LoadingClip className="mx-5 py-5" />
      </div>
    );
  } else if (error) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bold">Form Edit OPD :</h1>
        <h1 className="text-red-500 mx-5 py-5">{error}</h1>
      </div>
    )
  } else if (idNull) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bold">Form Edit OPD :</h1>
        <h1 className="text-red-500 mx-5 py-5">id tidak ditemukan</h1>
      </div>
    )
  } else {
    return (
      <>
        <div className="border p-5 rounded-xl shadow-xl">
          <h1 className="uppercase font-bold">Form Edit OPD :</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-5 py-5"
          >
            <InputField
              control={control}
              name="kode_opd"
              label="Kode Perangkat Daerah"
              placeholder="masukkan Kode Perangkat Daerah"
              value={KodeOpd}
              setValue={setKodeOpd}
              error={errors.kode_opd?.message}
            />
            <InputField
              control={control}
              name="nama_opd"
              label="Nama Perangkat Daerah"
              placeholder="masukkan Nama Perangkat Daerah"
              value={NamaOpd}
              setValue={setNamaOpd}
              error={errors.nama_opd?.message}
            />
            <InputField
              control={control}
              name="nama_kepala_opd"
              label="Nama Kepala Perangkat Daerah"
              placeholder="masukkan Nama Kepala Perangkat Daerah"
              value={NamaKepalaOpd}
              setValue={setNamaKepalaOpd}
              error={errors.nama_kepala_opd?.message}
            />
            <InputField
              control={control}
              name="nip_kepala_opd"
              label="NIP Kepala Perangkat Daerah"
              placeholder="masukkan NIP Kepala Perangkat Daerah"
              value={NipKepalaOpd}
              setValue={setNipKepalaOpd}
              error={errors.nip_kepala_opd?.message}
            />
            <InputField
              control={control}
              name="pangkat_kepala"
              label="Pangkat Kepala Perangkat Daerah"
              placeholder="masukkan Pangkat Kepala Perangkat Daerah"
              value={PangkatKepalaOpd}
              setValue={setPangkatKepalaOpd}
              error={errors.pangkat_kepala?.message}
            />
            <InputField
              control={control}
              name="nama_admin"
              label="Nama Admin Perangkat Daerah"
              placeholder="masukkan Nama Admin Perangkat Daerah"
              value={NamaAdmin}
              setValue={setNamaAdmin}
              error={errors.nama_admin?.message}
            />
            <InputField
              control={control}
              name="no_wa_admin"
              label="Nomor WA Admin Perangkat Daerah"
              placeholder="masukkan Nomor WA Admin Perangkat Daerah"
              value={NoWaAdmin}
              setValue={setNoWaAdmin}
              error={errors.no_wa_admin?.message}
            />
            {/* LEMBAGA */}
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="id_lembaga"
              >
                Lembaga:
              </label>
              <Controller
                name="id_lembaga"
                control={control}
                rules={{ required: "Lembaga Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Lembaga"
                      value={KodeLembaga}
                      options={OpdOption}
                      isLoading={IsLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (OpdOption.length === 0) {
                          fetchLembaga();
                        }
                      }}
                      onMenuClose={() => {
                        setOpdOption([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setKodeLembaga(option);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.id_lembaga ?
                      <h1 className="text-red-500">
                        {errors.id_lembaga.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Lembaga Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>

            <ButtonGreen
              type="submit"
              className="my-4"
            >
              Simpan
            </ButtonGreen>
            <ButtonRed type="button" halaman_url="/PerencanaanOpd/infoOpd">
              Kembali
            </ButtonRed>
          </form>
        </div>
      </>
    )
  }
}
