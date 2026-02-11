<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('survei', function (Blueprint $table) {
            $table->bigIncrements('id_survei');

            $table->unsignedBigInteger('id_profile_survei');
            $table->foreign('id_profile_survei')
                ->references('id_profile')
                ->on('profile')
                ->onDelete('cascade');

            $table->string('nama_pesurvei');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survei');
    }
};
