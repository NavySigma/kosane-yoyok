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
        // Validasi input
        $request->validate([
            'nama_profile' => 'required',
            'password'     => 'required'
        ]);

        // Cari akun admin
        $profile = Profile::where(
            'nama_profile',
            $request->nama_profile
        )->first();

        // Cek username & password
        if (
            !$profile ||
            !Hash::check($request->password, $profile->password_profile)
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nama profile atau password salah'
            ], 401);
        }

        // Login sukses
        $token = $profile->createToken('admin-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'data' => [
                'id_profile' => $profile->id_profile,
                'nama_profile' => $profile->nama_profile,
                'token' => $token
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'nama_profile'     => 'required|unique:profile,nama_profile',
            'password'         => 'required|min:3',
            'no_telp_profile'  => 'required'
        ]);

        $profile = Profile::create([
            'nama_profile'     => $request->nama_profile,
            'password_profile' => Hash::make($request->password),
            'no_telp_profile'  => $request->no_telp_profile
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
