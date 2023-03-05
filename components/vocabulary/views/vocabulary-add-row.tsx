import { PlusIcon } from '@radix-ui/react-icons';

const VocabularyAddRow = ({ table, cacheDispatcher }) => {
  return (
    <div className='border-0 m-0 hover:cursor-pointer flex justify-center bg-lime-50 hover:bg-lime-200 rounded-b-md' onClick={
      () => {
        return cacheDispatcher(old => [...old, {
          id: table.getRowModel().rows.length++,
          original: {},
          translations: {}
        }])

      }}>
      <PlusIcon width={34} height={34} className='text-lime-800 font-bold' />
    </div>
  )
}

export default VocabularyAddRow;