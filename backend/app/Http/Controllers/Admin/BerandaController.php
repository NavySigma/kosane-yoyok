<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kamar;
use App\Models\Pengeluaran;
use App\Models\SewaDetail;
use Illuminate\Support\Facades\DB;

class BerandaController extends Controller
{
    public function index()
    {
        try {
            // 📈 SEWA AKTIF (LINE CHART)
            $sewaAktif = SewaDetail::join(
                    'kamar',
                    'sewa_detail.id_kamar_sewadetail',
                    '=',
                    'kamar.id_kamar'
                )
                ->where('kamar.status_kamar', 'disewa')
                ->whereYear('sewa_detail.created_at', now()->year)
                ->selectRaw('MONTH(sewa_detail.created_at) as bulan, COUNT(*) as total')
                ->groupByRaw('MONTH(sewa_detail.created_at)')
                ->orderByRaw('MONTH(sewa_detail.created_at)')
                ->get()
                ->map(function ($item) {
                    return [
                        'bulan' => date('M', mktime(0, 0, 0, $item->bulan, 1)),
                        'total' => $item->total
                    ];
                });

            // 💰 PEMASUKAN
            $pemasukan = SewaDetail::join('sewa', 'sewa_detail.id_sewa_sewadetail', '=', 'sewa.id_sewa')
    ->join('kamar', 'sewa_detail.id_kamar_sewadetail', '=', 'kamar.id_kamar')
    ->where('sewa_detail.status_pembayaran', 'lunas')
    ->select(DB::raw('SUM(sewa_detail.sewa_berapa_bulan * kamar.harga_kamar_perbulan) as total'))
    ->value('total') ?? 0;

            return response()->json([
                'sewa_aktif' => $sewaAktif,
                'pemasukan' => $pemasukan,
                'pengeluaran' => Pengeluaran::sum('nominal'),
                'kamar_tersedia' => Kamar::where('status_kamar', 'tersedia')->count()
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
