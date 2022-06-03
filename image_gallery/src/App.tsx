import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import ImageBox from "./components/ImageBox";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const [imageList, setImageList] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragInHandler = useCallback((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const dragOutHandler = useCallback((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  }, []);

  const dragOverHandler = useCallback((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const dropHandler = useCallback((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    onChangeFiles(event);
    setIsDragging(false);
  }, []);

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", dragInHandler);
      dragRef.current.addEventListener("dragleave", dragOutHandler);
      dragRef.current.addEventListener("dragover", dragOverHandler);
      dragRef.current.addEventListener("drop", dropHandler);
    }
  }, [dragInHandler, dragOutHandler, dragOverHandler, dropHandler]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", dragInHandler);
      dragRef.current.removeEventListener("dragleave", dragOutHandler);
      dragRef.current.removeEventListener("dragover", dragOverHandler);
      dragRef.current.removeEventListener("drop", dropHandler);
    }
  }, [dragInHandler, dragOutHandler, dragOverHandler, dropHandler]);

  const onChangeFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement> | any): void => {
      let files: Blob[] = [];
      if (event.type === "drop") {
        files = [...event.dataTransfer.files];
      } else {
        files = [...event.target.files];
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = (event) => {
            setImageList((prev) => [...prev, event.target?.result as string]);
          };
        }
      }
    },
    [imageList]
  );

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className={"container" + (isDragging ? " dragging" : "")}>
      <div
        className={"gallrey-box" + (imageList.length > 0 ? " row" : "")}
        ref={dragRef}
      >
        {imageList.map((img, idx) => (
          <ImageBox
            key={idx}
            src={img}
            imageList={imageList}
            setImageList={setImageList}
          />
        ))}
        {imageList.length === 0 && (
          <div className="notice">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </div>
        )}
        <input type="file" multiple ref={inputRef} onChange={onChangeFiles} />
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
