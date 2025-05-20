# Financial Dashboard

A modern financial dashboard built with Next.js, featuring a beautiful UI powered by Radix UI components and styled with Tailwind CSS.

## Screenshots

### Dashboard Overview
![Dashboard Overview](./docs/screenshots/dashboard-overview.png)
*Main dashboard view showing key financial metrics and charts*

### Dark Mode
![Dark Mode](./docs/screenshots/dark-mode.png)
*Dashboard in dark mode for comfortable viewing in low-light conditions*

### Mobile View
![Mobile Responsive](./docs/screenshots/mobile-view.png)
*Responsive design that works seamlessly on mobile devices*

> Note: To add your own screenshots:
> 1. Create a `docs/screenshots` directory in your project root
> 2. Take screenshots of your running dashboard
> 3. Save them as `dashboard-overview.png`, `dark-mode.png`, and `mobile-view.png`
> 4. Replace the placeholder images in this README

## Features

- 📊 Interactive financial data visualization
- 🎨 Modern and responsive UI using Radix UI components
- 🌙 Built-in dark mode support
- 📱 Mobile-friendly design
- 🚀 Fast performance with Next.js
- 🎯 TypeScript for type safety

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [React Hook Form](https://react-hook-form.com/) - Form handling

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Project Structure

```
financial-dashboard/
├── app/                  # Next.js app directory
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── styles/            # Global styles and Tailwind configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
