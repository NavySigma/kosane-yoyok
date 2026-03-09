<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use App\Models\Kamar;
use Illuminate\Http\Request;

class KamarController extends Controller
{
    public function index()
    {
        $kamar = Kamar::with('fasilitas:id_fasilitas,nama_fasilitas,tipe')
            ->select(
                'id_kamar',
                'nomor_kamar',
                'harga_kamar_perbulan',
                'status_kamar',
                'foto_kamar'
            )
            ->get();

        return response()->json([
            'data' => $kamar
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_kamar' => 'required',
            'harga_kamar_perbulan' => 'required|numeric',
        ]);

        $kamar = Kamar::create([
            'nomor_kamar' => $request->nomor_kamar,
            'harga_kamar_perbulan' => $request->harga_kamar_perbulan,
            'status_kamar' => 'tersedia',
            'foto_kamar' => '../../../public/kamar1.jpeg'
        ]);
        $fasilitasIds = [];

        foreach ($request->fasilitas_kamar ?? [] as $nama) {
            $fasilitas = Fasilitas::firstOrCreate([
                'nama_fasilitas' => $nama,
                'tipe' => 'kamar'
            ]);

            $fasilitasIds[] = $fasilitas->id_fasilitas;
        }

        foreach ($request->fasilitas_bersama ?? [] as $nama) {
            $fasilitas = Fasilitas::firstOrCreate([
                'nama_fasilitas' => $nama,
                'tipe' => 'bersama'
            ]);

            $fasilitasIds[] = $fasilitas->id_fasilitas;
        }
        $kamar->fasilitas()->attach($fasilitasIds);
 
        return response()->json([
            'data' => $kamar->load('fasilitas')
        ], 201);
    }


    public function update(Request $request, $id)
    {
        $kamar = Kamar::findOrFail($id);

        // Update harga
        $kamar->harga_kamar_perbulan = $request->harga_kamar_perbulan;
        $kamar->save();

        $fasilitasIds = [];

        // FASILITAS KAMAR
        if ($request->fasilitas_kamar) {
            foreach ($request->fasilitas_kamar as $nama) {
                $fasilitas = Fasilitas::firstOrCreate([
                    'nama_fasilitas' => $nama,
                    'tipe' => 'kamar'
                ]);

                $fasilitasIds[] = $fasilitas->id_fasilitas;
            }
        }

        // FASILITAS BERSAMA
        if ($request->fasilitas_bersama) {
            foreach ($request->fasilitas_bersama as $nama) {
                $fasilitas = Fasilitas::firstOrCreate([
                    'nama_fasilitas' => $nama,
                    'tipe' => 'bersama'
                ]);

                $fasilitasIds[] = $fasilitas->id_fasilitas;
            }
        }

        // Sync pivot (hapus yang lama, isi yang baru)
        $kamar->fasilitas()->sync($fasilitasIds);

        return response()->json([
            'message' => 'Kamar berhasil diupdate',
            'data' => $kamar->load('fasilitas')
        ]);
    }
}
