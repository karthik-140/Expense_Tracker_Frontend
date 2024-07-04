import { useState } from "react"
import { Link } from "@mui/material"
import { format } from 'date-fns'

import { useGetDownloadedFilesQuery } from "../../api/ExpenseAPI"
import CustomTable from "../../customComponents/CustomTable"
import CustomLoading from "../../customComponents/CustomLoading"

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Expense File', field: 'fileUrl' },
  { label: 'Downloaded Date', field: 'createdAt' },
]

const DowloadedFiles = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { data: downloadedFiles = [], isLoading } = useGetDownloadedFilesQuery()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  if (downloadedFiles.length === 0) {
    return
  }

  const renderCell = (row, header) => {
    switch (header.field) {
      case 'fileUrl':
        return <Link href={`${row.fileUrl}`} >Download File</Link>
      case 'createdAt':
        return format(row.createdAt, 'dd-MM-yyyy')
      default:
        return ''
    }
  }

  return (
    <>
      {isLoading && <CustomLoading />}
      <CustomTable
        tableLabel={'Downloaded Files Table'}
        headers={headers}
        rows={downloadedFiles}
        renderRows={renderCell}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        count={downloadedFiles.length}
      />
    </>
  )
}

export default DowloadedFiles
