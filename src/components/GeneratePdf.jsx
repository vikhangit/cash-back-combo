"use client"
import { Button, DialogFooter } from '@material-tailwind/react'
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import React from 'react'
import { useRouter } from 'next/navigation';

export default function GeneratePdf({html, close}) {
    const router = useRouter()
    const generatePdf = () => {
      const doc = new jsPDF();

      let split = doc.splitTextToSize(
        document.getElementById("text").innerText,
        350
      );
      let image = document.getElementById("image").getAttribute("src");
      doc.text(document.querySelector(".content > h1").innerHTML, 75, 5);
      doc.addImage(image, 70, 7, 1000, 1000);
      doc.text(split, 5, 75);
      doc.output("dataurlnewwindow");
    };

    const generateImage = async () => {
      const image = await toPng(html.current, { quality: 0.95 });
      const doc = new jsPDF();

      doc.addImage(image, "png", 0, 0, 150, 160);
      doc.save();
    };
  return (
    <DialogFooter>
      <Button variant="text" color="red" onClick={() => router.back()} className="mr-1">
        <span>Về tran đạt hăng</span>
      </Button>
      <Button variant="gradient" color="green" onClick={generateImage}>
        <span>Tải về</span>
      </Button>
    </DialogFooter>
  );
}
