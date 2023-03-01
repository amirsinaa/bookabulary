import ReactQueryUiErrorHandler from "@/components/common/react-query-ui-error";
import {
  createServerSupabaseClient,
  User
} from "@supabase/auth-helpers-nextjs";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from "next";
import { POST_BOOK } from "@/components/book/api/POST_BOOK";
import type { Book } from "@/components/book/types/book";
import { Textarea } from "@/components/common/textarea";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/common/input";
import React, { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/user/auth',
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user
    }
  };
};

const CreateBooksPage: NextPage = ({ user }: { user: User }) => {
  const bookMutation = useMutation((book: Book) => POST_BOOK(book));
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();

  return (
    <section className="edit-book-page">
      <Button
        onClick={() => router.back()}
        extraConfig="ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110"
      >
        <ArrowLeftIcon className="mt-5" width={45} height={45} />
      </Button>

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
    </section>
  );
};

export default CreateBooksPage;