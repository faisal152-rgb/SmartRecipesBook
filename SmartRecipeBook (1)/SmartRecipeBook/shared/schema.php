<?php

/**
 * Laravel Schema Definition
 * 
 * This file contains the schema definitions for the SmartRecipeBook application.
 * It defines the structure of database tables and their relationships.
 */

namespace App\Schemas;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Users Table Schema
 * 
 * Defines the structure for the users table with the following columns:
 * - id: UUID primary key (auto-generated)
 * - username: Unique text field for user identification
 * - password: Text field for storing hashed passwords
 * - timestamps: Created and updated timestamps
 */
class UsersSchema
{
    /**
     * Create the users table
     */
    public static function create(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('username')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Drop the users table
     */
    public static function drop(): void
    {
        Schema::dropIfExists('users');
    }
}

/**
 * User Model
 * 
 * Represents a user in the application with validation rules
 */
class User
{
    /**
     * Validation rules for creating a new user
     */
    public static function getInsertRules(): array
    {
        return [
            'username' => 'required|string|unique:users,username|max:255',
            'password' => 'required|string|min:8',
        ];
    }

    /**
     * Validation rules for updating a user
     */
    public static function getUpdateRules(): array
    {
        return [
            'username' => 'sometimes|string|unique:users,username|max:255',
            'password' => 'sometimes|string|min:8',
        ];
    }

    /**
     * Get the fillable attributes for mass assignment
     */
    public static function getFillable(): array
    {
        return [
            'username',
            'password',
        ];
    }

    /**
     * Get the hidden attributes for serialization
     */
    public static function getHidden(): array
    {
        return [
            'password',
        ];
    }

    /**
     * Get the casts for attributes
     */
    public static function getCasts(): array
    {
        return [
            'id' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}

/**
 * Insert User DTO (Data Transfer Object)
 * 
 * Represents the data structure for inserting a new user
 */
class InsertUserDTO
{
    public string $username;
    public string $password;

    public function __construct(string $username, string $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * Convert DTO to array
     */
    public function toArray(): array
    {
        return [
            'username' => $this->username,
            'password' => $this->password,
        ];
    }

    /**
     * Create DTO from array
     */
    public static function fromArray(array $data): self
    {
        return new self(
            $data['username'] ?? '',
            $data['password'] ?? ''
        );
    }
}
