import { GitHub, Instagram, X } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className=" py-6 flex justify-between max-w-[1700px] px-5 mx-auto shadow-md">
      <Link href={"/"}>
        <h2 className=" font-extrabold font-logoFont text-xl inline-block uppercase bg-gradient-to-r from-orange-700 to-orange-400 text-transparent bg-clip-text ">
          Coin Street
        </h2>
      </Link>
      <main className=" flex gap-5">
        <a
          href="https://twitter.com/ArihamSK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <X />
        </a>
        <a
          href="https://www.instagram.com/raymondking.i.o/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
        <a
          href="https://github.com/Raymondkingjnr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
      </main>
    </div>
  );
};

export default Header;
