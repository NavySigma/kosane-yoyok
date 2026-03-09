<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SewaDetail;
use App\Models\Survei;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RiwayatController extends Controller
{
    public function index()
    {
        $hariIni = Carbon::now();

        // 1. AMBIL DATA DARI TABEL SEWA_DETAIL (PENGHUNI AKTIF, BOOKING, & PENGHUNI LAMA)
        $dataSewa = SewaDetail::with(['kamar', 'sewa.profile'])
            ->get()
            ->map(function ($item) use ($hariIni) {
                $tanggal = Carbon::parse($item->created_at);
                $namaPenyewa = $item->sewa->profile->nama_profile ?? '-';
                $nomorKamar = $item->kamar 
                    ? 'Kamar-' . str_replace('kamar ', '', strtolower($item->kamar->nomor_kamar)) 
                    : '-';

                // Logika: Penghuni Lama (Berdasarkan status_pembayaran 'selesai')
                if ($item->status_pembayaran === 'lunas') {
                    return [
                        'id' => 'OLD-' . $item->id_sewadetail,
                        'tanggal' => $item->updated_at->toDateString(),
                        'kamar' => $nomorKamar,
                        'penyewa' => $namaPenyewa,
                        'status' => 'Selesai',
                        'kategori' => 'lama',
                        'keterangan' => 'Masa sewa berakhir / Check-out'
                    ];
                }

                // Logika: Booking (Reservasi sementara maks 2 hari)
                if ($item->status_pembayaran === 'booking') {
                    // Jika booking lebih dari 2 hari, data dianggap kedaluwarsa (tidak ditampilkan)
                    if ($tanggal->diffInDays($hariIni) > 2) {
                        return null;
                    }

                    return [
                        'id' => 'BKG-' . $item->id_sewadetail,
                        'tanggal' => $tanggal->toDateString(),
                        'kamar' => $nomorKamar,
                        'penyewa' => $namaPenyewa,
                        'status' => 'Booking',
                        'kategori' => 'booking',
                        'keterangan' => 'Reservasi sementara (Maks. 2 hari)'
                    ];
                }

                // Logika: Penghuni Aktif (Default: Check-In)
                return [
                    'id' => 'ACT-' . $item->id_sewadetail,
                    'tanggal' => $tanggal->toDateString(),
                    'kamar' => $nomorKamar,
                    'penyewa' => $namaPenyewa,
                    'status' => 'Check-In',
                    'kategori' => 'pemilik',
                    'keterangan' => 'Penghuni aktif saat ini'
                ];
            });

        // 2. AMBIL DATA DARI TABEL SURVEI
        $dataSurvei = Survei::all()->map(function ($item) {
            return [
                'id' => 'SRV-' . $item->id_survei,
                'tanggal' => $item->tgl_survei,
                'penyewa' => $item->nama_pesurvei ?? '-',
                'status' => ucfirst($item->status_survei ?? 'Pending'),
                'kategori' => 'survei',
                'keterangan' => $item->catatan
            ];
        });

        // 3. GABUNGKAN SEMUA DATA DAN BERSIHKAN NILAI NULL
        $koleksiRiwayat = $dataSewa->concat($dataSurvei)
            ->filter() // Menghapus data booking yang null (kedaluwarsa)
            ->values()
            ->sortByDesc('tanggal'); // Urutkan berdasarkan tanggal terbaru

        return response()->json($koleksiRiwayat);
    }
}