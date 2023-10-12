// Your OpenAI API Key
const OPEN_AI_API_KEY = '<You-API-Key>';

// Messages array
let messages = [];

// Function to get user input
function getUserInput(question) {
    const userInput = prompt(question);
    return userInput;
}

// Function to call the OpenAI API
function chatWithOpenAI(prompt) {
    let promptObj = { role: 'user', content: prompt };
    messages.push(promptObj);

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.choices && data.choices.length > 0) {
            let responseContent = data.choices[0].message.content.trim();
            let responseObj = { role: 'assistant', content: responseContent };
            messages.push(responseObj);
            // Continue the chat
            continueChat();
        } else {
            alert('The assistant did not return a response.');
        }
    })
    .catch((error) => {
        alert('Error:' + error);
    });
}

// Function to continue the chat
// Function to continue the chat
function continueChat() {
    let chatHistory = '';
    for(let i = 0; i < messages.length; i++) {
        chatHistory += `${messages[i].role}: ${messages[i].content}\n\n`;
    }

    let userPrompt = getUserInput(`${chatHistory}\nUser:`);
    if(userPrompt) {
        chatWithOpenAI(userPrompt);
    }
}


// Start the chat
continueChat();