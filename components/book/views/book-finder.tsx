import { GET_BOOKS_LIST } from "@/components/book/api/GET_BOOKS_LIST";
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { BookCard } from "@/components/book/views/book-card";
import { Button } from '@/components/common/button';
import { Input } from "@/components/common/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

export const BookFinder = () => {
  const [bookName, setBookName] = useState("");

  const { isLoading, data: books } = useQuery(["book-finder-result", bookName], () => GET_BOOKS_LIST(bookName));
  return (
    <section className="flex flex-col flex-wrap justify-center">
      <h3 className="py-10 text-4xl font-bold text-center text-teal-800">Find a book you're reading</h3>
      <div className="relative">
        {isLoading && <LoadingSpinner color="text-teal-800" />}
        <Input isLoading={isLoading} type="text" name="bookName" aria-placeholder="Enter a book name" placeholder="Enter a book name" value={bookName} onChange={(e) => setBookName(e.target.value)} />
      </div>


      <div className="flex flex-row flex-wrap mb-10 book-search-result">
        {books?.data?.map(item => {
          return (
            <BookCard key={item.id} book={item} />
          )
        })}
      </div>
      <p className="flex flex-row items-center m-auto f-full">Didn't find the book you are looking for or you want to submit yours? <Button><Link href="/books/create" className='hover:cursor-pointer'>Create yours</Link></Button></p>
    </section>
  );
}