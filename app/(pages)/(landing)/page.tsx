"use client";

import { Typewriter } from "react-simple-typewriter";
import styles from "./landing.module.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { signIn } from "@/backend/auth";

export default function Home() {
  const router = useRouter();
  const { signedIn } = useAuth();

  return (
    <main>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <section className="w-screen h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-center text-6xl font-bold mb-6">Find <Typewriter words={['food banks.', 'homeless shelters.', 'soup kitchens.', 'your people.']}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={60}
          delaySpeed={2500}
        /></h1>
        <p className="text-gray-500 text-2xl max-w-[650px] text-center mb-8">Access resources and a loving and accepting community to help escape poverty.</p>
        <div className="grid grid-cols-2 gap-4">
          <Button color="primary" className="text-xl font-medium px-5 py-6" onPress={() => {
            if (signedIn) router.push("/find");
            else signIn();
          }}>Get Started</Button>
          <Link href="/mission"><Button className="text-xl font-medium px-5 py-6">Learn More</Button></Link>
        </div>
      </section>
    </main>
  );
}
