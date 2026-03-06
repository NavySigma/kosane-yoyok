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
            'catatan' => 'nullable|string',
        ]);

        $survei = Survei::create($validated);
        return response()->json($survei, 201);
    }
}
