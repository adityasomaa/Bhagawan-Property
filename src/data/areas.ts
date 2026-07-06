export function img(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export interface Area {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  cardImage: string;
  intro: string[];
  idealFor: string;
  lifestyle: { title: string; description: string }[];
  thingsToDo: string[];
  investment: {
    overview: string;
    typicalBuyer: string;
    rentalDemand: string;
    capitalGrowth: string;
    opportunities: string;
  };
  stats: { label: string; value: string }[];
}

export const areas: Area[] = [
  {
    slug: "uluwatu",
    name: "Uluwatu",
    tagline: "Dramatic clifftops, world-class surf, and Bali's most breathtaking ocean views.",
    heroImage: img("1539367628448-4bc5c9d171c8", 2200),
    cardImage: img("1539367628448-4bc5c9d171c8", 1200),
    intro: [
      "Perched on the southern tip of the Bukit Peninsula, Uluwatu is where Bali feels most cinematic. Limestone cliffs plunge into turquoise water, world-famous surf breaks roll in below clifftop temples, and sunsets here are simply unmatched anywhere on the island.",
      "Once a sleepy surf outpost, Uluwatu has matured into one of Bali's most desirable addresses. Boutique resorts, design-led villas, and celebrated beach clubs now share the peninsula with warungs and hidden beaches — a rare balance of raw natural drama and refined living.",
    ],
    idealFor:
      "Buyers seeking dramatic ocean views, surf culture, and strong villa rental performance in Bali's fastest-appreciating luxury corridor.",
    lifestyle: [
      { title: "Beaches", description: "Padang Padang, Bingin, Thomas Beach, and the white sands of Melasti — some of the clearest water in Bali." },
      { title: "Surf", description: "Uluwatu, Padang Padang, and Impossibles are world-championship waves, drawing surfers year-round." },
      { title: "Beach Clubs", description: "Savaya, Ulu Cliffhouse, and Palmilla set the standard for clifftop sunset sessions." },
      { title: "Dining", description: "From cliff-edge fine dining to legendary warungs above Bingin Beach." },
      { title: "Wellness", description: "Yoga shalas, recovery studios, and spa sanctuaries overlooking the Indian Ocean." },
      { title: "Culture", description: "Pura Luhur Uluwatu temple and its nightly Kecak fire dance at sunset." },
    ],
    thingsToDo: [
      "Watch the Kecak fire dance at Uluwatu Temple as the sun drops into the ocean",
      "Surf — or simply watch the pros — at Padang Padang and Suluban",
      "Spend a lazy day at Melasti Beach's crystal-clear coves",
      "Sunset cocktails at a clifftop beach club",
      "Explore the hidden caves and coves below the Bingin cliffs",
    ],
    investment: {
      overview:
        "Uluwatu is the strongest growth story in Bali real estate. Land prices on the Bukit have risen sharply over the past five years as infrastructure, dining, and hospitality caught up with the peninsula's natural beauty — yet prices per are still trail Canggu and Seminyak.",
      typicalBuyer:
        "Lifestyle investors and surf-loving entrepreneurs buying ocean-view villas for mixed personal and rental use, plus developers land-banking clifftop plots.",
      rentalDemand:
        "Exceptional. Ocean-view villas in Uluwatu command premium nightly rates with high occupancy from surf tourism, wellness travellers, and the events market.",
      capitalGrowth:
        "Among the highest on the island — clifftop and ocean-view land is finite, and the completion of new road infrastructure keeps compressing travel times.",
      opportunities:
        "Ocean-view leasehold villas for yield, and freehold land near Melasti and Nyang Nyang for long-term capital growth.",
    },
    stats: [
      { label: "Airport", value: "35 min" },
      { label: "Typical villa yield", value: "10–14% p.a." },
      { label: "Vibe", value: "Clifftop / Surf" },
    ],
  },
  {
    slug: "canggu",
    name: "Canggu",
    tagline: "Bali's creative capital — rice fields, surf breaks, and a thriving global community.",
    heroImage: img("1570737209810-87a8e7245f88", 2200),
    cardImage: img("1570737209810-87a8e7245f88", 1200),
    intro: [
      "Canggu is where Bali's energy concentrates. What was rice paddies and a quiet surf beach fifteen years ago is now Southeast Asia's most talked-about neighbourhood — a magnet for founders, creatives, and remote professionals from every corner of the world.",
      "The appeal is the mix: black-sand surf beaches, speciality coffee on every corner, some of Asia's best restaurants and gyms, and a social scene that runs from sunrise surf to late-night beach bars. For investors, Canggu remains the island's most liquid, most proven rental market.",
    ],
    idealFor:
      "Investors who want maximum rental liquidity and buyers who want to live at the centre of Bali's international community.",
    lifestyle: [
      { title: "Cafés", description: "The densest concentration of speciality coffee and brunch culture in Southeast Asia." },
      { title: "Surf", description: "Batu Bolong's mellow longboard waves and Echo Beach's punchier breaks suit every level." },
      { title: "Beach Clubs", description: "From sunset beanbags at Old Man's to polished club scenes on the sand." },
      { title: "Fitness", description: "World-class gyms, MMA academies, CrossFit boxes, and recovery studios." },
      { title: "Nightlife", description: "Bali's liveliest evening scene, from beach bars to rooftop clubs." },
      { title: "Schools", description: "Montessori and international schools make Canggu genuinely family-viable." },
    ],
    thingsToDo: [
      "Sunset surf at Batu Bolong followed by beers on the beach",
      "Brunch-hop through Berawa's café scene",
      "Ride through the shortcut rice fields at golden hour",
      "Catch live music at a beach bar on Echo Beach",
      "Sunday market mornings at La Brisa",
    ],
    investment: {
      overview:
        "Canggu is Bali's benchmark rental market. Demand consistently outstrips supply in the core zones of Berawa, Batu Bolong, and Nelayan, and the buyer pool is the deepest on the island — which protects resale liquidity.",
      typicalBuyer:
        "Yield-focused investors and digital-economy professionals buying two-to-four-bedroom villas within scooter distance of the beach.",
      rentalDemand:
        "The strongest and most proven on the island, with year-round occupancy driven by remote workers, surfers, and holidaymakers alike.",
      capitalGrowth:
        "Core Canggu land is increasingly scarce, pushing sustained appreciation — while neighbouring corridors absorb the overflow.",
      opportunities:
        "Modern leasehold villas in Berawa and Padonan for immediate yield; freehold plots on the northern edge for development upside.",
    },
    stats: [
      { label: "Airport", value: "45 min" },
      { label: "Typical villa yield", value: "9–13% p.a." },
      { label: "Vibe", value: "Creative / Social" },
    ],
  },
  {
    slug: "sanur",
    name: "Sanur",
    tagline: "Calm waters, golden mornings, and Bali's most graceful seaside living.",
    heroImage: img("1519046904884-53103b34b206", 2200),
    cardImage: img("1519046904884-53103b34b206", 1200),
    intro: [
      "Sanur is Bali at its most gentle. A protected lagoon keeps the sea calm and swimmable, a nine-kilometre beachfront path invites morning cycles and barefoot runs, and the pace of life follows the sunrise rather than the nightlife.",
      "Long favoured by families and long-stay residents, Sanur is entering a new chapter: the Sanur Special Economic Zone, an international hospital district, and a revitalised beachfront are drawing fresh attention to Bali's original resort town — without disturbing its old-soul charm.",
    ],
    idealFor:
      "Families, retirees, and long-stay residents who value walkability, calm beaches, and established infrastructure.",
    lifestyle: [
      { title: "Beaches", description: "Calm, reef-protected waters and golden-sand beaches perfect for swimming and sunrise walks." },
      { title: "Beachfront Path", description: "Nine kilometres of car-free promenade linking cafés, jetties, and beach clubs." },
      { title: "Dining", description: "Established seafront restaurants, organic cafés, and old-Bali institutions." },
      { title: "Wellness", description: "A quiet ecosystem of spas, yoga studios, and holistic clinics." },
      { title: "Healthcare", description: "Home to Bali's new international hospital district — the best medical access on the island." },
      { title: "Schools", description: "Several respected international schools within a short drive." },
    ],
    thingsToDo: [
      "Sunrise at Karang Beach — the most famous dawn on the island",
      "Cycle the full beachfront path from Matahari Terbit to Mertasari",
      "Day-trip by fast boat to Nusa Penida and Nusa Lembongan",
      "Browse the Sindhu night market for authentic Balinese food",
      "Stand-up paddleboard on the glassy morning lagoon",
    ],
    investment: {
      overview:
        "Sanur offers stability and a demographic tailwind. The Special Economic Zone and hospital district are bringing medical tourism and long-stay demand, while supply remains constrained by the area's established, low-rise character.",
      typicalBuyer:
        "End-users and conservative investors seeking long-term appreciation with dependable long-stay rental income.",
      rentalDemand:
        "Steady and lengthening — monthly and seasonal stays from families, medical travellers, and European snowbirds.",
      capitalGrowth: "Consistent single-digit growth with a strong catalyst in the SEZ development pipeline.",
      opportunities:
        "Freehold homes in the quiet lanes off Jalan Danau Tamblingan, and leasehold villas positioned for the medical-tourism wave.",
    },
    stats: [
      { label: "Airport", value: "25 min" },
      { label: "Typical villa yield", value: "7–10% p.a." },
      { label: "Vibe", value: "Calm / Established" },
    ],
  },
  {
    slug: "seminyak",
    name: "Seminyak",
    tagline: "Polished beach resort living with Bali's finest dining and boutiques.",
    heroImage: img("1540541338287-41700207dee6", 2200),
    cardImage: img("1540541338287-41700207dee6", 1200),
    intro: [
      "Seminyak is Bali's grande dame — the neighbourhood that first defined tropical-chic. Wide golden beaches meet a grid of streets lined with designer boutiques, destination restaurants, and the beach clubs that made Bali famous.",
      "It remains the island's most complete resort address: everything is walkable, standards are international, and the rental market is as established as it gets. For buyers, Seminyak offers something increasingly rare in Bali — maturity.",
    ],
    idealFor:
      "Buyers who want established infrastructure, walkable luxury, and a proven, resilient short-term rental market.",
    lifestyle: [
      { title: "Beach Clubs", description: "Ku De Ta and Potato Head — the icons that defined Bali's sunset culture." },
      { title: "Dining", description: "The island's deepest bench of fine-dining institutions and buzzy newcomers." },
      { title: "Shopping", description: "Flagship boutiques, homeware galleries, and designer resortwear along Jalan Kayu Aya." },
      { title: "Beaches", description: "Broad golden sand from Double Six to Batu Belig, lined with sunset bars." },
      { title: "Spas", description: "World-renowned day spas and in-villa wellness at every price point." },
      { title: "Nightlife", description: "Cocktail bars and lounges that stay elegant well past midnight." },
    ],
    thingsToDo: [
      "Sunset institution-hopping: Ku De Ta to La Plancha's beanbags",
      "Shop the Kayu Aya 'Eat Street' boutiques",
      "Long beach walks from Double Six to Echo Beach",
      "Sunday long-lunch culture at destination restaurants",
      "Massage and spa afternoons — Seminyak does them best",
    ],
    investment: {
      overview:
        "Seminyak is Bali's blue-chip. Growth is steadier than the frontier areas, but occupancy, nightly rates, and resale demand are the most predictable on the island. Freehold stock inside Seminyak proper is tightly held and rarely trades.",
      typicalBuyer:
        "Established investors seeking dependable performance, and lifestyle buyers who want everything at their doorstep.",
      rentalDemand:
        "Deep and resilient — Seminyak has decades of guest loyalty and consistently ranks among Bali's highest-occupancy postcodes.",
      capitalGrowth: "Steady, supported by extreme scarcity of well-located freehold land.",
      opportunities:
        "Renovation plays on older leasehold villas near the beach, and rare freehold offerings in the Oberoi–Laksmana corridor.",
    },
    stats: [
      { label: "Airport", value: "30 min" },
      { label: "Typical villa yield", value: "8–11% p.a." },
      { label: "Vibe", value: "Polished / Iconic" },
    ],
  },
  {
    slug: "ubud",
    name: "Ubud",
    tagline: "Jungle serenity, artistic soul, and Bali's spiritual heartland.",
    heroImage: img("1544644181-1484b3fdfc62", 2200),
    cardImage: img("1544644181-1484b3fdfc62", 1200),
    intro: [
      "Ubud is Bali's cultural and spiritual centre — a highland town wrapped in rainforest, rice terraces, and river gorges. Mornings begin with birdsong and temple bells; evenings end with jungle sunsets and some of the finest farm-to-table dining in Asia.",
      "The wellness economy calls Ubud home: yoga institutions, healing retreats, and plant-based kitchens draw a global audience year-round. Property here means privacy, nature, and views that no development can replicate.",
    ],
    idealFor:
      "Wellness entrepreneurs, retreat operators, and buyers seeking privacy, nature, and jungle-view serenity.",
    lifestyle: [
      { title: "Wellness", description: "The Yoga Barn and a hundred sanctuaries besides — Ubud is the wellness capital of Asia." },
      { title: "Dining", description: "Locavore-calibre gastronomy alongside legendary organic warungs." },
      { title: "Art & Craft", description: "Galleries, artisan villages, and the island's richest creative heritage." },
      { title: "Nature", description: "Rice-terrace walks, river valleys, and waterfalls in every direction." },
      { title: "Culture", description: "Royal palaces, water temples, and daily ceremony woven into ordinary life." },
      { title: "Cafés", description: "Jungle-view coffee houses perfect for slow mornings and remote work." },
    ],
    thingsToDo: [
      "Walk the Campuhan Ridge at sunrise before the mists lift",
      "Explore the Tegallalang rice terraces",
      "Bathe in the holy springs at Tirta Empul",
      "Chase waterfalls — Tibumana, Tegenungan, and Kanto Lampo",
      "A day of treatments and plant-based dining in a jungle spa",
    ],
    investment: {
      overview:
        "Ubud's market runs on wellness tourism — the fastest-growing travel segment globally. Retreat-ready properties and jungle-view villas enjoy demand that is far less seasonal than the beach markets, and land in the surrounding villages remains excellent value.",
      typicalBuyer:
        "Retreat and boutique-hospitality operators, plus lifestyle buyers trading ocean proximity for privacy and nature.",
      rentalDemand:
        "Strong and stable, led by wellness travellers, longer average stays, and the retreat-group market.",
      capitalGrowth:
        "Healthy in the villages ringing Ubud centre — Tegallalang, Penestanan, and Sayan — where views are protected by river gorges.",
      opportunities:
        "Freehold land with valley views for retreat development, and established leasehold villas with proven retreat income.",
    },
    stats: [
      { label: "Airport", value: "75 min" },
      { label: "Typical villa yield", value: "8–12% p.a." },
      { label: "Vibe", value: "Jungle / Wellness" },
    ],
  },
  {
    slug: "pererenan",
    name: "Pererenan",
    tagline: "Canggu's stylish quiet neighbour — rice fields meeting a black-sand surf beach.",
    heroImage: img("1531778272849-d1dd22444c06", 2200),
    cardImage: img("1531778272849-d1dd22444c06", 1200),
    intro: [
      "Pererenan is where those who know Bali best are buying now. One river west of Canggu, it offers the same surf, the same café culture, and the same international community — at a gentler pace and with rice-field horizons still intact.",
      "Design-led restaurants and boutique gyms have arrived, but the village character remains: ceremonies pass the beach road, herons work the paddies, and the black-sand beach at sunset belongs to surfers and horse riders rather than crowds.",
    ],
    idealFor:
      "Early-mover investors and lifestyle buyers who want tomorrow's Canggu at today's prices, with more space and calm.",
    lifestyle: [
      { title: "Beach", description: "A broad black-sand beach with consistent surf and Bali's most photogenic sunset horse rides." },
      { title: "Dining", description: "A new wave of destination restaurants has made Pererenan a culinary address in its own right." },
      { title: "Cafés", description: "Speciality coffee and brunch spots tucked between rice paddies." },
      { title: "Fitness", description: "Boutique gyms and pilates studios minutes from the sand." },
      { title: "Rice Fields", description: "Working paddies and green corridors that still define the landscape." },
      { title: "Community", description: "A quieter, more residential slice of the Canggu international scene." },
    ],
    thingsToDo: [
      "Sunset at Pererenan Beach beneath the giant Gajah Mina statue",
      "Surf uncrowded peaks between Pererenan and Seseh",
      "Cycle the back lanes through the paddies to Cemagi",
      "Dinner at one of the village's celebrated new restaurants",
      "Morning walks along the river to the beach",
    ],
    investment: {
      overview:
        "Pererenan is the clearest momentum play in Bali. It captures Canggu's overflow demand while retaining scarcity value — building is more restrained, plots are larger, and the beachfront remains uncommercialised.",
      typicalBuyer:
        "Investors who missed early Canggu and want the same trajectory, plus families upgrading for space and quiet.",
      rentalDemand:
        "Rising fast — guests increasingly choose Pererenan deliberately, not just as a Canggu alternative.",
      capitalGrowth:
        "The strongest percentage growth corridor on the southwest coast over recent years, with room to run toward Seseh and Kedungu.",
      opportunities:
        "Leasehold villas near the beach road for yield, and freehold land toward Seseh for medium-term appreciation.",
    },
    stats: [
      { label: "Airport", value: "50 min" },
      { label: "Typical villa yield", value: "9–13% p.a." },
      { label: "Vibe", value: "Emerging / Serene" },
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
