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
        Schema::create('sewa', function (Blueprint $table) {
            $table->bigIncrements('id_sewa');
            $table->unsignedBigInteger('id_profile_sewa');
            $table->date('tglsewa_sewa');
            $table->timestamps();

            $table->foreign('id_profile_sewa')
                ->references('id_profile')
                ->on('profile')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sewa');
    }
};
