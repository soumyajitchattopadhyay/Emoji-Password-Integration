# 🔐 Emoji Password Integration

A secure and interactive emoji-based authentication system using **React** and **Django**. Designed to improve memorability and user satisfaction compared to traditional PIN-based systems.

---

## 🛠 Tech Stack & Highlights

- **Frontend (React.js):** UI rendering, Emoji grid selection, Number-based login
- **Backend (Django & Django REST Framework):** Authentication, Session management, Data validation
- **Security Mechanisms:**
  - SHA-256 password hashing
  - CSRF protection via Django middleware
  - Custom user model for enhanced flexibility

---

## 📌 Features

- 🔢 Emoji-based registration & login
- 🎯 Number-based alternative login method
- 🧠 Enhanced memorability using visuals
- 🔒 REST API-based secure auth flow
- 🧪 Clean modular frontend structure

---
This guide will walk you through setting up and running the **Emoji Password Project**.

---

## 📁 **Project Structure**
```
project-root/
├── backend/               # Django Backend Code
├── frontend/              # React Frontend Code
├── venv/                  # Python Virtual Environment (Generated after setup)
├── .gitignore
├── package.json
├── manage.py
└── README.md
```

---

## 🛠️ **Backend Setup (Django)**
### Step 1: Create a Virtual Environment
1. Open a terminal and navigate to the `backend/` folder.
2. Run the following commands:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
.env\Scriptsctivate

# (Linux/Mac)
source venv/bin/activate
```

---

### Step 2: Install Dependencies
Navigate to the `backend/` directory and install the required Python packages:

```bash
pip install django djangorestframework corsheaders
```

* **django** – Django framework
* **djangorestframework** – Django REST framework
* **corsheaders** – Handle CORS issues between frontend and backend

---

### Step 3: Migrate the Database (Optional for mock data)
Create the necessary database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### Step 4: Start the Django Server
Start the development server:

```bash
python manage.py runserver
```

Django backend will be running at:
👉 `http://127.0.0.1:8000/`

---

## 🌐 **Frontend Setup (React)**
### Step 1: Install Node.js
Ensure Node.js is installed:

👉 Download Node.js from: [https://nodejs.org](https://nodejs.org)

---

### Step 2: Install Frontend Dependencies
Navigate to the `frontend/` folder and run:

```bash
npm install
```

* This will install all necessary React dependencies.

---

### Step 3: Start the React Development Server
Start the frontend server:

```bash
npm start
```

Frontend will be available at:
👉 `http://localhost:3000/`

---

## ✅ **Project Features**
- ✅ Emoji-based and Number-based login.
- ✅ Local storage for storing user data.
- ✅ Simple registration and login validation.

---

## 🚀 **Usage**
1. Open the browser and visit `http://localhost:3000/`
2. Register a new user with emoji or number password.
3. Login with the created credentials.
4. Dashboard will show user data upon successful login.

---

## 🧹 **Stop the Project**
- Stop the Django server: `CTRL + C`
- Stop the React server: `CTRL + C`
- Deactivate the virtual environment:

```bash
deactivate
```

---

## 🔥 **Troubleshooting**
| Issue | Solution |
|-------|----------|
| Backend not starting | Ensure virtual environment is activated |
| Frontend not starting | Ensure npm install was successful |
| CORS errors | Ensure `corsheaders` is installed and configured in Django settings |
| 404 Error | Ensure URL routing is correctly set in `urls.py` and `App.js` |

---

💡 **You're all set! Happy coding!** 🚀

---

## 🧪 User Study & Evaluation

- ✅ **Within-subject design**: Participants used both traditional PIN and emoji-based login.
- ⏱ **Metrics measured**: Task completion time, error rates, and login success.
- 📊 **Usability measured** via **System Usability Scale (SUS)**.
- 🔐 **Security perception** and qualitative feedback collected.
- 🎯 Results indicated improved **memorability** and **user satisfaction** with the emoji-based system.

---

## 🔍 Usability & Security Challenges

### 🚧 Usability Challenges
- **Emoji sequence recall**: Users struggled with remembering emoji order and visual similarity.
- **Device inconsistency**: Emoji layouts differ across platforms and OSs, affecting recognition.

### 🔓 Security Challenges
- **Shoulder surfing**: Emojis are more visually identifiable, making passwords easier to observe.
- **Predictability**: Some users chose common or predictable emoji patterns, reducing entropy.

---

## 📚 Lessons Learned

- ♻️ **Dynamic emoji layouts** (shuffled grids) reduce pattern predictability and shoulder surfing.
- 💡 **Adaptive emoji suggestions** can enhance recall while preserving security.
- ⚖️ **Balancing engagement and security** is critical for real-world deployment.
- 👁️ Design must consider **cross-device emoji rendering** to maintain consistency and usability.

---
