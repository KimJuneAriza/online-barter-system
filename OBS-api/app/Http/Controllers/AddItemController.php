<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class AddItemController extends Controller
{
    public function upload(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['error' => 'No image uploaded'], 400);
        }

        $file = $request->file('image');

        $item = new Item();
        $item->name = $request->input('name');
        $item->description = $request->input('description');
        $item->owner = $request->input('owner');
        $item->category = $request->input('category');
        $item->status = $request->input('status');
        $item->filename = $file->getClientOriginalName();
        $item->image = file_get_contents($file->getRealPath());

        $item->save();

        return response()->json(['message' => 'Item uploaded successfully']);
    }
}

