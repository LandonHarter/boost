import Image from "next/image";
import styles from "./mission.module.css";

export default function MissionPage() {
    return (
        <main className="w-screen mt-[80px] flex flex-col items-center">
            <h1 className="text-8xl text-center font-extrabold mb-6"><span className={styles.text_background}>Our Mission</span></h1>
            <p className="text-gray-500 text-xl mb-20">Fighting to connect and support struggling and homeless families.</p>
            <Image src="/images/homeless.jpg" alt="Homeless Lady" width={1920} height={1080} className="rounded-2xl w-[80vw] max-w-[700px] mb-32" />

            <div className="flex flex-col w-[65vw]">
                <h2 className="text-4xl text-center font-bold mb-4 w-fit">What do we fight for?</h2>
                <p className="text-gray-500 w-full text-lg mb-24">We are dedicated to bridging the gap between homelessness and hope. Our mission is to empower homeless individuals by providing them with a comprehensive list of resources, locations, and communities that can offer immediate assistance. We believe in the power of connection and strive to create a platform where help is just a click away. Through our website, we aim to make a tangible difference in the lives of those who are homeless, helping them find the support they need to move forward. We envision a world where everyone has access to the resources they need, and we are committed to making this vision a reality. Together, we can transform lives, one connection at a time.</p>

                <h2 className="text-4xl text-center font-bold mb-4 w-fit">What are we doing to help?</h2>
                <p className="text-gray-500 w-full text-lg mb-24">We serve as a digital lifeline for homeless individuals, providing a comprehensive directory of resources. Our platform lists various locations, from shelters to food banks, that offer immediate assistance. We also connect users with supportive communities, fostering a sense of belonging and mutual aid. In addition, we provide information about job opportunities and healthcare services to help individuals regain independence. Our website is continuously updated to ensure the relevance and accuracy of the information. At the heart of our work is the belief that everyone deserves access to the resources they need to thrive.</p>
            </div>
        </main>
    );
}