<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Survei;
use App\Models\Profile;

class SurveiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_survei()
    {
        $profile = Profile::factory()->create();

        $payload = [
            'id_profile_survei' => $profile->id_profile,
            'nama_pesurvei' => 'John Doe',
            'status_survei' => 'pending',
            'catatan' => 'Catatan survei',
        ];

        $response = $this->postJson('/api/survei', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment([
                'id_profile_survei' => $profile->id_profile,
                'nama_pesurvei' => 'John Doe',
                'status_survei' => 'pending',
                'catatan' => 'Catatan survei',
            ]);

        $this->assertDatabaseHas('survei', $payload);
    }
}
