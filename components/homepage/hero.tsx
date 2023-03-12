import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero py-10 dark:bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] dark:from-lime-500 dark:via-teal-600 dark:to-purple-800 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-lime-100 via-teal-200 to-purple-400">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="mockup-phone border-primary">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo  phone-1">
              <Image
                src="/sample-table.png"
                alt="sample vocabulary table"
                width={320}
                height={800}
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-8/12 text-center lg:text-left">
          <h1 className="text-6xl font-bold">Bookabulary</h1>
          <p className="py-6">A special place for all of your vocabularies</p>
          <button className="p-4 rounded-md btn-accent"><Link href="/books">Get Started</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Hero;