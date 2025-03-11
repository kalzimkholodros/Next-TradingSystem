# NeonDash - Cryptocurrency Trading Dashboard

A sophisticated virtual cryptocurrency trading ecosystem integrated with an advanced analytics dashboard, engineered with Next.js and Prisma, offering seamless portfolio management and real-time market simulation capabilities.

![Ekran görüntüsü 2025-03-12 005944](https://github.com/user-attachments/assets/cc31edec-d49f-4424-8fa0-53c782a25106)



## Features

- 🚀 **Modern UI Design**: Sleek neon-themed interface with responsive layouts
- 📊 **Interactive Charts**: Real-time price tracking with Chart.js integration
- 💼 **Portfolio Management**: Track your cryptocurrency holdings and performance
- 🔄 **Live Updates**: Simulated market data with automatic price updates
- 🔒 **Secure Authentication**: User authentication with data persistence
- 📱 **Responsive Design**: Fully responsive across all devices
- ⚡ **Fast Performance**: Built with Next.js for optimal performance

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **State Management**: Zustand
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kalzimkholodros/Next-TradingSystem.git
cd neondash
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Create a .env file and add the following
DATABASE_URL="postgresql://username:password@localhost:5432/neondash"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Seed the database with initial data:
```bash
npx prisma db seed
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
neondash/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── components/    # Reusable components
│   │   ├── store/        # Zustand store
│   │   └── (routes)/     # Page components
│   ├── prisma/           # Database schema and migrations
│   └── types/            # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Features in Detail

### Authentication
- Secure user registration and login
- Persistent sessions with NextAuth.js
- Protected routes and API endpoints

### Portfolio Management
- Real-time portfolio value tracking
- Individual coin performance monitoring
- Transaction history
- Simulated trading functionality

### Market Data
- Live price updates for cryptocurrencies
- 7-day price history charts
- Top gainers and losers tracking
- Trending coins analysis

  ![Ekran görüntüsü 2025-03-12 010214](https://github.com/user-attachments/assets/a744a7d3-4145-4a28-85e4-1a2371201296)


### User Interface
- Dark mode with neon accents
- Responsive grid layouts
- Interactive charts and tables
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Chart.js for the beautiful charts
- Tailwind CSS for the styling utilities
- The cryptocurrency community for inspiration


