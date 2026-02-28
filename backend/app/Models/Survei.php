<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survei extends Model
{
    protected $fillable = [
        'nama_pesurvei',
        'status_survei',
        'catatan'
    ];
}
