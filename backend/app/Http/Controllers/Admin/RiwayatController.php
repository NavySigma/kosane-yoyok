<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SewaDetail;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RiwayatController extends Controller
{
    public function index()
    {
        $hariIni = Carbon::now();

        $data = SewaDetail::with([
                'kamar',
                'sewa.profile'
            ])
            ->get()
            ->map(function ($item) use ($hariIni) {

                $tanggal = Carbon::parse($item->created_at);

                // DEFAULT
                $status = 'Check-In';
                $kategori = 'pemilik';
                $keterangan = 'Sewa bulanan baru';

                // CHECK-OUT
                if ($item->status_pembayaran === 'selesai') {
                    $status = 'Check-Out';
                    $keterangan = 'Masa sewa berakhir';
                }

                // BOOKING (≤ 2 hari)
                if ($item->status_pembayaran === 'booking') {
                    if ($tanggal->diffInDays($hariIni) > 2) {
                        return null; // buang booking lama
                    }

                    $status = 'Booking';
                    $kategori = 'booking';
                    $keterangan = 'Reservasi sementara';
                }

                return [
                    'id' => $item->id_sewadetail,
                    'tanggal' => $tanggal->toDateString(),
                    'kamar' => $item->kamar
                        ? 'Kamar-' . str_replace('kamar ', '', strtolower($item->kamar->nomor_kamar))
                        : '-',
                    'penyewa' => $item->sewa->profile->nama_profile ?? '-',
                    'status' => $status,
                    'kategori' => $kategori,
                    'keterangan' => $keterangan
                ];
            })
            ->filter() // hapus null
            ->values();

        return response()->json($data);
    }
}
