"use client"
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image"
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("../../components/GeneratePdf"), {
  ssr: false,
});
 
export function DialogDefault({open, handleOpen, combo, name, phone, address}) {
   
const ref = React.useRef();
  console.log(combo)
  return (
    <>
      <Dialog
        ref={ref}
        size="lg"
        id="text"
        open={true}
        handler={handleOpen}
        className="overflow-scroll h-5/6"
      >
        <DialogBody className="relaive w-full">
          <Image
            alt=""
            src={`/image/tt${1}.jpg`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100vh",
            }}
          />
          <div className="absolute top-10 sm:top-8 lg:top-6 md:translate-y-1/2 left-1/2 -translate-x-1/2 w-10/12 md:w-1/2">
            <div className="bg-white w-full py-1 xl:py-2.5 px-3 xl:px-6 rounded-md">
              <p className="text-black">
                Khách hàng: <span className="uppercase">{name}</span>
              </p>
            </div>
            <div className="mt-2 bg-white w-full py-1 xl:py-2.5 px-3 xl:px-6 rounded-md">
              <p className="text-black">Số điện thoại: {phone}</p>
            </div>
            <div className="mt-2 bg-white w-full py-1 xl:py-2.5 h-auto  px-3 xl:px-6 lg:h-20 xl:h-28 2xl:h-32 rounded-md">
              <p className="text-black">Địa chỉ: {address}</p>
            </div>
          </div>
        </DialogBody>
         <GeneratePDF html={ref} close={handleOpen}/>
      </Dialog>
    </>
  );
}
