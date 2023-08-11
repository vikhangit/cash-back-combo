"use client"
import { Button } from '@material-tailwind/react';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'

export default function TBpage() {
    const router = useRouter()
    const [detail, setDetail] = useState({})
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
    useEffect(() => {
        setDetail(JSON.parse(localStorage.getItem("orderInfo")));
    }, []);
  return (
    <div className='py-4'>
          <div className='mb-4 flex justify-end'>
              <Button
                  variant="gradient"
                  color="red"
                  className='mr-2 flex items-center'
                  onClick={() => router.push("/")}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                  </svg>

                  <span className='ml-2'>Trở về</span>
              </Button>
              <Button
                  variant="gradient"
                  color="green"
                  className='flex items-center'
                  onClick={handleDownloadImage}
              >
                  <span className='mr-2'>Tải về</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>

              </Button>
          </div>
          <div className="relaive w-full mx-auto" id="print">
              {
              detail?.combo === "1" ?
              <img
                alt="Đang tải hình..."
                src="/image/z4593787464302_cac9b1781c42faedff7aad2e9e2137e7.jpg"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              /> : 
              <img
                alt="NextUI hero Image"
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

              <div className="absolute top-16 sm:top-20 md:top-28 lg:top-32 xl:top-40 2xl:top-44 left-1/2 translate-y-1/2 -translate-x-1/2 w-3/4 md:w-1/2">
                  <div className="bg-white w-full py-1 px-3  rounded-md">
                      <p className="text-black text-xs lg:text-base">
                          Khách hàng: <span className="uppercase">{detail?.name}</span>
                      </p>
                  </div>
                  <div className="mt-2 bg-white w-full py-1 px-3 rounded-md">
                      <p className="text-black text-xs lg:text-base">
                          Số điện thoại: {detail?.phone}
                      </p>
                  </div>
                  <div className="mt-2 bg-white w-full py-1 h-14  px-3 rounded-md 2xl:h-28 md:h-16 lg:h-20 h-16">
                      <p className="text-black text-xs lg:text-base">
                          Địa chỉ: {`${detail?.address}, ${detail?.phuong_xa}, ${detail?.tinh_thanh}`}
                      </p>
                  </div>
              </div>
          </div>
    </div>
  )
}
