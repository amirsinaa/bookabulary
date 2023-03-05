import { vocabularyMutationMethod } from '@/components/vocabulary/utils/vocabulary-mutation';
import { RocketIcon, MagicWandIcon } from '@radix-ui/react-icons';

const VocabularySave = ({ data, mutation }) => {
  const { vocabularyId } = data
  console.log(data)
  console.log(mutation)
  return (
    <button className={`mt-4 rounded-sm w-full btn-light text-xl flex gap-2 py-2 justify-center ${!!mutation.isLoading ? 'animate-pulse' : ''}`} onClick={() => {
      mutation.mutate(vocabularyId === null ? vocabularyMutationMethod('CREATE', data) : vocabularyMutationMethod('UPDATE', data))
    }

    }>{!!mutation.isLoading ? <>
      Saving ... <RocketIcon className='animate-bounce' width={34} height={34} />
    </>
      : <>Save <MagicWandIcon width={34} height={34} /></>} </button>
  )
}

export default VocabularySave;