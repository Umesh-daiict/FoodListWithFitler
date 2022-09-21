import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';

import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [titleState,setTitle]=useState('');
  const [amountState,setAmount]=useState('')
  const submitHandler = event => {
    event.preventDefault();
    props.onAddIng({ title: titleState,amount: amountState })
  };
  function titleHandler(data){
    setTitle(data);
  }

  function amountHandler(data){    setAmount(data)};
console.log('hoo')
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={titleState} 
            onChange= { (event) => titleHandler(event.currentTarget.value)        }    />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amountState} onChange= { (event) => amountHandler(event.currentTarget.value)        } />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <LoadingIndicator/> }
          </div>
        </form>
      </Card>
    </section>
  );
  
});

export default IngredientForm;
