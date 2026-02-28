<?php
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BerandaController;
use App\Http\Controllers\Admin\KamarController;
use App\Http\Controllers\Admin\PenyewaController;
use App\Http\Controllers\Admin\RiwayatController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/dashboard', [BerandaController::class, 'index']);

Route::get('/kamar', [KamarController::class, 'index']);

Route::get('/penyewa', [PenyewaController::class, 'index']);
Route::put('/penyewa/{id}', [PenyewaController::class, 'update']);
Route::post('/penyewa', [PenyewaController::class, 'store']);
Route::get('/penyewa/kamar/{kamar_id}', [PenyewaController::class, 'byKamar']);

Route::get('/riwayat', [RiwayatController::class, 'index']);
