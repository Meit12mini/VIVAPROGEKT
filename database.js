// const express = require("express");
// const app = express();
// const fs = require("fs");

// // Parse JSON bodies for PUT requests
// app.use(express.json());

// // Serve static files from the 'server' folder
// app.use(express.static("server"));

// // Handle PUT requests to update the database
// app.put("/server/db.json", (req, res) => {
//   // Read the existing database file
//   fs.readFile("server/db.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error reading database file");
//       return;
//     }

//     try {
//       // Parse the existing database
//       const database = JSON.parse(data);

//       // Update the basket in the database
//       database.basket = req.body.basket;

//       // Write the updated database back to the file
//       fs.writeFile(
//         "server/db.json",
//         JSON.stringify(database, null, 2),
//         (err) => {
//           if (err) {
//             console.error(err);
//             res.status(500).send("Error writing database file");
//             return;
//           }

//           res.send("Database updated successfully");
//         }
//       );
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error parsing database file");
//     }
//   });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
// // index.js

// // Импортируйте модуль database.js
// const database = require("./database.js");

// // Используйте метод PUT для обновления базы данных
// fetch("http://localhost:3000/server/db.json", {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ basket: ["product1", "product2"] }),
// })
//   .then((response) => response.text())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
