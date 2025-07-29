# Vibra - Crypto-Native Short-Form Video Social App

Vibra is a TikTok-style social platform where users earn crypto rewards for creating and engaging with short-form videos. Built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### Core Platform Features
- **Multi-role System**: Users, Creators, Moderators, and Admins
- **Authentication**: Email/password and crypto wallet (MetaMask, WalletConnect)
- **Video Feed**: TikTok-style vertical scrolling video feed
- **Content Creation**: Video upload with title, description, and tags
- **Engagement**: Like, comment, share, and follow functionality
- **Discovery**: Search videos, trending content, and creator profiles

### Crypto Integration
- **Reward System**: Earn VIBRA tokens for engagement (likes, comments, shares)
- **In-app Wallet**: View balance, transaction history, and withdraw funds
- **Blockchain**: Ready for Solana or EVM integration
- **Withdrawal Flow**: On-chain payouts to connected wallets

### Moderation & Administration
- **Content Moderation**: Report system for inappropriate content
- **Moderator Dashboard**: Review reports, manage flagged content
- **Admin Dashboard**: Platform analytics, user management, reward configuration
- **Safety Features**: Community guidelines and automated content scanning

### Design & UX
- **Dark Mode**: Neon purple gradient theme with yellow/orange accents
- **Mobile-First**: Responsive design optimized for all devices
- **Modern UI**: Sleek cards, gradients, and micro-interactions
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ with App Directory, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Backend**: Ready for Supabase or custom Node.js API
- **Blockchain**: Prepared for Solana/Ethereum integration

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

### Sample Accounts

Try these demo accounts:

**Creator Account:**
- Email: `king@example.com`
- Password: `password123`
- Role: Creator with high earnings

**Moderator Account:**
- Email: `sarah@vibra.com`
- Password: `password123`
- Role: Moderator with dashboard access

**Admin Account:**
- Email: `alex@vibra.com`
- Password: `password123`
- Role: Full admin access

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#6A00FF → #A65AFF)
- **Accent**: Yellow (#FFD700), Orange (#FF6A00)
- **Background**: Dark theme with gradient overlays
- **Text**: High contrast white/muted for readability

### Typography
- **Primary**: Inter (body text)
- **Accent**: Orbitron (logos, headings)
- **Weights**: 400, 500, 600, 700

### Components
- **Cards**: Rounded corners with gradient borders
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Dark theme with purple focus states
- **Avatars**: Circular with verification badges

## 🔧 Configuration

### Environment Variables (Future)
```env
# Database
DATABASE_URL=your_database_url

# Blockchain
NEXT_PUBLIC_SOLANA_RPC_URL=your_solana_rpc
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address

# Storage
AWS_S3_BUCKET=your_s3_bucket
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# External APIs
SENDGRID_API_KEY=your_sendgrid_key
TWILIO_ACCOUNT_SID=your_twilio_sid
```

### Blockchain Integration

The app is prepared for blockchain integration:

1. **Smart Contract**: Create token contract for VIBRA rewards
2. **Wallet Connection**: MetaMask and WalletConnect ready
3. **Transaction Flow**: Reward distribution and withdrawal logic
4. **Network Support**: Solana or Ethereum/Polygon

### Sample Smart Contract (Solana)
```rust
// Basic token program for VIBRA rewards
use anchor_lang::prelude::*;

#[program]
pub mod vibra_rewards {
    use super::*;
    
    pub fn distribute_reward(
        ctx: Context<DistributeReward>,
        amount: u64
    ) -> Result<()> {
        // Reward distribution logic
        Ok(())
    }
}
```

## 🚀 Deployment

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

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Demo**: [Live Demo URL]
- **Documentation**: [Docs URL]
- **Discord**: [Community Discord]
- **Twitter**: [@VibraApp]

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Email: support@vibra.app

---

Built with ❤️ for the crypto community. Start earning rewards for your creativity today! 🎬✨
</ootAction>