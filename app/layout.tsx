import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: "Groww Checkout",
  description: "Checkout Page for Groww",
  icons: ['/favicon.ico']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`bg-[#fafafa] ${poppins.className}`}>
        <div className='w-full mt-[3vh] flex items-center justify-center'>
          <Image src='/logo.png' alt='Groww Logo' className={
            'md:w-[10vw] w-[35vw]'
          } width={200} height={200} />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
