export const saveExpenseToLocalStorage = (expense: any, index: number | null = null) => {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    if (index !== null) {
      expenses[index] = expense;  
    } else {
      expenses.push(expense);  
    }
    localStorage.setItem('expenses', JSON.stringify(expenses));
  };
  
  export const deleteExpenseFromLocalStorage = (index: number) => {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  };
  
  export const getExpensesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('expenses') || '[]');
  };
  