//filter chats using the search bar

var searchBar = document.getElementById("search-bar")
var allChats = document.querySelectorAll(".chat");

searchBar.addEventListener("input",searchFilter);
function searchFilter(){
    //console.log(allChats);
    //make all chats visible if searchbar is empty
    if(searchBar.value==""){
        allChats.forEach(c => {
            c.classList.add("visible");
        });
        const div = document.querySelector("#chats");
        const highlightedElements = div.querySelectorAll(".highlight");
        highlightedElements.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
        });
    }
    //if not, filter them by the name of the chatter
    else{
        
        allChats.forEach(c => {
            // Convert to lower case so the searchbar ignores case
            const chatName = c.querySelector(".username").textContent;
            const searchText = searchBar.value.toLowerCase();
        
            if (chatName.toLowerCase().includes(searchText)) {
                c.classList.add("visible");
                //highlight the text in the name that corresponds to the query
                const regex = new RegExp(searchText, 'gi');
                const highlightedText = chatName.replace(regex, (match) => {
                    return `<mark class="highlight">${match}</mark>`;
                });
        
                c.querySelector(".username").innerHTML = highlightedText;
            } else {
                c.classList.remove("visible");
            }
        });
    }

}

//what happens when the send email button is clicked
var msg = document.querySelector("#message-box");
var sendButton = document.querySelector("#send-button");
//var sentTick = document.querySelector("#sent-tick");
sendButton.addEventListener("click",sendMessage);
//sendButton.addEventListener("mouseover",resetShake);
function sendMessage(){
    console.log("sksks");
    console.log(msg.value);
    if( msg.value!=""){
        alert("Message sent lol");
        //sentTick.classList.add("revealed")
    }
    if(msg.value==""){
        //msg.style.border="solid red 3px";
        msg.classList.add("shake");
        setTimeout(resetShake,500);
    }
}

//reset shake animation after it plays
function resetShake(){
    msg.classList.remove("shake");

}