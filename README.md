# PHDV-AI Landing Page

This project is a responsive landing page for the PHDV-AI concept, built with Next.js, Tailwind CSS, and Three.js. It features a dynamic 3D brain model that animates on scroll, showcasing the intersection of health data and AI.

## Features

- **Next.js 14:** Utilizes the latest features of the React framework for production.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Three.js & @react-three/fiber:** Displays a 3D model (`.glb`) in a React environment.
- **@react-three/drei:** Helper components for Three.js, used here for scrolling animations and scene setup.
- **Responsive Design:** The layout and 3D scene adapt to different screen sizes.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd phdv-ai-landing
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `/public`: Contains static assets, including the `Brain.glb` 3D model.
-   `/src/app`: The main application directory for Next.js (App Router).
    -   `page.tsx`: The main component for the landing page content.
    -   `layout.tsx`: The root layout of the application.
    -   `globals.css`: Global styles and Tailwind CSS configuration.
-   `/src/components`: Contains the React components.
    -   `Scene.tsx`: The component responsible for rendering the 3D scene with Three.js.
.