# Vibra — The Crypto-Native Social Media App

Vibra is a crypto-native social platform where anyone can create, engage, and earn.
Think TikTok, but your likes, comments, and shares pay you — powered by the Vibra token on Morph L2.

## 🚀 Live Demo

- **Demo URL**: [Coming Soon]
- **Demo Credentials**: 
  - Email: `demo@vibra.com`
  - Password: `password` (or any password)
- **Testnet**: Morph Holesky
- **Block Explorer**: https://explorer-holesky.morphl2.io/

## ✨ Features

### 🎥 Core Platform
- **Short-Form Videos**: TikTok-style vertical video feed
- **Crypto Rewards**: Earn VIBRA tokens for engagement
- **Web3 Wallet**: Connect MetaMask, WalletConnect
- **Multi-Role System**: Users, Creators, Moderators, Admins
- **Content Moderation**: Community reporting and admin tools

### 🔗 Blockchain Integration
- **Morph L2 Network**: Fast, low-cost transactions
- **Smart Contracts**: ERC20 token, NFT videos, reward pools
- **Decentralized**: On-chain reward distribution
- **Testnet Ready**: Full Morph Holesky integration

## 🛠 Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui, Lucide Icons
- **Blockchain**: Wagmi, Viem, RainbowKit, Hardhat
- **Network**: Morph Holesky Testnet
- **Styling**: CSS Variables, Dark Theme, Responsive Design

## What Vibra Offers

### Core Platform Features
- **Create & Earn**:  Post short videos. Build your audience. Earn $VIBRA tokens for engagement.
- **Watch & Engage**: Scroll endlessly through a sleek short-video feed. Like, comment, share — and get rewarded.
- **Crypto-First Wallet**: Connect your wallet (MetaMask, WalletConnect). Withdraw your rewards on-chain.
- **Multi-Role**: Users, Creators, Moderators, Admins — with tools for each.
- **Safe & Fair**:Community reporting, moderation dashboard, and clear reward logic.

### Current Status = MVP Stage
- Core Next.js, React, and Tailwind CSS codebase ready.
- User auth flow integrated — email + crypto wallet.
- Video upload flow scaffolded.
- Reward system logic drafted.
- Admin & Moderator dashboards planned.

## 📁 Project Structure

```
vibra/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── discover/          # Content discovery
│   ├── moderation/        # Moderation tools
│   ├── profile/           # User profiles
│   ├── settings/          # Account settings
│   ├── wallet/            # Crypto wallet
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── auth/              # Authentication
│   ├── navigation/        # Navigation components
│   ├── pages/             # Page components
│   ├── ui/                # UI primitives
│   ├── video/             # Video components
│   └── providers.tsx      # Context providers
├── data/                  # Mock data
│   └── mock-data.ts       # Sample users, videos, transactions
├── lib/                   # Utilities
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
└── public/                # Static assets
```

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Next Milestones
 Finalize video storage (Cloudflare or S3)
 Hook up smart contract for $VIBRA rewards (Thirdweb or custom)
 Integrate on-chain withdrawal flow with MORPH and VIBRA Token
 QA test multi-role dashboards
 Deploy live
 
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Connect with us

- **Demo**: coming soon
- **Twitter(X)**: https://x.com/vibraonmorph
- **Telegram**: https://t.me/vibraonmorph


---

Built with ❤️ for the crypto community by Vibra on Morph. Create. Engage. Earn. Repeat.!