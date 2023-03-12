import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from 'next'
import REACT_QUERY_DEFAULT_OPTIONS, {
	REACT_QUERY_VOCABULARY_TABLE_CACHE,
} from '@/constant/react-query-options'
import { GET_VOCABULARY } from '@/components/vocabulary/api/GET_VOCABULARY'
import { QueryClient, useQuery, dehydrate } from '@tanstack/react-query'
import { Vocabulary } from '@/components/vocabulary/views/vocabulary'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/common/button'
import { useRouter } from 'next/router'
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
	await queryClient.prefetchQuery(
		['vocabulary', id],
		() => GET_VOCABULARY(String(id)),
		REACT_QUERY_VOCABULARY_TABLE_CACHE,
	)

	// const queryData = queryClient.getQueriesData(['vocabulary'])
	// if (
	// 	(session === null && queryData[0][1].data.is_private) ||
	// 	(session?.user?.id !== queryData[0][1].data.profile_id &&
	// 		queryData[0][1].data.is_private)
	// )
	// 	return {
	// 		redirect: {
	// 			destination: '/user/auth',
	// 			permanent: false,
	// 		},
	// 	}

	return {
		props: {
			initialSession: session,
			dehydratedState: dehydrate(queryClient),
			user: session?.user ?? { user: 'not-authed' },
		},
	}
}

const VocabularyPage: NextPage = ({ user }: { user: User }) => {
	const router = useRouter()
	const {
		query: { id },
	} = router

	const {
		isLoading,
		data: vocabulary,
		error,
	} = useQuery(
		['vocabulary', id],
		() => GET_VOCABULARY(String(id)),
		REACT_QUERY_VOCABULARY_TABLE_CACHE,
	)
	{
		error && <p>error</p>
	}
	{
		isLoading ? 'Loading ...' : ''
	}

	return (
		<>
			<Head>
				<title>{vocabulary?.data?.title}</title>
			</Head>
			<section className='vocabulary-page'>
				<Button
					onClick={() => router.back()}
					classOverrides='ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110'>
					<ArrowLeftIcon className='mt-5' width={45} height={45} />
				</Button>
				<Vocabulary
					dictionary={vocabulary.data.dictionary.data}
					vocabularyOwner={vocabulary.data.profile_id}
					isPrivate={vocabulary.data.is_private}
					vocabularyId={vocabulary.data.id}
					bookId={vocabulary.data.book_id}
					title={vocabulary.data.title}
					profileId={user.id}
				/>
			</section>
		</>
	)
}

export default VocabularyPage
