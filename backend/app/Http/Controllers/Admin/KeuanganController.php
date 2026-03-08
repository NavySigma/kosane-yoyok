<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Keuangan;
use Illuminate\Http\Request;

class KeuanganController extends Controller
{
    public function index()
    {
        $data = Keuangan::orderBy('created_at', 'desc')->get();
        return response()->json($data);
    }

    // ================== SIMPAN DATA ==================
    public function store(Request $request)
    {
        $request->validate([
            'keterangan' => 'required',
            'nominal' => 'required|numeric'
        ]);

        $data = Keuangan::create([
            'keterangan' => $request->keterangan,
            'nominal' => $request->nominal
        ]);

        return response()->json([
            'message' => 'Pengeluaran berhasil ditambahkan',
            'data' => $data
        ]);
    }

    // ================== UPDATE ==================
    public function update(Request $request, $id)
    {
        $data = Keuangan::findOrFail($id);

        $data->update([
            'keterangan' => $request->keterangan,
            'nominal' => $request->nominal
        ]);

        return response()->json([
            'message' => 'Data berhasil diupdate'
        ]);
    }
}
