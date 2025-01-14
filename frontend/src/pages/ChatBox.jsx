// import React, { useState } from 'react';
// import axios from "axios";
// import { FiSend, FiMic, FiVolume2 } from 'react-icons/fi';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import '../css/chatbot.css';

// export const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isListening, setIsListening] = useState(false); // State to track if the mic is listening
//   //   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

//   const [isSpeaking, setIsSpeaking] = useState(false); // Track if the bot is currently speaking
//   const { speak, cancel } = useSpeechSynthesis();

//   // const { speak } = useSpeechSynthesis();

//   // Check if SpeechRecognition is supported
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = SpeechRecognition ? new SpeechRecognition() : null;

//   if (recognition) {
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'en-US';
//   }

//   const handleMicClick = () => {
//     if (recognition) {
//       if (isListening) {
//         recognition.stop();
//         setIsListening(false);
//       } else {
//         recognition.start();
//         setIsListening(true);
//       }
//     } else {
//       alert('Speech recognition is not supported in this browser.');
//     }
//   };

//   if (recognition) {
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setUserInput(transcript);
//       setIsListening(false); // Automatically stop listening after receiving a result
//     };

//     recognition.onend = () => {
//       setIsListening(false); // Reset the listening state if the recognition ends unexpectedly
//     };
//   }

//   // const farmingPrompt = "You are a chatbot that only answers questions related to farming. If the user asks about something unrelated to farming, politely inform them that you only provide farming-related information.";


//   const sendMessage = async () => {
//     const farmingPrompt = "You are a chatbot named Kheti AI specializing in farming and agriculture. If the user asks a question that is unrelated to farming, kindly inform them that you can only provide information on farming and agriculture.";
//     // const languageprompt = "user ask question in which language, you answer that in that language "

//     const newMessage = { sender: 'user', text: userInput };
//     setMessages([...messages, newMessage]);
//     setUserInput('');

//     try {
//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCzjUI6ns__AnqqO0KkLz6hh6i8hUEf8X0`,
//         method: "post",
//         data: {
//           // contents: [{ parts: [{ text: userInput }] }],
//           contents: [{ parts: [{ text: `${farmingPrompt} ${userInput}` }] }],
//         },
//       });



//       //    // Process the bot's response
//       // let botReply = response.data.candidates[0].content.parts[0].text;

//       // // Remove unwanted symbols like '*'
//       // botReply = botReply.replace(/\*/g, '');

//       // // Split the reply into lines for line-by-line display
//       // const botReplyLines = botReply.split('\n').filter(line => line.trim() !== '');

//       // // Add each line of the bot's reply to the messages
//       // const formattedMessages = botReplyLines.map(line => ({ sender: 'bot', text: line }));

//       // setMessages([...messages, newMessage, ...formattedMessages]);


//         // Process the bot's response
//     let botReply = response.data.candidates[0].content.parts[0].text;

//     // Remove unwanted symbols like '*'
//     botReply = botReply.replace(/\*/g, '');

//     // Split the reply into lines
//     const botReplyLines = botReply.split('\n').filter(line => line.trim() !== '');

//     // Add the entire bot's reply as a single message
//     const botMessage = { sender: 'bot', text: botReplyLines };

//     setMessages([...messages, newMessage, botMessage]);

//       // setMessages([...messages, newMessage, { sender: 'bot', text: response.data.candidates[0].content.parts[0].text }]);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSpeakerClick = (text) => {
//     // const utterance = new SpeechSynthesisUtterance(text);
//     // utterance.lang = 'hi-IN'; // Set the language to Hindi
//     // speechSynthesis.speak(utterance);
//     speak({ text: text, lang: 'hi-IN' });
//   };

//   // const handleSpeakerClick = (text) => {
//   //   if (isSpeaking) {
//   //     cancel(); // Stop speaking if already speaking
//   //     setIsSpeaking(false);
//   //   } else {
//   //     speak({ text, lang: 'hi-IN' });
//   //     setIsSpeaking(true);
//   //   }
//   // };

//   return (
//     <>
//       <section className="section-chat">
//         <main>
//           <div className="chatbot-container">
//             <div className="chat-messages">
//               {messages.map((msg, index) => (
//                 // <div key={index} className={`chat-message ${msg.sender}`}>
//                 //   {msg.text}
//                 //   {msg.sender === 'bot' && (
//                 //     <FiVolume2
//                 //       className="speaker-icon"
//                 //       onClick={() => handleSpeakerClick(msg.text)}
//                 //     />
//                 //   )}
//                 // </div>
//                 <div className={`chat-message ${msg.sender}`}>
//                   {Array.isArray(msg.text) ? (
//                     msg.text.map((line, index) => (
//                       <React.Fragment key={index}>
//                         {line}
//                         <br />
//                       </React.Fragment>
//                     ))
//                   ) : (
//                     msg.text
//                   )}
//                   {msg.sender === 'bot' && (
//                     <FiVolume2
//                       className="speaker-icon"
//                       onClick={() => handleSpeakerClick(msg.text.join(' '))}
//                     />
//                 //     <div className="speaker-icon-container">
//                 // {isSpeaking ? (
//                 //   <FiPause
//                 //     className="pause-icon"
//                 //     onClick={() => handleSpeakerClick(msg.text.join(' '))}
//                 //   />
//                 // ) : (
//                 //   <FiVolume2
//                 //     className="speaker-icon"
//                 //     onClick={() => handleSpeakerClick(msg.text.join(' '))}
//                 //   />
//                 // )}
//               // </div>
//                   )}
//                 </div>

//               ))}
//             </div>
//             <div className="chat-input-container">
//               {/* <FiMic
//                 className={`mic-icon ${isListening ? 'listening' : ''}`}
//                 onClick={handleMicClick}
//               /> */}

// <FiMic
//           className={`mic-icon ${isListening ? 'listening' : ''}`}
//           onClick={handleMicClick}
//           style={{ color: isListening ? 'dodgerblue' : 'black' }} // Change color when listening
//         />

//               <input
//                 type="text"
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 placeholder="Type your message..."
//                 className="chat-input"
//               />
//               <button onClick={sendMessage} className="send-button">
//                 <FiSend />
//               </button>
//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { FiSend, FiMic, FiVolume2 } from 'react-icons/fi';
import { useSpeechSynthesis } from 'react-speech-kit';
import '../css/chatbot.css';

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false); // State to track if the mic is listening
  // const [chatHistory, setChatHistory] = useState([]); // State for storing chat history
  const chatEndRef = useRef(null); // Reference to automatically scroll down
  const { speak, cancel } = useSpeechSynthesis();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Automatically scroll down to new messages
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  }

  // // Load history from dummy data
  // useEffect(() => {
  //   const storedHistory = [
  //     { id: 1, title: "Chat from 2 days ago", messages: ["Hello!", "Tell me about rice cultivation."] },
  //     { id: 2, title: "Chat from 5 days ago", messages: ["What is the best pesticide?", "Try using neem oil."] }
  //   ];
  //   setChatHistory(storedHistory);
  // }, []);

  const handleMicClick = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  if (recognition) {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const sendMessage = async () => {
    const farmingPrompt = "answer only farming or kheti or agricultural related question, with the same language of user asked language";
    
    const newMessage = { sender: 'user', text: userInput };
    setMessages([...messages, newMessage]);
    setUserInput('');

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCzjUI6ns__AnqqO0KkLz6hh6i8hUEf8X0`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: `${farmingPrompt} ${userInput}` }] }],
        },
      });

      let botReply = response.data.candidates[0].content.parts[0].text;
      botReply = botReply.replace(/\*/g, '');

      const botMessage = { sender: 'bot', text: botReply.split('\n').filter(line => line.trim() !== '') };
      setMessages([...messages, newMessage, botMessage]);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSpeakerClick = (text) => {
    speak({ text: text, lang: 'hi-IN' });
  };

  // Load selected chat history
  // const loadHistory = (chat) => {
  //   const formattedMessages = chat.messages.map((msg, index) => ({
  //     text: msg,
  //     sender: index % 2 === 0 ? "bot" : "user"
  //   }));
  //   setMessages(formattedMessages);
  // };

  return (
    <>
      <section className="section-chat">
        {/* <div className="history-panel">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="history-item" onClick={() => loadHistory(chat)}>
              {chat.title}
            </div>
          ))}
        </div> */}

        <main>
          <div className="chatbot-container">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div className={`chat-message ${msg.sender}`} key={index}>
                  {Array.isArray(msg.text) ? (
                    msg.text.map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  ) : (
                    msg.text
                  )}
                  {msg.sender === 'bot' && (
                    <FiVolume2
                      className="speaker-icon"
                      onClick={() => handleSpeakerClick(msg.text.join(' '))}
                    />
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-container">
              <FiMic
                className={`mic-icon ${isListening ? 'listening' : ''}`}
                onClick={handleMicClick}
                style={{ color: isListening ? 'dodgerblue' : 'black' }} 
              />

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button onClick={sendMessage} className="send-button">
                <FiSend />
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
