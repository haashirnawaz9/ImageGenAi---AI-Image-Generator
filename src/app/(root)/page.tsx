import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex items-center justify-center shadow-lg animate-fadeInUp">
      <section className="text-center px-6 p-8 shadow-slate-300 bg-slate-900">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#60a5fa] leading-tight mb-6 shadow-md">
          Turn Ideas into Reality <br className="hidden md:block" /> with AI.
        </h1>
        <p className="text-lg md:text-2xl text-[#dbeafe] max-w-2xl mx-auto mb-8 shadow-md">
          Unlock creativity like never before. Generate breathtaking images tailored to your imagination with cutting-edge artificial intelligence.
        </p>
        <button className="mt-6 py-3 px-8 bg-[#2563eb] hover:bg-[#1e40af] rounded-lg text-lg font-medium transition">
          <Link href='/main' >Get Started</Link>
        </button>
        <div className="mt-12">
          {/* Image rendering for the AI Generated Art */}
          <Image
            src="/ai.jpg"
            alt="Example AI Generated Art"
            width={900}  // High resolution for clarity
            height={600}
            className="rounded-lg shadow-lg mx-auto"
            layout="intrinsic"
            priority
          />
        </div>
      </section>
    </div>
  );
}
