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
        Schema::create('cicilan', function (Blueprint $table) {
            $table->id("id_cicilan");
            $table->unsignedBigInteger('sewadetail_id');
            $table->integer('cicilan_ke');
            $table->integer('nominal_cicilan');
            $table->date('tgl_cicilan');
            $table->timestamps();

            $table->foreign('sewadetail_id')
                ->references('id_sewadetail')
                ->on('sewa_detail')
                ->onDelete('cascade');
                });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cicilan');
    }
};
