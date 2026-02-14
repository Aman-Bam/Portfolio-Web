# Portfolio Website

A modern, high-performance personal portfolio website built with **React**, **Vite**, and **Tailwind CSS**. This project showcases professional experience, skills, and projects with a focus on interactive design, smooth animations, and a seamless user experience.

[Live Preview](https://portfolio-in-real-code-58x76s7q6-amans-projects-f3564815.vercel.app/)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that ensures a perfect viewing experience on all devices (Mobile, Tablet, Desktop).
- **Interactive UI**: Rich animations and micro-interactions powered by **Framer Motion**.
- **Performance Optimized**: Lightning-fast loading times and optimized asset delivery using **Vite**.
- **Contact Integration**: Functional contact form integrated with **EmailJS** for direct communication.
- **Detailed Case Studies**: Dedicated sections for in-depth project walkthroughs and case studies.
- **Dynamic Content Sections**:
  - **Hero Section**: Engaging introduction with interactive elements.
  - **About Me**: Professional summary and background.
  - **Services**: Overview of technical services and capabilities.
  - **Testimonials**: Client feedback and success stories.
- **Accessibility & UX**: Includes keyboard navigation hints, performance badges, and intuitive navigation.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting & Code Quality**: ESLint

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **npm** (comes bundled with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd "Portfolio in Real Code"
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory to configure environment variables. You can use `.env.example` as a template.
    ```bash
    cp .env.example .env
    ```
    
    **Required Variables:**
    - `VITE_IMAGEKIT_ENDPOINT`: Your ImageKit URL for optimized image serving.
    - *(Note: Check `src/components/Contact.jsx` or other components for additional API keys if needed, such as EmailJS public keys)*

### Running the Application

**Development Server:**
Start the local development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

**Production Build:**
Build the application for production deployment:
```bash
npm run build
```

**Preview Production Build:**
Locally preview the production build to ensure everything works as expected:
```bash
npm run preview
```

**Linting:**
Run ESLint to check for code quality and style issues:
```bash
npm run lint
```

## 📂 Project Structure

A quick look at the top-level directory structure:

```
src/
├── assets/         # Static assets (images, vectors, etc.)
├── components/     # Reusable UI components (Hero, Navbar, Contact, etc.)
├── context/        # React Context providers for global state
├── hooks/          # Custom React hooks for shared logic
├── lib/            # Third-party library configurations
├── utils/          # Helper functions and utilities
├── App.jsx         # Main application component layout
├── main.jsx        # Application entry point
└── index.css       # Global styles and Tailwind directives
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
