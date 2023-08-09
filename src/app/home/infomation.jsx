import Image from 'next/image'
import React from 'react'

export default function Infomation() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-10 mt-10">
      <div className="w-full flex flex-col items-center md:basis-3/4 md:block">
        <p className="text-lg underline font-medium">Thông tin chuyển khoản</p>
        <h1 className="text-lg uppercase">Công ty cổ phần goodcharme</h1>
        <h1 className="text-lg uppercase">Ngân hàng vietcombank</h1>
        <p className="text-lg">
          STK:<span className="font-semibold ml-1">10 3777 6888</span>
        </p>
        <p className="text-lg text-rose-500 mt-8">*Nội dung chuyển tiền là:</p>
        <p className="text-lg text-rose-500">
          Nhập số CĂN CƯỚC CÔNG DÂN, ví dụ: 123456789012
        </p>
      </div>
      <div className="w-full mt-10 md:margin-0 md:basis-1/4 flex flex-col items-center">
        <div className="pt-3 pl-4 pr-2 pb-2 bg-indigo-100 rounded-2xl">
          <Image
            alt=""
            src="/image/add-file.png"
            width={100}
            height={100}
            sizes="100vw"
          />
        </div>
        <p className="text-lg">Upload biên lai</p>
      </div>
    </div>
  );
}