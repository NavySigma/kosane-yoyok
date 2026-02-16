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
       Schema::create('sewa_detail', function (Blueprint $table) {
            $table->bigIncrements('id_sewadetail');
            $table->unsignedBigInteger('id_sewa_sewadetail');
            $table->unsignedBigInteger('id_kamar_sewadetail');
            $table->enum('status_pembayaran', ['pending', 'lunas'])->default('pending');
            $table->enum('metode_pembayaran', ['tunai', 'transfer']);
            $table->integer('sewa_berapa_bulan');
            $table->timestamps();

            $table->foreign('id_sewa_sewadetail')
                ->references('id_sewa')
                ->on('sewa')
                ->onDelete('cascade');

            $table->foreign('id_kamar_sewadetail')
                ->references('id_kamar')
                ->on('kamar')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sewa_detail');
    }
};
