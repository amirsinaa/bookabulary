//TODO: refactor and seprate components and extract logics to custom hooks

import React from 'react'
import {
  RowData,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  UPDATE_VOCABULARY
} from '@/components/vocabulary/api/UPDATE_VOCABULARY';
import {
  CREATE_VOCABULARY
} from '@/components/vocabulary/api/CREATE_VOCABULARY';
import { useColorMode } from '@/context/color-mode.context';
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import ReactTableColumnSkeleton from '../views/react-table-column-skeleton'
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/common/input';
import VocabularyTableRow from './vocabulary-table-row';
import ReactQueryUiErrorHandler from '@/components/common/react-query-ui-error';
import VocabularyTableTitle from './vocabulary-table-title';
import VocabularyTableColumnsTitle from './vocabulary-table-columns-title';
import VocabularyFormControls from '../views/vocabulary-table-controls'
import type { DictionaryData } from '../types/vocabulary';

import {
  PlusIcon,
  RocketIcon,
  MagicWandIcon,
} from '@radix-ui/react-icons';


import useSkipper from '../hooks/use-skipper';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

export const Vocabulary = ({
  vocabularyOwner = '',
  profileId = '',
  bookId,
  vocabularyId = null,
  title = 'Enter a title',
  dictionary = [] }) => {
  const { colorMode } = useColorMode();
  const [vocabularyTitle, setVocabularyTitle] = React.useState(title);
  const columns = React.useMemo<ColumnDef<DictionaryData>[]>(
    () => [
      {
        header: vocabularyTitle,
        columns: [
          {
            id: 'tableStateOriginalWord',
            accessorKey: 'tableStateOriginalWord',
            accessorFn: row => row.original.value,
            header: () => <span>Original Word</span>,
          },
          {
            id: 'tableStateTranslationWord',
            accessorKey: 'tableStateTranslationWord',
            accessorFn: row => row.translations.value,
            header: () => <span>Translation</span>,
          },
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const isOwner: Boolean = vocabularyOwner === profileId ? true : false;
  const [data, setData] = React.useState<DictionaryData[]>(dictionary);
  const [tableCacheFlag, setTableCacheFlag] = React.useState(false);
  const vocabularyMutation = useMutation((vocabulary) => vocabularyId ? UPDATE_VOCABULARY(vocabulary) : CREATE_VOCABULARY(vocabulary));
  const vocabularyMutationMethod = (method: 'UPDATE' | 'CREATE') => {
    if (method === 'UPDATE') {
      return {
        vocabularyId: vocabularyId,
        bookId: bookId,
        updates: {
          title: vocabularyTitle,
          dictionary: { data: data }
        }
      }
    } else {
      return {
        updates: {
          book_id: bookId,
          profile_id: profileId,
          title: vocabularyTitle,
          dictionary: { data: data }
        }
      }
    }
  }

  const notifySuccessfulPost = () => toast('Data has been updated successfully!');
  const notifyUnSuccessfulPost = () => toast('There was an issue with updating your data!!');
  const initialRender = React.useRef(true);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      setTableCacheFlag(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, vocabularyTitle, tableCacheFlag])
  React.useEffect(() => {
    if (vocabularyMutation.isSuccess && vocabularyMutation.data.error === null) {
      notifySuccessfulPost();
    } else if (vocabularyMutation.isSuccess && vocabularyMutation.data.error) {
      notifyUnSuccessfulPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocabularyMutation.isSuccess]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: ReactTableColumnSkeleton,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex()
        //@ts-expect-error
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              if (columnId === 'tableStateOriginalWord') {
                const newState = {
                  ...old[rowIndex]!,
                  'id': row.id,
                  'original': {
                    'language': row.original.language,
                    'value': value
                  },
                  'translations': {
                    'language': row.translations.language,
                    'value': row.translations.value
                  }
                }
                return newState;
              } else {
                const newState = {
                  ...old[rowIndex]!,
                  'id': row.id,
                  'original': {
                    'language': row.original.language,
                    'value': row.original.value
                  },
                  'translations': {
                    'language': row.translations.language,
                    'value': value
                  }
                }
                return newState;
              }
            }
            return row
          })
        )
      },
    }
  })

  return (
    <article>
      <div>
        <table className='w-full p-0'>
          <thead>
            <VocabularyTableTitle table={table}>
              <Input
                type='text'
                classOverrides='border-0 rounded-t-md block w-full py-5 text-center font-extrabold text-2xl bg-lime-200 shadow focus:outline-none focus:bg-lime-300 dark:text-black'
                value={vocabularyTitle as string}
                onChange={e => setVocabularyTitle(e.target.value)}
                placeholder='Enter a title'
              />
            </VocabularyTableTitle>
            <VocabularyTableColumnsTitle table={table} />
          </thead>
          <tbody>
            <VocabularyTableRow table={table} />
          </tbody>
        </table>

        {(!table.getCanNextPage() && isOwner) && <div className='border-0 m-0 hover:cursor-pointer flex justify-center bg-lime-50 hover:bg-lime-200 rounded-b-md' onClick={
          () => {
            // @ts-expect-error
            return setData(old => [...old, {
              id: table.getRowModel().rows.length++,
              original: {},
              translations: {}
            }])

          }}>
          <PlusIcon width={34} height={34} className='text-lime-800 font-bold' />
        </div>}

        {table.getCanNextPage() && <VocabularyFormControls table={table} />}

        <ReactQueryUiErrorHandler queryKey={vocabularyMutation} />

        {(tableCacheFlag && isOwner) && <button className={`mt-4 rounded-sm w-full btn-light text-xl flex gap-2 py-2 justify-center ${!!vocabularyMutation.isLoading ? 'animate-pulse' : ''}`} onClick={() => {
          //@ts-expect-error
          vocabularyMutation.mutate(vocabularyId === null ? vocabularyMutationMethod('CREATE') : vocabularyMutationMethod('UPDATE'))
        }

        }>{!!vocabularyMutation.isLoading ? <>
          Saving ... <RocketIcon className='animate-bounce' width={34} height={34} />
        </>
          : <>Save <MagicWandIcon width={34} height={34} /></>} </button>}
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
    </article>
  );
}