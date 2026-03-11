<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Survei;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function survei(Request $request)
    {
        $validated = $request->validate([
            'id_profile_survei' => 'required|exists:profile,id_profile',
            'nama_pesurvei' => 'required|string',
            'status_survei' => 'required|in:pending,finish,expired',
            'tgl_survei' => 'required|date',
            'catatan' => 'nullable|string',
        ]);

        // ✅ cek apakah user sudah pernah buat survei
        $existing = Survei::where('id_profile_survei', $validated['id_profile_survei'])->first();

        if ($existing) {
            return response()->json([
                'message' => 'Kamu sudah pernah membuat request survei.',
                'data' => $existing
            ], 409);
        }

        $survei = Survei::create($validated);

        return response()->json($survei, 201);
    }

    public function mySurvei($profileId)
    {
        $survei = Survei::where('id_profile_survei', $profileId)->first();

        return response()->json($survei);
    }
}
