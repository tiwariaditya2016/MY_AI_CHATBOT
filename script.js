const typingForm = document.querySelector('.typing-form');
const chatList = document.querySelector('.chat-list');
let userMessage = null;
const API_KEY=`ENTER_YOUR_API_KEY`;
const API_URL="https://generativelanguage.googleapis.com/v1beta/interactions";
const createMessageElement = (content ,...classes)=>{
    const div = document.createElement('div');
    div.classList.add("message",...classes);
    div.innerHTML = content;
    return div;
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
        textElement.innerText=apiResponse;
       
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
typingForm.addEventListener('submit' ,(e) =>{
    e.preventDefault();

    handleOutgoingChat();
});