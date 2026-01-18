import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast, useSonner } from "sonner";
import { getStoredData } from "../../utils/helper";
import axios from "axios";
const url = import.meta.env.VITE_bACKEND_URL;


const Report = () => {
  const [reportData, setReportData] = useState([]);
  const getReport = async (userId) => {
    try {
      const reportResponse = await axios.post(
        `${url}getreport`,
        { userId },
      );

      if(reportResponse?.status===200){ setReportData(reportResponse?.data[0]?.report) }
    } catch (err) {
      // toast.error(er)
    }
  };

  const rows = useMemo(
    () =>
      reportData?.map((rd, i) => ({
        id: i + 1,
        title: rd.Title,
        category: rd.Category,
        amount: rd.Amount,
        date: new Date(rd.Date).toLocaleDateString(),
      })) || [],
    [reportData],
  );

  useEffect(() => {
    const userId = getStoredData()._id;
    if (userId) {
      getReport(userId);
    }
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">category</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Report;
