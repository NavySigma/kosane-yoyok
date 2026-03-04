<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('fasilitas')->insert([
        [
            'nama_fasilitas' => 'Ranjang (2m x 1.5m)',
            'tipe' => 'kamar',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'nama_fasilitas' => 'Bantal & Guling',
            'tipe' => 'kamar',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'nama_fasilitas' => 'Lemari',
            'tipe' => 'kamar',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'nama_fasilitas' => 'Wi-Fi & Listrik',
            'tipe' => 'bersama',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'nama_fasilitas' => 'Kamar Mandi Eksternal',
            'tipe' => 'bersama',
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
    }
}
