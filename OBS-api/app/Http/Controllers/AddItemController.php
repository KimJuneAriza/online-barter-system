<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class AddItemController extends Controller
{
    public function upload(Request $request)
    {
           // Manually validate using Validator::make
           $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|string|max:50',
            'owner' => 'required|string|max:255',
            'image' => 'required|mimes:jpeg,png,jpg,gif,svg,bmp|max:10240',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        // Check if the image is uploaded
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();

            // Convert image to binary data
            $imageData = file_get_contents($file->getRealPath());

            // Create new item
            $item = new Item();
            $item->name = $request->input('name');
            $item->description = $request->input('description');
            $item->category = $request->input('category');
            $item->status = $request->input('status');
            $item->owner = $request->input('owner');
            $item->filename = $filename;
            $item->image = $imageData;  // Store the image binary data in the database

            // Save to the database
            $item->save();

            $base64Image = base64_encode($imageData);

            return response()->json([
                'message' => 'Item uploaded successfully!',
                'image' => $base64Image // Sending the base64 encoded image
            ], 200);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }

    public function getItems()
{
    $items = \App\Models\Item::all();

    // Transform items to include base64 image
    $items = $items->map(function ($item) {
        return [
            'id' => $item->id,
            'name' => $item->name,
            'description' => $item->description,
            'owner' => $item->owner,
            'category' => $item->category,
            'status' => $item->status,
            'filename' => $item->filename,
            'image' => 'data:image/jpeg;base64,' . base64_encode($item->image),
        ];
    });

    return response()->json($items);
}

}

