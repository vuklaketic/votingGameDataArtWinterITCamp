# Voting Game

## 🎯 Project Overview

This project consists of two main parts:

- **React frontend** where users interact with jokes and vote.
- **Node.js backend API** that handles data and voting logic.

## 📌 Features

### Frontend (React)

- 🃏 **Joke Display**: Shows random jokes in a question & answer format.
- 🎭 **Voting System**: Users vote using emoji reactions.
- 🔄 **State Management**: React state handles jokes and votes.
- 🎨 **Modern UI**: Styled with plain CSS.
- 📱 **Mobile-Responsive**: Optimized for various devices.

### Backend (Node.js & MongoDB)

- 📚 **Data Storage**: Uses MongoDB to store jokes and votes.
- ⚡ **API Endpoints**:
    - `GET /api/joke` → Fetch a random joke.
    - `POST /api/joke/:id` → Submit a vote.
    - `DELETE /api/joke/:id` → Delete a joke.
    - `PUT /api/joke/:id` → Update joke content.
- 🔒 **Validation**: Ensures valid votes and joke format.

## 🚀 Getting Started

### 1⃣ Clone the Repository

```
git clone https://github.com/vuklaketic/votingGameDataArtWinterITCamp
cd votingGameDataArtWinterITCamp
```

### 2⃣ Setup Environment Variables

Create a `.env` file in the `backend` folder:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
PORT=5000
```

### 3⃣ Install Dependencies

### Backend:
Navigate to the backend folder:
```
cd backend
npm install
npm start  # Starts backend on port 5000
```
### Frontend:
Open a second terminal window and navigate to the main project directory (outside of the backend folder):
```
# Go to the main project directory
npm install
npm start  # Starts frontend on port 3000
```

## 🔗 Tech Stack

- **Frontend**: React, Plain CSS
- **Backend**: Node.js, Express.js, MongoDB
