import React, { useCallback,  useEffect,  useMemo,  useReducer,  useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModel from '../UI/ErrorModal';
import useHttp from '../hooks/http-hook';

const ingredientReducer = (state, action)=>{
  switch(action.type){
    case 'SET':
      return action.ing
    case 'ADD':
      return [...state , action.ing]
    case 'DELETE':
      return state.filter(ing=>ing.id !== action.id);
    default:
      throw new Error('should not get here');
  }
}

function Ingredients() {
  const [curIng,dispatch] = useReducer(ingredientReducer,[])
 // const [ing,setIng]=useState([]);
//  const [curHttp,httpDis] =useReducer(httpReducer,{loading: false,err:null})
//  const [isLoading,setIsloading]=useState(false)
//   const [error,setError]=useState('')
  const {isLoading,data,error,sendReq,reqExtra,idR,clear}=useHttp()

  useEffect(()=>{
    if(!isLoading && !error && idR==='REMOVEI'){
      dispatch({type:'DELETE',id:reqExtra})
    }else if(!isLoading && !error && idR==='ADDI'){
      dispatch({type: 'ADD' , ing:{id:data.name,...reqExtra}})
    }
      },[data,reqExtra,idR,isLoading,error])

  const addIngHandler = useCallback( (ingredient) => {
    //setIsloading(true)
 sendReq('https://test-9b2af-default-rtdb.asia-southeast1.firebasedatabase.app/ing.json',
 'POST',JSON.stringify(ingredient),ingredient,'ADDI')
    // httpDis({type:'SEND'})
    // fetch('',{
    //   method:'POST',
    //   body:JSON.stringify(ingredient),
    //   headers:{'Content-Type':'application/json'}
    // }).then(res => res.json())
    // .then(data=>{
    //    // setIng( prev =>
    //   //   { return [...prev, { id:data.name, ...ingredient}]})  
    //   dispatch({type: 'ADD' , ing:ingredient})  
    //   //setIsloading(false)
    //   httpDis({type:'RESPOND'})
    //   }).catch(error  => {
    //     // setError("post not happened,something went wrong!")
    //     // setIsloading(false)
    //     httpDis({type:'ERROR',err:'something happened at post'})
        
    //   })
},[sendReq])

  const removeHandler = useCallback((id) =>{
//  setIsloading(true)
sendReq(`https://test-9b2af-default-rtdb.asia-southeast1.firebasedatabase.app/ing/${id}.json`,
'DELETE',null,id,"REMOVEI")
},[sendReq])

const filterHandler = useCallback((filteredIng) =>{
  //setIng(filteredIng)
  dispatch({type: 'SET',ing:filteredIng})  
    
},[])

// const closeError = ()=>{
//   //setError(null)
// //  httpDis({type:'CLEAR'})
//         clear()
// }
const ingList=useMemo(()=>{
  return( <IngredientList ingredients={curIng} onRemoveItem={removeHandler} />
  )
},[curIng,removeHandler])
  return (
    <div className="App">
      {error && <ErrorModel onClose={clear}>{error}</ErrorModel>}
      <IngredientForm  onAddIng={addIngHandler} isLoading={isLoading} />

      <section>
        <Search  onFilterIng={filterHandler}/>
          {/* Need to add list here! */}
          {ingList}
      </section>
    </div>
  );
}

export default Ingredients; console.log('jiji')
