const initState = {
    isDeveloper: null,
    isManager: null,
    projectID: null
};

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case "SET":
            return {
                isDeveloper: action.value.isDeveloper,
                isManager: action.value.isManager,
                projectID: action.value.projectID
            };
            
        case "REMOVE":
            return {
                isDeveloper: null,
                isManager: null,
                projectID: null
            };
        default: 
            return state;
    }
};

export default rootReducer;