import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import imageLeft from "../../assets/istockphoto-2157867359-612x612-removebg-preview.png";
import ModalCommon from "../common/ModalCommon";
import { getStoredData } from "../../utils/helper";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
const url = import.meta.env.VITE_bACKEND_URL;

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [userSummary, setUserSummary] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUserSummary = async (userID) => {
    try {
      const res = await axios.get(
        `${url}${userID}/summary`
      );

      if (res.status === 200) {
        setUserSummary(res.data[0]); // important
      }
    } catch (err) {
      console.error("Error fetching summary");
    }
  };

  useEffect(() => {
    const userID = getStoredData()?._id;
    if (userID) {
      setUserId(userID);
      getUserSummary(userID);
    }
  }, []);

  // ✅ Cards created from API response
  const cards = useMemo(() => {
    if (!userSummary) return [];

    return [
      {
        id: 1,
        title: "Total Expenses",
        description: `₹ ${userSummary.totalExpensesForCurrentMonth}`,
      },
      {
        id: 2,
        title: "Remaining Monthly Budget",
        description: `₹ ${userSummary.remainingMonthlyBudget}`,
      },
      {
        id: 3,
        title: "Expenses Added",
        description: userSummary.numberOfExpensesAdded,
      },
    ];
  }, [userSummary]);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={imageLeft} alt="expense" />
      </div>

      <div style={{ marginTop: "7rem", width: "100%" }}>
        <h1>Expense Tracker Application (MERN Stack)</h1>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {cards.map((card, index) => (
            <Card key={card.id}>
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? "" : undefined}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={handleOpen}
        >
          Add Expense
        </Button>
      </div>

      <ModalCommon open={open} handleClose={handleClose} userId={userId} />
    </div>
  );
};

export default Home;
