'use client'

import '@/components/pages/Pohon/treeflex.css'
import { getOpdTahun } from '@/components/lib/Cookie';
import { useState, useEffect } from 'react';
import { TbCircleCheckFilled, TbCircleLetterXFilled, TbCirclePlus } from 'react-icons/tb';
import { ButtonGreenBorder, ButtonSkyBorder, ButtonRedBorder } from '@/components/global/Button';
import { LoadingBeat } from '@/components/global/Loading';
import { OpdTahunNull, TahunNull } from '@/components/global/OpdTahunNull';
import { PohonOpd } from '@/components/lib/Pohon/Opd/PohonOpd';
import { FormPohonOpd } from '@/components/lib/Pohon/Opd/FormPohonOpd';
import { getUser, getToken } from '@/components/lib/Cookie';
import Select from 'react-select';

interface OptionType {
    value: number;
    label: string;
}
interface opd {
    kode_opd: string;
    nama_opd: string;
}
interface pokin {
    kode_opd: string;
    nama_opd: string;
    tahun: string;
    childs: childs[]
}
interface childs {
    id: number;
    parent: number;
    strategi: string;
    taget: string;
    satuan: string;
    keterangan: string;
    indikators: string; 
    childs: childs[];
}

const PokinOpd = () => {

    const [User, setUser] = useState<any>(null);
    const [Tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [Pokin, setPokin] = useState<pokin | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const [IsLoading, setIsLoading] = useState<boolean | null>(null);
    const [OptionPokinPemda, setOptionPokinPemda] = useState<OptionType[]>([]);
    const [PokinPemda, setPokinPemda] = useState<OptionType | null>(null);
    const [error, setError] = useState<string>('');
    const token = getToken();

    const [formList, setFormList] = useState<number[]>([]); // List of form IDs
    const [NewStrategic, setNewStrategic] = useState<boolean>(false);
    const [Deleted, setDeleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = getUser();
        if(fetchUser){
            setUser(fetchUser.user);
        }
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

    const fetchPohonPemda = async() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setIsLoading(true);
      try{
        const url = User?.roles == 'super_admin' ? `pohon_kinerja/status/${SelectedOpd?.value}/${Tahun?.value}` : `pohon_kinerja/status/${User?.kode_opd}/${Tahun?.value}`;
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
        const pokinPemda = data.data.map((item: any) => ({
          value : item.id,
          label : item.nama_pohon,
        }));
        setOptionPokinPemda(pokinPemda);
      } catch (err){
        console.log('gagal mendapatkan data pohon dari opd', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Adds a new form entry
    const newChild = () => {
        setFormList([...formList, Date.now()]); // Using unique IDs
    };

    useEffect(() => {
        const fetchPokinOpd = async(url: string) => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            setLoading(true);
            try{
                const response = await fetch(`${API_URL}/${url}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                      },
                });
                if(!response.ok){
                    throw new Error('terdapat kesalahan di koneksi backend');
                }
                const result = await response.json();
                const data = result.data || [];
                setPokin(data);
            } catch(err) {
                setError('gagal mendapatkan data, terdapat kesalahan backend/server saat mengambil data pohon kinerja perangkat daerah');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if(User?.roles == 'super_admin'){
            if(SelectedOpd?.value != undefined && Tahun?.value != undefined){
                fetchPokinOpd(`pohon_kinerja_opd/findall/${SelectedOpd?.value}/${Tahun?.value}`);
            }
        } else if(User?.roles != 'super_admin'){
            if(User?.kode_opd != undefined && Tahun?.value != undefined){
                fetchPokinOpd(`pohon_kinerja_opd/findall/${User?.kode_opd}/${Tahun?.value}`);
            }
        }
    },[User, SelectedOpd, Tahun, Deleted, token]);
    
    if(Loading){
        return(
            <>
                <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
                    <h1>Pohon Kinerja {SelectedOpd?.label}</h1>
                </div>
                <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                    <LoadingBeat />
                </div>
            </>
        )
    }
    if(error){
        return(
            <>
                <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
                    <h1>Pohon Kinerja</h1>
                </div>
                <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                    {error}
                </div>
            </>
        )
    }
    if(User?.roles == 'super_admin'){
        if(SelectedOpd?.value == undefined || Tahun?.value == undefined){
            return(
                <>
                    <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
                        <h1>Pohon Kinerja {SelectedOpd?.label}</h1>
                    </div>
                    <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                        <OpdTahunNull />
                    </div>
                </>
            )
        }
    } 
    if(User?.roles != 'super_admin'){
        if(Tahun?.value == undefined){
            return(
                <>
                    <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
                        <h1>Pohon Kinerja {SelectedOpd?.label}</h1>
                    </div>
                    <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                        <TahunNull />
                    </div>
                </>
            )
        }
    }

    return(
        <>
            <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
                {User?.roles == 'super_admin' ? 
                    <h1 className="font-bold">Pohon Kinerja {SelectedOpd?.label}</h1>
                :
                User?.roles == 'admin_opd' ?
                    <h1 className="font-bold">Pohon Kinerja {Pokin?.nama_opd}</h1>
                :
                    <h1 className="font-bold">Pohon Cascading {Pokin?.nama_opd}</h1>
                }
            </div>
            <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                <div className="w-full">
                    <div className="border-t-2 border-x-2 max-w-[400px] min-w-[300px] px-3 py-2 rounded-t-xl ">
                        <h1 className="text-center font-semibold">
                            Pohon Dari Pemda
                        </h1>
                    </div>
                    <div className="border-2 max-w-[400px] min-w-[300px] px-3 py-2 rounded-b-xl">
                        <div className="mb-1">
                            <label htmlFor="" className='uppercase text-xs font-bold text-gray-700 my-2 ml-1'>
                                pohon pemda
                            </label>
                            <Select
                                placeholder="Masukkan Perangkat Daerah"
                                value={PokinPemda}
                                options={OptionPokinPemda}
                                isSearchable
                                isClearable
                                onMenuOpen={() => {
                                    if (OptionPokinPemda.length === 0) {
                                        fetchPohonPemda();
                                    }
                                }}
                                styles={{
                                    control: (baseStyles) => ({
                                    ...baseStyles,
                                    borderRadius: '8px',
                                    textAlign: 'start',
                                    })
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className='uppercase text-xs font-bold text-gray-700 my-2 ml-1'>
                                Strategic
                            </label>
                            <Select
                                placeholder="Pilih Strategic"
                                isSearchable
                                isClearable
                                styles={{
                                    control: (baseStyles) => ({
                                    ...baseStyles,
                                    borderRadius: '8px',
                                    textAlign: 'start',
                                    })
                                }}
                            />
                        </div>
                        <div className="flex justify-between my-2">
                            <ButtonRedBorder className='w-full mx-2'>
                                <TbCircleLetterXFilled className='mr-1'/>
                                Tolak
                            </ButtonRedBorder>
                            <ButtonSkyBorder className='w-full mx-2'>
                                <TbCircleCheckFilled className='mr-1'/>
                                Terima
                            </ButtonSkyBorder>
                        </div>
                    </div>
                </div>
                <div className="tf-tree text-center mt-3">
                    <ul>
                        <li>
                            <div className="tf-nc tf flex flex-col w-[600px] rounded-lg">
                                <div className="header flex pt-3 justify-center font-bold text-lg uppercase border my-3 py-3 border-black">
                                {(User?.roles == 'super_admin' || User?.roles == 'admin_opd') ?
                                    <h1>Pohon Kinerja OPD</h1>
                                    :
                                    <h1>Pohon Cascading OPD</h1>
                                }
                                </div>
                                <div className="body flex justify-center my-3">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="min-w-[100px] border px-2 py-3 border-black text-start">Perangkat Daerah</td>
                                                <td className="min-w-[300px] border px-2 py-3 border-black text-start">{Pokin?.nama_opd}</td>
                                            </tr>
                                            <tr>
                                                <td className="min-w-[100px] border px-2 py-3 border-black text-start">Kode OPD</td>
                                                <td className="min-w-[300px] border px-2 py-3 border-black text-start">{Pokin?.kode_opd}</td>
                                            </tr>
                                            <tr>
                                                <td className="min-w-[100px] border px-2 py-3 border-black text-start">Tahun</td>
                                                <td className="min-w-[300px] border px-2 py-3 border-black text-start">{Pokin?.tahun}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* button */}
                                {(User?.roles == 'admin_opd'|| User?.roles == 'super_admin') &&
                                    <div className="flex justify-center border my-3 py-3 border-black">
                                        <ButtonGreenBorder onClick={newChild}>
                                            <TbCirclePlus />
                                            Strategic
                                        </ButtonGreenBorder>
                                    </div>
                                }
                            </div>
                            {Pokin?.childs ? (
                            <ul>
                                {Pokin.childs.map((data: any) => (
                                    <li key={data.id}>
                                        <PohonOpd tema={data} deleteTrigger={() => setDeleted((prev) => !prev)}/>
                                    </li>
                                ))}
                                {formList.map((formId) => (
                                    <FormPohonOpd
                                        level={3}
                                        id={null}
                                        key={formId}
                                        formId={formId}
                                        pokin={'opd'}
                                        onCancel={() => setFormList(formList.filter((id) => id !== formId))}
                                    />
                                ))}
                            </ul>
                            ) : (
                                <ul>
                                    {formList.map((formId) => (
                                        <FormPohonOpd
                                            level={3}
                                            id={null}
                                            key={formId}
                                            formId={formId}
                                            pokin={'opd'}
                                            onCancel={() => setFormList(formList.filter((id) => id !== formId))}
                                        />
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PokinOpd;