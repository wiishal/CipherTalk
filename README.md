# Chat Application

A real-time chat application that allows users to securely communicate with one another using end-to-end encryption.

## Features

- **Real-Time Communication:** Powered by Socket.IO for seamless real-time chat.
- **End-to-End Encryption:** Messages are encrypted using AES-256 for secure communication.
- **User Authentication:** JWT-based authentication to ensure secure access.
- **Message Storage:** Messages are stored securely in a database with associated metadata.
- **Salt Management:** Each message includes a unique salt for encryption to enhance security.

## Technologies Used

### Frontend:
- React (with TypeScript)
- Tailwind for styling

### Backend:
- Node.js with Express
- Socket.IO for real-time functionality
- Prisma ORM for database management

### Database:
- PostgreSQL

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- Environment variables configured

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. **Setup environment variables:**
   Create `.env` files in both `backend` and `frontend` directories. Example for the backend:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/chatdb
   JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start the application:**
   ```bash
   # Start backend
   cd backend
   npm start

   # Start frontend
   cd frontend
   npm start
   ```

6. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## API Endpoints

### Authentication:
- `POST /api/auth/login` - Login a user
- `POST /api/auth/register` - Register a user

### Messages:
- `GET /api/messages` - Fetch chat history
- `POST /api/messages` - Send a new message

## Folder Structure

### Frontend:
```
frontend/
|-- src/
    |-- components/
    |-- services/
    |-- encryption/
    |-- page/
    |-- App.tsx
    |-- main.tsx
```

### Backend:
```
backend/

    |-- controllers/
    |-- routes/
    |-- services/
    |-- server.js
|-- prisma/
    |-- schema.prisma
```

## Future Enhancements
- Add support for group chats
- Implement read receipts
- Enhance UI/UX for better usability


