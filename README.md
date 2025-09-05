# 🧠 MindScape - Visual AI Brainstorming Tool

> **Transform a single topic into a dynamic, animated web of ideas powered by Gemini AI**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## ✨ Features

### 🎨 **Neo-Brutalist Design**
- **Bold neon colors** (pink, lime, cyan, yellow) with high contrast
- **Thick black borders** and sharp edges - no border radius
- **Glitchy box shadows** and playful offset elements
- **Monospace typography** with wide letter spacing
- **Animated sticky notes** and decorative chaos elements

### 🤖 **AI-Powered Mind Mapping**
- **Gemini AI Integration** - Generate comprehensive mind maps from any topic
- **Interactive Node Expansion** - Click any node to AI-expand with sub-ideas
- **Smart Recommendations** - AI suggests related topics and connections

### 🖱️ **Interactive Experience**
- **Drag & Drop Nodes** - Fully movable and customizable mind map canvas
- **Radial Layout** - Auto-arranged nodes in clean, organized structure
- **Chaos Mode** - Shuffle nodes with wild angles for creative inspiration
- **Real-time Updates** - Live animations and smooth transitions

### 🔧 **Modern Tech Stack**
- **Frontend**: React 18, TailwindCSS, Framer Motion, Lucide React
- **Backend**: FastAPI, MongoDB Atlas, JWT Authentication
- **AI**: Google Gemini API integration
- **Visualization**: React Flow for interactive mind maps

## 📸 Screenshots

### Landing Page
![Landing Page](<img width="1919" height="873" alt="image" src="https://github.com/user-attachments/assets/6f1e47d6-060a-4b9f-9175-742951dad4e8" />)

### Mind Map Generation
![Mind Map](<img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/6881e272-7841-49b4-8c6a-2014844f3138" />
)

### Dashboard
![Dashboard](<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/f126b017-dcd0-4a8a-98b4-4d4e1edc8d55" />
)

### AI Chat Bot To ask doubt and Expanding the Node
![Chat Bot](<img width="1919" height="807" alt="image" src="https://github.com/user-attachments/assets/f5d24f01-967e-4d52-8499-26db8747a95b" />
)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- MongoDB Atlas account
- Google Gemini API key

### Frontend Setup

```
# Clone the repository
git clone https://github.com/yourusername/mindscape.git
cd mindscape

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API keys to .env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_BACKEND_URL=http://localhost:8000

# Start development server
npm start
```

### Backend Setup

```
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Add your configurations to .env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key

# Start FastAPI server
uvicorn main:app --reload
```


## 🎯 Usage

### Creating Your First Mind Map

1. **Enter a Topic**: Type any subject like "Artificial Intelligence" or "Climate Change"
2. **Generate**: Click the "Generate Mind Map" button
3. **Explore**: Drag nodes around, zoom in/out, and click to expand
4. **Export**: Save your mind map as JSON, TXT, or share via link

### AI Chat Assistant

- Click the floating AI chat button (bottom-right)
- Ask questions about your mind map or request new ideas
- Voice input supported for hands-free interaction

### User Authentication

- Create account with email/password
- Secure JWT-based authentication
- Save and sync mind maps across devices

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the neo-brutalist design system
- Use monospace fonts and high contrast colors
- Add proper accessibility attributes
- Include unit tests for new features
- Update documentation as needed

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Input Validation** and sanitization
- **Rate Limiting** on API endpoints
- **CORS Configuration** for cross-origin requests

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```
npm run build
# Deploy dist/ folder to your preferred platform
```

### Backend (Railway/Heroku)
```
# Configure environment variables
# Deploy using platform-specific instructions
```

## 📊 Performance

- **React 18** with concurrent features
- **Code splitting** for optimal loading
- **Lazy loading** of components
- **Optimized animations** with Framer Motion
- **Responsive design** for all devices

### Upcoming Features
- [ ] Multiple AI model support (Claude, GPT-4)
- [ ] Mind map templates library
- [ ] Dark mode theme

## 🙏 Acknowledgments

- **Google Gemini AI** for powering our AI features
- **React Flow** for the amazing mind map visualization
- **Tailwind CSS** for the utility-first styling approach
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Sushindh Anandan**
- GitHub: [@Sushindh](https://github.com/Sushindh)
- LinkedIn: [Sushindh_Anandan](https://www.linkedin.com/in/sushindh-a-7281a1288/)
- Email: sushindh.anandan@gmail.com

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and lots of ☕

*Powered by advanced AI • Styled by chaos*

</div>
