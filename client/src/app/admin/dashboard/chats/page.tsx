"use client";
import { useEffect } from "react";
import { MessageBox, MessageList } from "react-chat-elements"
import "react-chat-elements/dist/main.css";

export default function Chat() {
  useEffect(() => {}, []);

  return (
    <div>
      <MessageList 
      className='message-list'
      lockable={true}
      toBottomHeight={'100%'}
      referance={null}
      dataSource={[
      {
        position:"left",
        type:"text",
        title:"Kursat",
        text:"Give me a message list example !",
        id: "1",
        focus: true,
        date: new Date(),
        titleColor: "#000",
        forwarded: true,
        replyButton: false,
        removeButton: false,
        status: "received",
        retracted: false,
        notch: true,
        className: ""
      },
      {
        position:"right",
        type:"text",
        title:"Emre",
        text:"That's all.",
        id: "2",
        focus: true,
        date: new Date(),
        titleColor: "#000",
        forwarded: true,
        replyButton: false,
        removeButton: false,
        status: "received",
        retracted: false,
        notch: true,
        className: ""
      },
      ]}
      />
      <MessageBox
        type="text"
        position="left"
        text="this"
        title=""
        id="1"
        focus={true}
        date={new Date()}
        titleColor="#000"
        forwarded={true}
        replyButton={false}
        removeButton={false}
        status="received"
        retracted={false}
        notch={true}
        className=""
      />
    </div>
  );
}
