import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ImageBox(props: {
  src: string;
  imageList: string[];
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="image-box">
      <img src={props.src} />
      <div
        className="remove"
        onClick={() => {
          props.setImageList(props.imageList.filter((x) => x !== props.src));
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
}
