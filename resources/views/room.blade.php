@extends('layouts.app')

@section('content')
<div class="container" id="demo">

    <div class="card room" :id="roomId">
        <div class="card-body">
            <room-messages :messages="{{$filteredMessages}}" :current-user="{{$currentUser}}" :room-id="{{$room_id}}" :rooms="{{$rooms}}" :current-room="{{$currentRoom}}" :friends="{{$friends}}"></room-messages>
        </div>
        <div class="card-footer" id="1">
            <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }} " :roomId="{{$room_id}}" ></chat-form>
        </div>
    </div>
</div>

@endsection
