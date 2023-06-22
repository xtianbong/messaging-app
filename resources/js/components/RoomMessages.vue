// resources/assets/js/components/RoomMessages.vue
<template>
    <div>
        <!--wrap these divs in a parent div so that they inherit it's stacking context and are always on top of all other elements-->
        <div style="position:relative;z-index:1000; ">
            <div id="dialogue-tint"></div>
            <div id="confirm-box" class="overlay">
                <h2 id="confirm-dialogue">Are you sure?</h2>
                <button id="yes-btn"> Yes </button>
                <button id="no-btn"> No </button>
            </div>
            <div id="dialogue-box" class="overlay">
                <h2 id="dialogue"></h2>
                <button id="ok-btn"> Ok </button>
            </div>
        </div>
        <div id="left-side" onload="searchFilter()">
            <div id = "search-box">
                <input type="text" id="rsearch-bar" class="search-bar"><!-- room search bar-->
            </div>
            <ul id="room-list" class="rooms scrollbar chats">
                <li v-for="room in rooms" v-if="room.id!=0" :key="room.id">
                    <a :href="'../room/' + room.id">
                        <div class="chat room searchable roomdiv" :id="currentUser.id">
                            <img class="pfp" src="\img\pfp.png">
                            <h3 class="username">{{ room.name }}</h3>
                            <img class="alert" src="/img/alert.png">
                        </div>
                    </a>
                </li>
            </ul>
            <div id="settings-box">
                <div id = "current-user">
                    <img class="pfp" src="/img/pfp.png">
                    <h3 :id=currentUser.id class="current-username not-selectable">{{currentUser.name}}</h3>
                </div>

                <img id="settings-button" src="/img/settings.png" alt="settings" style="display:none">
                <img id="plus-button" src="/img/plus.png" alt="add chat" >

                <!-- <button id="plus-button"  alt="add chat"> </button> -->
                <div id="tint"></div>

                <!--hidden divs-->
                <div id = "edit-user" class="overlay profile-mode" style="display:none">
                    <div id="edit-user-tabs" class="tabs">
                        <div id="profile-tab" class="tab"> Profile</div>
                        <div id="friends-tab" class="tab"> Friends</div>
                    </div>
                    <div id="profile-view" class="tab-view">
                        <img id="edit-userpfp" src="/img/pfp.png">
                        <div id="edit-username-box" class="name-box">
                            <h2>Username:</h2>
                            <input type="text" id="edit-username" class ="resizing-input" :placeholder=currentUser.name maxlength="20">
                            <img src="/img/edit.png">
                        </div>

                    </div>

                    <div id="friends-view" class="tab-view">
                        <h2>Friends:</h2>
                        <input type="text" id="efsearch-bar" class="search-bar"> <!-- friend search bar-->
                        <ul id="edit-user-friend-list" class="scrollbar user-list">
                            <li class="left clearfix" v-for="friend in friends" :key="friend.id">
                                <div :id = friend.id class="friend not-selectable edit-user-friend searchable">
                                    <h3>{{ friend.name }}</h3>
                                    <img class="remove-btn" src="/img/remove.png" alt="remove friend">
                                </div>
                            </li>

                        </ul>
                    </div>
                    <button id="edit-user-save" class="overlay-btn">Save changes</button>
                </div>
                <div id="settings" class="overlay" style="display: none;">
                    <button id="edit-user-btn" class="overlay-btn">View Profile</button>
                    <button id="log-out-btn" class="overlay-btn">Logout</button>
                </div>
                <div id="select-new" class="overlay" style="display: none;">
                    <button id="add-room-btn" class="overlay-btn">New Room</button>
                    <button id="add-friend-btn" class="overlay-btn">Add Friend</button>
                </div>
                <div id="new-room" class="overlay" style="display: none;">
                    <div id="rname-box" class="name-box">
                        <input type="text" id="rname" class ="resizing-input" placeholder="New Room" maxlength="20">
                        <img src="/img/edit.png">
                    </div>
                    <input type="text" id="fsearch-bar" class="search-bar"> <!-- friend search bar-->
                    <!--list of friends-->
                    <ul id="friend-list" class="scrollbar user-list">
                        <li class="left clearfix" v-for="friend in friends" :key="friend.id">
                            <div :id = friend.id class="friend not-selectable new-room-friend searchable">
                                <h3>{{ friend.name }}</h3>
                                <img class="add-button" src="/img/plus.png" alt="add friend">
                                <img class="added-button" src="/img/tick.png" alt="friend added">
                            </div>
                        </li>

                    </ul>
                    <button id="create-room-btn" class="overlay-btn">Create Room</button>
                </div>
                <div id="new-room-alert" class="overlay room-alert" style="display: none;">
                    <img class="confirm-tick" src="/img/tick.png" alt="tick to siginify that the room  has been created">
                    <h1>New room created</h1>
                </div>
                <div id="add-friend" class="overlay" style="display: none;">
                    <input type="text" id="new-friend-email" class="email-bar" placeholder="E-mail">
                    <button id="confirm-new-friend" class="overlay-btn">Add Friend</button>
                </div>
                <div id="add-friend-alert" class="overlay room-alert" style="display: none;">
                    <img class="confirm-tick" src="/img/tick.png" alt="tick to siginify that the friend has been added">
                    <h1>New friend addded</h1>
                </div>
            </div><!--settings-box-->
        </div><!--left side-->
    <div id="right-side">
        <div id="name-box" >
            <h2 :id=currentRoom.id v-if="currentRoom.id != 0">{{currentRoom.name}}</h2>
            <div id="buttons-box">
                <img id="add-users-btn" src="/img/add-user.png">
                <img id="room-details-btn" src="/img/options.png" >
            </div>
            <div id="add-users" class="overlay">
                <h2 id="add-users-room-name">{{currentRoom.name}}</h2>
                <h3>Friends: </h3>
                <h4 id ="friends-all-in" v-if="friendsOutsideRoom.length== 0">You have no friends who are not already in this chat room.</h4>
                <input type="text" id="asearch-bar" class="search-bar" v-if="friendsOutsideRoom.length!= 0"> <!-- friend search bar-->
                <!--list of friends that can be added-->
                <ul id="add-list" class="scrollbar user-list" v-if="friendsOutsideRoom.length!= 0">
                    <li class="left clearfix add-to-room-li" v-for="friend in friendsOutsideRoom" :key="friend.id">
                        <div :id = friend.id class="friend not-selectable new-room-friend searchable add-to-room">
                            <h3>{{ friend.name }}</h3>
                            <img class="add-button" src="/img/plus.png" alt="add friend">
                            <img class="added-button" src="/img/tick.png" alt="friend added">
                        </div>
                    </li>
                </ul>
                <h3>Add users by email:</h3>
                <div id="add-with-email">
                    <input type="text" id="add-users-email" placeholder="E-mail" class="email-bar">
                    <button id="add-with-email-btn" class="overlay-btn">Go</button>
                </div>
                <button id="confirm-add-user" class="overlay-btn">Add to room</button>
            </div>
            <div id="room-details" class="overlay owner" >
                <h2>{{currentRoom.name}}</h2>

                <h3>Members: </h3>
                <!--list of users in the room-->
                <ul id="details-member-list" class="scrollbar user-list">
                    <li class="left clearfix" v-for="u in roomUsers" :key="u.id">
                        <div :id = u.id class="friend dni not-selectable visible" :class="{ added: currentRoom.user_ids.includes(u.id), owner: ownerIds.includes(u.id) }">
                            <h3>{{ u.name }}</h3>
                            <!--display a crown icon if the user is an owner of this room -->
                            <img class="crown-icon" src="/img/crown.png" alt="crown icon" v-if="ownerIds.includes(u.id)">
                        </div>
                    </li>
                </ul>
                <button id="goto-edit-btn" class="overlay-btn">
                    <img class="crown-icon" src="/img/crown.png" alt="crown icon">
                    Edit Room
                    <img class="crown-icon" src="/img/crown.png" alt="crown icon">
                </button>
                <button id="leave-room-btn" class="overlay-btn">
                    Leave Room
                </button>
            </div>

            <div id="edit-room" class="overlay">
                <div id="rname-box" class="name-box">
                    <input type="text" id="rname" class ="resizing-input" :placeholder="currentRoom.name" maxlength="20">
                    <img src="/img/edit.png">
                </div>
                <input type="text" id="msearch-bar" class="search-bar"> <!-- friend search bar-->
                    <!--list of friends we could add to the room-->
                    <ul id="friend-list" class="scrollbar user-list" style = "display:none">
                        <li class="left clearfix" v-for="friend in friends" :key="friend.id">
                            <div :id = friend.id class="friend not-selectable visible searchable" :class="{ added: currentRoom.user_ids.includes(friend.id) }">
                                <h3>{{ friend.name }}</h3>

                                <!--display either the add button or the added button based on if the user is already in the room or not-->
                                <img class="add-button"  src="/img/plus.png" alt="add friend">
                                <img class="added-button"  src="/img/tick.png" alt="friend added">
                            </div>
                        </li>

                    </ul>
                    <h3> Members: </h3>
                    <ul id="member-list" class="scrollbar user-list">
                    <li class="left clearfix" v-for="u in roomUsers" :key="u.id">
                        <div :id = u.id class="friend not-selectable visible member searchable" :class="{ added: currentRoom.user_ids.includes(u.id), owner: ownerIds.includes(u.id) }">
                            <!--display a crown icon if the user is an owner of this room -->
                            <img class="crown-icon" src="/img/crown.png" alt="crown icon">
                            <h3>{{ u.name }}</h3>
                            <!--display either the add button or the added button based on if the user is already in the room or not-->
                            <img class="add-button"  src="/img/plus.png" alt="add friend">
                            <img class="added-button"  src="/img/tick.png" alt="friend added">

                        </div>
                        <div id="select-edit" class="overlay">
                            <button id="make-owner-btn" class="overlay-btn select-edit-btn">Make Owner</button>
                            <button id="remove-user-btn" class="overlay-btn select-edit-btn">Remove</button>
                        </div>
                        <div id="undo-edit" class="overlay">
                            <button id="undo-btn" class="overlay-btn select-edit-btn">Undo</button>
                        </div>

                    </li>
                </ul>
                <button id="confirm-edit-btn" class="overlay-btn">Save Changes</button>
                <button id="discard-edit-btn">Discard</button>
            </div>
            <div id="edit-room-alert" class="overlay room-alert" style="display: none;">
                <img class="confirm-tick" src="/img/tick.png" alt="tick to siginify that the room  has been edited">
                <h1>Changes saved</h1>
            </div>
        </div>
        <div :id=currentRoom.id class="room-id-carrier" style="display:none;">Find</div>
        <ul id="message-list" class="scrollbar">
            <li class="left clearfix" v-for="message in messages" v-if="roomId!=0" :key="message.id">
                <div class="clearfix">
                <div class="header">
                    <strong>
                    {{ message.user ? message.user.name : 'Unknown' }}
                    </strong>
                </div>
                <p>
                    {{ message.message }}
                </p>
                </div>
            </li>
        </ul>
        <div id="landing-room" v-if="currentRoom.id == 0">
            <h1>Welcome!</h1>
            <h2>Please select a chat room on the left side of the screen or <a id="landing-new-room">create a new room.</a></h2>
        </div>
    </div><!--right side-->

    </div>
</template>

<script>
export default {
  props: {
    messages: Array,
    currentUser: Object,
    roomId: Number,
    rooms:Array,
    currentRoom:Object,
    friends:Array,
    roomUsers:Array,
    roomOwners:Array,
  },
    data() {
        return {
        // add any component-specific data here
        addedFriends: [], // new data property to track added friends
        };
    },
    computed: {
        actualFriends() {
            return this.friends.filter(friend => friend.id !== this.currentUser.id);
        },
        sortedFriends() {
            const actualFriends = this.friends.filter(friend => friend.id !== this.currentUser.id);
            return actualFriends.sort((a, b) => {
            const addedA = this.isAdded(a.id);
            const addedB = this.isAdded(b.id);
            if (addedA && !addedB) {
                return -1; // a should appear before b
            } else if (!addedA && addedB) {
                return 1; // b should appear before a
            } else {
                return 0; // maintain the original order
            }
            });
        },
        friendsOutsideRoom(){
            var outside = [];
            var roomUserIds = [];
            for(var u of this.roomUsers){
                roomUserIds.push(u.id);
            }
            for(var f of this.friends){
                if(!roomUserIds.includes(f.id)){
                    outside.push(f);
                }
            }
            return outside;
        },
        ownerIds(){
            const ownerIds = [];
            for(const o of this.roomOwners){
                ownerIds.push(o.id);
            }
            return ownerIds;
        },
    },
    methods: {
        // add any component-specific methods here
        isAdded(id) {
        return this.addedFriends.includes(id);
        },
        toggleFriend(id) {
        if (this.isAdded(id)) {
            this.addedFriends = this.addedFriends.filter(friendId => friendId !== id);
        } else {
            this.addedFriends.push(id);
        }
        },
    },
    mounted() {
        // add any code to run when the component is mounted here
        console.log(this.friends);
    },
};
</script>
