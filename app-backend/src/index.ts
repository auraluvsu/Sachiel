/// This is the Regular server that writes to a postgres DB
// import * as http from 'http'
// import { Pool } from 'pg'
// const pool = new Pool({database: "sachiel"})
// const saveToDB = async(data: string) => {
//   await pool.query("insert into emails(email) values ($1)", [data])
// }
// const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
//   const url = new URL(req.url!, 'http://localhost:8080')
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST")
//   res.setHeader("Access-Control-Allow-Headers", "content-type")
//   console.log("request method:", req.method)
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, {"content-type": "application/json"})
//     res.end()
//   }
//   else if (req.method === "POST" && url.pathname === '/emails') {
//     let body = '';
//     req.on('data', c => body += c)
//     req.on('end', async() => {
//       try {
//         console.log("Parsed request")
//         const newEmail = JSON.parse(body)
//         await saveToDB(newEmail.email)
//         console.log("Wrote to DB")
//         res.writeHead(201)
//         res.end()
//       } catch (e) {
//         res.writeHead(500)
//         res.end(JSON.stringify({error: e}))
//       }
//     })
//   }
// })
//
// server.listen(8080, () => {
//   console.log("Server running on port 8080")
// })

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

app.post("/emails", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        email,
        // groups: ["YOUR_GROUP_ID_HERE"], // optional: add them to a specific list
      }),
    });

    if (mlResponse.ok) {
      res.status(201).json({ message: "User added to MailerLite" });
    } else {
      const errorData = await mlResponse.json();
      res.status(mlResponse.status).json(errorData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

