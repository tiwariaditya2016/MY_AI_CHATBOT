const typingForm = document.querySelector('.typing-form');
const chatList = document.querySelector('.chat-list');
const toggleThemeButton = document.querySelector('#toggle-theme-button');
const deleteChatButton = document.querySelector('#delete-chat-button');

let userMessage = null;

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
        const apiResponse = data?.steps[1].content[0].text;
        showTypingEffect(apiResponse ,textElement);
    }catch(error){
        console.log(error);
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
            <span class="icon material-symbols-rounded">content_copy</span>`;
    const incomingMessageDiv = createMessageElement(html ,'incoming' ,'loading');
    
    chatList.appendChild(incomingMessageDiv);
    generateAPIresponses(incomingMessageDiv);


}
const handleOutgoingChat = () =>{
    userMessage = typingForm.querySelector('.typing-input').value.trim();
    if(!userMessage) return;
    const html = `<div class="message-content">
                <img src="photo.jpeg" alt="user image" class="avatar">
                <p class="text"></p>
                </div>`;
    const outgoingMessageDiv = createMessageElement(html ,'outgoing');
    outgoingMessageDiv.querySelector('.text').innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset();
    setTimeout(showLoadingAnimation , 500);
}

toggleThemeButton.addEventListener('click' , ()=>{
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");  
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
   
});

deleteChatButton.addEventListener('click' , ()=>{
    if(confirm("Are you sure you want to delete all chats?")){
        localStorage.removeItem("savedChats");
        chatList.innerHTML = '';
    }
  
});

typingForm.addEventListener('submit' ,(e) =>{
    e.preventDefault();

    handleOutgoingChat();
});