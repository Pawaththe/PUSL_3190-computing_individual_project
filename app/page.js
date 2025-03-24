import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Hero from "./dashboard/_components/Hero";

export default function Home() {
  return (
    <div>

      {/* Header */}

      <div className="flex justify-between p-5 shadow-md">
      <Image src={'/logo.svg'} width={80} height={100}/>
      <Link href={'/dashboard'}>
        <Button>Get Started</Button>
      </Link>
      </div>

      {/* Body Section */}

      <Hero/>


    </div>
    
  );
}
