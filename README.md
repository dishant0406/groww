# Groww Next.js Project

This repository contains the source code for the Groww Assignme nt web application built with Next.js. It's structured to provide a seamless development experience with clear separation of components and pages.

## Project Structure

Below is the main folder structure and their contents:

- `.next/`: Auto-generated folder for Next.js build output.
- `app/`: Contains the main pages and components for the application.
  - `checkout/`: Components and logic for the checkout process.
    - `page.tsx`: Checkout page component.
  - `status/`: Components for displaying status updates.
    - `page.tsx`: Status page component.
  - `favicon.ico`: The favicon for the web app.
  - `globals.css`: Global CSS styles.
  - `layout.tsx`: The main layout component.
  - `page.tsx`: The entry point for a generic page.
- `components/`: Reusable components.
  - `Micro/`: Smaller components like buttons and inputs.
    - `Button.tsx`: Button component.
    - `Input.tsx`: Input component.
    - `ProductItem.tsx`: Product item display component.
    - `Radio.tsx`: Custom radio button component.
    - `SideInfo.tsx`: Side information panel component.
  - `PageComponents/`: Components specific to pages.
    - `Checkout/`: Checkout related components.
      - `index.tsx`: Aggregated exports for checkout components.
    - `OrderDetails/`: Order details display components.
      - `index.tsx`: Aggregated exports for order detail components.
    - `Status/`: Status update related components.
      - `index.tsx`: Aggregated exports for status components.
- `ui/`: UI related utilities and components.
- `lib/`: Library code that provides utility functions and helpers.
  - `Store/`: State management using stores with Zustand
    - `useStore.ts`: A custom hook for store usage.
  - `utils.ts`: Utility functions.
- `node_modules/`: Node.js modules.
- `public/`: Static files accessible by the public.
- `.eslintrc.json`: ESLint configuration file.
- `.gitignore`: Specifies intentionally untracked files to ignore.

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/dishant0406/groww

2. Install Dependency
   ```sh
   npm install

2. Run Dev Server
   ```sh
   npm run dev

