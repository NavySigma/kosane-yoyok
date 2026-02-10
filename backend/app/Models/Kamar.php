<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    protected $table = 'kamar';
    protected $primaryKey = 'id_kamar';

    protected $fillable = [
        'nomor_kamar',
        'harga_kamar_perbulan',
        'kapasitas_kamar',
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

}

