<?php
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BerandaController;
use App\Http\Controllers\Admin\KamarController;
use App\Http\Controllers\Admin\KeuanganController;
use App\Http\Controllers\Admin\PenyewaController;
use App\Http\Controllers\Admin\RiwayatController;

use App\Http\Controllers\Member\DashboardController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum','role:user'])->group(function () {

    Route::post('/survei', [DashboardController::class, 'survei']);
});

Route::middleware(['auth:sanctum','role:admin'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard', [BerandaController::class, 'index']);

    Route::get('/kamar', [KamarController::class, 'index']);
    Route::post('/kamar', [KamarController::class, 'store']);
    Route::put('/kamar/{id}', [KamarController::class, 'update']);

    Route::get('/penyewa', [PenyewaController::class, 'index']);
    Route::put('/penyewa/{id}', [PenyewaController::class, 'update']);
    Route::post('/penyewa', [PenyewaController::class, 'store']);
    Route::get('/penyewa/kamar/{kamar_id}', [PenyewaController::class, 'byKamar']);
    Route::put('/penyewa/akhiri/{id}', [PenyewaController::class, 'akhiriSewa']);

    Route::get('/keuangan', [KeuanganController::class, 'index']);
    Route::post('/keuangan', [KeuanganController::class, 'store']);
    Route::put('/keuangan/{id}', [KeuanganController::class, 'update']);

    Route::get('/riwayat', [RiwayatController::class, 'index']);
});

