export default reducer=(state=0,action)=>{
    if(type.action==='deposit'){
        state + action.payload //this will simply add
    }
    else if(type.action==='withdraw'){
        state - action.payload //this will simply subtract
    }
    else{
        return state
    }
}