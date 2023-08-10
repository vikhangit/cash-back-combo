"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image';

export default function KTTK() {
    
    const searchParams = useSearchParams();
    const combo = searchParams.get("combo");
  return (
    <div>
      <div>
        <Image
          alt=""
          src={`/image/tt${combo === "1" ? "1" : "2"}.jpg`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
