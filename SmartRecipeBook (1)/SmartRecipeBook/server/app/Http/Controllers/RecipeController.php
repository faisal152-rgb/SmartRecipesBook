<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    /**
     * Get all recipes
     */
    public function index()
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
     * Get a single recipe
     */
    public function show($id)
    {
        $recipe = Recipe::with('user')->findOrFail($id);

        return response()->json([
            'data' => $recipe,
        ]);
    }

    /**
     * Create a new recipe
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|array',
            'instructions' => 'required|array',
            'prep_time' => 'required|integer|min:0',
            'cook_time' => 'required|integer|min:0',
            'servings' => 'required|integer|min:1',
            'difficulty_level' => 'required|in:easy,medium,hard',
            'image_url' => 'nullable|string|url',
        ]);

        $recipe = Recipe::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Recipe created successfully',
            'data' => $recipe,
        ], 201);
    }

    /**
     * Update a recipe
     */
    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        // Check if user owns the recipe
        if ($recipe->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'ingredients' => 'sometimes|array',
            'instructions' => 'sometimes|array',
            'prep_time' => 'sometimes|integer|min:0',
            'cook_time' => 'sometimes|integer|min:0',
            'servings' => 'sometimes|integer|min:1',
            'difficulty_level' => 'sometimes|in:easy,medium,hard',
            'image_url' => 'nullable|string|url',
        ]);

        $recipe->update($validated);

        return response()->json([
            'message' => 'Recipe updated successfully',
            'data' => $recipe,
        ]);
    }

    /**
     * Delete a recipe
     */
    public function destroy(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        // Check if user owns the recipe
        if ($recipe->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $recipe->delete();

        return response()->json([
            'message' => 'Recipe deleted successfully',
        ]);
    }

    /**
     * Get recipes by user
     */
    public function userRecipes(Request $request)
    {
        $recipes = Recipe::where('user_id', $request->user()->id)
            ->paginate(15);

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
     * Search recipes
     */
    public function search(Request $request)
    {
        $query = $request->query('q', '');

        $recipes = Recipe::where('title', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->with('user')
            ->paginate(15);

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
}
