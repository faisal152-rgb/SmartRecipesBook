<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recipe;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_recipes' => Recipe::count(),
            'recent_users' => User::latest()->take(5)->get(),
            'recent_recipes' => Recipe::with('user')->latest()->take(5)->get(),
        ]);
    }

    /**
     * Get all users
     */
    public function users()
    {
        $users = User::withCount('recipes')->paginate(15);

        return response()->json([
            'data' => $users->items(),
            'pagination' => [
                'total' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
            ],
        ]);
    }

    /**
     * Delete a user
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    /**
     * Get all recipes
     */
    public function recipes()
    {
        $recipes = Recipe::with('user')->paginate(15);

        return response()->json([
            'data' => $recipes->items(),
            'pagination' => [
                'total' => $recipes->total(),
                'per_page' => $recipes->perPage(),
                'current_page' => $recipes->currentPage(),
                'last_page' => $recipes->lastPage(),
            ],
        ]);
    }

    /**
     * Delete a recipe
     */
    public function deleteRecipe($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return response()->json([
            'message' => 'Recipe deleted successfully',
        ]);
    }
}
