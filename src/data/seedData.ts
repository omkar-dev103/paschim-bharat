// src/data/seedData.ts
export const seedPlaces = [
  {
    title: "Amber Fort",
    slug: "amber-fort-jaipur",
    state: "Rajasthan",
    category: "heritage",
    description:
      "The Amber Fort, also known as Amer Fort, is a magnificent fort located in Amer, Rajasthan. Built in 1592 by Raja Man Singh I, this UNESCO World Heritage Site represents a blend of Hindu and Mughal architecture. The fort features stunning artistic elements, including the Sheesh Mahal (Mirror Palace), Diwan-e-Khas (Hall of Private Audience), and the Sukh Niwas where a cool climate is artificially created by winds blowing over water cascades.",
    shortDescription:
      "A majestic fort showcasing the perfect blend of Hindu and Mughal architecture, known for its artistic elements and stunning views.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200",
      "https://images.unsplash.com/photo-1558431382-27e303142255?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    location: {
      lat: 26.9855,
      lng: 75.8513,
      address: "Devisinghpura, Amer",
      city: "Jaipur",
    },
    rating: 4.8,
    reviewCount: 12543,
    featured: true,
    bestTimeToVisit: "October to March",
    entryFee: "₹500 for foreigners, ₹100 for Indians",
    timings: "8:00 AM - 5:30 PM",
    highlights: [
      "Sheesh Mahal",
      "Elephant Rides",
      "Light & Sound Show",
      "Ganesh Pol",
    ],
    nearbyAttractions: ["Jaigarh Fort", "Nahargarh Fort", "Panna Meena Ka Kund"],
  },
  {
    title: "Calangute Beach",
    slug: "calangute-beach-goa",
    state: "Goa",
    category: "adventure",
    description:
      "Calangute Beach, often referred to as the 'Queen of Beaches', is the largest beach in North Goa. This vibrant beach stretches for about 7 kilometers and offers a perfect blend of relaxation and adventure. From water sports like parasailing and jet skiing to beach shacks serving delicious Goan cuisine, Calangute has something for everyone.",
    shortDescription:
      "The Queen of Beaches offering water sports, vibrant nightlife, and authentic Goan cuisine in a stunning coastal setting.",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    location: {
      lat: 15.5449,
      lng: 73.7554,
      address: "Calangute",
      city: "North Goa",
    },
    rating: 4.5,
    reviewCount: 8932,
    featured: true,
    bestTimeToVisit: "November to February",
    highlights: [
      "Water Sports",
      "Beach Shacks",
      "Sunset Views",
      "Nightlife",
    ],
    nearbyAttractions: ["Baga Beach", "Aguada Fort", "Candolim Beach"],
  },
  {
    title: "Rann of Kutch",
    slug: "rann-of-kutch-gujarat",
    state: "Gujarat",
    category: "eco-tourism",
    description:
      "The Rann of Kutch is one of the largest salt deserts in the world, spanning about 7,505 square kilometers. This surreal white landscape transforms into a magical spectacle during the Rann Utsav festival from November to February. The full moon nights here are particularly enchanting when the white salt marsh reflects the moonlight.",
    shortDescription:
      "A surreal white salt desert that transforms into a magical landscape under the full moon, home to the famous Rann Utsav.",
    images: [
      "https://images.unsplash.com/photo-1609766856923-7e0a0c06a5e3?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1609766856923-7e0a0c06a5e3?w=800",
    location: {
      lat: 23.7337,
      lng: 69.8597,
      address: "Kutch District",
      city: "Bhuj",
    },
    rating: 4.9,
    reviewCount: 6234,
    featured: true,
    bestTimeToVisit: "November to February",
    entryFee: "₹100 per person",
    highlights: [
      "Rann Utsav",
      "Full Moon Nights",
      "Handicraft Villages",
      "Wildlife",
    ],
    nearbyAttractions: ["Kalo Dungar", "Mandvi Beach", "Bhuj Old Town"],
  },
  {
    title: "Ajanta Caves",
    slug: "ajanta-caves-maharashtra",
    state: "Maharashtra",
    category: "heritage",
    description:
      "The Ajanta Caves are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE. These caves are famous for their murals and sculptures considered masterpieces of Buddhist religious art. The caves are a UNESCO World Heritage Site and represent the finest surviving examples of ancient Indian art.",
    shortDescription:
      "Ancient rock-cut Buddhist caves featuring world-renowned murals and sculptures, a UNESCO World Heritage Site.",
    images: [
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800",
    location: {
      lat: 20.5525,
      lng: 75.7033,
      address: "Ajanta Village",
      city: "Aurangabad",
    },
    rating: 4.7,
    reviewCount: 9876,
    featured: true,
    bestTimeToVisit: "October to March",
    entryFee: "₹600 for foreigners, ₹40 for Indians",
    timings: "9:00 AM - 5:30 PM (Closed on Mondays)",
    highlights: [
      "Buddhist Murals",
      "Cave Paintings",
      "Rock Architecture",
      "UNESCO Site",
    ],
    nearbyAttractions: ["Ellora Caves", "Bibi Ka Maqbara", "Daulatabad Fort"],
  },
];

export const seedRestaurants = [
  {
    name: "1135 AD",
    slug: "1135-ad-jaipur",
    cuisine: ["Rajasthani", "Indian", "Mughlai"],
    description:
      "Located within the majestic Amber Fort, 1135 AD offers an extraordinary dining experience with royal Rajasthani cuisine served in a setting that dates back to the 12th century.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    location: {
      lat: 26.9855,
      lng: 75.8513,
      address: "Amber Fort, Devisinghpura",
      city: "Jaipur",
      state: "Rajasthan",
    },
    priceRange: "$$$$",
    rating: 4.8,
    reviewCount: 2341,
    featured: true,
    specialties: ["Laal Maas", "Dal Baati Churma", "Gatte Ki Sabzi"],
    timings: "12:00 PM - 11:00 PM",
    contact: "+91 141 253 0101",
  },
  {
    name: "Fisherman's Wharf",
    slug: "fishermans-wharf-goa",
    cuisine: ["Goan", "Seafood", "Continental"],
    description:
      "An iconic Goan restaurant serving the freshest seafood with stunning views of the Mandovi River. Known for authentic Goan preparations and a vibrant atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    location: {
      lat: 15.4989,
      lng: 73.8278,
      address: "Cavelossim Beach Road",
      city: "Mobor",
      state: "Goa",
    },
    priceRange: "$$$",
    rating: 4.6,
    reviewCount: 3456,
    featured: true,
    specialties: ["Fish Curry Rice", "Prawn Balchao", "Bebinca"],
    timings: "11:00 AM - 11:30 PM",
  },
];