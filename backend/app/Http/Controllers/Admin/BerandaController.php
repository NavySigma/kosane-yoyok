<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kamar;
use App\Models\Keuangan;
use App\Models\SewaDetail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BerandaController extends Controller
{
    public function index()
    {
        try {

        $year = now()->year;
        $currentMonth = now()->month;
        $sewaAktif = collect(range(1, 12))->map(function ($bulan) use ($year, $currentMonth) {

    // Kalau bulan di masa depan → paksa 0
    if ($bulan > $currentMonth) {
        return [
            'bulan' => $bulan,
            'total' => 0
        ];
    }

    $startOfMonth = Carbon::create($year, $bulan, 1)->startOfMonth();
    $endOfMonth   = Carbon::create($year, $bulan, 1)->endOfMonth();

    $total = SewaDetail::join('sewa', 'sewa_detail.id_sewa_sewadetail', '=', 'sewa.id_sewa')
        ->whereDate('sewa.tglsewa_sewa', '<=', $endOfMonth)
        ->where(function ($query) use ($startOfMonth) {
            $query->whereDate('sewa.tglselesai_sewa', '>=', $startOfMonth)
                  ->orWhereNull('sewa.tglselesai_sewa');
        })
        ->distinct('sewa.id_sewa')
        ->count('sewa.id_sewa');

    return [
        'bulan' => $bulan,
        'total' => $total
    ];
});

    $now = Carbon::now();

    $pemasukan = SewaDetail::join('sewa', 'sewa_detail.id_sewa_sewadetail', '=', 'sewa.id_sewa')
        ->join('kamar', 'sewa_detail.id_kamar_sewadetail', '=', 'kamar.id_kamar')
        ->whereMonth('sewa.tglsewa_sewa', $now->month)
        ->whereYear('sewa.tglsewa_sewa', $now->year)
        ->sum('sewa_detail.cicilan');

    $pengeluaran = Keuangan::whereMonth('created_at', $now->month)
    ->whereYear('created_at', $now->year)
    ->sum('nominal');

            return response()->json([
                'sewa_aktif' => $sewaAktif,
                'pemasukan' => $pemasukan,
                'pengeluaran' => $pengeluaran,
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
