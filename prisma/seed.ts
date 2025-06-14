import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProperties() {
  console.log('Seeding properties...');

  // Check if properties already exist
  const existingProperties = await prisma.property.count();
  if (existingProperties > 0) {
    console.log('Properties already exist, skipping seed.');
    return;
  }

  // Create sample properties
  const properties = [
    {
      title: 'Jacob Schorerlaan 201',
      location: 'Den Haag, Groente- en Fruitmarkt',
      price: '€465.000 k.k.',
      originalPrice: '€475.000',
      size: '107m²',
      bedrooms: 4,
      bathrooms: 1,
      area: 107,
      energyLabel: 'A',
      features: ['Tuin', 'Serre', 'Moderne Keuken', 'Parkeren'],
      mainImage: '/images/properties/living-room-1.jpg',
      images: [
        '/images/properties/living-room-1.jpg',
        '/images/properties/kitchen-1.jpg',
        '/images/properties/bedroom-1.jpg',
      ],
      rating: 5,
      status: 'new',
      description: 'Prachtig gerenoveerd appartement met moderne afwerking, ruime woonkamer en volledig uitgeruste keuken. Gelegen in een levendige buurt met alle voorzieningen binnen handbereik.',
      neighborhood: 'Groente- en Fruitmarkt',
      yearBuilt: 1920,
      plotSize: 0,
      heating: 'Centrale verwarming',
      parking: 'Parkeerplaats',
      garden: 'Achtertuin'
    },
    {
      title: 'Groenewegje 76',
      location: 'Den Haag, Centrum',
      price: '€695.000 k.k.',
      size: '120m²',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      energyLabel: 'B',
      features: ['Grachtzicht', 'Historisch', 'Centrale Ligging'],
      mainImage: '/images/properties/living-room-2.jpg',
      images: [
        '/images/properties/living-room-2.jpg',
        '/images/properties/bedroom-1.jpg',
        '/images/properties/kitchen-1.jpg',
      ],
      rating: 5,
      status: 'under_offer',
      description: 'Karakteristiek appartement in het historische centrum van Den Haag met uitzicht op de gracht. Hoge plafonds, originele details en moderne voorzieningen maken dit een unieke woonkans.',
      neighborhood: 'Centrum',
      yearBuilt: 1890,
      plotSize: 0,
      heating: 'Centrale verwarming',
      parking: 'Geen',
      garden: 'Geen'
    },
    {
      title: 'Westeinde 11-D',
      location: 'Den Haag, Centrum',
      price: '€525.000 k.k.',
      size: '95m²',
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      energyLabel: 'C',
      features: ['Stadscentrum', 'Gerenoveerd', 'Balkon'],
      mainImage: '/images/properties/living-room-3.jpg',
      images: [
        '/images/properties/living-room-3.jpg',
        '/images/properties/bedroom-2.jpg',
        '/images/properties/kitchen-1.jpg',
      ],
      rating: 4,
      status: 'available',
      description: 'Modern appartement in het bruisende centrum van Den Haag. Volledig gerenoveerd met hoogwaardige materialen en voorzien van een ruim balkon met uitzicht over de stad.',
      neighborhood: 'Centrum',
      yearBuilt: 1960,
      plotSize: 0,
      heating: 'Centrale verwarming',
      parking: 'Geen',
      garden: 'Balkon'
    }
  ];

  for (const property of properties) {
    await prisma.property.create({
      data: property
    });
  }

  console.log('Properties seeded successfully!');
}

seedProperties()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

