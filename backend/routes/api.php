<?php
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BerandaController;
use App\Http\Controllers\Admin\KamarController;
use App\Http\Controllers\Admin\RiwayatController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/dashboard', [BerandaController::class, 'index']);

Route::get('/kamar', [KamarController::class, 'index']);
Route::get('/kamar/{id}/informasi', [KamarController::class, 'informasi']);
Route::post('/kamar/{id}/sewa', [KamarController::class, 'sewa']);
Route::post('/kamar/{id}/akhiri', [KamarController::class, 'akhiri']);

Route::get('/riwayat', [RiwayatController::class, 'index']);
