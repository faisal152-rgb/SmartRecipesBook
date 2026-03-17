<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

/**
 * User Model
 * 
 * Represents a user in the application.
 * 
 * @property string $id
 * @property string $username
 * @property string $password
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class UserModel extends Model
{
    use HasUuids;

    /**
     * The table associated with the model.
     */
    protected $table = 'users';

    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the IDs are auto-incrementing.
     */
    public $incrementing = false;

    /**
     * The data type of the primary key ID.
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'username',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'id' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the validation rules for creating a user.
     */
    public static function getInsertRules(): array
    {
        return [
            'username' => 'required|string|unique:users,username|max:255',
            'password' => 'required|string|min:8',
        ];
    }

    /**
     * Get the validation rules for updating a user.
     */
    public static function getUpdateRules(): array
    {
        return [
            'username' => 'sometimes|string|unique:users,username|max:255',
            'password' => 'sometimes|string|min:8',
        ];
    }
}
