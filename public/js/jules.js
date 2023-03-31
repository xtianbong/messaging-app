//added by jules


//make all the demo stuff invisible
var oldStuff = document.querySelector("#demo");
var newStuff = document.querySelector("#jules");
function replace(){
    console.log("Before");
    if(newStuff.style.display!="none"){
        console.log("Inside");
        oldStuff.style.display="none";
    }
}



//filter chats using the search bar

var searchBar = document.getElementById("search-bar")
var allChats = document.querySelectorAll(".chat");
//run function every time there is input in the search bar and also when the page loads
searchBar.addEventListener("input",searchFilter);
window.addEventListener("load",searchFilter)

function searchFilter(){
    console.log("search ran");
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



//reset shake animation after it plays
function resetShake(){
    msg.classList.remove("shake");

}


//add the scrollbar class to the ul of messages because putting it in html isn't enough for some reason
const cardBody = document.querySelector('.card-body');
const ulElement = cardBody.querySelector('ul');

window.addEventListener("load", function() {
    if (ulElement) {
      ulElement.classList.add("scrollbar");
      ulElement.scrollTop = ulElement.scrollHeight;
    }
  });


// makes the ul scroll to the bottom on load and when a new message is entered

//laravel message input and button
var msg = document.querySelector("#btn-input");
var sendButton = document.querySelector("#btn-chat");

sendButton.addEventListener("click",bottomScroll());
window.addEventListener("load", bottomScroll());

window.addEventListener("load", function() {

    const ulElement = document.querySelector("ul.scrollbar");
    if (ulElement) {
      // Set its scrollTop property to its maximum value
      ulElement.scrollTop = ulElement.scrollHeight;
      // Create a new MutationObserver object
      const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {

          // If the mutation is a childList mutation with added nodes and the first added node is an li element
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'LI') {
            bottomScroll();
          }
        }
      });

      // Start observing changes to the child list of the ul element
      observer.observe(ulElement, { childList: true });
    }
  });


function bottomScroll(){
    if (ulElement) {
        ulElement.scrollTop = ulElement.scrollHeight;
      }
};

// Send a message


