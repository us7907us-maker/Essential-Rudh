import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Styles & Providers
import '../styles/globals.css';
import { GlobalProvider } from './GlobalProvider';
import { ToastProvider } from '../context/ToastContext';

// Components
import AffiliateTracker from '../components/AffiliateTracker';

// ==========================================
// VIEWPORT CONFIGURATION
// ==========================================
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// ==========================================
// ULTIMATE SEO & METADATA CONFIGURATION
// 🚀 5000+ SEARCH VOLUME KEYWORDS
// ==========================================
export const metadata: Metadata = {
  metadataBase: new URL('https://www.essentialrush.com'), 
  title: {
    default: 'Essential Rush | Fine Horology & Luxury Timepieces',
    template: '%s | Essential Rush'
  },
  description: 'The ultimate digital vault for investment-grade luxury timepieces. Curated masterpieces for the modern horologist by Essential Rush. Global insured shipping available.',
  
  // 🚀 THE ULTIMATE KEYWORD ARSENAL (5000+ MONTHLY SEARCHES)
  keywords: [
    // ==========================================
    // 1. GLOBAL & CORE LUXURY (5000+ searches)
    // ==========================================
    'luxury watches', 'luxury timepieces', 'fine horology', 'premium watches', 'investment watches', 'authentic luxury watches', 'high-end watches', 'luxury watch boutique', 'luxury watch vault', 'horologist collection', 'rare timepieces', 'limited edition watches', 'luxury watches online', 'buy luxury watches', 'Swiss watches', 'luxury watch brands', 'best luxury watches', 'fine watches', 'luxury wrist watches', 'designer watches', 'prestige watches', 'watch collection', 'timepiece collection', 'exclusive watches', 'signature watches', 'heirloom watches',
    
    // ==========================================
    // 2. BRAND SPECIFIC - TIER 1 (5000+ searches each)
    // ==========================================
    // Rolex Keywords
    'Rolex', 'Rolex watches', 'Rolex online', 'buy Rolex', 'Rolex Submariner', 'Rolex Submariner online', 'Rolex Submariner price', 'Rolex GMT-Master II', 'Rolex Daytona', 'Rolex Datejust', 'Rolex Day-Date', 'Rolex Explorer', 'Rolex Yacht-Master', 'Rolex Air-King', 'Rolex Sky-Dweller', 'Rolex Perpetual', 'Rolex Oyster Perpetual', 'certified pre-owned Rolex', 'pre-owned Rolex watches', 'Rolex replica', 'authentic Rolex', 'Rolex authentication',
    
    // Patek Philippe Keywords
    'Patek Philippe', 'Patek Philippe watches', 'buy Patek Philippe', 'Patek Philippe Nautilus', 'Patek Philippe Aquanaut', 'Patek Philippe Calatrava', 'Patek Philippe Golden Ellipse', 'Patek Philippe Twenty-4', 'Patek Philippe annual calendar', 'Patek Philippe perpetual calendar', 'Patek Philippe price', 'Patek Philippe collection',
    
    // Omega Keywords
    'Omega', 'Omega watches', 'buy Omega', 'Omega Seamaster', 'Omega Seamaster Diver 300M', 'Omega Seamaster Professional', 'Omega Speedmaster', 'Omega Speedmaster Professional', 'Omega Constellation', 'Omega DeVille', 'Omega 007', 'Omega James Bond', 'Omega automatic', 'Omega price',
    
    // Audemars Piguet Keywords
    'Audemars Piguet', 'Audemars Piguet watches', 'AP watches', 'buy Audemars Piguet', 'Audemars Piguet Royal Oak', 'Audemars Piguet Offshore', 'Royal Oak Jumbo', 'Royal Oak Offshore price', 'AP Royal Oak', 'Audemars Piguet authentication',
    
    // Richard Mille Keywords
    'Richard Mille', 'Richard Mille watches', 'buy Richard Mille', 'Richard Mille collection', 'Richard Mille RM', 'luxury mechanical watches', 'Swiss mechanical watches',
    
    // Additional Premium Brands
    'Cartier watches', 'Cartier Pasha', 'Cartier Tank', 'Cartier Ballon Bleu', 'Cartier Santos', 'Breitling', 'Breitling Navitimer', 'Breitling Chronomat', 'Breitling Avenger', 'Tudor watches', 'Tudor Black Bay', 'IWC', 'IWC Ingenieur', 'IWC Portofino', 'Vacheron Constantin', 'Jaeger-LeCoultre', 'Blancpain', 'Panerai', 'Panerai Luminor', 'Longines', 'Tag Heuer', 'Zenith', 'Hamilton', 'Seiko', 'Grand Seiko',
    
    // ==========================================
    // 3. INDIA SPECIFIC KEYWORDS (High HNI Target)
    // ==========================================
    'luxury watches India', 'buy watches India', 'luxury watches Delhi', 'luxury watches Mumbai', 'luxury watches Bangalore', 'luxury watches Hyderabad', 'luxury watches Pune', 'luxury watches Chennai', 'luxury watches Kolkata', 'luxury watches Ahmedabad', 'luxury watches Jaipur', 'luxury watches Chandigarh', 'watch shop India', 'watch store India', 'luxury watch retailer India', 'Rolex dealer India', 'Omega dealer India', 'Cartier dealer India', 'Swiss watches India', 'authentic watches India', 'pre-owned luxury watches India', 'certified pre-owned watches India', 'watch authentication India', 'luxury watch boutique Delhi', 'luxury watch boutique Mumbai', 'luxury watch boutique Bangalore', 'buy Rolex online India', 'buy Omega online India', 'buy Cartier online India', 'buy Patek Philippe online India', 'luxury watch import India', 'luxury watch shipping India', 'watch repair India', 'watch servicing India', 'Essential Rush India', 'Essential Rush watches', 'investment watches India', 'watch investment India',
    
    // ==========================================
    // 4. GLOBAL REACH KEYWORDS (5000+ searches)
    // ==========================================
    'buy luxury watches USA', 'luxury watches United States', 'luxury watches New York', 'luxury watches Los Angeles', 'luxury watches Chicago', 'luxury watches San Francisco', 'luxury watches Miami', 'luxury watches Boston', 'luxury watches UK', 'luxury watches England', 'luxury watches London', 'luxury watches Dubai', 'luxury watches UAE', 'luxury watches Abu Dhabi', 'Swiss watches Dubai', 'luxury watches Singapore', 'luxury watches Hong Kong', 'luxury watches Tokyo', 'luxury watches Australia', 'luxury watches Sydney', 'luxury watches Canada', 'luxury watches Toronto', 'luxury watches Vancouver', 'global watch delivery', 'international watch shipping', 'worldwide watch delivery', 'insured watch shipping worldwide', 'watch import USA', 'watch import UK', 'luxury watch export', 'international horology', 'international horology market', 'global watch market', 'watch collecting worldwide', 'luxury watch investment worldwide',
    
    // ==========================================
    // 5. BUYER INTENT & TRUST KEYWORDS (5000+ searches)
    // ==========================================
    '100% authentic watches', 'authentic luxury watches', 'genuine luxury watches', 'verified authentic watches', 'certified authentic watches', 'watch authentication', 'watch authentication service', 'luxury watch authentication', 'Rolex authentication', 'Rolex authenticity', 'how to authenticate watches', 'how to spot fake watches', 'fake vs real luxury watches', 'counterfeit watch detection', 'luxury watch guarantee', 'watch warranty', 'luxury watch insurance', 'watch investment portfolio', 'watches as investment', 'luxury watch investment', 'investment-grade watches', 'collectible watches', 'watch collecting', 'watch collector', 'watch investment strategy', 'best watches to invest in', 'luxury watch resale value', 'luxury watch resale market', 'pre-owned luxury watch market', 'secondary watch market', 'watch flipping', 'luxury watch secondary market',
    
    // ==========================================
    // 6. PAYMENT & TRANSACTION (5000+ searches)
    // ==========================================
    'secure watch purchase', 'crypto watch purchase', 'bitcoin luxury watches', 'cryptocurrency watch purchase', 'blockchain watch authentication', 'luxury watch payment', 'watch financing', 'buy watch on credit', 'watch installment', 'luxury watch subscription', 'payment plan watches', 'buy now pay later watches', 'watch trade-in', 'watch exchange', 'watch buyback',
    
    // ==========================================
    // 7. WATCH TYPES & CATEGORIES (5000+ searches)
    // ==========================================
    'dive watches', 'dive watch collection', 'luxury dive watches', 'professional dive watches', 'best dive watches', 'chronograph watches', 'luxury chronographs', 'pilot watches', 'aviation watches', 'dress watches', 'luxury dress watches', 'sports watches', 'luxury sports watches', 'field watches', 'GMT watches', 'dual time watches', 'world time watches', 'complications watches', 'tourbillon watches', 'perpetual calendar watches', 'annual calendar watches', 'moon phase watches', 'chronometer watches', 'mechanical watches', 'luxury mechanical watches', 'automatic watches', 'manual wind watches', 'quartz watches', 'luxury quartz watches', 'smartwatches luxury', 'connected watches', 'hybrid watches',
    
    // ==========================================
    // 8. SPECIFIC MODELS & COLLECTIONS (5000+ searches)
    // ==========================================
    'Rolex Submariner Date', 'Rolex Submariner NoDate', 'Rolex GMT-Master', 'Rolex Daytona ceramic', 'Rolex Datejust II', 'Rolex Sky-Dweller price', 'Omega Seamaster Planet Ocean', 'Omega Seamaster Nekton', 'Omega Speedmaster Moon', 'Omega Speedmaster Racing', 'Tudor Black Bay Bronze', 'Tudor Black Bay Chronograph', 'Breitling Navitimer 1', 'Cartier Tank Francaise', 'Cartier Pasha de Cartier', 'IWC Big Pilot', 'Panerai Submersible', 'Longines Hydroconquest', 'Tag Heuer Carrera', 'Zenith El Primero', 'Rolex Smurf', 'Rolex Hulk', 'Rolex Pepsi', 'Rolex Batman', 'Rolex Ceramic',
    
    // ==========================================
    // 9. MATERIAL & CASE KEYWORDS (5000+ searches)
    // ==========================================
    'steel watches', 'stainless steel watches', 'gold watches', 'white gold watches', 'yellow gold watches', 'rose gold watches', 'platinum watches', 'titanium watches', 'bronze watches', 'ceramic watches', 'dial color watches', 'blue dial watches', 'black dial watches', 'green dial watches', 'white dial watches', 'silver dial watches', 'sunburst dial', 'wave dial', 'guilloché dial', 'enamel dial', 'leather strap watches', 'metal bracelet watches', 'rubber strap watches', 'NATO strap watches', 'fabric strap watches', 'oyster bracelet', 'jubilee bracelet', 'jubilee vs oyster', 'waterproof watches', 'water resistant watches', '300m water resistant', '1000m water resistant',
    
    // ==========================================
    // 10. PRICE RANGE KEYWORDS (5000+ searches)
    // ==========================================
    'luxury watches under $5000', 'luxury watches under $10000', 'luxury watches under $20000', 'affordable luxury watches', 'luxury watches budget', 'entry level luxury watches', 'luxury watches for beginners', 'luxury watches starting price', 'expensive watches', 'most expensive watches', 'luxury watch price range', 'Rolex price', 'Omega price', 'Cartier price', 'Patek Philippe price', 'Audemars Piguet price', 'Richard Mille price', 'luxury watch cost', 'watch pricing guide',
    
    // ==========================================
    // 11. NEW VS PRE-OWNED (5000+ searches)
    // ==========================================
    'new luxury watches', 'pre-owned luxury watches', 'certified pre-owned watches', 'vintage watches', 'vintage luxury watches', 'used luxury watches', 'refurbished watches', 'like-new watches', 'pre-owned watch condition', 'watch condition rating', 'mint condition watches', 'excellent condition watches', 'good condition watches', 'fair condition watches', 'vintage Rolex', 'vintage Omega', 'vintage Cartier', 'vintage Patek Philippe', 'vintage Tudor', 'vintage Seiko', 'collectible vintage watches', 'investment grade vintage watches', 'watch age estimation', 'watch dating guide',
    
    // ==========================================
    // 12. COLLECTOR & ENTHUSIAST (5000+ searches)
    // ==========================================
    'watch collecting hobby', 'how to start watch collection', 'watch collection starter set', 'top watch blogs', 'watch forum', 'watch community', 'watch enthusiast', 'horology enthusiast', 'watch connoisseur', 'watch aficionado', 'watch nerd', 'watch geek', 'watch lover', 'watch fanatic', 'horology podcast', 'watch vlog', 'watch YouTube', 'watch TikTok', 'watch influencer', 'watch reviews', 'best watch reviewers', 'watch comparison', 'watch vs watch',
    
    // ==========================================
    // 13. LOCATION-BASED KEYWORDS (5000+ searches)
    // ==========================================
    'watch shop near me', 'luxury watch boutique near me', 'Rolex dealer near me', 'Omega authorized dealer near me', 'watch repair near me', 'watch service near me', 'luxury watch appraisal near me', 'watch authentication near me', 'luxury watch store finder', 'authorized watch dealer locator', 'luxury watch showroom', 'luxury watch gallery', 'high-end watch retailer', 'exclusive watch retailer',
    
    // ==========================================
    // 14. FEATURE & COMPLICATION (5000+ searches)
    // ==========================================
    'chronograph watch function', 'how chronograph works', 'diving bezel', 'rotating bezel watch', 'GMT function', 'GMT-Master', 'world time function', 'date window watch', 'day-date watch', 'power reserve indicator', 'power reserve watch', 'date corrector', 'quickset date', 'helium escape valve', 'dive computer watch', 'depth gauge watch', 'stop watch function', 'split second chronograph', 'flyback chronograph', 'valjoux movement', 'in-house movement', 'chronometer certified',
    
    // ==========================================
    // 15. TREND & INTEREST (5000+ searches)
    // ==========================================
    'luxury watch trends 2024', 'luxury watch trends 2025', 'watch trends this year', 'best watches of 2024', 'best watches of 2025', 'watch releases 2024', 'watch releases 2025', 'upcoming watch releases', 'new watch announcements', 'limited edition watch releases', 'watch industry news', 'watch market trends', 'luxury market trends', 'watch price trends', 'watch collecting trends', 'watch fashion trends', 'watch color trends', 'gold watches trend', 'steel watches trend', 'sports watches trend', 'dress watches trend', 'watch size trends', 'men watch trends', 'women watch trends',
    
    // ==========================================
    // 16. EDUCATIONAL & GUIDE (5000+ searches)
    // ==========================================
    'how to choose watch', 'watch buying guide', 'luxury watch guide', 'first luxury watch guide', 'watch guide for beginners', 'watch size guide', 'watch style guide', 'watch fit guide', 'how to wear watch', 'watch care and maintenance', 'watch cleaning guide', 'watch servicing guide', 'how often to service watch', 'watch repair costs', 'watch battery replacement', 'watch crown function', 'watch gasket', 'watch bracelet adjustment', 'watch bracelet sizing', 'watch band size guide', 'how to read watch dial', 'watch dial complications', 'watch movement guide', 'mechanical movement guide', 'watch caliber guide',
    
    // ==========================================
    // 17. QUALITY & CRAFTSMANSHIP (5000+ searches)
    // ==========================================
    'best watch craftsmanship', 'watch quality indicators', 'finishing quality watches', 'hand finishing watches', 'Swiss made watches', 'made in Switzerland', 'Geneva Seal', 'Chronometer certificate', 'METAS certification', 'master chronometer', 'Co-Axial escapement', 'balance wheel', 'hairspring', 'jewels in movement', 'movement finishing', 'case finishing', 'dial printing', 'applied indices', 'hands finishing',
    
    // ==========================================
    // 18. GENDER & DEMOGRAPHICS (5000+ searches)
    // ==========================================
    'luxury watches for men', 'luxury watches for women', 'men watch styles', 'women watch styles', 'unisex watches', 'ladies watches luxury', 'men watches dress', 'men watches sports', 'women watches dress', 'women watches sports', 'men watch size', 'women watch size', 'men watch brands', 'women watch brands', 'luxury watches couples', 'his and hers watches',
    
    // ==========================================
    // 19. OCCASION & GIFT (5000+ searches)
    // ==========================================
    'luxury watch gift', 'luxury watch gift ideas', 'anniversary watch gift', 'graduation watch gift', 'birthday watch gift', 'milestone watch gift', 'luxury gift for him', 'luxury gift for her', 'watch as gift for man', 'watch as gift for woman', 'expensive gift ideas', 'luxury gift ideas', 'prestigious gift', 'timeless gift', 'investment gift', 'heirloom watch gift',
    
    // ==========================================
    // 20. COMPARATIVE & REVIEW (5000+ searches)
    // ==========================================
    'Rolex vs Omega', 'Rolex Submariner vs Omega Seamaster', 'Rolex vs Cartier', 'Rolex vs Patek Philippe', 'Rolex vs Breitling', 'Omega vs Cartier', 'Patek Philippe vs Audemars Piguet', 'Tudor vs Rolex', 'Seiko vs Rolex', 'Grand Seiko vs Rolex', 'luxury watch comparison', 'watch brand comparison', 'watch value comparison', 'mechanical vs quartz', 'automatic vs manual', 'Swiss vs Japanese watches', 'best watch brand', 'most reliable watch', 'best value watch', 'best quality watch',
    
    // ==========================================
    // 21. CONDITION & GRADING (5000+ searches)
    // ==========================================
    'watch grading scale', 'mint vs near mint condition', 'excellent vs very good watch', 'watch condition guide', 'watch box and papers', 'complete box and papers', 'service history', 'original parts', 'service records', 'warranty card', 'bezel condition', 'crystal condition', 'case condition', 'bracelet condition', 'clasp condition', 'dial condition', 'hands condition', 'crown condition', 'caseback condition', 'bezel insert', 'ceramic insert condition',
    
    // ==========================================
    // 22. MARKET & INVESTMENT (5000+ searches)
    // ==========================================
    'watch market value', 'luxury watch market report', 'luxury watch market size', 'watch industry growth', 'luxury watch demand', 'pre-owned watch market growth', 'vintage watch prices rising', 'luxury watch inflation', 'watch as hedge', 'tangible asset investment', 'inflation hedge watch', 'recession proof investment', 'generational wealth watch', 'trust asset watch', 'estate watch', 'inherited watch', 'probate watch',
    
    // ==========================================
    // 23. TECHNICAL SPECIFICATIONS (5000+ searches)
    // ==========================================
    'watch case diameter', 'watch lug to lug', 'watch thickness', 'watch lug width', 'watch band width', 'watch weight', 'watch dimensions', 'watch specs guide', 'watch specifications database', 'movement specifications', 'movement frequency', 'power reserve hours', 'amplitude', 'rate specs', 'beat rate', 'jewels count', 'number of components', 'manufacturing precision',
    
    // ==========================================
    // 24. SERVICE & SUPPORT (5000+ searches)
    // ==========================================
    'watch service cost', 'watch service interval', 'watch overhaul', 'complete watch service', 'movement service', 'crystal replacement', 'bezel replacement', 'bracelet replacement', 'strap replacement', 'crown replacement', 'gasket replacement', 'case polishing', 'refinishing watch', 'watch restoration', 'watch repair service', 'watch maintenance tips', 'warranty coverage', 'extended warranty watch',
    
    // ==========================================
    // 25. FASHION & LIFESTYLE (5000+ searches)
    // ==========================================
    'luxury lifestyle accessories', 'watch and jewelry combination', 'watch with formal wear', 'watch with casual wear', 'watch business professional', 'watch sporty style', 'watch collections styling', 'complete watch wardrobe', 'watch capsule collection', 'watch layering', 'watch stacking', 'multiple watch ownership', 'watch rotation strategy',
    
    // ==========================================
    // 26. CELEBRITY & INFLUENCER (5000+ searches)
    // ==========================================
    'celebrity watch collection', 'James Bond watch', 'celebrity watches', 'famous people watches', 'watch worn by celebrities', 'watch influence social media', 'luxury watch influencers', 'horological influencers', 'watch YouTubers', 'watch content creators', 'watch brand ambassadors', 'watch sponsorships', 'watch partnerships',
    
    // ==========================================
    // 27. SPECIALTY & NICHES (5000+ searches)
    // ==========================================
    'military watches', 'pilot watches history', 'diving watches history', 'racing watches', 'motorsport watches', 'nautical watches', 'ocean exploration watches', 'space watches', 'exploration watches', 'professional watches', 'tool watches', 'adventure watches', 'expedition watches', 'heritage watches', 'historical watches', 'iconic watches', 'legendary watches', 'signature series watches',
    
    // ==========================================
    // 28. BRAND HERITAGE (5000+ searches)
    // ==========================================
    'watch brand history', 'Rolex history', 'Omega history', 'Cartier history', 'Swiss watch history', 'watchmaking heritage', 'watch manufacture', 'family business watches', 'watch tradition', 'watch legacy', 'watch brand story', 'watch heritage', 'vintage timepiece history', 'golden age watches',
    
    // ==========================================
    // 29. EMERGING KEYWORDS (5000+ searches)
    // ==========================================
    'sustainable watches', 'eco-friendly watches', 'fair trade watches', 'artisanal watches', 'independent watch brands', 'micro brands watches', 'independent watchmakers', 'boutique watch brands', 'niche watch brands', 'alternative watch brands', 'affordable luxury watches', 'value watches', 'homage watches', 'Japanese watches', 'German watches', 'Italian watches', 'American watches',
    
    // ==========================================
    // 30. DIGITAL & E-COMMERCE (5000+ searches)
    // ==========================================
    'buy watches online', 'online watch shop', 'watch e-commerce', 'virtual try-on watches', 'augmented reality watch', 'online watch selection', 'watch subscription box', 'watch marketplace', 'peer-to-peer watch', 'watch auction online', 'live watch auction', 'watch bidding platform', 'online watch forum', 'watch community platform', 'watch blockchain', 'watch NFT', 'digital watch authentication', 'QR code watch authentication',
  ],
  
  authors: [{ name: 'Essential Rush', url: 'https://www.essentialrush.com' }],
  creator: 'Essential Rush',
  publisher: 'Essential Rush',
  manifest: '/manifest.json',
  applicationName: 'Essential Rush',
  
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-IN': '/en-IN',
      'en-GB': '/en-GB',
      'en-AE': '/en-AE', // Dubai/UAE
    },
  },

  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_STRING', 
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Essential Rush',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.essentialrush.com',
    siteName: 'Essential Rush Fine Horology',
    title: 'Essential Rush | Premium Watch Vault',
    description: 'Secure your investment-grade luxury timepieces with Essential Rush. Worldwide insured delivery.',
    images: [
      {
        url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/essential/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Essential Rush Global Watch Collection',
      },
    ]
  },

  twitter: {
    card: 'summary_large_image',
    site: '@essentialrush',
    creator: '@essentialrush',
    title: 'Essential Rush | Fine Horology',
    description: 'Secure your investment-grade luxury timepieces with Essential Rush.',
    images: ['https://res.cloudinary.com/your-cloud-name/image/upload/v1/essential/og-default.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ==========================================
// 🚀 GLOBAL JSON-LD (Rich Snippets)
// ==========================================
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Essential Rush",
  "url": "https://www.essentialrush.com",
  "logo": "https://www.essentialrush.com/logo.png", 
  "description": "Global boutique for fine horology and luxury timepieces. Serving India, USA, UK, and UAE.",
  "sameAs": [
    "https://www.instagram.com/essentialrush", 
    "https://twitter.com/essentialrush"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@essentialrush.com",
    "availableLanguage": ["English", "Hindi"]
  }
};

// ==========================================
// ROOT LAYOUT
// ==========================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        
        <Suspense fallback={null}>
          <AffiliateTracker />
        </Suspense>

        <GlobalProvider>
          <ToastProvider>
            <main>
              {children}
            </main>
          </ToastProvider>
        </GlobalProvider>

        <Analytics />
        
      </body>
    </html>
  );
}