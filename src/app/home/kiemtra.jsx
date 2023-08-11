"use client"
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import Image from "next/image"
import html2canvas from "html2canvas";

export function DialogDefault({ open, handleOpen, combo, name, phone, address }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, []);
  const ref = React.useRef();
  const handleDownloadImage = async () => {
    const element = document.getElementById('print'),
      canvas = await html2canvas(element),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');
    link.href = data;
    link.download = 'downloaded-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Dialog
        ref={ref}
        size="lg"
        open={!open}
        handler={handleOpen}
        className="overflow-scroll h-5/6"
        style={{
          height: "",
          width: "100%",
        }}
      >
        <DialogBody className="relaive w-full" id="print">
            {
              combo?
                <Image
                  alt="Đang tải hình..."
                  src={`/image/tt${combo}.jpg`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                /> : <Image
                  alt="Đang tải hình..."
                  src="/image/tt2.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
            }
            <div className="absolute top-0 2xl:top-8 xl:top-14 lg:top-14 md:top-20 sm:top-14 left-1/2 translate-y-20 sm:translate-y-1/2  -translate-x-1/2 w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
              <div className="bg-white w-full py-1 px-3  rounded-md">
                <p className="text-black text-xs lg:text-base">
                  Khách hàng: <span className="uppercase">{name}</span>
                </p>
              </div>
              <div className="mt-2 bg-white w-full py-1 px-3 rounded-md">
                <p className="text-black text-xs lg:text-base">
                  Số điện thoại: {phone}
                </p>
              </div>
              <div className="mt-2 bg-white w-full py-1 h-14  px-3 rounded-md 2xl:h-28 xl:h-24 lg:h-14 h-auto">
                <p className="text-black text-xs lg:text-base">
                  Địa chỉ: {address}
                </p>
              </div>
            </div>
          </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => { }}
            className="mr-1"
          >
            <span>Bỏ qua</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleDownloadImage}
          >
            <span>Tải về</span>
          </Button>
        </DialogFooter>
        {/* <GeneratePDF html={ref} close={handleOpen}/> */}
      </Dialog>
    </>
  );
}
