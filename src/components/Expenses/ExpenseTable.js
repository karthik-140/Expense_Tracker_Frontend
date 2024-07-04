import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteExpenseMutation, useLazyDownloadExpensesQuery, useGetExpensesQuery } from "../../api/ExpenseAPI"
import CustomTable from "../../customComponents/CustomTable";
import Toast from "../../customComponents/Toast";
import CustomLoading from '../../customComponents/CustomLoading';

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Amount', field: 'amount' },
  { label: 'Description', field: 'description' },
  { label: 'Category', field: 'category' },
  { label: '', field: 'delete' },
]

const ExpenseTable = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerExPage, setRowsPerExPage] = useState(5)
  const [totalExpenses, setTotalExpenses] = useState([])
  const [totalExpensesCount, setTotalExpensesCount] = useState()

  const { data: responseData, isLoading: isExpensesLoading, isFetching: isExpenseFetching } = useGetExpensesQuery({ page: currentPage, limit: rowsPerExPage })
  const [deleteExpense, { isLoading: isDeleteExpenseLoading, isError: isDeleteError }] = useDeleteExpenseMutation()
  const [downloadExpenses, { isLoading: isDownloadExpensesLoading, isError: isDownloadExpensesError }] = useLazyDownloadExpensesQuery()

  useEffect(() => {
    if (responseData) {
      setTotalExpensesCount(responseData.totalExpenses)
      const newExpenses = responseData.expenses;
      const existingExpenses = [...totalExpenses]
      const uniqueNewExpenses = newExpenses.filter(newExp =>
        !existingExpenses.find(prevExp => prevExp.id === newExp.id)
      )
      setTotalExpenses([...existingExpenses, ...uniqueNewExpenses])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData])

  const handleChangePage = async (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerExPage(+event.target.value)
    setCurrentPage(0)
  }

  if (responseData?.expenses?.length === 0) {
    return <h1 className="mt-28 mb-10 text-center font-bold">No Expenses Found!!</h1>
  }

  const deleteExpenseHandler = async (expense) => {
    try {
      await deleteExpense(expense)
      const existingExpenses = [...totalExpenses]
      const updatedExpenses = existingExpenses.filter((exp) => exp.id !== expense.id)
      setTotalExpenses(() => updatedExpenses)
    } catch (err) {
      console.log('Failed to delete expense!!', err)
    }
  }

  const downloadExpensesHandler = async () => {
    try {
      const response = await downloadExpenses()
      if (response.isSuccess) {
        let a = document.createElement('a')
        a.href = response.data.fileUrl
        a.download = 'myexpenses.csv'
        a.click()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const renderCell = (row, header) => {
    switch (header.field) {
      case 'amount':
        return row.amount
      case 'description':
        return row.description
      case 'category':
        return row.category
      case 'delete':
        return (
          <DeleteIcon
            className='cursor-pointer text-red-500 hover:text-red-600'
            onClick={() => deleteExpenseHandler(row)}
          />
        )
      default:
        return ''
    }
  }

  return (
    <>
      {(isExpensesLoading || isExpenseFetching || isDeleteExpenseLoading || isDownloadExpensesLoading) && <CustomLoading />}
      {(isDeleteError || isDownloadExpensesError)
        &&
        <Toast
          message={'Failed!!'}
          severity={'error'}
        />}
      <CustomTable
        headers={headers}
        renderRows={renderCell}
        rows={totalExpenses}
        tableLabel={'Expense Table'}
        showDownload={true}
        downloadHandler={downloadExpensesHandler}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={currentPage}
        rowsPerPage={rowsPerExPage}
        count={totalExpensesCount}
      />
    </>
  )
}

export default ExpenseTable
