<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

    Profile::insert([
        [
            'nama_profile' => 'admin',
            'password_profile' => Hash::make('123'),
            'level_profile' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'nama_profile' => 'user',
            'password_profile' => Hash::make('123'),
            'level_profile' => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]
    ]);

        $this->call([
        FasilitasSeeder::class,
        KamarSeeder::class,
        KamarFasilitasSeeder::class,
        ]);
    }
}
