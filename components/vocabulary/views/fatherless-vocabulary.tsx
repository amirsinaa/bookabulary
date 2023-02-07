import { Button } from "@/components/common/button";
import Link from "next/link";


const FatherLessVocabulary = () => {
  return (
    <section className="flex flex-row flex-wrap justify-center p-2 my-8 md:p-12 md:my-10 rounded-xl bg-lime-100 drop-shadow-xl">
      <p className="flex flex-col items-center m-auto f-full text-2xl font-normal text-center text-teal-800">You are trying to create a vocabulary that doesnt have a parent book<Button extraConfig='text-sm btn font-normal mt-4'>
        <Link
          href="/books/create" className='hover:cursor-pointer'>
          Create one
        </Link>
      </Button>
      </p>
    </section>

  )
}
export default FatherLessVocabulary;