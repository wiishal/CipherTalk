# Chat Application


A real-time chat application that allows users to securely communicate with one another using end-to-end encryption.

## 🔑 How CipherTalk Works:

- ✅ Key Generation – Users generate their own AES-256 encryption key.
- ✅ No Key Storage – We do not store the encryption keys, ensuring complete privacy.
- ✅ Encryption with Salt – Every message is encrypted using AES-GCM along with a unique salt for added security.
- ✅ Decryption by User – Only users with the correct key can decrypt and read messages.

## ⚠️ Limitations & User Experience Challenges:
- ❌ Key Management – Since we don't store keys, users must securely remember or store them.
- ❌ Decryption Experience – Users must manually enter the key each time, which may feel inconvenient.
- ❌ Length of Key – The AES-256 key is long, which might make handling it difficult for non-technical users.

## Features

- **Real-Time Communication:** Powered by Socket.IO for seamless real-time chat.
- **End-to-End Encryption:** Messages are encrypted using AES-256 for secure communication.
- **User Authentication:** JWT-based authentication to ensure secure access.
- **Message Storage:** Messages are stored securely in a database with associated metadata.
- **Salt Management:** Each message includes a unique salt for encryption to enhance security.


## Screeshots 
- Key Generation
  
![Chat App Preview](frontend/public/cp.jfif)
  
- Key Setting
  
![Chat App Preview](frontend/public/cp1.jfif)

- Message Preview 
  
![Chat App Preview](frontend/public/cp3.jpg)
  
  
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
   git clone https://github.com/wiishal/CipherTalk.git
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


