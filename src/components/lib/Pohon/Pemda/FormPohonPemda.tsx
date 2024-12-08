'use client'

import { useState, useEffect } from 'react';
import { ButtonSky, ButtonRed, ButtonRedBorder, ButtonSkyBorder } from '@/components/global/Button';
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { getOpdTahun } from '../../Cookie';
import { AlertNotification } from '@/components/global/Alert';
import Select from 'react-select';
import { PohonEdited } from './Pohon';
import { getToken } from '../../Cookie';

interface OptionTypeString {
    value: string;
    label: string;
}
interface OptionType {
    value: number;
    label: string;
}
interface FormValue {
    id: number;
    parent: string;
    nama_pohon: string;
    jenis_pohon: string;
    keterangan: string;
    tahun: OptionTypeString;
    status: string;
    kode_opd: OptionTypeString;
    pelaksana: OptionTypeString[];
    pohon?: OptionType;
    indikator: indikator[];
}
interface indikator {
    nama_indikator: string;
    targets: target[];
}
type target = {
    target: string;
    satuan: string;
};
interface form {
    formId: number;
    onSave: [
        {data: any},
        {id: number}
    ];
    onCancle: () => void;
}

export const FormPohonPemda: React.FC<{ 
    formId: number; 
    id: number | null; 
    level: number; 
    onSave?: (data: any, id: number) => void; 
    onCancel?: () => void 
    pokin: 'pemda' | 'opd';
}> = ({ id, level, formId, onSave, onCancel, pokin }) => {

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FormValue>();
    const [NamaPohon, setNamaPohon] = useState<string>('');
    const [Keterangan, setKeterangan] = useState<string>('');
    const [KodeOpd, setKodeOpd] = useState<OptionTypeString | null>(null);
    const [Pelaksana, setPelaksana] = useState<OptionTypeString[]>([]);
    const [OpdOption, setOpdOption] = useState<OptionTypeString[]>([]);
    const [PelaksanaOption, setPelaksanaOption] = useState<OptionTypeString[]>([]);
    const [Tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [DataAdd, setDataAdd] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [IsAdded, setIsAdded] = useState<boolean>(false);
    const [Deleted, setDeleted] = useState<boolean>(false);
    const token = getToken();
    
    useEffect(() => {
        const data = getOpdTahun();
        if(data.tahun){
            const tahun = {
                value: data.tahun.value,
                label: data.tahun.label,
            }
            setTahun(tahun);
        }
        if(data.opd){
            const opd = {
                value: data.opd.value,
                label: data.opd.label,
            }
            setSelectedOpd(opd);
        }
    },[]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "indikator",
    });

    // useEffect(() => {
    //     if (fields.length === 0) {
    //         append({ nama_indikator: "", targets: [{ target: "", satuan: "" }] });
    //     }
    // }, [fields, append]);

    const fetchOpd = async() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setIsLoading(true);
      try{ 
        const response = await fetch(`${API_URL}/opd/findall`,{
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(!response.ok){
          throw new Error('cant fetch data opd');
        }
        const data = await response.json();
        const opd = data.data.map((item: any) => ({
          value : item.kode_opd,
          label : item.nama_opd,
        }));
        setOpdOption(opd);
      } catch (err){
        console.log('gagal mendapatkan data opd');
      } finally {
        setIsLoading(false);
      }
    };
    const fetchPelaksana = async() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setIsLoading(true);
      try{ 
        const response = await fetch(`${API_URL}/pegawai/findall`,{
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(!response.ok){
          throw new Error('cant fetch data opd');
        }
        const data = await response.json();
        const opd = data.data.map((item: any) => ({
          value : item.id,
          label : item.nama_pegawai,
        }));
        setPelaksanaOption(opd);
      } catch (err){
        console.log('gagal mendapatkan data opd');
      } finally {
        setIsLoading(false);
      }
    };
    
    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            //key : value
            nama_pohon : data.nama_pohon,
            Keterangan : data.keterangan,
            jenis_pohon:    level === 0 ? "Sub Tematik" :
                            level === 1 ? "Sub Sub Tematik" :
                            level === 2 ? "Super Sub Tematik" :
                            level === 3 ? "Strategic Pemda" :
                            level === 4 ? "Tactical Pemda" :
                            level === 5 ? "Operational Pemda" : "Unknown",
            level_pohon :   level === 0 ? 1 :
                            level === 1 ? 2 :
                            level === 2 ? 3 :
                            level === 3 ? 4 :
                            level === 4 ? 5 :
                            level === 5 ? 6 : "Unknown",
            parent: id,
            tahun: Tahun?.value?.toString(),
            kode_opd:  (level === 0 || level === 1 || level === 2) ? null : data.kode_opd?.value,
            status: (level === 0 || level === 1 || level === 2) ? '' : 'menunggu_disetujui',
            ...(data.indikator && {
                indikator: data.indikator.map((ind) => ({
                    indikator: ind.nama_indikator,
                    target: ind.targets.map((t) => ({
                        target: t.target,
                        satuan: t.satuan,
                    })),
                })),
            }),
        };
        // console.log(formData);
        try{
            const url = '/pohon_kinerja_admin/create';
            const response = await fetch(`${API_URL}${url}`, {
                method: "POST",
                headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                AlertNotification("Berhasil", "Berhasil menambahkan pohon", "success", 1000);
                setIsAdded(true);
                const result = await response.json();
                const data = result.data;
                setDataAdd(data);
            } else {
                AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
            }
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
            console.error(err);
        }
    };

    return (
        <li>
            {IsAdded && DataAdd ?
                <PohonEdited tema={DataAdd} deleteTrigger={() => setDeleted((prev) => !prev)}/>
            :
            <div className="tf-nc tf flex flex-col w-[600px] rounded-lg shadow-lg shadow-slate-500">
                <div className="flex pt-3 justify-center font-bold text-lg uppercase border my-3 py-3 border-black rounded-lg">
                    {level == 0 && 
                        <h1>Tambah SubTematik</h1>
                    } 
                    {level == 1 && 
                        <h1>Tambah SubSubTematik</h1>
                    } 
                    {level == 2 && 
                        <h1>Tambah SuperSubTematik</h1>
                    } 
                    {level == 3 && 
                        <h1>Tambah Strategic Pemda</h1>
                    } 
                    {level == 4 && 
                        <h1>Tambah Tactical Pemda</h1>
                    } 
                    {level == 5 && 
                        <h1>Tambah Operational Pemda</h1>
                    }
                </div>
                <div className="flex justify-center my-3 w-full">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='w-full'
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="nama_pohon"
                            >
                                {level == 0 && 
                                    "Sub Tematik"
                                } 
                                {level == 1 && 
                                    "Sub Sub Tematik"
                                } 
                                {level == 2 && 
                                    "Super Sub Tematik"
                                } 
                                {level == 3 && 
                                    "Strategic Pemda"
                                } 
                                {level == 4 && 
                                    "Tactical Pemda"
                                } 
                                {level == 5 && 
                                    "Operational Pemda"
                                }
                            </label>
                            <Controller
                                name="nama_pohon"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="nama_pohon"
                                        type="text"
                                        placeholder="masukkan Pohon"
                                        value={field.value || NamaPohon}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setNamaPohon(e.target.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {(level === 3 || level === 4 || level === 5 || level === 6) &&
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kode_opd"
                            >
                                Perangkat Daerah
                            </label>
                            <Controller
                                name="kode_opd"
                                control={control}
                                render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        placeholder="Masukkan Perangkat Daerah"
                                        value={KodeOpd}
                                        options={OpdOption}
                                        isLoading={isLoading}
                                        isSearchable
                                        isClearable
                                        onMenuOpen={() => {
                                            if (OpdOption.length === 0) {
                                                fetchOpd();
                                            }
                                        }}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setKodeOpd(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderRadius: '8px',
                                            textAlign: 'start',
                                            })
                                        }}
                                    />
                                </>
                                )}
                            />
                        </div>
                        }
                        {pokin === 'opd' && 
                            <div className="flex flex-col py-3">
                                <label
                                    className="uppercase text-xs font-bold text-gray-700 my-2"
                                    htmlFor="pelaksana"
                                >
                                    Pelaksana
                                </label>
                                <Controller
                                    name="pelaksana"
                                    control={control}
                                    render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            placeholder="Pilih Pelaksana (bisa lebih dari satu)"
                                            value={Pelaksana}
                                            options={PelaksanaOption}
                                            isLoading={isLoading}
                                            isSearchable
                                            isClearable
                                            isMulti
                                            onMenuOpen={() => {
                                                if (PelaksanaOption.length === 0) {
                                                    fetchPelaksana();
                                                }
                                            }}
                                            onChange={(option) => {
                                                field.onChange(option || []);
                                                setPelaksana(option as OptionTypeString[]);
                                            }}
                                            styles={{
                                                control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                                textAlign: 'start',
                                                })
                                            }}
                                        />
                                    </>
                                    )}
                                />
                            </div>
                        }
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="keterangan"
                            >
                                Keterangan:
                            </label>
                            <Controller
                                name="keterangan"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="keterangan"
                                        placeholder="masukkan keterangan"
                                        value={field.value || Keterangan}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setKeterangan(e.target.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <label className="uppercase text-base font-bold text-gray-700 my-2">
                            indikator sasaran :
                        </label>
                        {fields.map((field, index) => (
                            <div key={index} className="flex flex-col my-2 py-2 px-5 border rounded-lg">
                                <Controller
                                    name={`indikator.${index}.nama_indikator`}
                                    control={control}
                                    defaultValue={field.nama_indikator}
                                    render={({ field }) => (
                                        <div className="flex flex-col py-3">
                                            <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                Nama Indikator {index + 1} :
                                            </label>
                                            <input
                                                {...field}
                                                className="border px-4 py-2 rounded-lg"
                                                placeholder={`Masukkan nama indikator ${index + 1}`}
                                            />
                                        </div>
                                    )}
                                />
                                {field.targets.map((_, subindex) => (
                                    <>
                                    <Controller
                                        name={`indikator.${index}.targets.${subindex}.target`}
                                        control={control}
                                        defaultValue={_.target}
                                        render={({ field }) => (
                                            <div className="flex flex-col py-3">
                                                <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                    Target :
                                                </label>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className="border px-4 py-2 rounded-lg"
                                                    placeholder="Masukkan target"
                                                />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name={`indikator.${index}.targets.${subindex}.satuan`}
                                        control={control}
                                        defaultValue={_.satuan}
                                        render={({ field }) => (
                                            <div className="flex flex-col py-3">
                                                <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                    Satuan :
                                                </label>
                                                <input
                                                    {...field}
                                                    className="border px-4 py-2 rounded-lg"
                                                    placeholder="Masukkan satuan"
                                                />
                                            </div>
                                        )}
                                    />
                                    </>
                                ))}
                                {index >= 0 && (
                                    <ButtonRedBorder
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="w-[200px] my-3"
                                    >
                                        Hapus
                                    </ButtonRedBorder>
                                )}
                            </div>
                        ))}
                        <ButtonSkyBorder
                            className="mb-3 mt-2 w-full"
                            type="button"
                            onClick={() => append({ nama_indikator: "", targets: [{ target: "", satuan: "" }] })}
                        >
                            Tambah Indikator
                        </ButtonSkyBorder>
                        <ButtonSky type="submit" className="w-full my-3">
                            Simpan
                        </ButtonSky>
                        <ButtonRed className="w-full my-3" onClick={onCancel}>
                            Batal
                        </ButtonRed>
                    </form>
                </div>
            </div>
            }
        </li>
    );
};

export const FormAmbilPohon: React.FC<{ 
    formId: number; 
    id: number; 
    level: number; 
    onCancel: () => void 
}> = ({ id, level, formId, onCancel }) => {
    
        const {
      control,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FormValue>();
    const [KodeOpd, setKodeOpd] = useState<OptionTypeString | null>(null);
    const [Pohon, setPohon] = useState<OptionType | null>(null);
    const [Tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [OpdOption, setOpdOption] = useState<OptionTypeString[]>([]);
    const [PohonOption, setPohonOption] = useState<OptionType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [IsAdded, setIsAdded] = useState<boolean>(false);
    const [DataAdd, setDataAdd] = useState<any>(null);
    const [Deleted, setDeleted] = useState<boolean>(false);
    const token = getToken();
    
    useEffect(() => {
        const data = getOpdTahun();
        if(data.tahun){
            const tahun = {
                value: data.tahun.value,
                label: data.tahun.label,
            }
            setTahun(tahun);
        }
        if(data.opd){
            const opd = {
                value: data.opd.value,
                label: data.opd.label,
            }
            setSelectedOpd(opd);
        }
    },[]);

    const fetchOpd = async() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setIsLoading(true);
      try{ 
        const response = await fetch(`${API_URL}/opd/findall`,{
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(!response.ok){
          throw new Error('cant fetch data opd');
        }
        const data = await response.json();
        const opd = data.data.map((item: any) => ({
          value : item.kode_opd,
          label : item.nama_opd,
        }));
        setOpdOption(opd);
      } catch (err){
        console.log('gagal mendapatkan data opd');
      } finally {
        setIsLoading(false);
      }
    };
    const fetchPohon = async(SelectedOpd: string) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        setIsLoading(true);
        try{
          const url = 
          (level === 0 || level === 1 || level === 2 || level === 3) 
            ? `pohon_kinerja_opd/strategic_no_parent/${SelectedOpd}/${Tahun?.value}` 
            : level === 4 
            ? `pohon_kinerja/tactical/${SelectedOpd}/${Tahun?.value}` 
            : level === 5 
            ? `pohon_kinerja/operational/${SelectedOpd}/${Tahun?.value}` 
            : `unknown`;
          const response = await fetch(`${API_URL}/${url}`,{
            method: 'GET',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          });
          if(!response.ok){
            throw new Error('cant fetch data opd');
          }
          const data = await response.json();
          if (level === 0 || level === 1 || level === 2 || level === 3) {
            const pohon = data.data.map((item: any) => ({
              value: item.id,
              label: item.nama_pohon,
            }));
            setPohonOption(pohon);
        } else if (level === 4 || level === 5) {
            const pohon = data.data.map((item: any) => ({
                value: item.id,
                label: item.nama_pohon,
            }));
            setPohonOption(pohon);
          }
        } catch (err){
          console.log('gagal mendapatkan data pohon');
        } finally {
          setIsLoading(false);
        }
      };
    
    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            //key : value
            id: data.pohon?.value,
            jenis_pohon:    (level === 0 || level === 1 || level === 2 || level === 3) ? "Strategic" :
                            level === 4 ? "Tactical" :
                            level === 5 ? "Operational" : "Unknown",
            parent: id,
        };
        // console.log(formData);
        try{
            const response = await fetch(`${API_URL}/pohon_kinerja_admin/clone_strategic/create`, {
                method: "POST",
                headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                AlertNotification("Berhasil", "Berhasil menambahkan pohon", "success", 1000);
                setIsAdded(true);
                const result = await response.json();
                const data = result.data;
                setDataAdd(data);
            } else {
                AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
            }
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
            console.error(err);
        }
    };

    return (
        <li>
            {IsAdded && DataAdd ?
                <PohonEdited tema={DataAdd} deleteTrigger={() => setDeleted((prev) => !prev)}/>
            :
            <div className="tf-nc tf flex flex-col w-[600px] rounded-lg shadow-lg shadow-slate-500">
                <div className="flex pt-3 justify-center font-bold text-lg uppercase border my-3 py-3 border-black rounded-lg">
                    {(level === 0 || level === 1 || level === 2 || level === 3) && 
                        <h1>Ambil Strategic </h1>
                    }
                    {level === 4 && 
                        <h1>Ambil Tactical </h1>
                    }
                    {level === 5 && 
                        <h1>Ambil Operational </h1>
                    }
                </div>
                <div className="flex justify-center my-3 w-full">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='w-full'
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kode_opd"
                            >
                                Perangkat Daerah
                            </label>
                            <Controller
                                name="kode_opd"
                                control={control}
                                render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        placeholder="Masukkan Perangkat Daerah"
                                        value={KodeOpd}
                                        options={OpdOption}
                                        isLoading={isLoading}
                                        isSearchable
                                        isClearable
                                        onMenuOpen={() => {
                                            if (OpdOption.length === 0) {
                                                fetchOpd();
                                            }
                                        }}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setKodeOpd(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderRadius: '8px',
                                            textAlign: 'start',
                                            })
                                        }}
                                    />
                                </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="pohon"
                            >
                                {(level === 0 || level === 1 || level === 2 || level === 3) && 
                                    <h1>Strategic</h1>
                                } 
                                {level == 4 && 
                                    <h1>Tactical</h1>
                                } 
                                {level == 5 && 
                                    <h1>Operational</h1>
                                }
                            </label>
                            <Controller
                                name="pohon"
                                control={control}
                                rules={{required : "Pohon Harus Terisi"}}
                                render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        placeholder="Pilih OPD terlebih dahulu"
                                        value={Pohon}
                                        options={PohonOption}
                                        isLoading={isLoading}
                                        isSearchable
                                        isClearable
                                        onMenuOpen={() => {
                                            if (KodeOpd?.value != null) {
                                                fetchPohon(KodeOpd?.value);
                                            } else if(KodeOpd?.value == null){
                                                setPohonOption([]);
                                                setPohon(null);
                                            }
                                        }}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setPohon(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderRadius: '8px',
                                            textAlign: 'start',
                                            })
                                        }}
                                    />
                                    {errors.pohon ?
                                        <h1 className="text-red-500">
                                            {errors.pohon.message}
                                        </h1>
                                    :
                                        <h1 className="text-slate-300 text-xs">*Pohon Harus Terisi</h1>
                                    }
                                </>
                                )}
                            />
                        </div>
                        <ButtonSky type="submit" className="w-full my-3">
                            Simpan
                        </ButtonSky>
                        <ButtonRed className="w-full my-3" onClick={onCancel}>
                            Batal
                        </ButtonRed>
                    </form>
                </div>
            </div>
            }
        </li>
    );
};

export const FormEditPohon: React.FC<{ 
    formId: number; 
    id: number; 
    level: number; 
    onCancel: () => void 
    pokin: 'pemda' | 'opd';
    EditBerhasil : (data: any) => void;
}> = ({ id, level, formId, EditBerhasil, onCancel, pokin }) => {
    
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FormValue>();
    const [NamaPohon, setNamaPohon] = useState<string>('');
    const [Keterangan, setKeterangan] = useState<string>('');
    const [Status, setStatus] = useState<string>('');
    const [KodeOpd, setKodeOpd] = useState<OptionTypeString | null>(null);
    const [Parent, setParent] = useState<number | null>(null);
    const [Tahun, setTahun] = useState<any>(null);
    const [Pelaksana, setPelaksana] = useState<OptionTypeString[]>([]);
    const [PelaksanaOption, setPelaksanaOption] = useState<OptionTypeString[]>([]);
    const [OpdOption, setOpdOption] = useState<OptionTypeString[]>([]);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [IsEdited, setIsEdited] = useState<boolean>(false);
    const [DataEdit, setDataEdit] = useState<any>(null);
    const [Deleted, setDeleted] = useState<boolean>(false);
    const token = getToken();
    
    useEffect(() => {
        const data = getOpdTahun();
        if(data.tahun){
            const tahun = {
                value: data.tahun.value,
                label: data.tahun.label,
            }
            setTahun(tahun);
        }
        if(data.opd){
            const opd = {
                value: data.opd.value,
                label: data.opd.label,
            }
            setSelectedOpd(opd);
        }
    },[]);

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "indikator",
    });
    
    const fetchOpd = async() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setIsLoading(true);
      try{ 
        const response = await fetch(`${API_URL}/opd/findall`,{
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(!response.ok){
          throw new Error('cant fetch data opd');
        }
        const data = await response.json();
        const opd = data.data.map((item: any) => ({
          value : item.kode_opd,
          label : item.nama_opd,
        }));
        setOpdOption(opd);
      } catch (err){
        console.log('gagal mendapatkan data opd');
      } finally {
        setIsLoading(false);
      }
    };
    const fetchPelaksana = async() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setIsLoading(true);
      try{ 
        const response = await fetch(`${API_URL}/pegawai/findall`,{
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(!response.ok){
          throw new Error('cant fetch data opd');
        }
        const data = await response.json();
        const opd = data.data.map((item: any) => ({
          value : item.id,
          label : item.nama_pegawai,
        }));
        setPelaksanaOption(opd);
      } catch (err){
        console.log('gagal mendapatkan data opd');
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchPokinById = async() => {
            try{
                const response = await fetch(`${API_URL}/pohon_kinerja_admin/detail/${id}`, {
                    headers: {
                      Authorization: `${token}`,
                      'Content-Type': 'application/json',
                    },
                });
                if(!response.ok){
                    throw new Error('terdapat kesalahan di koneksi backend');
                }
                const result = await response.json();
                const data = result.data;
                if(data.parent){
                    setParent(data.parent);
                }
                if(data.status){
                    setStatus(data.status);
                }
                if(data.kode_opd){
                    const opd = {
                        value: data.kode_opd,
                        label: data.nama_opd,
                    }
                    setKodeOpd(opd);
                }
                reset({
                    nama_pohon: data.nama_pohon || '',
                    keterangan: data.keterangan || '',
                    parent: data.parent || '',
                    pelaksana: data.pelaksana?.map((item: any) => ({
                        value: item.pegawai_id,
                        label: item.nama_pegawai,
                    })) || [],
                    indikator: data.indikators?.map((item: indikator) => ({
                        nama_indikator: item.nama_indikator,
                        targets: item.targets.map((t: target) => ({
                            target: t.target,
                            satuan: t.satuan,
                        })),
                    })),
                });
                setPelaksana(
                    data.pelaksana?.map((item: any) => ({
                        value: item.pegawai_id,
                        label: item.nama_pegawai,
                    })) || []
                );
                replace(data.indikator.map((item: indikator) => ({
                    indikator: item.nama_indikator,
                    targets: item.targets,
                })));
            } catch(err) {
                console.error(err, 'gagal mengambil data sesuai id pohon')
            }
        }
        fetchPokinById();
    },[id, reset, token, replace]);
    
    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const pelaksanaIds = Pelaksana?.map((pelaksana) => ({
            pegawai_id: pelaksana.value,
        })) || [];
        const formData = {
            //key : value
            nama_pohon : data.nama_pohon,
            Keterangan : data.keterangan,
            jenis_pohon:    level === 1 ? "Sub Tematik" :
                            level === 2 ? "Sub Sub Tematik" :
                            level === 3 ? "Super Sub Tematik" :
                            level === 4 ? "Strategic Pemda" :
                            level === 5 ? "Tactical Pemda" :
                            level === 6 ? "Operational Pemda" : "Unknown",
            level_pohon :   level,
            parent: Number(Parent),
            tahun: Tahun?.value?.toString(),
            pelaksana: pelaksanaIds,
            status: Status,
            kode_opd:  (level === 0 || level === 1 || level === 2 || level === 3) ? null : KodeOpd?.value,
            ...(data.indikator && {
                indikator: data.indikator.map((ind) => ({
                    indikator: ind.nama_indikator,
                    target: ind.targets.map((t) => ({
                        target: t.target,
                        satuan: t.satuan,
                    })),
                })),
            }),
        };
        // console.log(formData);
        try{
            const response = await fetch(`${API_URL}/pohon_kinerja_admin/update/${id}`, {
                method: "PUT",
                headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                AlertNotification("Berhasil", "Berhasil edit pohon", "success", 1000);
                const berhasil = true;
                const result = await response.json();
                const data = result.data;
                if(berhasil){
                    EditBerhasil(data);
                }
            } else {
                AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
            }
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
            console.error(err);
        }
    };

    return (
        <>
        {IsEdited && DataEdit ?
            <PohonEdited tema={DataEdit} deleteTrigger={() => setDeleted((prev) => !prev)}/>
        :
        <div className="tf-nc tf flex flex-col w-[600px] rounded-lg shadow-lg shadow-slate-500">
            <div className="flex pt-3 justify-center font-bold text-lg uppercase border my-3 py-3 border-black rounded-lg">
                {level == 1 && 
                    <h1>Edit Sub Tematik </h1>
                } 
                {level == 2 && 
                    <h1>Edit Sub Sub Tematik </h1>
                } 
                {level == 3 && 
                    <h1>Edit Super Sub Tematik </h1>
                } 
                {level == 4 && 
                    <h1>Edit Strategic </h1>
                } 
                {level == 5 && 
                    <h1>Edit Tactical </h1>
                }
                {level == 6 && 
                    <h1>Edit Operational </h1>
                }
            </div>
            <div className="flex justify-center my-3 w-full">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full'
                >
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="nama_pohon"
                        >
                            {level == 1 && 
                                "Sub Tematik"
                            } 
                            {level == 2 && 
                                "Sub Sub Tematik"
                            } 
                            {level == 3 && 
                                "Super Sub Tematik"
                            } 
                            {level == 4 && 
                                "Strategic"
                            } 
                            {level == 5 && 
                                "Tactical"
                            }
                            {level == 6 && 
                                "Operational"
                            }
                        </label>
                        <Controller
                            name="nama_pohon"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border px-4 py-2 rounded-lg"
                                    id="nama_pohon"
                                    type="text"
                                    placeholder="masukkan Pohon"
                                    value={field.value || NamaPohon}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setNamaPohon(e.target.value);
                                    }}
                                />
                            )}
                        />
                    </div>
                    {(level == 4 || level == 5 || level == 6) &&
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kode_opd"
                            >
                                Perangkat Daerah
                            </label>
                            <Controller
                                name="kode_opd"
                                control={control}
                                render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        placeholder="Masukkan Perangkat Daerah"
                                        value={KodeOpd}
                                        options={OpdOption}
                                        isLoading={isLoading}
                                        isSearchable
                                        isClearable
                                        onMenuOpen={() => {
                                            if (OpdOption.length === 0) {
                                                fetchOpd();
                                            }
                                        }}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setKodeOpd(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderRadius: '8px',
                                            textAlign: 'start',
                                            })
                                        }}
                                    />
                                </>
                                )}
                            />
                        </div>
                    }
                    {pokin === 'opd' && 
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="pelaksana"
                            >
                                Pelaksana
                            </label>
                            <Controller
                                name="pelaksana"
                                control={control}
                                render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        placeholder="Pilih Pelaksana (bisa lebih dari satu)"
                                        value={Pelaksana}
                                        options={PelaksanaOption}
                                        isLoading={isLoading}
                                        isSearchable
                                        isClearable
                                        isMulti
                                        onMenuOpen={() => {
                                            if (PelaksanaOption.length === 0) {
                                                fetchPelaksana();
                                            }
                                        }}
                                        onChange={(option) => {
                                            field.onChange(option || []);
                                            setPelaksana(option as OptionTypeString[]);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderRadius: '8px',
                                            textAlign: 'start',
                                            })
                                        }}
                                    />
                                </>
                                )}
                            />
                        </div>
                    }
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="keterangan"
                        >
                            Keterangan:
                        </label>
                        <Controller
                            name="keterangan"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="border px-4 py-2 rounded-lg"
                                    id="keterangan"
                                    placeholder="masukkan keterangan"
                                    value={field.value || Keterangan}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setKeterangan(e.target.value);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <label className="uppercase text-base font-bold text-gray-700 my-2">
                        indikator sasaran :
                    </label>
                    {fields.map((field, index) => (
                        <div key={index} className="flex flex-col my-2 py-2 px-5 border rounded-lg">
                            <Controller
                                name={`indikator.${index}.nama_indikator`}
                                control={control}
                                defaultValue={field.nama_indikator}
                                render={({ field }) => (
                                    <div className="flex flex-col py-3">
                                        <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                            Nama Indikator {index + 1} :
                                        </label>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            placeholder={`Masukkan nama indikator ${index + 1}`}
                                        />
                                    </div>
                                )}
                            />
                            {field.targets.map((_, subindex) => (
                                <>
                                <Controller
                                    name={`indikator.${index}.targets.${subindex}.target`}
                                    control={control}
                                    defaultValue={_.target}
                                    render={({ field }) => (
                                        <div className="flex flex-col py-3">
                                            <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                Target :
                                            </label>
                                            <input
                                                {...field}
                                                type="text"
                                                className="border px-4 py-2 rounded-lg"
                                                placeholder="Masukkan target"
                                            />
                                        </div>
                                    )}
                                />
                                <Controller
                                    name={`indikator.${index}.targets.${subindex}.satuan`}
                                    control={control}
                                    defaultValue={_.satuan}
                                    render={({ field }) => (
                                        <div className="flex flex-col py-3">
                                            <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                Satuan :
                                            </label>
                                            <input
                                                {...field}
                                                className="border px-4 py-2 rounded-lg"
                                                placeholder="Masukkan satuan"
                                            />
                                        </div>
                                    )}
                                />
                                </>
                            ))}
                            {index >= 0 && (
                                <ButtonRedBorder
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="w-[200px] my-3"
                                >
                                    Hapus
                                </ButtonRedBorder>
                            )}
                        </div>
                    ))}
                    <ButtonSkyBorder
                        className="mb-3 mt-2 w-full"
                        type="button"
                        onClick={() => append({ nama_indikator: "", targets: [{ target: "", satuan: "" }] })}
                    >
                        Tambah Indikator
                    </ButtonSkyBorder>
                    <ButtonSky type="submit" className="w-full my-3">
                        Simpan
                    </ButtonSky>
                    <ButtonRed className="w-full my-3" onClick={onCancel}>
                        Batal
                    </ButtonRed>
                </form>
            </div>
        </div>
        }
        </>
    );
    };
