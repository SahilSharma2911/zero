import Link from "next/link";
import Menu from "@/components/Menu/Menu";
import Navbar from "@/components/Navbar/Navbar";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Left side  */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 lg:p-4 bg-red-300">
        <Link href="/" className=" flex items-center ">
          <span className="">
            {/* <Image
              src={Logo}
              alt=""
              width={100}
              height={100}
              className="w-14 "
            /> */}
          </span>
          <span className="hidden lg:block font-Poppins font-bold ">
            CampusPilot
          </span>
        </Link>
        <Menu />
      </div>

      {/* right side  */}
      <div className=" w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
