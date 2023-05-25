<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\Room;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        //create a landing room the moment the first user signs in
        $landingRoom = Room::where('id',0)->first();
        if($landingRoom==null){
            $landingRoom = new Room();
            //$landingRoom -> id = 0;
            $landingRoom -> name = "Landing Room";
            $landingRoom -> user_ids = "[]";
            $landingRoom -> owner_ids = "[]";
            $landingRoom -> message_ids = "[]";
            $landingRoom -> save();

            $landingRoom -> id = 0;
            $landingRoom -> update();
        }

        //add all users to the list of users on the landing room upon creation
        $allUsers = User::get();
        //$landingRoom = Room::where('id',0);
        //dd($landingRoom);
        $userArray = json_decode($landingRoom->user_ids);
        foreach($allUsers as $u){
            array_push($userArray,$u->id);
            //remove duplicates
            $userArray = array_unique($userArray);
        }


        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
