<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AddItemController extends Controller
{
    public function addItem(Request $request)
{
    $this->validate($request, [
        'name' => 'required|string',
        'description' => 'required|string',
        'owner' => 'required|string',
    ]);

    DB::table('items')->insert([
        'name' => $request->input('name'),
        'description' => $request->input('description'),
        'owner' => $request->input('owner'),
    ]);

    return response()->json(['message' => 'Item added successfully']);
}

}
