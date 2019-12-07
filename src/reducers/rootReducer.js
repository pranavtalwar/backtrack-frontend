const initState = {
    isDeveloper: null,
    isManager: null,
    projectID: null,
    id: null,
};

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case "SET":
            return {
                isDeveloper: action.value.isDeveloper,
                isManager: action.value.isManager,
                projectID: action.value.projectID,
                id: action.value.id
            };
            
        case "REMOVE":
            return {
                isDeveloper: null,
                isManager: null,
                projectID: null,
                id: null
            };
        
        case "SETPROJECT":
            return {
                projectID: action.value.projectID
            }
            
        default: 
            return state;
    }
};

export default rootReducer;