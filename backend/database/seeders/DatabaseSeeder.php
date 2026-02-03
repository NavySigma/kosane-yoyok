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
        // User::factory(10)->create();

        Profile::create([
            'nama_profile' => 'admin',
            'password_profile' => Hash::make('123'),
            'level_profile' => 'admin',
        ]);

        $this->call([
        KamarSeeder::class,
        ]);
    }
}
