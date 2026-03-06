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
                'nomor_kamar' => "Kamar $i",
                'harga_kamar_perbulan' => 400000,
                'status_kamar' => 'tersedia',
                'foto_kamar' => "../../../public/kamar1.jpeg",
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('kamar')->insert($data);
    }
}