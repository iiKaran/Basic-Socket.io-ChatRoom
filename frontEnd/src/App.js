import { useEffect, useState } from 'react'
import "./App.css";
import { nanoid } from 'nanoid'
const { io } = require("socket.io-client");
const socket = io.connect("http://localhost:8000/");
const id = nanoid(5);

function App() {
  
  function Onchat(e) {
    e.preventDefault();
    console.log("chatting...")
    socket.emit("chat", {
      message,
      id,
    });
  
    setMessage('')
  }
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload])
    })
  },);


  const [message, setMessage] = useState("");
  const [chat, setChat]= useState([]);
  return (
    <main class="flex justify-center items-center gap-4 flex-col min-h-screen">
      <div className='text-center font-bold font-mono capitalize'>Chat room</div>
      <div className='flex flex-col w-[30%]  mx-auto items-center gap-4 border-2'>
        {
          chat.map((item, index) => {
            return (
              
              <div className='flex items-center justify-center w-[100%] gap-4' key={index}>
                <div className='bg-gray-200 rounded-md p-2 flex gap-8 min-w-[100%]'>
                <div className='bg-yellow-200 text-gray-600'>{item?.id}</div>
                  <div className='text-gray-800'>{item?.message}</div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='flex items-center justify-center gap-8 '>
        <input type="text" placeholder='Type Your Message' className=" border-2 rounded-sm" value={message} onChange={(e) => {
          setMessage(e.target.value)
        }} />
        <button onClick={Onchat} className='border-2 px-2 py-1 rounded-sm'>Send</button>
      </div>

    </main>
  );
}

export default App;
