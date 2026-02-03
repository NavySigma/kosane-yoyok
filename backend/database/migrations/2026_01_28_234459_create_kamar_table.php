<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kamar', function (Blueprint $table) {
            $table->bigIncrements('id_kamar');
            $table->string('nomor_kamar');
            $table->integer('harga_kamar_perbulan');
            $table->integer('kapasitas_kamar');
            $table->enum('status_kamar', ['tersedia', 'disewa']);
            $table->string('foto_kamar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kamar');
    }
};
