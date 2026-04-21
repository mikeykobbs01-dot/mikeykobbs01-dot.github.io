const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  console.log("New message:");
  console.log(name, email, message);

  res.send("Message received!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
