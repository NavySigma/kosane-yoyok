<?php
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BerandaController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/dashboard', [BerandaController::class, 'index']);

