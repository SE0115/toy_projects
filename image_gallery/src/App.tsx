import React, { useEffect, useRef, useState } from "react";
import ImageBox from "./components/ImageBox";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageList, setImageList] = useState<string[]>([]);

  return (
    <div className="container">
      <div className={"gallrey-box" + (imageList.length > 0 ? " row" : "")}>
        {imageList.map((img, idx) => (
          <ImageBox key={idx} src={img} />
        ))}
        {imageList.length === 0 && (
          <div className="notice">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = (event) => {
                setImageList((prev) => [
                  ...prev,
                  event.target?.result as string,
                ]);
              };
            }
          }}
        />
        <div
          className="addImageBtn"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default App;
