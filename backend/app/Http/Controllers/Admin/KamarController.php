<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kamar;
use Illuminate\Http\Request;

class KamarController extends Controller
{
    public function index()
    {
        $kamar = Kamar::with(['sewaDetail.sewa.profile'])->get();

        $data = $kamar->map(function ($item) {

            $sewaDetail = $item->sewaDetail->first();

            if ($item->status_kamar === 'disewa' && $sewaDetail) {
                return [
                    'id' => $item->id_kamar,
                    'nama' => $item->nomor_kamar,
                    'status' => 'Disewa',
                    'harga' => $item->harga_kamar_perbulan,
                    'penyewa' => [
                        'nama' => $sewaDetail->sewa->profile->nama_profile ?? '-',
                        'telp' => $sewaDetail->sewa->profile->no_telp_profile ?? '-',
                        'jumlah' => $sewaDetail->sewa_berapa_bulan,
                        'catatan' => '-'
                    ]
                ];
            }

            return [
                'id' => $item->id_kamar,
                'nama' => $item->nomor_kamar,
                'status' => 'Tersedia',
                'harga' => $item->harga_kamar_perbulan,
                'penyewa' => null
            ];
        });

        return response()->json($data);
    }
}
