const typingForm = document.querySelector('.typing-form');
const chatList = document.querySelector('.chat-list');
const suggestions = document.querySelectorAll(".suggestion_list .suggestion");
const toggleThemeButton = document.querySelector('#toggle-theme-button');
const deleteChatButton = document.querySelector('#delete-chat-button');

let userMessage = null;
let isResponseGenerating = false;

const API_KEY=`ENTER_YOUR_API_KEY`;
const API_URL="https://generativelanguage.googleapis.com/v1beta/interactions";

const loadLocalStorageData = ()=>{
    const isLightMode = (localStorage.getItem("themeColor") === "light_mode");
    
    document.body.classList.toggle("light-mode" , isLightMode);
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

    const savedChats = localStorage.getItem("savedChats");
    if (savedChats) {
        chatList.innerHTML = savedChats;
    }
    document.body.classList.toggle("hide-header" , savedChats);
}

loadLocalStorageData();

const createMessageElement = (content ,...classes)=>{
    const div = document.createElement('div');
    div.classList.add("message",...classes);
    div.innerHTML = content;
    return div;
}
const showTypingEffect = (text , textElement)=>{
    textElement.innerText = '';
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(()=>{
        textElement.innerText += (currentWordIndex === 0 ? '':' ') + words[currentWordIndex++];

        if(currentWordIndex === words.length){
            clearInterval(typingInterval);
            isResponseGenerating = false;
            localStorage.setItem("savedChats" , chatList.innerHTML); //save chats to local storage
        }

    },75);
   
}
const generateAPIresponses = async(incomingMessageDiv)=>{
    const textElement = incomingMessageDiv.querySelector(".text");
    try{
        const response = await fetch(API_URL,{
            method : "POST",
            headers : {"Content-Type": "application/json" , "x-goog-api-key":API_KEY},
            body : JSON.stringify({
               model: "gemini-3.6-flash",
                input: userMessage
            })

        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);
        const apiResponse = data?.steps[1].content[0].text;
        showTypingEffect(apiResponse ,textElement);
    }catch(error){
        isResponseGenerating = false;
        textElement.innerText = error.message;
        textElement.classList.add("error");
    }finally{
        incomingMessageDiv.classList.remove("loading");
    }

}
const showLoadingAnimation = ()=>{
    const html = ` <div class="message-content">
                <img src="gemini-color.svg" alt="Gemini image" class="avatar">
                <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, porro!</p>
                <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
            </div>
            <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
    const incomingMessageDiv = createMessageElement(html ,'incoming' ,'loading');
    
    chatList.appendChild(incomingMessageDiv);
    generateAPIresponses(incomingMessageDiv);
}

const copyMessage = (copyIcon) =>{
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done" ; //show tick icon
    setTimeout(()=> copyIcon.innerText = "content_copy" , 1000); //revert icon after 1 sec
}

const handleOutgoingChat = () =>{
    userMessage = typingForm.querySelector('.typing-input').value.trim() || userMessage;
    if(!userMessage || isResponseGenerating) return;

    isResponseGenerating = true;
    const html = `<div class="message-content">
                <img src="photo.jpeg" alt="user image" class="avatar">
                <p class="text"></p>
                </div>`;
    const outgoingMessageDiv = createMessageElement(html ,'outgoing');
    outgoingMessageDiv.querySelector('.text').innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset();
    document.body.classList.add("hide-header"); //hide the header once the chat start
    setTimeout(showLoadingAnimation , 500); //show loading animation after a delay
}
//set user message and handle outgoing chat when a suggestion is clicked
suggestions.forEach(suggestion =>{
    suggestion.addEventListener("click" , ()=>{
        userMessage = suggestion.querySelector(".text").innerText;
        handleOutgoingChat();
    });
});
toggleThemeButton.addEventListener('click' , ()=>{
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");  
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
   
});

deleteChatButton.addEventListener('click' , ()=>{
    if(confirm("Are you sure you want to delete all chats?")){
        localStorage.removeItem("savedChats");
        chatList.innerHTML = '';
        document.body.classList.remove("hide-header"); //shows header and suggestion again
    }
  
});

typingForm.addEventListener('submit' ,(e) =>{
    e.preventDefault();

    handleOutgoingChat();
});