const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const generateDocuments = numberOfDocs => {
  const docs = {};
  for (let i = 0; i < numberOfDocs; i++) {
    const id = generateRandomString();
    const doc = {
      id,
      type: 'book',
      title: `${i} Digital Typography`,
      publisher: 'Center for the Study of Language and Information',
      'number-of-pages': '685',
      source: 'Amazon.com',
      ISBN: '1575860104',
      author: [
        {
          family: `${i} Knuth`,
          given: `${i} Donald E.`,
        },
      ],
      issued: {
        'date-parts': [['1998', 6, 1]],
      },
    };
    docs[id] = doc;
  }
  return docs;
};

export const generateCitations = documents =>
  documents.reduce((items, doc) => {
    const id = generateRandomString();
    items[id] = {
      citationID: id,
      citationItems: [
        {
          id: doc.id,
        },
      ],
      properties: {
        noteIndex: 0,
      },
    };
    return items;
  }, {});
