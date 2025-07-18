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
