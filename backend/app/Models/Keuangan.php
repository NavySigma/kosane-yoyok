<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keuangan extends Model
{
    protected $table = 'keuangan';
    protected $primaryKey = 'id_keuangan';
    protected $fillable = [
        'id_keuangan',
        'keterangan',
        'nominal',
    ];
}
