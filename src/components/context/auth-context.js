import React ,{  useState } from "react";


const AuthContext = React.createContext({
    isAuth: false,
    login:()=>{} 
})

export const AuthContextProvider = (props) =>{
    const [isAuthed,setAuthed]=useState(false)
    const loginHangler =()=>{
        setAuthed(true);
    }
    return <AuthContext.Provider value={{login:loginHangler,isAuth:isAuthed}} >
        {props.children}
    </AuthContext.Provider>
    ;
}
export default AuthContext;