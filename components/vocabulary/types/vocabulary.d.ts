export type Dictionary = {
  data: DictionaryData[]
}

export type DictionaryData = {
  id: string,
  original: Word
  translations: Word
}

export type Word = {
  language: string,
  value: string
}