const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 2001;

// Schema

const SchemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("user", SchemaData);

// API Creation

// Operation1 Read

app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// Operation2 Create

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully" });
});

// Operation3 Update
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, mobile } = req.body;
    console.log('Updating ID:', id);
    console.log('Data:', name, email, mobile);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          mobile
        }
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    res.send({ success: true, message: "Data updated successfully", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

// Operation4 Delete

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});

// Node to MongoDB

mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log("Server is Running on PORT", PORT));
  })
  .catch((err) => console.log(err));
