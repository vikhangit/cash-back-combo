"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("../../components/GeneratePdf"), {
  ssr: false,
});

export default function KTTK() {
  const ref = React.useRef();
  const [tt, setTt] = React.useState({});
  React.useEffect(() => {
    setTt(JSON.parse(localStorage.getItem("data")));
  }, []);
  return (
    <>
      <div ref={ref} className=" w-2/3 mx-auto">
        <div className="relaive w-full mx-auto">
          <Image
            alt=""
            src={`/image/tt${tt.combo}.jpg`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100vh",
            }}
          />
          <div className="absolute top-20 w-2/3 left-1/2 -translate-x-1/2 px-20">
            <div className="bg-white w-full py-1 xl:py-2.5 px-3 xl:px-6 rounded-md">
              <p className="text-black">
                Khách hàng: <span className="uppercase"> {tt.name}</span>
              </p>
            </div>
            <div className="mt-2 bg-white w-full py-1 xl:py-2.5 px-3 xl:px-6 rounded-md">
              <p className="text-black">Số điện thoại: {tt.phone}</p>
            </div>
            <div className="mt-2 bg-white w-full py-1 xl:py-2.5 h-auto  px-3 xl:px-6 lg:h-20 xl:h-28 2xl:h-32 rounded-md">
              <p className="text-black">
                Địa chỉ:
                {`${tt.address}, ${tt.phuong_xa}, ${tt.tinh_thanh}`}
              </p>
            </div>
          </div>
        </div>
        <GeneratePDF html={ref} close={() => {}} />
      </div>
    </>
  );
}
