<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cicilan extends Model
{
    protected $table = 'cicilan';
    protected $primaryKey = 'id_cicilan';
    protected $fillable = [
        'sewadetail_id',
        'cicilan_ke',
        'nominal_cicilan',
        'tgl_cicilan',
    ];

    public function sewaDetail()
    {
        return $this->belongsTo(SewaDetail::class, 'sewadetail_id');
    }
}
