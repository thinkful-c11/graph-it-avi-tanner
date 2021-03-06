//handle new bar data
export const HANDLE_NEW_DATA = 'HANDLE_NEW_DATA';
export const handleNewData = (data, columnName) => ({
  type: HANDLE_NEW_DATA,
  data,
  columnName
});

export const HANDLE_NEW_LINE_DATA = 'HANDLE_NEW_LINE_DATA';
export const handleNewLineData = (y) => ({
  type: HANDLE_NEW_LINE_DATA,
  y
}) 

export const HANDLE_NEW_GRAPH = 'HANDLE_NEW_GRAPH';
export const handleNewGraph = (title, suffix, prefix) => ({
  type: HANDLE_NEW_GRAPH,
  title,
  suffix,
  prefix
})

export const SET_LINE_DATA = 'SET_LINE_DATA';
export const setLineData = () => ({
  type: SET_LINE_DATA
});

export const TOGGLE_NEW_DATA = 'TOGGLE_NEW_DATA';
export const toggleNewData = () => ({
  type: TOGGLE_NEW_DATA
});

export const RESET_BAR_GRAPH = 'RESET_BAR_GRAPH';
export const resetBarGraph = () => ({
  type: RESET_BAR_GRAPH
});

export const RESET_LINE_GRAPH = 'RESET_LINE_GRAPH';
export const resetLineGraph = () => ({
  type: RESET_LINE_GRAPH
})

export const NEW_GRAPH = 'NEW_GRAPH';
export const newGraph = () => ({
  type: NEW_GRAPH
})

export const HANDLE_LOADING = 'HANDLE_LOADING';
export const handleLoading = () => ({
  type: HANDLE_LOADING
})

export const HANDLE_ERROR = 'HANDLE_ERROR';
export const handleError = (error) => ({
  type: HANDLE_ERROR,
  error
})

export const SET_GRAPH_TO_STATE = 'SET_GRAPH_TO_STATE';
export const setGraphToState = (graphObj) => ({
  type: SET_GRAPH_TO_STATE,
  graphData: graphObj.graphData,
  graphTitle: graphObj.graphTitle,
  prefix: graphObj.prefix,
  suffix: graphObj.suffix,
  graphType: graphObj.graphType
})

export const HANDLE_SAVED_URL = 'HANDLE_SAVED_URL';
export const handleSavedUrl = (url) => ({
  type: HANDLE_SAVED_URL,
  url
})

export const HANDLE_GRAPH_TYPE_CHANGE = 'HANDLE_GRAPH_TYPE_CHANGE';
export const handleGraphTypeChange = (graphType) => ({
  type: HANDLE_GRAPH_TYPE_CHANGE,
  graphType
}) 

export const saveGraph = (graphObj) => (dispatch) => {
  dispatch(handleLoading());
  const params = {
    method: 'POST',
    body: JSON.stringify(graphObj),
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    }}
  fetch('/api/graphs', params)
  .then(response => {
    if(!response.ok){
      return Promise.reject(response.statusText)
    }
    dispatch(handleLoading())
    return response.json()
  })
  .then(json => {
    const url = `https://graph-it-thinkful.herokuapp.com/posts#${json._id}`;
    dispatch(handleSavedUrl(url));
  })
  .catch(error => {
    console.error(error)
    dispatch(handleError(error))
  })
}

export const handleGetByIdAndSetState = (id) => (dispatch) => {
  dispatch(handleLoading())
  fetch(`/api/graphs/${id}`)
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText)
    }
    return response.json()
  })
  .then(graph => {
    dispatch(handleLoading())
    console.log('graph', graph)
    dispatch(setGraphToState(graph))
  })
  .catch(error => {
    console.error(error)
    dispatch(handleError(error))
  })
}

