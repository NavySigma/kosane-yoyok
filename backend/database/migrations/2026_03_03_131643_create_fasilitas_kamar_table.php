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
        Schema::create('fasilitas_kamar', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('kamar_id');
            $table->unsignedBigInteger('fasilitas_id');

            $table->foreign('kamar_id')
                ->references('id_kamar')
                ->on('kamar')
                ->onDelete('cascade');

            $table->foreign('fasilitas_id')
                ->references('id_fasilitas')
                ->on('fasilitas')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fasilitas_kamar');
    }
};
