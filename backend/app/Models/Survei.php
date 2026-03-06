<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survei extends Model
{
    protected $fillable = [
        'id_profile_survei',
        'nama_pesurvei',
        'status_survei',
        'catatan'
    ];
}
