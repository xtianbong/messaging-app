<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoomController extends Controller
{
    use App\Models\Message;

    public function getMessages($room_id)
    {
        $messages = Message::where('room_id', $room_id)->get();
        return response()->json($messages);
    }
}

