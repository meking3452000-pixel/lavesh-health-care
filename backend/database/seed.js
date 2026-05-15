const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const write = (name, data) =>
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2));

// Categories
const categories = [
  { id: 1, name: 'Vitamin Capsules', slug: 'vitamins', icon: 'science', description: 'Essential vitamins for daily health', createdAt: new Date().toISOString() },
  { id: 2, name: 'Mineral Capsules', slug: 'minerals', icon: 'diamond', description: 'Key minerals for body function', createdAt: new Date().toISOString() },
  { id: 3, name: 'Herbal Extract Capsules', slug: 'herbal', icon: 'eco', description: 'Nature-derived herbal extracts', createdAt: new Date().toISOString() },
];

// Products
const products = [
  {
    id: 1, categoryId: 1, name: 'Vitamin C 1000mg', slug: 'vitamin-c-1000mg',
    tagline: 'Immune Support & Antioxidant',
    description: 'High-potency Vitamin C in a vegan capsule. Supports immunity, collagen synthesis, and acts as a powerful antioxidant.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB0jQziLayg0YvUSp1FpmzY5A3vmcGX1UwMBDvk5stuUM7KA43RDXJA2DI_R-sqkapa0cFsoL6GnvVtiK-Ta9g1McLW1oAfEMjlhlbQ-eEPXL6Vy3D16m2K7AEF1R04RufgfabB1uEUXxNTIxqn3Fa9IFk3RriE67c-QEiVR6xGkZKVLmDqjl1gdFmsLiJDz9HUNBNsMCaiu7xIUcKRsGOjXdwNQw9E52oXlnLHGDYEBnEonvVIhW7zpH8UO56B1g8LFBsvF87m-s',
    badge: 'Best Seller',
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Ascorbic Acid' },
      { label: 'Dosage', value: '1000mg per capsule' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C, away from moisture' },
      { label: 'Shelf Life', value: '24 months from manufacture' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Boosts immune system', 'Powerful antioxidant', 'Supports collagen production', 'Enhances iron absorption'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2, categoryId: 1, name: 'Vitamin D3 2000IU', slug: 'vitamin-d3-2000iu',
    tagline: 'Bone Health & Immunity',
    description: 'Plant-sourced Vitamin D3 (cholecalciferol) for optimal bone density, calcium absorption, and immune modulation.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPVTpptSLgxy4kZDQvSF5FQ9fF0XLZov0aSMrXTBtgbnEMYUiBAtxAKnnwk9BK-jNy5ms7lCyNC8QTF9TKPEiVwK1Ocyg177cCvh5kTi1emK0U6W4a5GXH_4f324THc-9anZKHOg189BeOn-kEMCUdnYljVzdXpM07Qtzgz0U6-9TvJkAD0FBRgYeLiZnYmm3gZS-OAdmxXiTdk518ECz3zGWnb9t3i1eLZO5tunLn_a9oofOHwv3kU43Bd8PZn8TGxXP_sRFEAB0',
    badge: 'New',
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Cholecalciferol (D3)' },
      { label: 'Dosage', value: '2000 IU per capsule' },
      { label: 'Form', value: 'Vegan Soft Gel Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Strengthens bones & teeth', 'Supports calcium absorption', 'Boosts immune defence', 'Improves mood regulation'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3, categoryId: 1, name: 'Vitamin B-Complex', slug: 'vitamin-b-complex',
    tagline: 'Energy & Nervous System Support',
    description: 'Complete B-vitamin complex with B1, B2, B3, B5, B6, B7, B9, B12. Supports energy metabolism and neurological function.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJqqsNKNucsew6RgIJu-LK2TJf1EMbi_PYkOdieg2SwEthbqGMJjcPNnLvhMVwtN5_3A2Jh-IZ5ONnOYlhmM_xXh7CVDygeMPNDKfM-hPIIdjU1TFIrWg2lHNRif62JJVCon2Jz3ZSoj25vRxfBHoFhozZ47QbRN-RqL94SJ4BVUUDgPd-jn5X4GYux8efgw5IiHlKF7G9Tgvxuj-QlRC7C6OLjiYXDqa8WVggQnfUY23Fa0Tu1INHsFy1fp6upBaJNNUWIIjatfQ',
    badge: null,
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'B1, B2, B3, B5, B6, B7, B9, B12' },
      { label: 'Dosage', value: '1 capsule daily' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Boosts energy levels', 'Supports nervous system', 'Reduces fatigue', 'Promotes healthy skin & hair'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4, categoryId: 2, name: 'Calcium 500mg', slug: 'calcium-500mg',
    tagline: 'Bone & Dental Strength',
    description: 'High bioavailability calcium carbonate for strong bones, teeth, and proper muscle function.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvYTlt-jHgal_gwy6sW3jKm0HfMQUIMmfDJ9xQh7RcQzP4XwIyX23se8u6qTiXHFc7jDMaLh8K68yJle_o69gYPbNgPESoJMdGLa3j7ULnLWnox4HEzioZTSX7m4hcz25vlME_zpnsYyfjQg-KNym7m64Sia8E8n2JZp0j5uafD6sdWm_fnlBc41NDZ7mlryNiRTs_vIEBIWQSBXyyJmj99m1qippIy90m3fMWihjVNDq97Vq5w47jY-K99d6SVlqVA02HAUMQc2w',
    badge: null,
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Calcium Carbonate' },
      { label: 'Dosage', value: '500mg per capsule' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Builds strong bones', 'Supports dental health', 'Regulates muscle contractions', 'Aids nerve signalling'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5, categoryId: 2, name: 'Zinc 25mg', slug: 'zinc-25mg',
    tagline: 'Immunity & Skin Health',
    description: 'Highly bioavailable zinc gluconate for immune support, wound healing, and healthy skin.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdMT1HuSFQZQxz46M-yTyAEsiUXkEIBPsxVTjZhc1UKqPPtpdwdIE5sD1A4xI3XGZRfzxOGg8XlXr7QZ2itvtHC2BkSXdT6h1HVP6JWL9C3543pYnm9Vff8_OoqOBNL-h6rj5djcXuJdHatOUYXALGN0-RD5UIvHH4Px9WLeVJvlgn9YIzb71zgwV6Yetma9iN4xiT6ZbhKOjL1iYYIH6w7gr15ZvH0z1Qlg1NPY-6ZaMzw1jagD8jjKzAsdvTcPhVD7SFvW9bZWY',
    badge: 'Best Seller',
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Zinc Gluconate' },
      { label: 'Dosage', value: '25mg per capsule' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Supports immune function', 'Promotes wound healing', 'Improves skin clarity', 'Enhances testosterone levels'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6, categoryId: 2, name: 'Magnesium 300mg', slug: 'magnesium-300mg',
    tagline: 'Relaxation & Muscle Recovery',
    description: 'Magnesium glycinate for superior absorption. Supports muscle relaxation, sleep quality, and stress management.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQBV8bAIISSug2myAZjlEFz490S9kZ9q6kEmNjc10epBytuwh-a40cvc3j-Ypvlgql3EqX9-u2oIqiGzG3S8b_EEDliWaOPcrI9cmdVSeek2nLDBEZB1WyrMSoDcprPGhYEG0boKuvQeRL5LPdTzlnsQglYSj8_5Xo4xkZSfMWQuHkVEKMLtd0M_kSdIHwc5wF3Kc0duiukHvdJFmMLDOmphkHsn4HEPMaDfnIsLSDIjeZ21s09_lZFttsAhaqE1CyvNxtxVEIGNg',
    badge: 'New',
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Magnesium Glycinate' },
      { label: 'Dosage', value: '300mg per capsule' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Reduces muscle cramps', 'Improves sleep quality', 'Lowers stress & anxiety', 'Supports heart health'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7, categoryId: 3, name: 'Ashwagandha Extract', slug: 'ashwagandha-extract',
    tagline: 'Stress Relief & Adaptogen',
    description: 'Standardised KSM-66 Ashwagandha root extract (5% withanolides) for stress reduction, endurance, and hormonal balance.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1KZocxUkBthoz-MnXQHLhqX6tH2KNmkstCWo5PbEJrcoEge6ZO_VjEW_A_fA6s7d4IgzBAxv-AomF5IshsZoaAF-joLVy04fqPMc2TUL24ADo1m4uyyEKet8Pw-FdLQw01uTDxwIurfFcBnYPkzAe9wAQakLR2MmzBC5n_t3FJnadGu0UgdvmPm7vGIAons3XxkDM_V5AWaMwDb1MgfnYLiYYQfCohtQnv8u5bwecdPGbex8h6vUjjhvhclkuZp19-y85JVVm9Y',
    badge: 'Best Seller',
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Ashwagandha Root Extract (KSM-66)' },
      { label: 'Dosage', value: '500mg per capsule' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Reduces cortisol & stress', 'Enhances physical endurance', 'Supports hormonal balance', 'Improves sleep quality'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 8, categoryId: 3, name: 'Turmeric Curcumin', slug: 'turmeric-curcumin',
    tagline: 'Anti-Inflammatory & Joint Support',
    description: 'High-potency turmeric extract with 95% curcuminoids plus black pepper (piperine) for maximum absorption.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-EJfc5zEOkJOxLNM7-PQwqjgFANaSdj51iJCY_HjwNkX2K_78KTpJitihABSka_fAqkxaPGnvPwtlRbZaLmgdpVQ2TE0TahF5VY-LWB7mxpga6NlF6J_MdYTXPN4UNFcsZfarpTywjMSemn5jX_CEqaDFCcrvKDePM5ju2tPTFO48xVGLS_OHIXh1AupuySXS7Q11Rd3fv_pJi_-Q7zAAnywpWduSp_zXc2Ao5eZh01h7NqIAgrzKh8E7GYxhoUs8MPgsQrDgr48',
    badge: null,
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Curcuma Longa Extract + Piperine' },
      { label: 'Dosage', value: '500mg curcumin + 5mg piperine' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'India' },
    ],
    benefits: ['Reduces inflammation', 'Supports joint mobility', 'Powerful antioxidant', 'Improves digestion'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 9, categoryId: 3, name: 'Ginseng Extract', slug: 'ginseng-extract',
    tagline: 'Energy & Cognitive Performance',
    description: 'Korean Panax Ginseng root extract (10% ginsenosides) for enhanced mental clarity, energy, and immune support.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqMMSbdsohDKePujWE-LkpmvUDXfpOBVL57-NSugPPuWBFKP9vf93jaaTW1SupKwvvbgqZlkn-6H1JREJ_qztXF5pyiBxqoHIVLTOniTOu44vBIFbG6ss_FiDW4CZqc2QW4ui2pbB7Na31Z_YhwXlDTdQtMvMQTNocw9cwI4GdGlKu6OSvt79wPYWlQ0Ay6r0yLfSsBK8iqtFobn6bsC6wJb8cfpQN0CXKLsXITv3M7fb6JHyG8ukbJIuzJKmFFeb9gVZDPvPqsgQ',
    badge: 'New',
    capsuleCount: 60,
    form: 'Vegan Capsule',
    grade: 'Pharma Grade',
    origin: 'South Korea',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [
      { label: 'Ingredient', value: 'Panax Ginseng Root Extract' },
      { label: 'Dosage', value: '400mg per capsule' },
      { label: 'Form', value: 'Vegan Hard Shell Capsule' },
      { label: 'Storage', value: 'Below 25°C' },
      { label: 'Shelf Life', value: '24 months' },
      { label: 'Origin', value: 'South Korea' },
    ],
    benefits: ['Boosts mental focus', 'Increases physical energy', 'Supports immune system', 'Reduces fatigue'],
    inStock: true,
    createdAt: new Date().toISOString(),
  },
];

// Admin user (default: admin / admin123)
const passwordHash = bcrypt.hashSync('admin123', 10);
const admins = [
  { id: 1, username: 'admin', email: 'admin@laveshhealthcare.com', password: passwordHash, createdAt: new Date().toISOString() },
];

// Inquiries (empty to start)
const inquiries = [];

write('categories', categories);
write('products', products);
write('admins', admins);
write('inquiries', inquiries);

console.log('Database seeded successfully!');
console.log('Admin login -> username: admin | password: admin123');
