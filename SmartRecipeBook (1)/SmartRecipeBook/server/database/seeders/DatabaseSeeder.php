<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Recipe;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create sample users
        $user1 = User::create([
            'username' => 'chef_john',
            'password' => 'password123',
        ]);

        $user2 = User::create([
            'username' => 'baker_jane',
            'password' => 'password123',
        ]);

        // Create sample recipes
        Recipe::create([
            'title' => 'Chocolate Lava Cake',
            'description' => 'A decadent chocolate cake with a molten center',
            'ingredients' => [
                '2 cups flour',
                '1 cup sugar',
                '3/4 cup cocoa powder',
                '2 eggs',
                '1 cup milk',
                '1/2 cup butter',
            ],
            'instructions' => [
                'Preheat oven to 350°F',
                'Mix dry ingredients',
                'Combine wet ingredients',
                'Mix together',
                'Pour into greased pan',
                'Bake for 30 minutes',
            ],
            'prep_time' => 15,
            'cook_time' => 30,
            'servings' => 8,
            'difficulty_level' => 'medium',
            'user_id' => $user1->id,
        ]);

        Recipe::create([
            'title' => 'Pasta Carbonara',
            'description' => 'Classic Italian pasta with creamy sauce',
            'ingredients' => [
                '1 lb pasta',
                '6 oz bacon',
                '4 eggs',
                '2 cups parmesan cheese',
                'Salt and pepper',
            ],
            'instructions' => [
                'Cook pasta',
                'Fry bacon until crispy',
                'Mix eggs and cheese',
                'Combine pasta with bacon',
                'Add egg mixture',
                'Serve immediately',
            ],
            'prep_time' => 10,
            'cook_time' => 20,
            'servings' => 4,
            'difficulty_level' => 'easy',
            'user_id' => $user1->id,
        ]);

        Recipe::create([
            'title' => 'Chocolate Chip Cookies',
            'description' => 'Classic homemade chocolate chip cookies',
            'ingredients' => [
                '2 1/4 cups flour',
                '1 cup butter',
                '3/4 cup sugar',
                '3/4 cup brown sugar',
                '2 eggs',
                '2 cups chocolate chips',
            ],
            'instructions' => [
                'Preheat oven to 375°F',
                'Cream butter and sugars',
                'Add eggs',
                'Mix in flour',
                'Fold in chocolate chips',
                'Bake for 9-11 minutes',
            ],
            'prep_time' => 15,
            'cook_time' => 10,
            'servings' => 24,
            'difficulty_level' => 'easy',
            'user_id' => $user2->id,
        ]);
    }
}
