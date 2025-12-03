# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PHDV-AI is a Next.js 16 web application for a Personal Health Data Vault ecosystem. It features AI-powered health document analysis using Google Gemini, interactive 3D visualizations (Three.js), Web3 wallet integration (RainbowKit/Wagmi), MongoDB backend for data persistence, and a token reward system. The application is deployed on Vercel and connects to Somnia Mainnet blockchain.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### Development Server
- Local: http://localhost:3000
- The development server uses Next.js 16 with hot module reloading
- Changes to files trigger automatic reloads

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19.2
- **Styling**: Tailwind CSS 4 with custom utility classes
- **AI/ML**: Google Gemini API (@google/generative-ai) for health document analysis
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei for scroll-based animations
- **Web3**: RainbowKit 2.2.8 + Wagmi 2.16.0 + Viem 2.33.1
- **Database**: MongoDB with Mongoose 8.20
- **State Management**: TanStack React Query 5.68
- **UI Components**: Lucide React icons, react-markdown, recharts for data visualization
- **Markdown**: react-markdown for rendering analysis results

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with RainbowKit provider and Navigation
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # User dashboard with health analysis history
│   ├── researcher/        # Research interface
│   ├── validator/         # Validator tools
│   ├── staking/           # Staking interface
│   ├── developer/         # Developer tools
│   ├── tokenomics/        # Token economics
│   ├── compliance/        # Compliance info
│   ├── health-demo/       # Health analysis demo page
│   └── api/               # API routes
│       ├── test/          # MongoDB connection test endpoint
│       ├── analyze-health/ # Gemini AI health document analysis
│       ├── test-gemini/   # Gemini API connectivity test
│       └── dashboard/     # User dashboard data (stats, reports)
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation with wallet connect
│   ├── Scene.tsx          # Three.js 3D scene with brain model
│   ├── ParticlesScene.tsx # Particle effects background
│   ├── ConnectWallet.tsx  # RainbowKit wallet connector
│   ├── health/            # Health analysis components
│   │   ├── HealthAnalysisUploader.tsx  # File upload and analysis UI
│   │   └── HealthAnalysisCard.tsx      # Results display
│   ├── data-upload-dialog.tsx     # Generic data upload dialog
│   ├── dataset-wizard-dialog.tsx  # Dataset creation wizard
│   └── ui/                # Reusable UI components (button, switch, dropdown)
├── lib/
│   ├── mongodb.ts         # MongoDB connection utility with caching
│   ├── models/            # Mongoose schemas
│   │   ├── User.ts        # User model with wallet, tokens, analysis count
│   │   └── HealthAnalysis.ts  # Health analysis records
│   ├── services/          # Business logic layer
│   │   └── userService.ts # Token rewards and user operations
│   └── utils/
│       ├── utils.ts       # Utility functions (tailwind-merge)
│       └── tokenRewards.ts # Token calculation utilities
├── providers/
│   └── rainbow-kit-provider.tsx  # Web3 provider configuration
├── types/
│   └── health.ts          # TypeScript interfaces for health analysis
└── constants/
    ├── chains.ts          # Blockchain network configurations (Somnia Mainnet/Testnet)
    └── config.ts          # App configuration (default chain)
```

### Key Architectural Patterns

#### Health Analysis System Architecture
- **Two-stage AI validation**: First checks if document is health-related, then performs detailed analysis
- **Gemini 2.5 Flash Model**: Uses temperature 0.4 for balanced creativity/accuracy
- **JSON-only response format**: All analyses return structured JSON (markdown format deprecated)
- **Comprehensive analysis includes**:
  - AI-generated title and document type classification
  - Patient information extraction
  - Detailed findings with clinical significance (200+ word analysis)
  - Abnormal value detection with severity levels
  - Risk assessment (low/moderate/high)
  - Categorized recommendations (Immediate Actions, Lifestyle, Follow-up)
  - Medical context and educational information (150+ words)
- **File support**: PDF, CSV, DOC, DOCX, PNG, JPEG (max 20MB)
- **Token reward system**: Users earn 10-100 random tokens per analysis
- **Database persistence**: All analyses stored in MongoDB with wallet address linkage

#### Client-Side Rendering Pattern
Most pages and components use `"use client"` directive due to:
- RainbowKit/Wagmi requiring client-side hooks
- Three.js requiring browser APIs
- Interactive UI components with state
- React hooks for state management

#### MongoDB Connection
- Uses singleton pattern with global caching to prevent connection leaks in development
- Connection is established via `dbConnect()` from `src/lib/mongodb.ts`
- Requires `DATABASE_URL` environment variable in `.env.local`
- Mongoose models use the `models.ModelName || model()` pattern for hot reload support

#### Web3 Configuration
- **Supported Network**: Somnia Mainnet (Chain ID: 5031) ONLY
- RainbowKit configured with popular wallets: MetaMask, Coinbase, OKX, Trust, Rabby
- Wagmi uses fallback RPC strategy with 3-second timeout
- All Web3 providers wrapped in `RainbowKitProviderWrapper` with QueryClient
- Client-side mounting guard prevents hydration mismatches

#### 3D Scene Architecture
- `Scene.tsx`: Main 3D canvas with ScrollControls (4 pages)
- Brain model (`/Brain.glb`) loaded from public directory
- Scroll-based rotation animation synchronized with page scroll
- Particle system with burst effects and bloom post-processing
- Responsive positioning using viewport width calculations

#### Navigation Structure
- Fixed top navigation with backdrop blur
- Main nav items: Home, Dashboard, Research
- Dropdown groups: Tools (Validator, Staking, Developer), Info (Tokenomics, Compliance)
- Mobile responsive with hamburger menu
- Active route highlighting using Next.js `usePathname()`

## Path Aliases

TypeScript is configured with path alias:
```typescript
"@/*" -> "./src/*"
```

Use absolute imports: `import { Component } from '@/components/Component'`

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL=mongodb://user:password@host:port/database?authSource=admin
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**IMPORTANT**:
- Never commit `.env.local` to version control
- `GEMINI_API_KEY` is required for health analysis features
- Get Gemini API key from Google AI Studio (https://aistudio.google.com/apikey)

## Web3 Development Notes

- Project targets **Somnia Mainnet only** (testnet support removed)
- RainbowKit uses a placeholder projectId (update before production deployment)
- Wallet connection state managed by Wagmi/RainbowKit
- Toast notifications via react-toastify for user feedback
- ConnectWallet component handles all wallet interaction UI

## Three.js/React Three Fiber Notes

- All 3D components must be client-side rendered
- Use `Suspense` fallback for async model loading
- Brain.glb model is stored in `/public` directory
- Particle count and effects tuned for performance (5000 particles)
- Bloom effect applied globally via EffectComposer
- ScrollControls integrate HTML content within Canvas via `<Scroll html>`

## Database Models

Current schemas in `src/lib/models/`:

### User Model (`User.ts`)
- `walletAddress`: String, required, unique, lowercase, indexed
- `tokens`: Number, default 0, minimum 0 (token balance from analyses)
- `totalAnalyses`: Number, default 0 (lifetime analysis count)
- `lastAnalysisDate`: Date, optional
- `createdAt`, `updatedAt`: Auto-generated timestamps

### HealthAnalysis Model (`HealthAnalysis.ts`)
- `walletAddress`: String, required, indexed
- `fileName`: String, required
- `fileSize`: Number, required
- `fileType`: String, required
- `format`: Enum ['markdown', 'json'], default 'json'
- `markdown`: String, optional (deprecated)
- `analysisData`: Mixed type object containing full JSON analysis results
- `createdAt`, `updatedAt`: Auto-generated timestamps
- Compound index on `(walletAddress, createdAt)` for efficient queries

When adding new models:
1. Create schema in `src/lib/models/YourModel.ts`
2. Export interface and model
3. Use the pattern: `models.YourModel || model('YourModel', schema)`
4. Import and call `dbConnect()` before any database operations in API routes

## API Routes

API routes follow Next.js App Router pattern:
- Located in `src/app/api/[route]/route.ts`
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`
- Return `NextResponse.json()` for JSON responses

### Available Endpoints

#### `/api/test` (GET)
Tests MongoDB connection. Returns success status and connection info.

#### `/api/test-gemini` (GET)
Tests Gemini API connectivity. Validates `GEMINI_API_KEY` environment variable.

#### `/api/analyze-health` (POST)
Main health document analysis endpoint.
- **Request**: `multipart/form-data` with fields:
  - `file`: Document file (PDF, CSV, DOC, DOCX, PNG, JPEG, max 20MB)
  - `walletAddress`: User's wallet address
- **Response**: JSON with analysis results and token reward
- **Two-stage process**:
  1. Validates document is health-related
  2. Performs comprehensive analysis if validated
- **Error handling**: Returns detailed error messages for invalid files, API issues, or non-health documents

#### `/api/dashboard` (GET)
Retrieves user dashboard data.
- **Query param**: `walletAddress` (required)
- **Response**: User stats, token balance, analysis history, monthly/weekly report counts
- **Features**: Case-insensitive wallet address matching, auto-creates user if not exists

## Styling Conventions

- Tailwind CSS 4 utility classes
- Custom cyan accent color theme (#06b6d4)
- Dark theme by default with black background
- Glass morphism effects using backdrop-blur
- Custom fonts: Geist Sans and Geist Mono via next/font/google
- Use `cn()` utility from `@/lib/utils` for conditional classes (clsx + tailwind-merge)

## Component Patterns

### UI Components
- Located in `src/components/ui/`
- Button: customizable variants (ghost, etc.) and sizes
- Switch, DropdownMenu: pre-built accessible components
- Use Lucide React for icons

### Page Components
- Each route has corresponding page component in `src/app/[route]/page.tsx`
- Most pages import a matching component from `src/components/` (e.g., Dashboard.tsx)
- Include ParticlesScene for background effects
- Include Footer component

## Common Tasks

### Adding a New Page
1. Create `src/app/new-route/page.tsx` with default export
2. Create corresponding component in `src/components/NewRoute.tsx`
3. Add route to Navigation.tsx nav items arrays
4. Ensure `"use client"` if using hooks or interactivity

### Integrating Health Analysis
1. Import `HealthAnalysisUploader` component from `@/components/health/`
2. Ensure wallet connection via `useAccount()` from Wagmi
3. Pass wallet address to the uploader component
4. Handle analysis results with `HealthAnalysisCard` component
5. Error messages are in Turkish (as per current implementation)

### Adding Database Functionality
1. Define Mongoose model in `src/lib/models/`
2. Create API route in `src/app/api/your-endpoint/route.ts`
3. Call `dbConnect()` before database operations
4. Handle errors and return appropriate HTTP status codes
5. Use TypeScript interfaces from `src/types/` for type safety

### Working with Token Rewards
1. Import `rewardUserForAnalysis` from `@/lib/services/userService`
2. Call after successful operations: `await rewardUserForAnalysis(walletAddress)`
3. Returns: `{ earnedTokens, totalTokens, isNewUser }`
4. Token amounts are random (10-100) via `generateTokenReward()`
5. Customize with: `rewardUserForAnalysis(walletAddress, customAmount)`

### Adding Web3 Interactions
1. Use Wagmi hooks: `useAccount`, `useConnect`, `useSignMessage`, etc.
2. Wrap interactive components with `"use client"`
3. Access configured chain via `config` from rainbow-kit-provider
4. Ensure wallet connection state before blockchain operations

### Working with 3D Models
1. Place `.glb` or `.gltf` files in `/public` directory
2. Load with `useGLTF` from @react-three/drei
3. Wrap in `<Suspense>` for loading states
4. Use refs and `useFrame` for animations
5. Consider performance impact of model complexity

### Testing Gemini API Integration
Test API connectivity:
```bash
curl http://localhost:3000/api/test-gemini
```

Expected response (success):
```json
{
  "status": "ready",
  "message": "Gemini API is properly configured",
  "model": "gemini-2.5-flash"
}
```

## MongoDB Connection Testing

Test database connectivity:
```bash
curl http://localhost:3000/api/test
```

Expected response:
```json
{
  "success": true,
  "message": "Database connected successfully"
}
```

## Deployment

- Configured for Vercel deployment
- Ensure environment variables are set in Vercel dashboard:
  - `DATABASE_URL` (MongoDB connection string)
  - `GEMINI_API_KEY` (Google Gemini API key)
- Build command: `npm run build`
- Output directory: `.next`
- Node.js version: >=20.9.0 (required by Next.js 16)
- npm version: >=10.0.0

## TypeScript Configuration

- Strict mode enabled
- Target: ES2017
- JSX: react-jsx (automatic runtime)
- Module resolution: bundler
- Path aliases enabled via `paths` in tsconfig.json
