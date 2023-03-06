import { useState, useRef, useEffect, useMemo } from "react"
import {
  RowData,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  UPDATE_VOCABULARY
} from "@/components/vocabulary/api/UPDATE_VOCABULARY";
import {
  CREATE_VOCABULARY
} from "@/components/vocabulary/api/CREATE_VOCABULARY";
import {
  handleVocabularyDataUpdate
} from '@/components/vocabulary/utils/vocabulary-mutation';
import ReactQueryUiErrorHandler from "@/components/common/react-query-ui-error";
import ReactTableColumnSkeleton from "../views/react-table-column-skeleton"
import VocabularyTableColumnsTitle from "./vocabulary-table-columns-title";
import VocabularyFormControls from "../views/vocabulary-table-controls"
import { ToggleCheckbox } from "@/components/common/toggle-checkbox";
import { useColorMode } from "@/context/color-mode.context";
import VocabularyTableTitle from "./vocabulary-table-title";
import type { DictionaryData } from "../types/vocabulary";
import VocabularyTableRow from "./vocabulary-table-row";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import VocabularyAddRow from "./vocabulary-add-row";
import { Input } from "@/components/common/input";
import VocabularySave from "./vocabulary-save";
import useSkipper from "../hooks/use-skipper";
import { useRouter } from "next/router";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void,
    tableOwner: () => boolean
  }
}

export const Vocabulary = ({
  title = "Enter a title",
  vocabularyOwner = "",
  vocabularyId = null,
  isPrivate = false,
  dictionary = [],
  profileId = "",
  bookId,
}) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [vocabularyTitle, setVocabularyTitle] = useState(title);
  const [data, setData] = useState<DictionaryData[]>(dictionary);
  const [privateAccess, setPrivateAccess] = useState(() => isPrivate)
  const columns = useMemo<ColumnDef<DictionaryData>[]>(
    () => [
      {
        header: vocabularyTitle,
        columns: [
          {
            id: "tableStateOriginalWord",
            accessorKey: "tableStateOriginalWord",
            accessorFn: row => row.original.value,
            header: () => <span>Original Word</span>,
          },
          {
            id: "tableStateTranslationWord",
            accessorKey: "tableStateTranslationWord",
            accessorFn: row => row.translations.value,
            header: () => <span>Translation</span>,
          }
        ],
      }
    ],
    [data]
  );
  const [tableCacheFlag, setTableCacheFlag] = useState(false);
  const vocabularyMutation = useMutation((vocabulary) => vocabularyId ? UPDATE_VOCABULARY(vocabulary) : CREATE_VOCABULARY(vocabulary));

  const notifySuccessfulPost = () => toast("Data has been updated successfully!");
  const notifyUnSuccessfulPost = () => toast("There was an issue with updating your data!!");

  const initialRender = useRef(true);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      setTableCacheFlag(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, vocabularyTitle, tableCacheFlag, privateAccess]);

  useEffect(() => {
    if (vocabularyMutation.isSuccess && vocabularyMutation.data.error === null) {
      notifySuccessfulPost();
      router.push(`/books/${bookId}`)
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
        setData((old) => handleVocabularyDataUpdate(old, rowIndex, columnId, value))
      },
      tableOwner: () => vocabularyOwner === profileId ? true : false
    }
  })

  return (

    <article className="vocabulary-table">
      {table.options.meta?.tableOwner() && <ToggleCheckbox title="Private" checked={privateAccess} onChange={() => setPrivateAccess(!privateAccess)} />}
      <div>
        <table className="w-full p-0">
          <thead>
            <VocabularyTableTitle table={table}>
              <Input
                type="text"
                classOverrides="border-0 rounded-t-md block w-full py-5 text-center font-extrabold text-2xl bg-lime-200 shadow focus:outline-none focus:bg-lime-300 dark:text-black disabled:normal"
                value={vocabularyTitle as string}
                disabled={table.options.meta?.tableOwner() ? false : true}
                onChange={e => setVocabularyTitle(e.target.value)}
                placeholder="Enter a title"
              />
            </VocabularyTableTitle>
            <VocabularyTableColumnsTitle table={table} />
          </thead>
          <tbody>
            <VocabularyTableRow table={table} tableCache={data} cacheDispatcher={setData} isOwner={table.options.meta?.tableOwner()} />
          </tbody>
        </table>

        {(!table.getCanNextPage() && table.options.meta?.tableOwner()) && <VocabularyAddRow table={table} cacheDispatcher={setData} />}

        <VocabularyFormControls table={table} />

        {(tableCacheFlag && table.options.meta?.tableOwner()) && <VocabularySave mutation={vocabularyMutation} data={
          {
            vocabularyId: vocabularyId,
            isPrivate: privateAccess,
            title: vocabularyTitle,
            profileId: profileId,
            dictionary: data,
            bookId: bookId,
          }} />
        }
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={colorMode === "light" ? "light" : "dark"}
        />
        <ReactQueryUiErrorHandler queryKey={vocabularyMutation} />
      </div>
    </article>
  );
}