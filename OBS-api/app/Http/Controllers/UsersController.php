<?php

namespace App\Http\Controllers;

use App\Models\User; // Ensure you have a User model created.
use App\Models\Profile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

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

    public function userSignin(Request $request)
    {
        // Validate request input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user by username
        $user = User::where('username', $request->username)->first();

        // Check if user exists and password matches
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid username or password'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => $user
        ], 200);
    }

    public function completeProfile(Request $request)
{
    // dd($request->all());
    // Manually validate the incoming request data
    $validator = Validator::make($request->all(), [
        'full_name' => 'required|string|max:255',
        'phone' => 'nullable|string|max:20',
        'gender' => 'nullable|in:male,female,other',
        'dob' => 'nullable|date',
        'address' => 'nullable|string',
        'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'user_id' => 'required|integer', // Make sure user_id is valid
    ]);

    // If validation fails, return an error response
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

     // Initialize the profile photo path
     $profilePhotoPath = null;

     if ($request->hasFile('profile_photo') && $request->file('profile_photo')->isValid()) {
        $file = $request->file('profile_photo');
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $destinationPath = app()->basePath('public/uploads/profiles');
    
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }
    
        $file->move($destinationPath, $filename);
        $profilePhotoPath = '/uploads/profiles/' . $filename;
    }
    

    $profile = Profile::create([
        'full_name' => $request->full_name,
        'phone' => $request->phone,
        'gender' => $request->gender,
        'dob' => $request->dob,
        'address' => $request->address,
        'user_id' => $request->user_id,
        'profile_photo' => $profilePhotoPath
    ]);

    // Fetch the user associated with the profile
    $user = User::find($request->user_id);
    
    if ($user) {
        // Update a column in the users table (e.g., "profile_completed")
        $user->complete_profile= 1;  // Assuming you have this column to track profile completion
        $user->save();  // Save the updated user
    }

    $profile->profile_photo_url = $profile->profile_photo ? url($profile->profile_photo) : null;


    return response()->json([
        'message' => 'Profile created successfully',
        'user' => $profile
    ], 201);

    // Handle profile photo upload if available
    // if ($request->hasFile('profile_photo')) {
    //     $file = $request->file('profile_photo');
    //     $filename = uniqid() . '.' . $file->getClientOriginalExtension();
    //     $file->move(public_path('uploads/profiles'), $filename);
    //     $profile->profile_photo = '/uploads/profiles/' . $filename;
    // }

    // $profile->save();

    // return response()->json([
    //     'message' => 'Profile updated successfully.',
    //     'user' => $profile
    // ]);
}

public function fetchProfile(Request $request)
{
    $profile = Profile::where('user_id', $request->user_id)->first();

    if (!$profile) {
        return response()->json(['error' => 'Profile not found'], 404);
    }

    if ($profile->profile_photo) {
        $profile->profile_photo_url = url($profile->profile_photo);
    }

    return response()->json(['profile' => $profile]);
}


}
