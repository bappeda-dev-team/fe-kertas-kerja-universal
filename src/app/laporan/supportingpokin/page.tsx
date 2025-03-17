import { FiHome } from 'react-icons/fi';
import SupportingPokinContent from '@/components/pages/laporan/supportingpokin/SupportingPokinContent';

export default function SupportingPokin() {
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
                        <h1 className="font-bold text-2xl uppercase">Supporting Pokin</h1>
                    </div>
                </div>
                <SupportingPokinContent />
            </div>
        </>
    )
}