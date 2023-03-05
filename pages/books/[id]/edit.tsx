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
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import REACT_QUERY_DEFAULT_OPTIONS from "@/constant/react-query-options";
import { GET_BOOK } from '@/components/book/api/GET_BOOK';
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import { RocketIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { useColorMode } from '@/context/color-mode.context';
import { ToastContainer, toast } from 'react-toastify';
import { UPDATE_BOOK } from "@/components/book/api/UPDATE_BOOK";
import { useRouter } from "next/router";
import type { Book } from "@/components/book/types/book";
import { Textarea } from "@/components/common/textarea";
import { useMutation } from "@tanstack/react-query";
import { Tag } from '@/components/common/tag';
import { Input } from "@/components/common/input";
import { useState, useEffect } from "react";

const queryClient = new QueryClient(REACT_QUERY_DEFAULT_OPTIONS);
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

  const { id } = ctx.params;
  await queryClient.prefetchQuery(["edit-book", id], () => GET_BOOK(String(id)));

  return {
    props: {
      initialSession: session,
      dehydratedState: dehydrate(queryClient),
      user: session.user
    }
  };
};

const EditBooksPage: NextPage = ({ user }: { user: User }) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { query: { id } } = router;
  const { isLoading: loading, data: book, error } = useQuery(["edit-book", id], () => GET_BOOK(String(id)));
  { error && <p>error</p> }
  const bookUpdateMutation = useMutation((book: Book) => UPDATE_BOOK(id, book));
  const [description, setDescription] = useState<string>(() => book.data.description);
  const [name, setName] = useState<string>(() => book.data.name);
  const notifySuccessfulPost = () => toast('Data has been updated successfully!');
  const notifyUnSuccessfulPost = () => toast('There was an issue with updating your data!!');

  useEffect(() => {
    if (bookUpdateMutation.isSuccess && bookUpdateMutation.data.error === null) {
      notifySuccessfulPost();
    } else if (bookUpdateMutation.isSuccess && bookUpdateMutation.data.error) {
      notifyUnSuccessfulPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookUpdateMutation.isSuccess]);



  return (
    <section className="edit-book-page">
      <Button
        onClick={() => router.back()}
        classOverrides="ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110"
      >
        <ArrowLeftIcon className="mt-5" width={45} height={45} />
      </Button>
      <form className={`flex flex-col space-y-4`} onSubmit={(e) => {
        e.preventDefault();
        return bookUpdateMutation.mutate({
          description: description,
          id: book.data.id,
          profile_id: user.id,
          name: name,
        })
      }}>
        <h1 className="text-3xl mt-2 text-center font-semibold">You are editing <Tag color='text-white' background='bg-lime-700'>{name}</Tag></h1>
        <div className="form-group">
          <label className="text-md" htmlFor="name">Book name:</label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter the title of the book"
            value={name}
            isLoading={loading}
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
            value={description}
            isLoading={loading}
            name="description"
            placeholder="Enter is this book about ?"
            aria-placeholder="Enter is this book about ?"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
          <span className="absolute bottom-0 right-0 p-4">{description.length}/200</span>
        </div>
        <ReactQueryUiErrorHandler queryKey={bookUpdateMutation} />
        <div>
          <button
            className={`mt-4 rounded-sm w-full btn text-xl flex gap-2 py-2 justify-center ${!!bookUpdateMutation.isLoading ? 'animate-pulse' : ''}`}
            type="submit"
          >
            {!!bookUpdateMutation.isLoading ? <>
              Saving ... <RocketIcon className='animate-bounce' width={34} height={34} />
            </>
              : <>Save <MagicWandIcon width={34} height={34} /></>}
          </button>
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={colorMode === 'light' ? 'light' : 'dark'}
          />
        </div>
      </form>
    </section>
  );
};

export default EditBooksPage;