import {
  GET_BIB,
  ENGINE_READY,
  APPEND_CIT,
  DELETE_CIT,
} from '../actions/citations';

const initialState = {
  bibliography: [],
  citations: [],
  citeproc: null,
};

export default function citations(state = initialState, action) {
  switch (action.type) {
    case ENGINE_READY: {
      return {
        bibliography: [],
        citations: [],
        insertedCitations: [],
        citeproc: action.payload,
      };
    }
    case GET_BIB: {
      const formatting = action.payload[0];
      return {
        ...state,
        bibliography: `${formatting.bibstart}${action.payload[1].join('')}${
          formatting.bibend
        }`,
      };
    }
    case APPEND_CIT: {
      const { payload, meta } = action;
      const citations = [...state.citations];
      citations.push({
        index: payload[0][0],
        text: payload[0][1],
        id: payload[0][2],
        meta,
      });
      return {
        ...state,
        citations,
      };
    }
    case DELETE_CIT: {
      const {
        payload: { changed, removedId },
      } = action;

      const citations = [...state.citations].reduce((items, cit) => {
        changed[1].forEach(item => {
          if (cit.id === item[2]) {
            cit.text = item[1];
            cit.index = item[0];
          }
        });
        if (cit.id !== removedId) {
          items.push(cit);
        }
        return items;
      }, []);
      return {
        ...state,
        bibliography: [],
        citations,
      };
    }
  }

  return state;
}
