"use client";
import { useEffect } from "react";
import { MessageBox } from "react-chat-elements"
import "react-chat-elements/dist/main.css";

export default function Chat() {
  useEffect(() => {}, []);

  return (
    <div>
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
