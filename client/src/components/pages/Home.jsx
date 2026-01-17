import { useState } from 'react';
import Button from '@mui/material/Button';
import imageLeft from '../../assets/istockphoto-2157867359-612x612-removebg-preview.png'
import ModalCommon from '../common/ModalCommon';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={imageLeft} style={{ display: "inline" }} />
      </div>
      <div>
        <div style={{ marginTop: "7rem" }}>
          <h1>Expense Tracker Application (MERN Stack)</h1>
          Developed a full-stack expense tracker application using the MERN stack (MongoDB, Express.js, React.js, Node.js) to help users record, categorize, and analyze their daily expenses. The application allows users to add, edit, and delete expenses, view transaction history, and track spending through monthly and yearly summaries. Implemented secure REST APIs with Node.js and Express.js, data persistence using MongoDB, and an interactive, responsive UI with React. Included features such as expense categorization, filtering, and summary reports to provide clear financial insights and improve budgeting efficiency.
        </div>
        <Button variant="contained" style={{ marginTop: "3rem", marginLeft: "0rem" }} onClick={handleOpen}>Add Expense</Button>
      </div>
      <ModalCommon open={open}  handleClose={handleClose}/>
    </div>
  )
}

export default Home