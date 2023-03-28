@extends('layouts.app')

@section('content')
<div class="container" id="demo">
    <div class="card room" :id="roomId">
        <div class="card-body">
            <room-messages :messages="messages" :currentUser="currentUser" :roomId="roomId"></room-messages>
        </div>
        <div class="card-footer">
            <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }}"></chat-form>
        </div>
    </div>
</div>

@endsection
