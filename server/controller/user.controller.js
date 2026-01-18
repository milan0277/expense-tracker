import user from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, budget } = req.body;
    if (!name || !email || !budget) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const emailCheck = await user.findOne({ Email: email });
    if (emailCheck) {
      return res.status(409).json({ error: "user already exists" });
    }

    const newUser = new user({
      Name: name,
      Email: email,
      monthlybudget: budget,
    });
    const savedUser = await newUser.save();

    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    console.log("error at createUser contoller", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  console.log("email", req.body);
  try {
    const { email } = req.body;

    const emailCheck = await user.findOne({ Email: email }).select("-Email");
    if (!emailCheck) {
      return res.status(409).json({ error: "user doesn't exist" });
    }

    return res
      .status(200)
      .json({ message: "login successfull", user: emailCheck });
  } catch (err) {
    console.log("error at login contoller", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

//not needed
export const logOut = async (req, res) => {
  try {
  } catch (error) {
    console.log("error at logOut contoller", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const updateMonthlyBudget = async (req, res) => {
  try {
    const { userId, newBudget } = req.body;

    const updatebudgetData = await user.findByIdAndUpdate(
      userId,
      { monthlybudget: newBudget },
      {
        new: true,
        select: "-Email -Name",
      },
    );

    res.status(201).json({
      message: "month budget increased successfully",
      data: updatebudgetData,
    });
  } catch (err) {
    console.log("error at updateMonthlyBudget contoller", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getMonthLyBudget = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentBudget = await user.findOne(
      { _id: userId },
      { monthlybudget: 1, _id: 0 },
    );

    return res.status(200).json(currentBudget);
  } catch (error) {
    console.log("error at getMonthLyBudget contoller", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
