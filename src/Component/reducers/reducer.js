const initState = {
     map : null , 
     lakeData : null

}
const Reducer = (state=initState ,action  ) => {
    switch (action.type) {
      case "SET_MAP":
        return {
          ...state, map:action.data
        }
        
          case "SET_POP":
            return {
              ...state, pop:action.popup
            }
    
      case "SETL_LAKE_DATA":
        return {
          ...state, lake:action.data
        }
        default:
          return state;
    }
}

export default Reducer ; 