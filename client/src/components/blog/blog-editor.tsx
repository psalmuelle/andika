"use client";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

export interface ImageUploadResponse {
  url: string;
}

export function MarkdownEditor({
  content,
  onContentChange,
}: {
  content: string;
  onContentChange: (content: string) => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (content.length > 0) {
      setValue(content);
    }
  }, [content]);

  return (
    <div className="container">
      <MDEditor
        value={value}
        className="min-h-[400px]"
        onChange={(value) => {
          setValue(value || "");
          onContentChange(value || "");
        }}
      />
    </div>
  );
}
