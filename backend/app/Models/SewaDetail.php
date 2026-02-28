<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SewaDetail extends Model
{
    protected $table = 'sewa_detail';
    protected $primaryKey = 'id_sewadetail';

    protected $fillable = [
        'id_sewa_sewadetail',
        'id_kamar_sewadetail',
        'status_pembayaran',
        'metode_pembayaran',
        'sewa_berapa_bulan',
        'cicilan',
        'catatan'
    ];

    public function sewa()
    {
        return $this->belongsTo(Sewa::class, 'id_sewa_sewadetail');
    }

    public function kamar()
    {
        return $this->belongsTo(Kamar::class, 'id_kamar_sewadetail');
    }
}

