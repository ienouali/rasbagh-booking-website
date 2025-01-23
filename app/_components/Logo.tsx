import Link from "next/link";
import Image from "next/image";
import logo from '@/public/logo.png';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
        { /* <Image src={"/logo.png"} height="60" width="60" alt="The Wild Oasis logo"/> */}
      <Image src={logo} height="60" width="60" quality={100} alt="Kasbagh Morocco logo" />
      <span className="text-xl font-semibold text-primary-100">
        Kasbagh Morocco
      </span>
    </Link>
  );
}

export default Logo;
