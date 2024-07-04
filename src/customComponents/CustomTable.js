import React from "react";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, TableContainer, Typography, TablePagination } from "@mui/material"
import { useSelector } from "react-redux";

import CustomPaper from "./CustomPaper";

const CustomTable = ({
  tableLabel,
  headers,
  rows,
  renderRows,
  showDownload,
  downloadHandler,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  count
}) => {

  const { isPremiumUser } = useSelector((state) => state.user)

  return (
    <CustomPaper className='flex flex-col gap-6'>
      <div className="flex justify-between">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 15, sm: 15, md: 20, lg: 20 },
          }}
          variant="h6"
          color='blue'
        >
          {tableLabel}
        </Typography>
        {(showDownload && isPremiumUser) &&
          <Button
            variant="outlined"
            className="self-end"
            // disabled={!isPremiumUser}
            onClick={downloadHandler}
          >
            Download
          </Button>}
      </div>
      <TableContainer className="flex flex-col justify-center gap-8">
        <Table
          stickyHeader
          aria-label="sticky table"
          className="border table-auto"
        >
          <TableHead className="uppercase" >
            <TableRow>
              {headers.map((header, idx) => (
                <TableCell
                  key={`header-${idx}`}
                  align="center"
                  style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover tabIndex={-1} key={rowIndex}>
                  {headers.map((header, cellIndex) => (
                    <React.Fragment key={cellIndex}>
                      {header.label === 'S.no' ? (
                        <TableCell
                          align="center"
                          className="capitalize"
                        >
                          {page * rowsPerPage + rowIndex + 1}
                        </TableCell>
                      ) : (
                        <TableCell
                          align="center"
                          className="capitalize"
                          key={cellIndex}
                        >
                          {renderRows(row, header)}
                        </TableCell>
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="px-8 py-4"
      />
    </CustomPaper>
  )
}

export default CustomTable
