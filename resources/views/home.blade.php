@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center" id="home-row">
        <div class="col-md-8">
            <div class="card" id="home-card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    {{ __('You are logged in!') }}
                    <a href="{{ url('/room/0') }}">Chat</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
