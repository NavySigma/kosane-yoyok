<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'nama_profile' => 'required',
            'password'     => 'required'
        ]);

        $profile = Profile::where('nama_profile', $request->nama_profile)->first();

        if (!$profile || !Hash::check($request->password, $profile->password_profile)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nama profile atau password salah'
            ], 401);
        }

        $token = $profile->createToken('auth-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'data' => [
                'id_profile'    => $profile->id_profile,
                'nama_profile'  => $profile->nama_profile,
                'level_profile' => $profile->level_profile,
                'token'         => $token
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'nama_profile'    => 'required|unique:profile,nama_profile',
            'password'        => 'required|min:3',
            'no_telp_profile' => 'required'
        ]);

        $profile = Profile::create([
            'nama_profile'     => $request->nama_profile,
            'password_profile' => Hash::make($request->password),
            'no_telp_profile'  => $request->no_telp_profile,
            'level_profile'    => 'user'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Register berhasil',
            'data' => $profile
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil'
        ]);
    }
}
