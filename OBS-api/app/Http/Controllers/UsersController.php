<?php

namespace App\Http\Controllers;

use App\Models\User; // Ensure you have a User model created.
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function userSignup(Request $request)
    {
        // Validate the request input using the Validator facade.
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'email'    => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create a new user using the Eloquent model.
            $user = User::create([
                'username' => $request->username,
                'email'    => $request->email,
                // Securely hash the password before saving.
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            // Log the error or handle it accordingly.
            return response()->json([
                'error' => 'Failed to create user',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
