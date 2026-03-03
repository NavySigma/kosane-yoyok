<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sewa extends Model
{
    protected $table = 'sewa';
    protected $primaryKey = 'id_sewa';

    protected $fillable = [
        'id_profile_sewa',
        'tglsewa_sewa',
        'is_active'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class, 'id_profile_sewa');
    }

    public function detail()
    {
        return $this->hasMany(SewaDetail::class, 'id_sewa_sewadetail');
    }
}

