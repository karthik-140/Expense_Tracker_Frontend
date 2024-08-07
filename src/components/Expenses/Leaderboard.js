import { useState } from "react"
import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom'

import { useGetLeaderboardQuery } from "../../api/ExpenseAPI"
import CustomTable from "../../customComponents/CustomTable"

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Name', field: 'name' },
  { label: 'Total Expense', field: 'totalExpenses' },
]

const Leaderboard = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const navigate = useNavigate()

  const { data: leaderboard = [] } = useGetLeaderboardQuery()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const leaderboardCloseHandler = () => {
    navigate('/expense')
  }

  const renderCell = (row, header) => {
    switch (header.field) {
      case 'name':
        return row.name
      case 'totalExpenses':
        return row.totalExpenses
      default:
        return ''
    }
  }

  return (
    <>
      <CustomTable
        tableLabel={'Leaderboard Table'}
        headers={headers}
        rows={leaderboard}
        renderRows={renderCell}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        count={leaderboard.length}
      />
      <div className="flex justify-center mb-20">
        <Button variant="outlined" onClick={leaderboardCloseHandler}>
          Close
        </Button>
      </div>
    </>
  )
}

export default Leaderboard
