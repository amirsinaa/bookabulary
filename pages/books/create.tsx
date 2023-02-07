import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { POST_BOOK } from "@/components/book/api/POST_BOOK";
import type { Book } from "@/components/book/types/book";
import type { GetServerSideProps, NextPage } from "next";
import { Textarea } from "@/components/common/textarea";
import { User } from "@/components/user/types/profile";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/common/input";
import React, { useState } from "react";
import ReactQueryUiErrorHandler from "@/components/common/react-query-ui-error";

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/user/auth",
  async getServerSideProps(ctx, supabase) {
    const { data: { session: { user } } } = await supabase.auth.getSession();
    return { props: { user } }
  },
})

const CreateBooksPage: NextPage = ({ user }: User) => {
  const bookMutation = useMutation((book: Book) => POST_BOOK(book));
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <form className={`flex flex-col space-y-4`} onSubmit={(e) => {
      e.preventDefault();
      return bookMutation.mutate({
        name: name,
        description: description,
        profile_id: user.id,
      })
    }}>
      <h1 className="text-4xl font-semibold">Create a book</h1>
      <div className="form-group">
        <label className="text-md" htmlFor="name">Book name:</label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter the title of the book"
          aria-placeholder="Enter the title of the book"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>
      <div className="relative form-group">
        <label className="text-md" htmlFor="description">Book Description:</label>
        <Textarea
          type="text"
          maxLength="200"
          id="description"
          name="description"
          placeholder="Enter is this book about ?"
          aria-placeholder="Enter is this book about ?"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
        <span className="absolute bottom-0 right-0 p-4">{description.length}/200</span>
      </div>
      <ReactQueryUiErrorHandler queryKey={bookMutation} />
      <div>
        <button
          className="w-full btn"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateBooksPage;