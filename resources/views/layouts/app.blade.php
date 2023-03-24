<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/jules.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jules.css') }}" rel="stylesheet">

</head>
<body>
    <div id="app" onload="replace()" >
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm" style="display:none">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                            @endif

                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
        <!--jules additions-->
        <div class="container" id="jules">
            <div id="left-side" onload="searchFilter()">
                <div id = "search-box">
                    <input type="text" id="search-bar">
                </div>
                <div id = "chats" class="scrollbar">
                    <div class = "chat new">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOOGOG</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">Logoro</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">Jules</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat new urgent">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                    <div class = "chat urgent">
                        <img class="pfp" src="img\pfp.png">
                        <h3 class="username">GOGOO</h3>
                        <img class="alert" src="img\alert.png">
                    </div>
                </div><!--chats-->
                <div id="settings-box">
                    <img class="pfp" src="{{ asset('img/pfp.png') }}">
                    <h3 id="our-user">user name</h3>
                    <img id="settings-button" src="img\settings.png">
                    <img id="plus-button" src="img\plus.png">
                </div>
            </div><!--left side-->
            <div id="right-side">
                <div id="name-box">
                    <h2>Logoro</h2>
                </div>
                <main id= "message-import"class="py-4" style="z-index=999">
                    @yield('content')
                </main>
                <div id="messages" class="scrollbar" style="display:none">
                    <div class="message">
                        <img class="pfp" src="img\pfp.png">
                        <div class="message-text">this is the message</div>
                    </div>
                </div>
                <div id="input">
                    <img id="attach-button"src="img\attach.png">
                    <input type="text" id="message-box">
                    <img id="send-button" src="img\send2.png">
                </div>
            </div><!--right side-->
        </div> <!--jules-->

    </div>
</body>
</html>
