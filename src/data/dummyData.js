// =====================================================================
// FreshFind — Dummy Data Layer
// TechWiz 7 — Web Innovation Unleashed
// =====================================================================
// All data is JSON-driven so the UI can be filtered, sorted, and
// cross-linked between markets <-> produce.
// =====================================================================

export const APP_META = {
  name: 'FreshFind',
  tagline: 'Discover Farmers Markets & Seasonal Produce',
  version: '1.0.0',
  championship: 'TechWiz 7 — Web Innovation Unleashed',
  totalMarkets: 18,
  organicFarms: 142,
  totalProduce: 60,
  social: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
  },
}

// Operating days reference
export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Areas / neighborhoods served
export const AREAS = [
  'Riverside',
  'Hillcrest',
  'Greenfield',
  'Old Town',
  'Marina Bay',
  'Sunset Valley',
  'Northgate',
  'Lakeside',
  'Brookhaven',
  'Maple Grove',
]

// Produce categories
export const PRODUCE_CATEGORIES = ['Fruits', 'Vegetables', 'Herbs', 'Dairy']

// Seasons
export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter']

// Helper: convert a "HH:MM" 24h string + day into a comparable timestamp
function nextOpenTimestamp(openDays, openTime) {
  const now = new Date()
  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const [h, m] = openTime.split(':').map(Number)
  for (let i = 0; i < 7; i++) {
    const probe = new Date(now)
    probe.setDate(now.getDate() + i)
    probe.setHours(h, m, 0, 0)
    const label = DAYS_OF_WEEK[(probe.getDay() + 6) % 7] // Mon=0 ... Sun=6
    if (openDays.includes(label) && probe >= now) {
      return probe.getTime()
    }
  }
  return Number.MAX_SAFE_INTEGER
}

// =====================================================================
// MARKETS
// =====================================================================
export const MARKETS = [
  {
    id: 'm-riverside-spring',
    name: 'Riverside Spring Market',
    area: 'Riverside',
    days: ['Sat', 'Sun'],
    openTime: '07:00',
    closeTime: '13:00',
    established: 2009,
    verifiedOrganic: true,
    stalls: 64,
    rating: 4.8,
    reviewsCount: 312,
    thumbnail: 'riverside',
    shortDesc: 'A leafy riverside gathering of family growers, bakers, and beekeepers famous for stone-fruit and raw honey.',
    longDesc:
      'Set along the willow-lined banks of the Cedar River, Riverside Spring Market is a weekend institution. Sixty-plus stalls spill across the promenade each Saturday and Sunday, anchored by third-generation orchardists, raw-honey apiarists, and small-batch bakers. Live acoustic sets, a children\'s seed-planting booth, and a composting drop-off make this market a full morning out — not just a shopping trip.',
    location: { address: '14 Riverbend Promenade, Riverside', lat: 37.7858, lng: -122.4064 },
    contact: { phone: '+1 (415) 555-0181', email: 'hello@riversidespring.market' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['strawberries', 'asparagus', 'honey', 'tomatoes', 'spinach', 'mint'],
    featured: true,
    amenities: ['Parking', 'Restrooms', 'Pet-friendly', 'Live Music', 'ATM'],
  },
  {
    id: 'm-hillcrest-twilight',
    name: 'Hillcrest Twilight Market',
    area: 'Hillcrest',
    days: ['Thu', 'Fri'],
    openTime: '16:00',
    closeTime: '21:00',
    established: 2014,
    verifiedOrganic: true,
    stalls: 48,
    rating: 4.7,
    reviewsCount: 198,
    thumbnail: 'hillcrest',
    shortDesc: 'Evening market under string lights with wood-fired pizza, biodynamic wines, and late-season heirlooms.',
    longDesc:
      'When the sun dips behind the Hillcrest ridge, string lights flicker on across the market square and the smell of wood-fired dough drifts through the air. The Twilight Market specialises in after-work shoppers and date-night strollers — expect biodynamic wine tastings, rotisserie chickens, and a curated row of heirloom tomatoes that would make any gardener weak at the knees.',
    location: { address: '9 Hillcrest Square, Hillcrest', lat: 37.7794, lng: -122.4194 },
    contact: { phone: '+1 (415) 555-0142', email: 'twilight@hillcrestmarket.co' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['tomatoes', 'basil', 'mozzarella', 'peaches', 'zucchini', 'thyme'],
    featured: true,
    amenities: ['Parking', 'Restrooms', 'Wine Tasting', 'Food Court'],
  },
  {
    id: 'm-greenfield-harvest',
    name: 'Greenfield Harvest Bazaar',
    area: 'Greenfield',
    days: ['Sat'],
    openTime: '06:30',
    closeTime: '12:30',
    established: 2002,
    verifiedOrganic: true,
    stalls: 82,
    rating: 4.9,
    reviewsCount: 521,
    thumbnail: 'greenfield',
    shortDesc: 'The largest open-air bazaar in the valley — 80+ growers, a flower barn, and an outdoor bread oven.',
    longDesc:
      'Greenfield Harvest Bazaar is the anchor of the regional food shed. With more than eighty growers, fishmongers, and artisanal makers, it operates like a small town every Saturday. The flower barn is a destination in its own right, and the community bread oven — fired before dawn — produces loaves that sell out by nine.',
    location: { address: '120 Greenfield Road, Greenfield', lat: 37.7548, lng: -122.4474 },
    contact: { phone: '+1 (415) 555-0173', email: 'info@greenfieldharvest.org' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['apples', 'carrots', 'kale', 'butter', 'rosemary', 'pears'],
    featured: true,
    amenities: ['Parking', 'Restrooms', 'Pet-friendly', 'ATM', 'Flower Barn', 'Bakery'],
  },
  {
    id: 'm-oldtown-square',
    name: 'Old Town Square Market',
    area: 'Old Town',
    days: ['Sun'],
    openTime: '08:00',
    closeTime: '14:00',
    established: 1998,
    verifiedOrganic: false,
    stalls: 56,
    rating: 4.6,
    reviewsCount: 287,
    thumbnail: 'oldtown',
    shortDesc: 'Historic cobblestone square with heritage-breed meat, raw-milk cheese, and buskers on every corner.',
    longDesc:
      'For more than two decades, Old Town Square has been the Sunday morning ritual for families across the city. Heritage-breed pork, raw-milk cheese wheels, and buckets of daffodils share the cobbles with street musicians and a brass band. Bring a sturdy canvas tote — you\'ll leave with more than you planned.',
    location: { address: '1 Old Town Square, Old Town', lat: 37.7937, lng: -122.3970 },
    contact: { phone: '+1 (415) 555-0119', email: 'sundays@oldtownsquare.market' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['cheese', 'milk', 'onions', 'garlic', 'sage', 'pumpkin'],
    featured: false,
    amenities: ['Parking', 'Restrooms', 'Live Music', 'Heritage Meats'],
  },
  {
    id: 'm-marina-bay-fresh',
    name: 'Marina Bay Fresh Pier',
    area: 'Marina Bay',
    days: ['Wed', 'Sat'],
    openTime: '07:30',
    closeTime: '12:30',
    established: 2011,
    verifiedOrganic: true,
    stalls: 38,
    rating: 4.5,
    reviewsCount: 142,
    thumbnail: 'marina',
    shortDesc: 'Dockside market with day-boat seafood, samphire, and oysters shucked to order.',
    longDesc:
      'Where the marina meets the morning mist, Marina Bay Fresh Pier is the place for ultra-local seafood. Day-boat captains sell direct from their coolers, the oyster bar opens at seven, and you can grab a coffee while watching the harbour seals. Produce stalls cluster at the landward end with coastal-grown samphire, sea kale, and salt-tolerant herbs.',
    location: { address: 'Pier 7, Marina Bay Promenade, Marina Bay', lat: 37.8089, lng: -122.4099 },
    contact: { phone: '+1 (415) 555-0166', email: 'dock@marinabayfresh.com' },
    produceTypes: ['Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['oysters', 'spinach', 'mint', 'butter', 'lemon', 'chives'],
    featured: false,
    amenities: ['Parking', 'Restrooms', 'Pet-friendly', 'Seafood', 'Coffee'],
  },
  {
    id: 'm-sunset-valley-organic',
    name: 'Sunset Valley Organic Co-op',
    area: 'Sunset Valley',
    days: ['Tue', 'Fri'],
    openTime: '09:00',
    closeTime: '15:00',
    established: 2016,
    verifiedOrganic: true,
    stalls: 30,
    rating: 4.7,
    reviewsCount: 96,
    thumbnail: 'sunset',
    shortDesc: 'Member-run organic co-op with a strict 50-mile sourcing radius and zero-waste ethos.',
    longDesc:
      'Sunset Valley Organic Co-op is run by its members — twenty-three small farms within a fifty-mile radius. There are no middlemen, no plastic bags, and no compromise on certification. Bring your own jars for honey and oil, your own cloth bags for greens, and expect a friendly, slow-paced shopping experience.',
    location: { address: '47 Sunset Boulevard, Sunset Valley', lat: 37.7522, lng: -122.4816 },
    contact: { phone: '+1 (415) 555-0125', email: 'members@sunsetvalleycoop.org' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['avocado', 'kale', 'basil', 'yogurt', 'strawberries', 'tomatoes'],
    featured: false,
    amenities: ['Parking', 'Zero-Waste', 'Pet-friendly', 'Member Discounts'],
  },
  {
    id: 'm-northgate-weekday',
    name: 'Northgate Weekday Market',
    area: 'Northgate',
    days: ['Mon', 'Wed'],
    openTime: '10:00',
    closeTime: '16:00',
    established: 2019,
    verifiedOrganic: false,
    stalls: 24,
    rating: 4.3,
    reviewsCount: 64,
    thumbnail: 'northgate',
    shortDesc: 'Convenient midweek market for office workers — grab-and-go salads, bread, and fruit.',
    longDesc:
      'Northgate Weekday Market was created for the lunchtime crowd. Tucked between the office towers, twenty-four stalls rotate through grab-and-go salads, fresh-baked baguettes, and fruit baskets. The vibe is fast, friendly, and fuel-focused — perfect for a working Wednesday.',
    location: { address: '200 Northgate Avenue, Northgate', lat: 37.7817, lng: -122.4332 },
    contact: { phone: '+1 (415) 555-0198', email: 'midweek@northgatemarket.co' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs'],
    typicalProducts: ['apples', 'lettuce', 'basil', 'pears', 'carrots', 'mint'],
    featured: false,
    amenities: ['Parking', 'Restrooms', 'Wi-Fi', 'Grab-and-Go'],
  },
  {
    id: 'm-lakeside-autumn',
    name: 'Lakeside Autumn Harvest',
    area: 'Lakeside',
    days: ['Sat', 'Sun'],
    openTime: '08:00',
    closeTime: '14:00',
    established: 2007,
    verifiedOrganic: true,
    stalls: 52,
    rating: 4.8,
    reviewsCount: 233,
    thumbnail: 'lakeside',
    shortDesc: 'Lakeside spot celebrated for squash, apples, and cider-pressing demos through autumn.',
    longDesc:
      'Set on the southern shore of Lake Evelyn, this market is at its finest in October when the maple leaves turn. Apple presses run all morning, squash varieties line the boardwalk, and the kettle-corn booth fills the air with caramel. Even off-season, the lakefront setting makes this a scenic weekend stop.',
    location: { address: '8 Lakeshore Drive, Lakeside', lat: 37.8292, lng: -122.3074 },
    contact: { phone: '+1 (415) 555-0137', email: 'autumn@lakesideharvest.org' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['apples', 'pumpkin', 'sage', 'cheese', 'pears', 'rosemary'],
    featured: false,
    amenities: ['Parking', 'Restrooms', 'Pet-friendly', 'Cider Pressing', 'Live Music'],
  },
  {
    id: 'm-brookhaven-community',
    name: 'Brookhaven Community Market',
    area: 'Brookhaven',
    days: ['Sun'],
    openTime: '09:00',
    closeTime: '13:00',
    established: 2013,
    verifiedOrganic: false,
    stalls: 36,
    rating: 4.4,
    reviewsCount: 88,
    thumbnail: 'brookhaven',
    shortDesc: 'Grassroots neighbourhood market with kids\' workshops and a community compost hub.',
    longDesc:
      'Brookhaven Community Market was started by a block-party committee in 2013 and has grown into a beloved Sunday fixture. The vibe is potluck rather than polished — expect neighbourhood kids running the lemonade stand, a free compost drop-off, and weekly workshops on container gardening and pickling.',
    location: { address: '55 Brookhaven Lane, Brookhaven', lat: 37.7401, lng: -122.4012 },
    contact: { phone: '+1 (415) 555-0150', email: 'hello@brookhavenmarket.org' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs'],
    typicalProducts: ['lemon', 'tomatoes', 'basil', 'strawberries', 'carrots', 'thyme'],
    featured: false,
    amenities: ['Parking', 'Pet-friendly', 'Kids Workshops', 'Compost Drop-off'],
  },
  {
    id: 'm-maple-grove-winter',
    name: 'Maple Grove Winter Market',
    area: 'Maple Grove',
    days: ['Sat'],
    openTime: '09:00',
    closeTime: '14:00',
    established: 2010,
    verifiedOrganic: true,
    stalls: 44,
    rating: 4.6,
    reviewsCount: 174,
    thumbnail: 'maplegrove',
    shortDesc: 'Indoor winter market with storage crops, preserved goods, hot cider, and holiday wreaths.',
    longDesc:
      'When the snow starts to fly, Maple Grove Winter Market moves indoors to the historic round barn. Storage crops, jarred preserves, hot cider, and hand-tied holiday wreaths fill the stalls. It\'s the city\'s cosiest Saturday tradition — warm boots, warm drinks, and warm conversation.',
    location: { address: '330 Maple Grove Road, Maple Grove', lat: 37.7702, lng: -122.5107 },
    contact: { phone: '+1 (415) 555-0162', email: 'winter@maplegrovemarket.com' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['apples', 'pumpkin', 'garlic', 'cheese', 'butter', 'rosemary'],
    featured: false,
    amenities: ['Indoor', 'Parking', 'Restrooms', 'Hot Food', 'Holiday Wreaths'],
  },
  {
    id: 'm-riverside-midweek',
    name: 'Riverside Midweek Catch-up',
    area: 'Riverside',
    days: ['Wed'],
    openTime: '11:00',
    closeTime: '16:00',
    established: 2018,
    verifiedOrganic: false,
    stalls: 22,
    rating: 4.2,
    reviewsCount: 41,
    thumbnail: 'riverside2',
    shortDesc: 'Small midweek pop-up for the Riverside regulars who can\'t wait until Saturday.',
    longDesc:
      'A pop-up sibling to the Riverside Spring Market, this Wednesday catch-up serves the regulars who simply cannot wait until the weekend. Twenty-two stalls rotate weekly — expect greens, eggs, bread, and a soup vendor who changes his recipe with the weather.',
    location: { address: '14 Riverbend Promenade, Riverside', lat: 37.7858, lng: -122.4064 },
    contact: { phone: '+1 (415) 555-0181', email: 'midweek@riversidespring.market' },
    produceTypes: ['Vegetables', 'Herbs', 'Dairy'],
    typicalProducts: ['spinach', 'mint', 'butter', 'lettuce', 'chives', 'yogurt'],
    featured: false,
    amenities: ['Parking', 'Pet-friendly', 'Soup Bar'],
  },
  {
    id: 'm-greenfield-evening',
    name: 'Greenfield Evening Express',
    area: 'Greenfield',
    days: ['Thu'],
    openTime: '17:00',
    closeTime: '20:00',
    established: 2021,
    verifiedOrganic: false,
    stalls: 18,
    rating: 4.4,
    reviewsCount: 52,
    thumbnail: 'greenfield2',
    shortDesc: 'Three-hour express market for the after-work crowd with meal kits and ready-to-cook bundles.',
    longDesc:
      'Greenfield Evening Express is a tight, three-hour market designed for the after-work crowd. Eighteen stalls, each curated around a "cook-it-tonight" theme — stir-fry bundles, pasta-night kits, taco kits, and the famous roast-chicken-and-veg box. Pre-order online and skip the queue.',
    location: { address: '120 Greenfield Road, Greenfield', lat: 37.7548, lng: -122.4474 },
    contact: { phone: '+1 (415) 555-0173', email: 'express@greenfieldharvest.org' },
    produceTypes: ['Fruits', 'Vegetables', 'Herbs'],
    typicalProducts: ['tomatoes', 'zucchini', 'basil', 'avocado', 'lemon', 'onions'],
    featured: false,
    amenities: ['Parking', 'Pre-Order', 'Meal Kits', 'Wi-Fi'],
  },
]

// Attach computed nextOpen timestamp to each market
MARKETS.forEach((m) => {
  m.nextOpen = nextOpenTimestamp(m.days, m.openTime)
})

// =====================================================================
// PRODUCE
// =====================================================================
export const PRODUCE = [
  // ---------- FRUITS ----------
  {
    id: 'p-strawberries',
    name: 'Strawberries',
    category: 'Fruits',
    seasons: ['Spring', 'Summer'],
    icon: '🍓',
    shortDesc: 'Sweet, fragrant berries at their peak from April through July.',
    description:
      'Strawberries are the first true sign of the warm season — tender, fragrant, and impossibly sweet when picked at peak ripeness. Local varieties are smaller and far more flavourful than supermarket clones, with a perfume that fills the room.',
    nutrition: { calories: '32 kcal/100g', vitaminC: '59 mg', fiber: '2 g', sugar: '4.9 g' },
    storage: 'Refrigerate unwashed in a single layer, hull only before eating. Best within 3 days.',
    markets: ['m-riverside-spring', 'm-sunset-valley-organic', 'm-brookhaven-community'],
  },
  {
    id: 'p-peaches',
    name: 'Peaches',
    category: 'Fruits',
    seasons: ['Summer'],
    icon: '🍑',
    shortDesc: 'Sun-ripened stone fruit dripping with juice from July to September.',
    description:
      'A perfectly ripe peach is one of summer\'s great pleasures — velvet skin, gold-and-crimson flesh, and a fragrance that says August in a single breath. Look for fruit that yields slightly at the stem end and smells unmistakably of itself.',
    nutrition: { calories: '39 kcal/100g', vitaminC: '6.6 mg', fiber: '1.5 g', sugar: '8.4 g' },
    storage: 'Room temperature stem-down until fragrant, then refrigerate 2–3 days.',
    markets: ['m-hillcrest-twilight', 'm-greenfield-harvest'],
  },
  {
    id: 'p-apples',
    name: 'Heritage Apples',
    category: 'Fruits',
    seasons: ['Autumn', 'Winter'],
    icon: '🍎',
    shortDesc: 'Dozens of heritage varieties — Russet, Cox, Pippin — from August onward.',
    description:
      'Forget the four varieties in the supermarket. Heritage apples span a wild spectrum of flavour — nutty Russets, pineapple-tinged Pippins, aromatic Coxes. Each has its own season, its own best use, and its own devoted following.',
    nutrition: { calories: '52 kcal/100g', vitaminC: '4.6 mg', fiber: '2.4 g', sugar: '10.4 g' },
    storage: 'Cool, dark, and humid — a cellar or crisper drawer. Keep for weeks.',
    markets: ['m-greenfield-harvest', 'm-lakeside-autumn', 'm-maple-grove-winter'],
  },
  {
    id: 'p-pears',
    name: 'Bartlett Pears',
    category: 'Fruits',
    seasons: ['Autumn', 'Winter'],
    icon: '🍐',
    shortDesc: 'Buttery, aromatic pears ripening from late summer through winter.',
    description:
      'Bartletts are the classic canning pear — buttery, fragrant, and gorgeously yielding when ripe. They ripen off the tree, so buy firm and let them sit on the counter a few days until the stem end gives to gentle pressure.',
    nutrition: { calories: '57 kcal/100g', vitaminC: '4.3 mg', fiber: '3.1 g', sugar: '9.8 g' },
    storage: 'Ripen at room temperature, then refrigerate up to 5 days.',
    markets: ['m-greenfield-harvest', 'm-lakeside-autumn', 'm-northgate-weekday'],
  },
  {
    id: 'p-lemon',
    name: 'Meyer Lemons',
    category: 'Fruits',
    seasons: ['Winter'],
    icon: '🍋',
    shortDesc: 'Sweet, floral lemons prized by bakers and cocktail enthusiasts alike.',
    description:
      'Meyer lemons are a cross between a conventional lemon and a mandarin — thinner-skinned, less acidic, and beautifully floral. They shine in curds, marmalades, and any cocktail where a regular lemon would feel too sharp.',
    nutrition: { calories: '29 kcal/100g', vitaminC: '53 mg', fiber: '2.8 g', sugar: '2.5 g' },
    storage: 'Refrigerate up to 3 weeks. Zest freezes beautifully.',
    markets: ['m-marina-bay-fresh', 'm-brookhaven-community', 'm-greenfield-evening'],
  },
  {
    id: 'p-avocado',
    name: 'Hass Avocados',
    category: 'Fruits',
    seasons: ['Spring', 'Summer'],
    icon: '🥑',
    shortDesc: 'Creamy, nutrient-dense fruit — perfect on toast, in salads, or by the spoon.',
    description:
      'Hass avocados are the gold standard — pebbly skin that darkens as it ripens, buttery golden flesh, and a nutty richness that elevates everything it touches. They\'re technically a fruit and botanically a berry, but culinarily a category of their own.',
    nutrition: { calories: '160 kcal/100g', vitaminC: '10 mg', fiber: '6.7 g', fat: '14.7 g' },
    storage: 'Ripen at room temperature, refrigerate up to 5 days once ripe.',
    markets: ['m-sunset-valley-organic', 'm-greenfield-evening'],
  },
  {
    id: 'p-pumpkin',
    name: 'Sugar Pumpkins',
    category: 'Fruits',
    seasons: ['Autumn', 'Winter'],
    icon: '🎃',
    shortDesc: 'Small, sweet pumpkins bred for pie — not carving.',
    description:
      'Sugar pumpkins (also called pie pumpkins) are smaller, denser, and far sweeter than their jack-o-lantern cousins. Roast them, purée them, or mash them — they\'re the backbone of autumn baking and a brilliant base for savoury soups.',
    nutrition: { calories: '26 kcal/100g', vitaminC: '9 mg', fiber: '0.5 g', sugar: '5 g' },
    storage: 'Cool, dry spot for up to a month. Once cut, refrigerate 3–4 days.',
    markets: ['m-oldtown-square', 'm-lakeside-autumn', 'm-maple-grove-winter'],
  },

  // ---------- VEGETABLES ----------
  {
    id: 'p-tomatoes',
    name: 'Heirloom Tomatoes',
    category: 'Vegetables',
    seasons: ['Summer'],
    icon: '🍅',
    shortDesc: 'Knobbly, technicolour tomatoes in dozens of varieties — Cherokee Purple, Brandywine, more.',
    description:
      'Heirloom tomatoes are a midsummer religion. Each variety carries its own personality — Cherokee Purple is smoky and rich, Brandywine is sweet and beefy, Green Zebra is tart and bright. Eat them raw, salted, with good olive oil. Cooking is optional.',
    nutrition: { calories: '18 kcal/100g', vitaminC: '14 mg', fiber: '1.2 g', sugar: '2.6 g' },
    storage: 'Room temperature, stem-down, out of direct sun. Never refrigerate.',
    markets: ['m-riverside-spring', 'm-hillcrest-twilight', 'm-sunset-valley-organic', 'm-greenfield-evening', 'm-brookhaven-community'],
  },
  {
    id: 'p-asparagus',
    name: 'Asparagus',
    category: 'Vegetables',
    seasons: ['Spring'],
    icon: '🥬',
    shortDesc: 'Tender spring spears harvested at dawn — the season is short, so celebrate it.',
    description:
      'Asparagus is spring\'s most ephemeral crop. The spears are harvested at dawn and lose sweetness by the hour — farmer\'s market asparagus is a different vegetable entirely from the supermarket version. Snap off the woody ends and roast, grill, or shave raw into salads.',
    nutrition: { calories: '20 kcal/100g', vitaminC: '5.6 mg', fiber: '2.1 g', sugar: '1.9 g' },
    storage: 'Stand upright in 1cm water, refrigerate. Best within 2 days.',
    markets: ['m-riverside-spring'],
  },
  {
    id: 'p-spinach',
    name: 'Bloomsdale Spinach',
    category: 'Vegetables',
    seasons: ['Spring', 'Autumn', 'Winter'],
    icon: '🥬',
    shortDesc: 'Crisp, savoyed leaves that melt into any dish — sweeter after the first frost.',
    description:
      'Bloomsdale is the classic heirloom spinach — deep green, crinkly leaves with a nutty sweetness that intensifies after the first frost. Use it raw in salads, wilted into pasta, or blended into a vibrant green soup. It\'s a nutritional powerhouse.',
    nutrition: { calories: '23 kcal/100g', vitaminC: '28 mg', fiber: '2.2 g', iron: '2.7 mg' },
    storage: 'Refrigerate in a sealed bag with a paper towel. Use within 4 days.',
    markets: ['m-riverside-spring', 'm-marina-bay-fresh', 'm-riverside-midweek'],
  },
  {
    id: 'p-kale',
    name: 'Lacinato Kale',
    category: 'Vegetables',
    seasons: ['Autumn', 'Winter'],
    icon: '🥬',
    shortDesc: 'Dark, dinosaur-skin kale leaves — sweeter after frost, sturdy in any preparation.',
    description:
      'Also called dinosaur or Tuscan kale, Lacinato has deeply crinkled, almost black-green leaves with a sweet, mineral flavour that improves dramatically after a frost. It\'s sturdy enough for soups and stews, tender enough for raw salads when massaged with oil.',
    nutrition: { calories: '49 kcal/100g', vitaminC: '120 mg', fiber: '3.6 g', calcium: '150 mg' },
    storage: 'Refrigerate in a sealed bag up to a week. Sturdier than most greens.',
    markets: ['m-greenfield-harvest', 'm-sunset-valley-organic'],
  },
  {
    id: 'p-carrots',
    name: 'Rainbow Carrots',
    category: 'Vegetables',
    seasons: ['Summer', 'Autumn', 'Winter'],
    icon: '🥕',
    shortDesc: 'Heirloom carrots in purple, yellow, white, and orange — sweeter than supermarket.',
    description:
      'Heirloom carrots come in a riot of colours — purple Dragon, yellow Solar, white Lunar, and deep orange Nantes. Each has a slightly different flavour profile, but all are sweeter and more aromatic than the uniform orange pegs at the supermarket.',
    nutrition: { calories: '41 kcal/100g', vitaminC: '5.9 mg', fiber: '2.8 g', vitaminA: '835 µg' },
    storage: 'Remove tops, refrigerate in a sealed bag up to 2 weeks.',
    markets: ['m-greenfield-harvest', 'm-northgate-weekday', 'm-brookhaven-community'],
  },
  {
    id: 'p-zucchini',
    name: 'Zucchini',
    category: 'Vegetables',
    seasons: ['Summer'],
    icon: '🥒',
    shortDesc: 'Summer squash in green and gold — pick small for the best flavour.',
    description:
      'Zucchini (or courgette) is the quintessential summer squash. Smaller is better — fist-sized fruits are tender and sweet, while baseball-bat-sized zucchini are watery and bland. Grill them, shave them raw, bake them into bread, or stuff the blossoms.',
    nutrition: { calories: '17 kcal/100g', vitaminC: '17.9 mg', fiber: '1 g', sugar: '2.4 g' },
    storage: 'Refrigerate in a sealed bag up to 5 days. Do not wash until use.',
    markets: ['m-hillcrest-twilight', 'm-greenfield-evening'],
  },
  {
    id: 'p-onions',
    name: 'Storage Onions',
    category: 'Vegetables',
    seasons: ['Autumn', 'Winter'],
    icon: '🧅',
    shortDesc: 'Cured yellow, red, and sweet onions for storage through the cold months.',
    description:
      'Cured storage onions are the backbone of winter cooking. Yellow onions are the all-purpose workhorse, reds are sharp and beautiful raw, and sweets (Walla Walla, Vidalia) are mild enough to slice into sandwiches. Properly cured, they\'ll keep for months.',
    nutrition: { calories: '40 kcal/100g', vitaminC: '7.4 mg', fiber: '1.7 g', sugar: '4.2 g' },
    storage: 'Cool, dry, dark, ventilated. Never refrigerate whole onions.',
    markets: ['m-oldtown-square', 'm-greenfield-evening'],
  },
  {
    id: 'p-garlic',
    name: 'Hardneck Garlic',
    category: 'Vegetables',
    seasons: ['Summer', 'Autumn', 'Winter'],
    icon: '🧄',
    shortDesc: 'Pungent, complex hardneck garlic — the kind chefs fight over.',
    description:
      'Hardneck garlic produces a central woody stalk (the scape) and fewer, larger cloves with a more complex, pungent flavour than softneck supermarket garlic. Varieties like Music and German Extra Hardy are prized by chefs for their heat and depth.',
    nutrition: { calories: '149 kcal/100g', vitaminC: '31 mg', fiber: '2.1 g', calcium: '181 mg' },
    storage: 'Cool, dry, ventilated. Keep bulbs whole until use; use within 6 months.',
    markets: ['m-oldtown-square', 'm-lakeside-autumn', 'm-maple-grove-winter'],
  },
  {
    id: 'p-lettuce',
    name: 'Butter Lettuce',
    category: 'Vegetables',
    seasons: ['Spring', 'Autumn'],
    icon: '🥬',
    shortDesc: 'Loose, delicate heads of butter lettuce — tender enough to eat by the bowl.',
    description:
      'Butter lettuce (also called Bibb or Boston) forms loose, rosette-shaped heads with tender, almost velvety leaves. It\'s the gold standard for delicate salads — sweet, mild, and beautiful on the plate. Buy it with the roots still attached for maximum shelf life.',
    nutrition: { calories: '13 kcal/100g', vitaminC: '9.2 mg', fiber: '1.4 g', vitaminA: '166 µg' },
    storage: 'Refrigerate in a sealed container with a paper towel. Use within 4 days.',
    markets: ['m-northgate-weekday', 'm-riverside-midweek'],
  },

  // ---------- HERBS ----------
  {
    id: 'p-basil',
    name: 'Genovese Basil',
    category: 'Herbs',
    seasons: ['Summer'],
    icon: '🌿',
    shortDesc: 'Classic Italian basil — the soul of pesto and the perfect tomato companion.',
    description:
      'Genovese basil is the gold standard for pesto — large, glossy, cup-shaped leaves with a sweet, anise-tinged aroma. It pairs famously with tomatoes (some say they were grown together in the same soil for centuries) and is at its peak from July to September.',
    nutrition: { calories: '23 kcal/100g', vitaminC: '18 mg', fiber: '1.6 g', vitaminK: '415 µg' },
    storage: 'Stem-down in a glass of water at room temperature. Do not refrigerate.',
    markets: ['m-hillcrest-twilight', 'm-sunset-valley-organic', 'm-greenfield-evening', 'm-brookhaven-community', 'm-northgate-weekday'],
  },
  {
    id: 'p-mint',
    name: 'Spearmint',
    category: 'Herbs',
    seasons: ['Spring', 'Summer', 'Autumn'],
    icon: '🌿',
    shortDesc: 'Cool, sweet mint for tea, cocktails, salads, and Southeast Asian cooking.',
    description:
      'Spearmint is the everyday mint — gentler and sweeter than peppermint, with a clean coolness that brightens everything from tabbouleh to mojitos. It grows aggressively (plant in a pot or it\'ll take over) and is at its best in cool weather.',
    nutrition: { calories: '70 kcal/100g', vitaminC: '13 mg', fiber: '8 g', vitaminA: '123 µg' },
    storage: 'Stem-down in a glass of water, refrigerated, up to a week.',
    markets: ['m-riverside-spring', 'm-marina-bay-fresh', 'm-northgate-weekday', 'm-riverside-midweek'],
  },
  {
    id: 'p-rosemary',
    name: 'Rosemary',
    category: 'Herbs',
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    icon: '🌿',
    shortDesc: 'Piney, resinous rosemary — the backbone of roasts and rustic breads.',
    description:
      'Rosemary is a woody, evergreen herb with needle-like leaves and a piney, resinous aroma that pairs perfectly with roasted meats, potatoes, and rustic breads. It\'s perennial in mild climates, so you\'ll find it year-round at most markets.',
    nutrition: { calories: '131 kcal/100g', vitaminC: '21 mg', fiber: '14 g', iron: '6.7 mg' },
    storage: 'Wrap in damp paper towel, refrigerate up to 2 weeks. Freezes well.',
    markets: ['m-greenfield-harvest', 'm-lakeside-autumn', 'm-maple-grove-winter'],
  },
  {
    id: 'p-thyme',
    name: 'Thyme',
    category: 'Herbs',
    seasons: ['Spring', 'Summer', 'Autumn'],
    icon: '🌿',
    shortDesc: 'Tiny, pungent leaves — essential for French and Mediterranean cooking.',
    description:
      'Thyme is a low-growing perennial with tiny, intensely aromatic leaves. It\'s a foundational herb in French and Mediterranean cooking — a key component of bouquet garni, herbes de Provence, and the classic roast chicken. Strip the leaves from the woody stems before using.',
    nutrition: { calories: '101 kcal/100g', vitaminC: '40 mg', fiber: '14 g', iron: '17 mg' },
    storage: 'Refrigerate in a sealed bag up to 2 weeks. Dries well.',
    markets: ['m-hillcrest-twilight', 'm-brookhaven-community'],
  },
  {
    id: 'p-sage',
    name: 'Sage',
    category: 'Herbs',
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    icon: '🌿',
    shortDesc: 'Velvety, earthy sage — perfect with squash, pork, and browned butter.',
    description:
      'Sage has soft, velvety, grey-green leaves with an earthy, slightly peppery aroma. It\'s the soul of autumn cooking — browned butter and sage over pumpkin ravioli, sage and onion stuffing, saltimbocca. A little goes a long way.',
    nutrition: { calories: '315 kcal/100g', vitaminC: '32 mg', fiber: '40 g', vitaminK: '1700 µg' },
    storage: 'Refrigerate in a sealed bag up to 2 weeks. Dries and freezes well.',
    markets: ['m-oldtown-square', 'm-lakeside-autumn'],
  },
  {
    id: 'p-chives',
    name: 'Chives',
    category: 'Herbs',
    seasons: ['Spring', 'Summer'],
    icon: '🌿',
    shortDesc: 'Delicate onion-flavoured shoots — finishing herb for eggs, potatoes, soups.',
    description:
      'Chives are the most delicate of the allium family — thin, hollow, grassy shoots with a mild onion flavour. They\'re a finishing herb, best added at the last minute to preserve their flavour and bright green colour. The edible purple flowers are a beautiful garnish.',
    nutrition: { calories: '30 kcal/100g', vitaminC: '58 mg', fiber: '2.5 g', vitaminK: '213 µg' },
    storage: 'Refrigerate in a sealed bag up to a week. Best used fresh.',
    markets: ['m-marina-bay-fresh', 'm-riverside-midweek'],
  },

  // ---------- DAIRY ----------
  {
    id: 'p-butter',
    name: 'Cultured Butter',
    category: 'Dairy',
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    icon: '🧈',
    shortDesc: 'Slow-churned, live-culture butter with a tangy depth and golden colour.',
    description:
      'Cultured butter is made by fermenting cream with live cultures before churning, producing a tangy, complex butter with a higher fat content and a gorgeous golden hue. It\'s the butter for spreading on good bread, finishing a sauce, or baking shortbread that actually tastes like something.',
    nutrition: { calories: '717 kcal/100g', fat: '81 g', vitaminA: '684 µg', calcium: '24 mg' },
    storage: 'Refrigerate up to a month. Freeze for longer storage.',
    markets: ['m-greenfield-harvest', 'm-oldtown-square', 'm-maple-grove-winter', 'm-riverside-midweek'],
  },
  {
    id: 'p-cheese',
    name: 'Raw-Milk Cheese',
    category: 'Dairy',
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    icon: '🧀',
    shortDesc: 'Small-batch raw-milk cheeses — from fresh chèvre to aged farmhouse wheels.',
    description:
      'Raw-milk cheeses are made from unpasteurised milk, allowing the natural flora of the farm to express themselves in the finished cheese. The result is more complex, more terroir-driven, and more variable than pasteurised cheese — a fresh chèvre in April tastes nothing like the same cheese in October.',
    nutrition: { calories: '402 kcal/100g', fat: '33 g', protein: '25 g', calcium: '721 mg' },
    storage: 'Refrigerate in wax paper, not plastic. Bring to room temp before serving.',
    markets: ['m-oldtown-square', 'm-lakeside-autumn', 'm-maple-grove-winter'],
  },
  {
    id: 'p-yogurt',
    name: 'Greek Yogurt',
    category: 'Dairy',
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    icon: '🥛',
    shortDesc: 'Strained, velvety yogurt with live cultures — tangy, rich, and probiotic.',
    description:
      'Greek yogurt is strained to remove much of the whey, producing a thick, velvety yogurt with roughly twice the protein of conventional yogurt. Look for live active cultures (L. bulgaricus, S. thermophilus) for the probiotic benefit, and avoid anything with added sugar or thickeners.',
    nutrition: { calories: '59 kcal/100g', fat: '0.4 g', protein: '10 g', calcium: '110 mg' },
    storage: 'Refrigerate. Use within 2 weeks of opening.',
    markets: ['m-sunset-valley-organic', 'm-riverside-midweek'],
  },
  {
    id: 'p-milk',
    name: 'Whole Milk',
    category: 'Dairy',
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    icon: '🥛',
    shortDesc: 'Creamline whole milk from grass-fed herds, bottled within hours of milking.',
    description:
      'Creamline (non-homogenised) whole milk leaves the cream to rise naturally to the top of the bottle — a sign that nothing has been added or removed. From grass-fed herds, it\'s sweeter, more aromatic, and more nutrient-dense than conventional milk, with a noticeable seasonal shift in flavour.',
    nutrition: { calories: '61 kcal/100g', fat: '3.3 g', protein: '3.2 g', calcium: '113 mg' },
    storage: 'Refrigerate. Use within 5–7 days of purchase.',
    markets: ['m-oldtown-square'],
  },
  {
    id: 'p-mozzarella',
    name: 'Fresh Mozzarella',
    category: 'Dairy',
    seasons: ['Spring', 'Summer', 'Autumn'],
    icon: '🧀',
    shortDesc: 'Pillowy fresh mozzarella — best eaten the day it\'s made.',
    description:
      'Fresh mozzarella is a stretched-curd cheese (pasta filata) that should be eaten as close to production as possible. Look for soft, pillowy balls stored in water or whey, with a delicate, milky flavour and a tender, almost melting texture. The classic pairing is tomato and basil — Caprese.',
    nutrition: { calories: '254 kcal/100g', fat: '17 g', protein: '18 g', calcium: '575 mg' },
    storage: 'Keep in brine, refrigerated. Eat within 2–3 days of opening.',
    markets: ['m-hillcrest-twilight'],
  },
  {
    id: 'p-honey',
    name: 'Raw Wildflower Honey',
    category: 'Dairy',
    seasons: ['Summer', 'Autumn'],
    icon: '🍯',
    shortDesc: 'Unfiltered, unpasteurised honey — terroir in a jar.',
    description:
      'Raw wildflower honey is a snapshot of a particular field in a particular season — the flavour, colour, and aroma shift with whatever was blooming when the bees were foraging. It\'s unheated and unfiltered, preserving the natural enzymes, pollen, and propolis. Never refrigerate.',
    nutrition: { calories: '304 kcal/100g', sugar: '82 g', carbs: '82 g', calcium: '6 mg' },
    storage: 'Cool, dark cupboard. Crystallises naturally — warm gently to re-liquify.',
    markets: ['m-riverside-spring'],
  },
  {
    id: 'p-oysters',
    name: 'Fresh Oysters',
    category: 'Dairy',
    seasons: ['Autumn', 'Winter'],
    icon: '🦪',
    shortDesc: 'Day-boat oysters shucked to order — briny, mineral, and pure.',
    description:
      'Listed here among the dairy-adjacent luxuries, fresh oysters are the maritime treasure of Marina Bay. Harvested the same morning, shucked at the stall, and served with nothing but a squeeze of Meyer lemon — they\'re a study in pure, mineral terroir. Look for varieties like Kumamoto, Kusshi, and Fanny Bay.',
    nutrition: { calories: '68 kcal/100g', fat: '2.3 g', protein: '7 g', zinc: '39 mg' },
    storage: 'Keep cold, cup-side down. Eat within 24 hours of purchase.',
    markets: ['m-marina-bay-fresh'],
  },
]

// Map IDs to records for fast lookup
export const MARKET_BY_ID = MARKETS.reduce((acc, m) => { acc[m.id] = m; return acc }, {})
export const PRODUCE_BY_ID = PRODUCE.reduce((acc, p) => { acc[p.id] = p; return acc }, {})

// =====================================================================
// FAQ DATA (powers the AI Chatbot)
// =====================================================================
export const FAQS = [
  {
    id: 'faq-hours',
    q: 'What are the typical market hours?',
    a: 'Most farmers markets in the FreshFind network open between 6:30 AM and 9:00 AM and close by early afternoon (12:30–2:00 PM). A few evening markets run from 4:00 PM to 9:00 PM — check each market\'s detail page for exact times.',
    keywords: ['hours', 'open', 'close', 'time', 'when'],
  },
  {
    id: 'faq-days',
    q: 'Which days are markets open?',
    a: 'Markets run on different days depending on the neighbourhood. Saturday and Sunday are the most popular days, but several markets also operate mid-week (Wednesday and Thursday). Use the "Operating Day" filter on the Market Directory page to find a market for any day of the week.',
    keywords: ['day', 'days', 'week', 'saturday', 'sunday', 'wednesday'],
  },
  {
    id: 'faq-organic',
    q: 'Are the markets certified organic?',
    a: 'Many of our markets are "verified organic" — meaning at least 60% of vendors hold current organic certification. Look for the green "Verified Organic" badge on market cards and detail pages. You can also filter the Market Directory to show only verified-organic markets.',
    keywords: ['organic', 'certified', 'pesticide', 'verified'],
  },
  {
    id: 'faq-payment',
    q: 'What payment methods are accepted?',
    a: 'Most vendors accept cash and card. Many markets have an on-site ATM (look for the ATM amenity icon). Some co-ops and zero-waste markets encourage cash or EBT only — check the amenities list on each market page.',
    keywords: ['payment', 'card', 'cash', 'atm', 'credit', 'debit', 'ebt'],
  },
  {
    id: 'faq-bring',
    q: 'What should I bring to a farmers market?',
    a: 'Bring a sturdy canvas tote or basket, a small cooler with an ice pack for dairy and seafood, and cash in small bills. If your market is zero-waste, bring your own jars for honey and oil, and cloth bags for greens. Comfortable shoes and a hat are recommended.',
    keywords: ['bring', 'tote', 'bag', 'cash', 'prepare', 'pack'],
  },
  {
    id: 'faq-seasonal',
    q: 'What produce is in season right now?',
    a: 'The Produce Guide page lets you filter by season (Spring, Summer, Autumn, Winter). As a rule of thumb: asparagus and strawberries in Spring, tomatoes and peaches in Summer, apples and squash in Autumn, citrus and hearty greens in Winter.',
    keywords: ['season', 'seasonal', 'in season', 'now', 'fresh', 'produce'],
  },
  {
    id: 'faq-parking',
    q: 'Is there parking at the markets?',
    a: 'Most markets have on-site or street parking. Look for the "Parking" amenity icon on each market card. Hillcrest Twilight and Old Town Square get particularly busy — consider arriving within the first hour of opening or using public transit.',
    keywords: ['parking', 'park', 'car', 'drive', 'transit'],
  },
  {
    id: 'faq-dogs',
    q: 'Can I bring my dog?',
    a: 'Many markets are pet-friendly — look for the "Pet-friendly" amenity icon. Please keep dogs on a short leash, away from food stalls, and clean up after them. Service animals are always welcome at every market.',
    keywords: ['dog', 'pet', 'animal', 'leash'],
  },
  {
    id: 'faq-location',
    q: 'How do I find markets near me?',
    a: 'Use the geolocation button (the target icon) in the header to find markets near your current location. You can also filter the Market Directory by area/neighbourhood. Each market detail page has an embedded Google Map showing the exact location.',
    keywords: ['near', 'location', 'find', 'where', 'geolocation', 'area', 'neighbourhood'],
  },
  {
    id: 'faq-bookmark',
    q: 'How do I save my favourite markets?',
    a: 'Click the bookmark icon on any market card or market detail page to save it. Open the floating Bookmark Bar (right side of the screen) to view all saved markets, add notes, export your list, or share via social links. Bookmarks persist for your session.',
    keywords: ['bookmark', 'save', 'favourite', 'favorite', 'notes', 'export'],
  },
  {
    id: 'faq-rain',
    q: 'Do markets operate in bad weather?',
    a: 'Most outdoor markets run rain or shine, with vendors using pop-up tents. A few markets (like Maple Grove Winter Market) move indoors for the cold months. Severe weather cancellations are posted on each market\'s contact email and at the entrance.',
    keywords: ['rain', 'weather', 'snow', 'cancel', 'indoor', 'bad'],
  },
]

// Quick-reply chips shown in the chatbot
export const CHATBOT_QUICK_REPLIES = [
  'What are the typical market hours?',
  'Which days are markets open?',
  'What produce is in season now?',
  'How do I find markets near me?',
  'Are markets organic?',
  'Can I bring my dog?',
]

// =====================================================================
// TEAM (About page)
// =====================================================================
export const TEAM = [
  {
    id: 't-1',
    name: 'Mara Quinn',
    role: 'Founder & CEO',
    bio: 'Former farm-to-table chef who built FreshFind after a decade of sourcing directly from small farms. Mara still cooks every Sunday from market hauls.',
    avatar: 'MQ',
    color: '#064E3B',
  },
  {
    id: 't-2',
    name: 'Daniel Okafor',
    role: 'Head of Engineering',
    bio: 'Daniel leads the platform engineering team. He\'s obsessed with making local food discoverable and previously built logistics software for regional food hubs.',
    avatar: 'DO',
    color: '#EA580C',
  },
  {
    id: 't-3',
    name: 'Priya Raman',
    role: 'Director of Partnerships',
    bio: 'Priya onboards new markets and growers into the FreshFind network. She has personally visited every one of the 142 organic farms we list.',
    avatar: 'PR',
    color: '#0A6B52',
  },
  {
    id: 't-4',
    name: 'Theo Lindqvist',
    role: 'Lead Designer',
    bio: 'Theo designed the Midnight Harvest visual system. A background in editorial print design informs every typographic choice on the platform.',
    avatar: 'TL',
    color: '#C2410C',
  },
]

// =====================================================================
// SUSTAINABILITY STATS (About page)
// =====================================================================
export const SUSTAINABILITY_STATS = [
  { label: 'Tonnes of food waste avoided', value: 1840, suffix: ' t' },
  { label: 'Kilometres saved by local sourcing', value: 412000, suffix: ' km' },
  { label: 'Plastic bags refused this year', value: 96400, suffix: '' },
  { label: 'Organic farms in network', value: 142, suffix: '' },
]
