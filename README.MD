🚚 Shipping Estimator

A full-stack logistics shipping rate calculator built using Node.js, Express, MongoDB, and Vanilla JavaScript.

It calculates shipping charges based on distance, product weight, transport mode, and delivery speed.

✨ Features

Nearest warehouse detection

Haversine distance calculation

Automatic & manual transport mode selection

Express delivery surcharge support

Glassmorphism UI with cinematic background

RESTful API architecture

🧮 Shipping Cost Formula
Shipping Cost =
(distance × weight × transportRate)
+ Base Charge
+ Express Surcharge (if applicable)
🚛 Transport Rates
Mode	Rate
Mini Van	3
Truck	2
Aeroplane	1
🚦 Auto Mode Logic

Distance > 500 km → Aeroplane

Distance > 100 km → Truck

Otherwise → Mini Van

🛠 Tech Stack

Backend

Node.js

Express.js

MongoDB

Mongoose

Frontend

HTML

CSS

Vanilla JavaScript

📂 Project Structure
Shipping_Estimator/
├── src/
├── frontend/
│   └── assets/
├── server.js
├── package.json
└── README.md
⚙️ Setup
1️⃣ Install Dependencies
npm install
2️⃣ Create .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
3️⃣ Run Server
npm run dev

Server runs on:

http://localhost:5000
🌍 API Endpoint
Calculate Shipping
POST /api/v1/shipping-charge/calculate

Request Body:

{
  "sellerId": "",
  "productId": "",
  "customerId": "",
  "deliverySpeed": "standard",
  "transportMode": ""
}
### 🏠 Home Screen

![Home Screen](screenshots/home.png)

---

### 📊 Calculation Result

![Calculation Result](screenshots/calculation.png)