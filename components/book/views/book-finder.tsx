
import { useBookSearch } from "@/components/book/hooks/use-book-search";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { BookCard } from "@/components/book/views/book-card";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import React, { useState } from "react";
import Link from "next/link";

export const BookFinder = () => {
  const [bookName, setBookName] = useState<string>("");
  const books = useBookSearch({ bookName });

  return (
    <section className="flex flex-col flex-wrap justify-center">
      <h3 className="py-10 text-4xl font-bold text-center text-teal-800 dark:text-white">Find a book you&quot;re reading</h3>
      <div className="relative">
        {(books.fetchStatus !== "idle" && books.isLoading) && <LoadingSpinner color="text-teal-800" className="absolute right-0 w-10 h-full flex-col justify-center" />}
        <Input type="text" name="bookName" aria-placeholder="Enter a book name" placeholder="Enter a book name" value={bookName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookName(e.target.value)} />
      </div>
      <div className="flex flex-row flex-wrap mb-10 book-search-result">
        {books?.data?.data.map(item => {
          return (
            <BookCard key={item.id} book={item} />
          )
        })}
      </div>
      <p className="flex flex-row items-center m-auto f-full">Didn&quot;t find the book you are looking for or you want to submit yours? <Button extraConfig="btn"><Link href="/books/create" className="hover:cursor-pointer">Create yours</Link></Button></p>
    </section>
  );
}