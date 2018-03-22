+++
css = []
highlight = true
date = "2018-03-22T20:40:05+01:00"
title = "Front-end Shorts: How to Delete Item From The List With React+Redux"
tags = ["react", "redux", "javascript", "frontend", "learntocode", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "There are many possibilities how to remove multiple items from the array with JavaScript. So in this tutorial, I am going to share my approach to delete function with React+Redux."
+++

There are many possibilities how to remove multiple items from the array with JavaScript. So in this tutorial, I am going to share my approach to delete function with React+Redux.

It's front-end shorts, and I am trying to highlight the most important information. Thus, just let’s have a look at the significant code snippets with explanations:

I have created the action:

```javascript
// expenseActions.js

export const t = {
    ...
    DELETE_EXPENSE: 'DELETE_EXPENSE',
    ...
};

export const actions = {
  ...

    deleteExpense: payload => ({
        type: t.DELETE_EXPENSE,
        payload
    }),
...
};

```

The second step is using action in `expensesReducer`. Here I am using `filter` method comparing id of the current object 'expense' and the object dispatched from the store. All changes are made to the original array:

```javascript
// expensesReducer.js

export const expensesReducer = (state = initState, action) => {
    switch (action.type) {
    ...

        case t.DELETE_EXPENSE:
            return state.filter(expense => expense.id !== action.payload.id);

      ...

        default:
            return state;
    }
};

```

Last but not least, I pass `deleteExpense` to props of the `Expenses` component and provide it for a button’s `onClick` event listener:

```javascript
// Dashboard.js

const Expense = ({expense, deleteExpense}) => {
return (
        <div className='expense-container'>
...
          <div className='delete-container' onClick={() => deleteExpense(expense)}>
                <div><a className='delete-button'>
                    -
                </a></div>
          </div>
...
        </div>
      );
}

const ExpensesComponent = ({expenses, deleteExpense}) => {
...
return (
        <div>
            {
                expenses.map(expense => {
                    return <Expense
                                   ...
                                    expense={expense}
                                    deleteExpense={deleteExpense}
                    />
                })
            }
        </div>
    )
}

const Expenses = connect(
    (state) => ({
        expenses: state.expenses,
    }),

    (dispatch) => ({
        deleteExpense: (expense) => {
            dispatch(actions.deleteExpense(expense))
        },
...
)(ExpensesComponent);

```

That's it.
Thank you for reading! Also, if you’ve made this far, feel free to connect with me on [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes/).

Happy coding!
