'use client'

import { FiHome } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getOpdTahun } from '@/components/lib/Cookie';
import Maintenance from '@/components/global/Maintenance';

export default function SupportingPokin() {
    const [Tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);

    useEffect(() => {
        const data = getOpdTahun();
        if (data) {
            if (data.tahun) {
                const tahun_value = {
                    value: data.tahun.value,
                    label: data.tahun.label,
                }
                setTahun(tahun_value);
            }
            if (data.opd) {
                const opd_value = {
                    value: data.opd.value,
                    label: data.opd.label,
                }
                setSelectedOpd(opd_value);
            }
        }
    }, [])

    return (
        <>
            {/* TODO: Breadcrumb component */}
            <div className="flex items-center breadcrumb">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Laporan</p>
                <p>/ Supporting Pokin</p>
            </div>
            {/* CARD HEADER */}
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex flex-wrap items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-2xl uppercase">Supporting Pokin {Tahun?.label}</h1>
                    </div>
                </div>
            </div>
            <Maintenance />
        </>
    )
}