<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profile';
    protected $primaryKey = 'id_profile';

    protected $fillable = [
        'nama_profile',
        'password_profile',
        'no_telp_profile',
        'level_profile'
    ];

    protected $hidden = ['password_profile'];

    public function sewa()
    {
        return $this->hasMany(Sewa::class, 'id_profile_sewa');
    }
}

