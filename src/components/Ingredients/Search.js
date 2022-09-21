import React, { useEffect, useRef, useState } from 'react';
import useHttp from '../hooks/http-hook';
import ErrorModel from '../UI/ErrorModal'
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [filter,setFilter]=useState('');
  const {isLoading,data,error,sendReq,clear}=useHttp();
  const inputRef=useRef();
  const { onFilterIng }=props;
  useEffect(()=>{
   const timer =setTimeout(()=>{
      if(filter === inputRef.current.value){
        const query = filter.length === 0 ? '' : 
        `?orderBy="title"&equalTo="${filter}"`;
        sendReq('https://test-9b2af-default-rtdb.asia-southeast1.firebasedatabase.app/ing.json'+query,
        'GET')
        
        // fetch()
        // .then(res => res.json())
        // .then(data=>{
        //   const Idata=[];
        //   for(const key in data){
        //     Idata.push({
        //       id:key,
        //       title: data[key].title,
        //       amount:data[key].amount })
        //   }
        //   //...
       //   onFilterIng(Idata)})
      }
    },500)
    return ()=>{
      clearTimeout(timer)
    }
},[filter,sendReq,inputRef]);
  useEffect(()=>{
    if(!isLoading && !error && data){
        const Idata=[];
          for(const key in data){
            Idata.push({
              id:key,
              title: data[key].title,
              amount:data[key].amount })
          }
          //...
         onFilterIng(Idata)
    }
  },[data,isLoading,error,onFilterIng])
  return (
    <section className="search">
      {error && <ErrorModel onClose={clear}>{error}</ErrorModel>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input type="text" ref={inputRef}  value={filter} onChange={event=>setFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
