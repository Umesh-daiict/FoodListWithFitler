import { useCallback, useReducer } from "react"

const httpReducer = (state, action)=>{
    switch(action.type){
      case 'SEND':
        return {loading: true,err: null,extra:null,id:action.id}
      case 'RESPOND':
        return {...state,loading: false,data:action.resData,extra:action.extra}
      case 'ERROR':
        return {...state,loading: false,err: action.err}
      case 'CLEAR':
          return  {loading: false,err:null,data:null,extra:null,id:null}
          
      default:
        throw new Error('should not get here');
    }
  }
  
const useHttp=()=>{
    const [curHttp,httpDis] =useReducer(httpReducer,
        {loading: false,err:null,data:null,extra:null,id:null})

        const clear= useCallback(()=>{
            httpDis({type:'CLEAR'})
        })

        const sendReq=useCallback( (url,method,body,reqExtra,resId)=>{

        httpDis({type:'SEND',id:resId});
        fetch(url,{
          method:method,
          body:body,
          headers:{
            'Content-Type':'application/json'
          }
        }).then(res =>  {
      //     setIng(prev=>{
      //     return prev.filter(ingredient=>ingredient.id !== id)
      // })
        //  dispatch({type:'DELETE',id:id})
        //setIsloading(false);
     //   httpDis({type:'RESPOND'})
     return res.json();
      }).then(data=>{
        httpDis({type:'RESPOND',resData:data,extra:reqExtra})
      }).catch(error  => {
        // setError("Delete not happened,something went wrong!")
        // setIsloading(false)
        httpDis({type:'ERROR',err:'something happened atdlerr'})
              
      })
    },[])
   return {
    isLoading:curHttp.loading,
    data:curHttp.data,
    error:curHttp.err,
    sendReq:sendReq,
    reqExtra:curHttp.extra,
    idR:curHttp.id,
    clear:clear
   };
}
export default useHttp;