<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KamarFasilitasSeeder extends Seeder
{
    public function run(): void
    {
        $data = [];

        // semua kamar
        $kamarIds = DB::table('kamar')->pluck('id_kamar');

        // semua fasilitas
        $fasilitasIds = DB::table('fasilitas')->pluck('id_fasilitas');

        foreach ($kamarIds as $kamarId) {
            foreach ($fasilitasIds as $fasilitasId) {
                $data[] = [
                    'kamar_id' => $kamarId,
                    'fasilitas_id' => $fasilitasId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('fasilitas_kamar')->insert($data);
    }
}