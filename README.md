# 📚 College Notes Website

This is a MERN (MongoDB, Express, React, Node.js) application designed for college students to store and share notes. Each student can upload their notes, and there is a leaderboard section that showcases the top students whose notes have the most likes and shares.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔐 User authentication and authorization
- 📝 Upload and store notes
- 👍 Like and share notes
- 🏆 Leaderboard showcasing top students
- 📱 Responsive design for mobile and desktop

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Parallax
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## ⚙️ Setup Instructions

### 🗄️ Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Notes-Harbor.git
    cd Notes-Harbor/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=<your_mongo_db_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

### 💻 Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add the following environment variable:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. Start the frontend development server:
    ```bash
    npm run dev
    ```

## 🚀 Usage

- Open your browser and navigate to `http://localhost:3000`
- Sign up or log in to your account
- Upload, view, like, and share notes
- Check out the leaderboard to see the top contributors

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
