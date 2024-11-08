# DApp Builder Platform

A no-code platform for building decentralized applications, including token sales, airdrops, and exchanges.

## Features

- Token Sale Builder
- Airdrop System
- Token Exchange Builder
- Web3 Authentication
- Admin Dashboard
- Real-time Analytics

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Ethers.js
- Supabase

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

The project can be deployed to any static hosting platform that supports Next.js, such as Vercel or Netlify.

## License

MIT