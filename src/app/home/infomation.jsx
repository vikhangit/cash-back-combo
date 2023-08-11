"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Infomation({image, setImage}) {
  const inputFile = useRef(null);
  const [nameFile, setNameFile] = useState(null);
  
  const sendForm = (list) => {
var data = new FormData();
data.append("file", list);
axios
  .post(
    "https://api.fostech.vn/api/uploadfile?access_token=flex.public.token&json=1&folder=bill",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
  .then((response) => {
    //handle success
  setImage(response.data.image)
  })
  .catch((err) => {
    //handle error
    console.log(err);
  });
  }
  useEffect(() => {
    if (nameFile) {
      sendForm(nameFile)
    }
  }, [nameFile]);
  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    console.log("fileObj is", fileObj);
    // // 👇️ reset file input
    event.target.value = null;
    // // 👇️ is now empty
    // console.log(event.target.files);
    // // 👇️ can still access file object here
    // console.log(fileObj);
    setNameFile(fileObj);
  };
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-10 mt-10">
      <div className="w-full flex flex-col items-center md:basis-3/4 md:block">
        <p className="text-lg underline font-medium text-center md:text-left">Thông tin chuyển khoản</p>
        <h1 className="text-lg uppercase text-center md:text-left">Công ty cổ phần goodcharme</h1>
        <h1 className="text-lg uppercase text-center md:text-left">Ngân hàng vietcombank</h1>
        <p className="text-lg text-center md:text-left">
          STK:<span className="font-semibold ml-1">10 3777 6888</span>
        </p>
        <p className="text-lg text-red-500 mt-8 text-center md:text-left">*Nội dung chuyển tiền là:</p>
        <p className="text-lg text-red-500 text-center md:text-left">
          Nhập số CĂN CƯỚC CÔNG DÂN, ví dụ: 123456789012
        </p>
      </div>
      <div className="w-full mt-10 md:margin-0 md:basis-1/4 flex flex-col items-center">
        <button
          onClick={() => {
            inputFile.current.click();
          }}
          className="p-3 bg-indigo-100 rounded-2xl"
        >
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {image.length > 0 ? (
            <Image
              alt=""
              src={image}
              width={100}
              height={100}
              loader={({ src }) => `https://api.fostech.vn${src}`}
            />
          ) : (
            <Image
              alt=""
              src={"/image/add-file.png"}
              width={100}
              height={100}
            />
          )}
        </button>
        <p className="text-lg mt-2">{image.length > 0 ? nameFile.name :"Upload biên lai"}</p>
      </div>
    </div>
  );
}
