# 🍱 Food Waste Management System

## Problem Description
Food waste is a major issue in Sri Lanka and around the world. 
Restaurants, households, and events waste large amounts of food 
while many people go hungry. There is no proper system to connect 
food donors with those in need.

## Proposed Solution
A web-based Food Waste Management System that allows users to:
- Post available food items
- Track food donations
- Connect donors with NGOs and volunteers
- Reduce food waste in communities

## Features
- ✅ Add, view, update and delete food items
- ✅ User management (restaurants, households, NGOs, volunteers)
- ✅ Donation tracking system
- ✅ RESTful API architecture
- ✅ React.js frontend interface

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- React.js
- Axios
- Git & GitHub

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Create user |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get single user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

### Foods
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/foods | Add food item |
| GET | /api/foods | Get all foods |
| GET | /api/foods/:id | Get single food |
| PUT | /api/foods/:id | Update food |
| DELETE | /api/foods/:id | Delete food |

### Donations
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/donations | Create donation |
| GET | /api/donations | Get all donations |
| GET | /api/donations/:id | Get single donation |
| PUT | /api/donations/:id | Update donation |
| DELETE | /api/donations/:id | Delete donation |

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed
- Git installed

### Backend Setup
```bash
cd food-waste-management
npm install
npm run dev
```

### Frontend Setup
```bash
cd food-waste-frontend
npm install
npm start
```

## How to Run
1. Start MongoDB service
2. Run backend: `npm run dev` (port 5000)
3. Run frontend: `npm start` (port 3000)
4. Open browser: `http://localhost:3000`