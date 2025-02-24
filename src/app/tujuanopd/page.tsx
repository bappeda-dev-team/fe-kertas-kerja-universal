'use client'

import { FiHome } from "react-icons/fi";
import Table from "@/components/pages/tujuanopd/Table";
import { getToken } from "@/components/lib/Cookie";
import { useState } from "react";
import Select from 'react-select';

interface Periode {
    value: number;
    label: string;
    id: number;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
    tahun_list: string[];
}

const TujuanOpd = () => {

    const token = getToken();
    const [Periode, setPeriode] = useState<Periode | null>(null);
    const [PeriodeOption, setPeriodeOption] = useState<Periode[]>([]);

    const fetchPeriode = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/periode/findall`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            const hasil = result.data;
            const data = hasil.map((item: any) => ({
                value: item.id,
                label: `${item.tahun_awal} - ${item.tahun_akhir} (${item.jenis_periode})`,
                tahun_awal: item.tahun_awal,
                tahun_akhir: item.tahun_akhir,
                jenis_periode: item.jenis_periode,
                tahun_list: item.tahun_list,
            }));
            setPeriodeOption(data);
        } catch (err) {
            console.error("error fetch periode", err);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan OPD</p>
                <p className="mr-1">/ Tujuan OPD</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-wrap items-end">
                        <h1 className="uppercase font-bold">Tujuan OPD</h1>
                        <h1 className="uppercase font-bold ml-1">(Periode {Periode?.tahun_awal} - {Periode?.tahun_akhir})</h1>
                    </div>
                    <Select
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                borderRadius: '8px',
                                minWidth: '200.562px',
                                minHeight: '38px'
                            })
                        }}
                        onChange={(option) => {
                            setPeriode(option);
                        }}
                        options={PeriodeOption}
                        isClearable
                        placeholder="Pilih Periode ..."
                        value={Periode}
                        isSearchable
                        onMenuOpen={() => {
                            fetchPeriode();
                        }}
                    />
                </div>
                {Periode ?
                    <Table
                        id_periode={Periode?.id}
                        tahun_awal={Periode?.tahun_awal ? Periode?.tahun_awal : ""}
                        tahun_akhir={Periode?.tahun_akhir ? Periode?.tahun_akhir : ""}
                        jenis={Periode?.jenis_periode ? Periode?.jenis_periode : ""}
                        tahun_list={Periode?.tahun_list ? Periode?.tahun_list : []}
                    />
                    :
                    <div className="m-5">
                        <h1>Pilih Periode terlebih dahulu</h1>
                    </div>
                }
                </div>
        </>
    )
}

export default TujuanOpd;