export const vocabularyMutationMethod = (method: 'UPDATE' | 'CREATE', data) => {
  const { vocabularyId, profileId, bookId, title, dictionary } = data;

  if (method === 'UPDATE') {
    return {
      vocabularyId: vocabularyId,
      bookId: bookId,
      updates: {
        title: title,
        dictionary: { data: dictionary }
      }
    }
  } else {
    return {
      updates: {
        book_id: bookId,
        profile_id: profileId,
        title: title,
        dictionary: { data: dictionary }
      }
    }
  }
}

export const handleVocabularyDataUpdate = (cache, rowIndex, columnId, value) =>
  cache.map((row, index) => {
    if (index === rowIndex) {
      if (columnId === "tableStateOriginalWord") {
        const newState = {
          ...cache[rowIndex]!,
          "id": row.id,
          "original": {
            "language": row.original.language,
            "value": value
          },
          "translations": {
            "language": row.translations.language,
            "value": row.translations.value
          }
        }
        return newState;
      } else {
        const newState = {
          ...cache[rowIndex]!,
          "id": row.id,
          "original": {
            "language": row.original.language,
            "value": row.original.value
          },
          "translations": {
            "language": row.translations.language,
            "value": value
          }
        }
        return newState;
      }
    }
    return row
  })