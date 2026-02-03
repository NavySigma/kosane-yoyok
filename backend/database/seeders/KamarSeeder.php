<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KamarSeeder extends Seeder
{
    public function run(): void
    {
        $data = [];

        for ($i = 1; $i <= 5; $i++) {
            $data[] = [
                'nomor_kamar'     => "kamar $i",
                'harga_kamar_perbulan'     => 400000,
                'kapasitas_kamar' => 3,
                'status_kamar'    => 'tersedia',
                'foto_kamar'      => null,
                'created_at'      => now(),
                'updated_at'      => now(),
            ];
        }

        DB::table('kamar')->insert($data);
    }
}
