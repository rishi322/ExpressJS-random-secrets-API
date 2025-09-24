import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));


app.get("/about", (req, res) => {
  try{

  res.render("about.ejs", { active: "about" });
  }catch(error){
    console.log("this is the error", error);
    res.send("this is the issue ", error);
  }
});
app.get('/add',(req,res)=>{
  console.log("this is add");
  res.render("add.ejs",{});
})

app.get("/random-user", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];
    res.render("random-user", { user, active: "random-user" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching user data");
  }
});

app.get("/quotes", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const quote = response.data;
    console.log(quote)
    res.render("quote.ejs", { quote, active: "quotes" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching quote");
  }
});
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error){
    console.log(error);
    res.status(500);
  }
});
// app.get("/quote", async (req, res) => {
//   try {
//     const quotes = [];
//     for (let i = 0; i < 5; i++) { // Fetch 5 quotes
//       const response = await axios.get("https://secrets-api.appbrewery.com/random");
//       quotes.push(response.data);
//     }
//     res.render("quote.ejs", { quotes, active: "quotes" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error fetching quotes");
//   }
// });

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index", {
      secret: result.data.secret,
      user: result.data.username,
      active: "home"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
