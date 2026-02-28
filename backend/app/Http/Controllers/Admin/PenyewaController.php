<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Sewa;
use App\Models\SewaDetail;
use App\Models\Kamar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenyewaController extends Controller
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
                        'sewabrpbulan' => $sewaDetail->sewa_berapa_bulan,
                        'catatan' => '-'
                    ]
                ];
            }

            else if ($item->status_kamar === 'tersedia') {
            return [
                'id' => $item->id_kamar,
                'nama' => $item->nomor_kamar,
                'status' => 'Tersedia',
                'harga' => $item->harga_kamar_perbulan,
                'penyewa' => null
            ];
            }
        });

        return response()->json($data);
    }


    public function store(Request $request)
    {
    $request->validate([
        'kamar_id' => 'required',
        'nama_profile' => 'required',
        'no_telp_profile' => 'required',
        'tglsewa_sewa' => 'required',
        'sewa_berapa_bulan' => 'required',
        'metode_pembayaran' => 'required|in:transfer,tunai',
    ]);

    DB::beginTransaction();

    try {
        // 1. PROFILE
        $profile = Profile::create([
            'nama_profile' => $request->nama_profile,
            'no_telp_profile' => $request->no_telp_profile,
            'password_profile' => bcrypt($request->password_profile ?? '123'),
        ]);

        // 2. SEWA
        $sewa = Sewa::create([
            'id_profile_sewa' => $profile->id_profile,
            'tglsewa_sewa' => $request->tglsewa_sewa,
        ]);

        // 3. SEWA DETAIL
        SewaDetail::create([
            'id_sewa_sewadetail' => $sewa->id_sewa,
            'id_kamar_sewadetail' => $request->kamar_id, // 🔥 FIX DISINI
            'sewa_berapa_bulan' => $request->sewa_berapa_bulan,
            'metode_pembayaran' => $request->metode_pembayaran,
            'cicilan' => $request->cicilan ?? 0,
            'catatan' => $request->catatan,
        ]);

        // 4. UPDATE KAMAR
        $kamar = Kamar::where('id_kamar', $request->kamar_id)->firstOrFail();
        $kamar->status_kamar = 'disewa';
        $kamar->save();

        DB::commit();

        return response()->json([
            'message' => 'Sewa berhasil dibuat',
            'profile' => $profile,
            'sewa' => $sewa
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
    }



    public function byKamar($kamar_id)
    {
        $kamar = Kamar::with(['sewaDetail.sewa.profile'])
            ->where('id_kamar', $kamar_id)
            ->first();

        if (!$kamar) {
            return response()->json([]);
        }

        $sewaDetail = $kamar->sewaDetail->first();

        if (!$sewaDetail) {
            return response()->json([]);
        }

        return response()->json([
            'nama_profile' => $sewaDetail->sewa->profile->nama_profile ?? '',
            'no_telp_profile' => $sewaDetail->sewa->profile->no_telp_profile ?? '',
            'sewa_berapa_bulan' => $sewaDetail->sewa_berapa_bulan ?? '',
            'metode_pembayaran' => $sewaDetail->metode_pembayaran ?? '',
            'catatan' => $sewaDetail->catatan ?? '',
            'total_bayar' => $sewaDetail->cicilan ?? 0,
        ]);
    }

    public function update(Request $request, $id)
{
    DB::beginTransaction();

    try {
        // ambil sewa detail berdasarkan kamar
        $sewaDetail = SewaDetail::where('id_kamar_sewadetail', $id)->firstOrFail();

        // ambil sewa
        $sewa = Sewa::where('id_sewa', $sewaDetail->id_sewa_sewadetail)->firstOrFail();

        // ambil profile
        $profile = Profile::where('id_profile', $sewa->id_profile_sewa)->firstOrFail();

        // ================= UPDATE PROFILE =================
        $profile->update([
            'nama_profile' => $request->nama_profile,
            'no_telp_profile' => $request->no_telp_profile,
        ]);

        // ================= UPDATE SEWA DETAIL =================
        $sewaDetail->update([
            'sewa_berapa_bulan' => $request->sewa_berapa_bulan,
            'metode_pembayaran' => $request->metode_pembayaran,
            'cicilan' => $request->cicilan ?? 0,
            'catatan' => $request->catatan,
        ]);

        DB::commit();

        return response()->json([
            'message' => 'Data berhasil diupdate'
        ]);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
}

}
