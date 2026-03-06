<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    protected $table = 'kamar';
    protected $primaryKey = 'id_kamar';

    protected $fillable = [
        'id_fasilitas_kamar',
        'nomor_kamar',
        'harga_kamar_perbulan',
        'status_kamar',
        'foto_kamar'
    ];

    public function sewaDetail()
    {
        return $this->hasMany(
            SewaDetail::class,
            'id_kamar_sewadetail', // foreign key di sewa_detail
            'id_kamar'             // primary key di kamar
        );
    }

    public function fasilitas()
    {
        return $this->belongsToMany(
            Fasilitas::class,
            'fasilitas_kamar', // pivot
            'kamar_id',        // FK di pivot
            'fasilitas_id',    // FK di pivot
            'id_kamar',        // PK kamar
            'id_fasilitas'     // PK fasilitas
        );
    }

}

