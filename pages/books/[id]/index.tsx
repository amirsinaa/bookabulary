import ReactQueryUiErrorHandler from '@/components/common/react-query-ui-error'
import { VocabularyCard } from '@/components/vocabulary/views/vocabulary-card'
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import {
	GET_BOOK_PUBLIC_VOCABULARIES,
	GET_BOOK_ALL_VOCABULARIES,
} from '@/components/vocabulary/api/GET_BOOK_VOCABULARIES'
import { LoadingContentSkeleton } from '@/components/common/loading-content-skeleton'
import type {
	GetServerSidePropsContext,
	GetServerSideProps,
	NextPage,
} from 'next'
import { QueryClient, useQuery, dehydrate } from '@tanstack/react-query'
import REACT_QUERY_DEFAULT_OPTIONS from '@/constant/react-query-options'
import { GET_BOOK } from '@/components/book/api/GET_BOOK'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/common/button'
import { Book } from '@/components/book/views/book'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const queryClient = new QueryClient(REACT_QUERY_DEFAULT_OPTIONS)
export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext,
) => {
	const supabase = createServerSupabaseClient(ctx)
	const {
		data: { session },
	} = await supabase.auth.getSession()
	const { id } = ctx.params
	await queryClient.prefetchQuery(['book', id], () => GET_BOOK(String(id)))
	await queryClient.prefetchQuery(['book-vocabularies', id], () =>
		GET_BOOK_PUBLIC_VOCABULARIES(String(id)),
	)

	return {
		props: {
			initialSession: session,
			dehydratedState: dehydrate(queryClient),
			user: session?.user ?? { user: 'not-authed' },
		},
	}
}

const BooksPage: NextPage = ({ user }: { user: User }) => {
	const router = useRouter()
	const {
		query: { id },
	} = router
	const {
		isLoading,
		data: book,
		error,
	} = useQuery(['book', id], () => GET_BOOK(String(id)))
	const isOwner = user.id === book?.data?.profile_id

	const {
		isLoading: vocabulariesIsLoading,
		data: vocabularies,
		error: vocabulariesError,
	} = useQuery(['book-vocabularies', id], () =>
		isOwner
			? GET_BOOK_ALL_VOCABULARIES(String(id))
			: GET_BOOK_PUBLIC_VOCABULARIES(String(id)),
	)

	if (error instanceof Error)
		return <ReactQueryUiErrorHandler queryKey={book} />
	{
		isLoading ? 'Loading ...' : ''
	}
	return (
		<>
			<Head>
				<title>List of {book?.data?.name} vocabularies</title>
			</Head>
			<section className='book-page'>
				<Button
					onClick={() => router.back()}
					classOverrides='ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110'>
					<ArrowLeftIcon className='mt-5' width={45} height={45} />
				</Button>
				<Book book={book}>
					{vocabulariesIsLoading && <LoadingContentSkeleton format={4} />}
					{vocabulariesError instanceof Error && (
						<p>{vocabulariesError.message}</p>
					)}
					<section className='flex flex-row flex-wrap justify-center p-2 my-8 md:p-12 md:my-10 rounded-xl bg-lime-100 drop-shadow-xl'>
						{vocabularies.data.length === 0 ? (
							<div className='flex flex-col items-center m-auto f-full'>
								<h5 className='pb-10 text-4xl font-bold text-center text-teal-800 dark:text-white'>
									No vocabulary yet!
								</h5>
								{vocabularies.data.length === 0 && isOwner && (
									<Button classOverrides='btn'>
										<Link
											href='/books/vocabulary/create'
											className='hover:cursor-pointer'>
											Create one
										</Link>
									</Button>
								)}
							</div>
						) : (
							vocabularies?.data?.map((vocabulary) => {
								return <VocabularyCard key={vocabulary.id} data={vocabulary} />
							})
						)}
					</section>
					{vocabularies.data.length !== 0 && isOwner && (
						<div className='flex justify-center items-center text-center'>
							<Button classOverrides='btn'>
								<Link
									href='/books/vocabulary/create'
									className='hover:cursor-pointer'>
									Create a new one
								</Link>
							</Button>
						</div>
					)}
				</Book>
			</section>
		</>
	)
}

export default BooksPage
