import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import dbConnect from '../lib/mongodb';
import City from '../models/City';
import Tour from '../models/Tour';
import Schedule from '../models/Schedule';
import User from '../models/User';
import Booking from '../models/Booking';
import bcrypt from 'bcryptjs';

/**
 * CLOUDINARY SETUP INSTRUCTIONS
 * ==============================
 * 
 * This seed file currently uses placeholder Unsplash URLs for images.
 * To use your own images from Cloudinary:
 * 
 * 1. Go to http://localhost:3000/admin/media
 * 2. Upload your Ethiopian city/tour images to appropriate folders
 * 3. Copy the Cloudinary URLs from the gallery
 * 4. Replace the Unsplash URLs below with your Cloudinary URLs
 * 
 * Cloudinary URL format:
 * https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/ethio-travel/cities/image-name.jpg
 * 
 * For videos, add them to the 'videos' array:
 * videos: ['https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/ethio-travel/cities/video-name.mp4']
 */


const cities = [
    // MAJOR CITIES
    {
        name: 'Addis Ababa',
        description: 'The vibrant capital city of Ethiopia, known for its rich history, bustling markets, and as the diplomatic capital of Africa. Home to the African Union headquarters and numerous museums showcasing Ethiopian heritage.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg'],
        attractions: [
            {
                name: 'National Museum',
                description: 'Home to Lucy, the famous 3.2 million-year-old hominid fossil, and a vast collection of Ethiopian art and historical artifacts.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg',
                price: 10,
                rating: 4.8
            },
            {
                name: 'Holy Trinity Cathedral',
                description: 'A beautiful cathedral built to commemorate Ethiopia\'s liberation from Italian occupation, and the final resting place of Emperor Haile Selassie.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg',
                price: 5,
                rating: 4.6
            },
            {
                name: 'Merkato Market',
                description: 'One of the largest open-air markets in Africa, offering a chaotic but fascinating glimpse into local life and commerce.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg',
                price: 0,
                rating: 4.5
            },
            {
                name: 'Entoto Mountains',
                description: 'The highest peak overlooking the city, offering panoramic views, historic churches, and the former palace of Emperor Menelik II.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg',
                price: 0,
                rating: 4.7
            }
        ],
    },
    {
        name: 'Lalibela',
        description: 'A UNESCO World Heritage site famous for its 11 medieval rock-hewn churches carved from solid rock in the 12th century. These architectural marvels are still active places of worship and pilgrimage, often called the "Eighth Wonder of the World".',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp'],
        attractions: [
            {
                name: 'Bet Giyorgis (St. George Church)',
                description: 'The most famous and visually stunning of the rock-hewn churches, carved in the shape of a cross.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp',
                price: 50,
                rating: 4.9
            },
            {
                name: 'Bet Medhane Alem',
                description: 'The largest monolithic rock-hewn church in the world, resembling a Greek temple.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp',
                price: 50,
                rating: 4.8
            },
            {
                name: 'Bet Maryam',
                description: 'One of the most beautiful churches with intricate carvings and colorful frescoes, dedicated to the Virgin Mary.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp',
                price: 50,
                rating: 4.7
            },
            {
                name: 'Yemrehanna Kristos',
                description: 'A stunning cave church built with alternating layers of wood and stone, predating the Lalibela churches.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp',
                price: 30,
                rating: 4.8
            }
        ],
    },
    {
        name: 'Gondar',
        description: 'Known as the "Camelot of Africa," Gondar was the royal capital of Ethiopia in the 17th and 18th centuries. Famous for its medieval castles, palaces, and beautiful churches with stunning frescoes.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg'],
        attractions: [
            {
                name: 'Fasil Ghebbi (Royal Enclosure)',
                description: 'A fortress-city containing castles, palaces, and other buildings, once the residence of Ethiopian emperors.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg',
                price: 15,
                rating: 4.7
            },
            {
                name: 'Debre Berhan Selassie Church',
                description: 'Famous for its ceiling painted with 80 faces of cherubs and its intricate religious art.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg',
                price: 5,
                rating: 4.8
            },
            {
                name: 'Fasilides Bath',
                description: 'A beautiful bathing complex used during Timkat (Epiphany) celebrations, surrounded by trees and walls.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg',
                price: 5,
                rating: 4.6
            },
            {
                name: 'Qusquam Church',
                description: 'A historic church complex with beautiful architecture and religious artifacts from the Gondarine period.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg',
                price: 5,
                rating: 4.5
            }
        ],
    },
    {
        name: 'Axum',
        description: 'Ancient city and former capital of the Aksumite Empire, one of the great civilizations of the ancient world. Home to towering obelisks, ancient ruins, and believed to house the Ark of the Covenant in the Church of St. Mary of Zion.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg'],
        attractions: [
            {
                name: 'Obelisks of Axum',
                description: 'Towering granite stelae erected by the ancient Aksumites, marking royal tombs.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg',
                price: 10,
                rating: 4.8
            },
            {
                name: 'Church of St. Mary of Zion',
                description: 'The holiest church in Ethiopia, believed to house the original Ark of the Covenant.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg',
                price: 10,
                rating: 4.9
            },
            {
                name: 'Queen of Sheba Palace',
                description: 'Ruins of an ancient palace complex believed to be the residence of the legendary Queen of Sheba.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg',
                price: 10,
                rating: 4.7
            },
            {
                name: 'King Ezana Stone',
                description: 'Ancient inscribed stone documenting King Ezana\'s conversion to Christianity in the 4th century.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg',
                price: 5,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Bahir Dar',
        description: 'Beautiful lakeside city on the shores of Lake Tana, the source of the Blue Nile. Known for its island monasteries dating back to the 14th century and the spectacular Blue Nile Falls (Tis Issat).',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg'],
        attractions: [
            {
                name: 'Lake Tana',
                description: 'The largest lake in Ethiopia, dotted with ancient island monasteries.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg',
                price: 0,
                rating: 4.7
            },
            {
                name: 'Blue Nile Falls',
                description: 'A spectacular waterfall on the Blue Nile river, known locally as Tis Issat ("Smoking Water").',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg',
                price: 10,
                rating: 4.8
            },
            {
                name: 'Ura Kidane Mihret Monastery',
                description: 'A beautiful island monastery on Lake Tana with stunning 16th-century murals and religious treasures.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg',
                price: 15,
                rating: 4.6
            },
            {
                name: 'Bezawit Hill',
                description: 'A scenic viewpoint offering panoramic views of Bahir Dar city, Lake Tana, and the surrounding landscape.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg',
                price: 0,
                rating: 4.5
            }
        ],
    },
    {
        name: 'Harar',
        description: 'Ancient walled city considered the fourth holiest city in Islam with 82 mosques and 102 shrines. Famous for its unique architecture, vibrant markets, colorful houses, and the tradition of feeding wild hyenas.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png'],
        attractions: [
            {
                name: 'Harar Jugol (Old Town)',
                description: 'The historic walled city with its maze of narrow alleyways and colorful houses.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png',
                price: 0,
                rating: 4.8
            },
            {
                name: 'Hyena Feeding Ceremony',
                description: 'A unique tradition where local men feed wild hyenas by hand (and mouth!) every night.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png',
                price: 5,
                rating: 4.9
            },
            {
                name: 'Rimbaud House Museum',
                description: 'Former residence of French poet Arthur Rimbaud, now a museum showcasing Harari culture and history.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Harar Market',
                description: 'A vibrant traditional market offering spices, coffee, handicrafts, and a glimpse into daily Harari life.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png',
                price: 0,
                rating: 4.6
            }
        ],
    },
    // ... other cities would follow similar pattern, truncated for brevity in this example but in real app would be full.
    // I will include a few more to ensure the seed script works without errors for the referenced tours.
    {
        name: 'Semien Mountains',
        description: 'UNESCO World Heritage site featuring dramatic mountain scenery, deep valleys, and unique wildlife including the endemic Gelada baboons, Ethiopian wolves, and Walia ibex. Often called the "Roof of Africa".',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg'],
        attractions: [
            {
                name: 'Ras Dashen Peak',
                description: 'The highest mountain in Ethiopia, offering challenging treks and breathtaking views.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg',
                price: 0,
                rating: 4.9
            },
            {
                name: 'Imet Gogo Viewpoint',
                description: 'A spectacular viewpoint offering 360-degree panoramic views of the Semien Mountains escarpment.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg',
                price: 0,
                rating: 4.9
            },
            {
                name: 'Gelada Baboon Watching',
                description: 'Observe large troops of endemic Gelada baboons, found only in the Ethiopian highlands.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg',
                price: 0,
                rating: 4.8
            },
            {
                name: 'Jinbar Waterfall',
                description: 'A stunning 500-meter waterfall cascading down the dramatic Semien escarpment.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg',
                price: 0,
                rating: 4.7
            }
        ],
    },
    {
        name: 'Bale Mountains',
        description: 'Pristine wilderness area home to the largest population of Ethiopian wolves, the rarest canid in the world. Features afro-alpine moorlands, forests, and spectacular Sanetti Plateau.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg'],
        attractions: [
            {
                name: 'Sanetti Plateau',
                description: 'A high-altitude plateau with unique afro-alpine vegetation and the best place to see Ethiopian wolves.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg',
                price: 0,
                rating: 4.8
            },
            {
                name: 'Harenna Forest',
                description: 'One of the largest remaining natural forests in Ethiopia, home to diverse wildlife and endemic species.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg',
                price: 0,
                rating: 4.7
            },
            {
                name: 'Tullu Dimtu',
                description: 'The second-highest peak in Ethiopia at 4,377m, offering stunning alpine scenery.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg',
                price: 0,
                rating: 4.6
            },
            {
                name: 'Mountain Nyala Viewing',
                description: 'Spot the endemic and endangered Mountain Nyala antelope in their natural habitat.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg',
                price: 0,
                rating: 4.7
            }
        ],
    },
    {
        name: 'Omo Valley',
        description: 'UNESCO World Heritage site home to numerous indigenous tribes maintaining ancient traditions. One of the most culturally diverse regions in Africa with unique customs, body art, and ceremonies.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg'],
        attractions: [
            {
                name: 'Mursi Tribe',
                description: 'Famous for the lip plates worn by women, the Mursi are one of the most recognizable tribes in the Omo Valley.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg',
                price: 20,
                rating: 4.6
            },
            {
                name: 'Hamar Bull Jumping Ceremony',
                description: 'Witness the spectacular coming-of-age ceremony where young men must jump over bulls to prove their manhood.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg',
                price: 25,
                rating: 4.8
            },
            {
                name: 'Karo Tribe Village',
                description: 'Visit the Karo people known for their elaborate body painting and scarification art.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg',
                price: 20,
                rating: 4.7
            },
            {
                name: 'Turmi Market',
                description: 'A vibrant weekly market where different tribes gather to trade goods and socialize.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg',
                price: 0,
                rating: 4.5
            }
        ],
    },
    {
        name: 'Danakil Depression',
        description: 'One of the hottest and most inhospitable places on Earth, yet spectacularly beautiful. Features colorful sulfur springs, salt flats, lava lakes, and unique geological formations.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg'],
        attractions: [
            {
                name: 'Erta Ale Volcano',
                description: 'A continuously active basaltic shield volcano with a persistent lava lake.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg',
                price: 0,
                rating: 4.9
            },
            {
                name: 'Dallol Sulfur Springs',
                description: 'Otherworldly landscape of colorful sulfur springs, salt formations, and acidic pools.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg',
                price: 0,
                rating: 4.9
            },
            {
                name: 'Salt Flats and Camel Caravans',
                description: 'Witness traditional salt mining and the ancient camel caravans transporting salt across the desert.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg',
                price: 0,
                rating: 4.7
            },
            {
                name: 'Lake Asale',
                description: 'A salt lake sitting 120 meters below sea level, one of the lowest points in Africa.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg',
                price: 0,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Debre Libanos',
        description: 'One of the most important monasteries in Ethiopia, founded in the 13th century by Saint Tekle Haymanot. Located in a stunning gorge with the Portuguese Bridge and endemic Gelada baboons.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg'],
        attractions: [
            {
                name: 'Debre Libanos Monastery',
                description: 'A major monastic center with a modern church built over the tomb of the saint.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Portuguese Bridge',
                description: 'A historic 16th-century stone bridge spanning the Jemma River gorge.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg',
                price: 0,
                rating: 4.6
            },
            {
                name: 'Gelada Baboon Colony',
                description: 'Large troops of endemic Gelada baboons inhabit the cliffs around the monastery.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg',
                price: 0,
                rating: 4.7
            },
            {
                name: 'Jemma River Gorge',
                description: 'A spectacular gorge with dramatic cliffs and stunning views of the Blue Nile tributary.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg',
                price: 0,
                rating: 4.5
            }
        ],
    },
    {
        name: 'Sof Omar Caves',
        description: 'Spectacular underground cave system, one of the longest in Africa at 15.1 km. Sacred to both Muslims and local people, with the Web River flowing through limestone formations.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg'],
        attractions: [
            {
                name: 'Cave System',
                description: 'A vast network of limestone caves carved by the Web River.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg',
                price: 5,
                rating: 4.7
            },
            {
                name: 'Chamber of Columns',
                description: 'A massive underground chamber with natural limestone pillars and stalactites.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg',
                price: 5,
                rating: 4.6
            },
            {
                name: 'Web River Underground Flow',
                description: 'Watch the Web River disappear underground and flow through the cave system.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Sacred Prayer Chamber',
                description: 'A spiritual chamber used by both Muslim and local worshippers for centuries.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg',
                price: 0,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Gheralta',
        description: 'Spectacular region in Tigray known for its ancient rock-hewn churches perched on cliff faces. Home to over 120 churches carved into the mountains, offering breathtaking views and spiritual experiences.',
        images: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'],
        attractions: [
            {
                name: 'Abuna Yemata Guh Church',
                description: 'A monolithic church hewn into a cliff face, famous for its difficult ascent and well-preserved murals.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 10,
                rating: 4.9
            },
            {
                name: 'Maryam Korkor Church',
                description: 'A beautiful rock-hewn church with stunning frescoes and panoramic mountain views.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 10,
                rating: 4.8
            },
            {
                name: 'Daniel Korkor Church',
                description: 'A cliff-side monastery accessible by a challenging climb, offering spectacular views.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 10,
                rating: 4.7
            },
            {
                name: 'Debre Tsion Church',
                description: 'An ancient church carved into the mountainside with well-preserved religious art.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 10,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Yeha',
        description: 'Ancient pre-Aksumite town featuring the Great Temple of Yeha, one of the oldest standing structures in Ethiopia dating back to around 700 BC. A testament to ancient Ethiopian civilization.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144668/yeha-temple-of-the-moon-4_rcr1rx.jpg'],
        attractions: [
            {
                name: 'Great Temple of Yeha',
                description: 'A towering structure built of dry-stone masonry, dedicated to the moon god Almaqah.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144668/yeha-temple-of-the-moon-4_rcr1rx.jpg',
                price: 5,
                rating: 4.6
            },
            {
                name: 'Ancient Inscriptions',
                description: 'Pre-Aksumite inscriptions in Sabaean script providing insights into ancient Ethiopian civilization.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144668/yeha-temple-of-the-moon-4_rcr1rx.jpg',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Archaeological Site',
                description: 'Ongoing excavations revealing artifacts from the 8th century BC Sabaean culture.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144668/yeha-temple-of-the-moon-4_rcr1rx.jpg',
                price: 5,
                rating: 4.4
            },
            {
                name: 'Guh Church',
                description: 'A later Christian church built adjacent to the ancient temple, showing religious continuity.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144668/yeha-temple-of-the-moon-4_rcr1rx.jpg',
                price: 3,
                rating: 4.3
            }
        ],
    },
    {
        name: 'Debre Damo',
        description: 'Isolated monastery accessible only by rope, perched atop a flat-topped mountain. One of the most important monasteries in Ethiopia, founded in the 6th century and accessible only to men.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144613/debre-damo-monastery-tigray-region-600nw-1311333149_ssjys9.jpg'],
        attractions: [
            {
                name: 'Debre Damo Monastery',
                description: 'A 6th-century monastery on a flat-topped mountain, accessible only by climbing a rope.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144613/debre-damo-monastery-tigray-region-600nw-1311333149_ssjys9.jpg',
                price: 10,
                rating: 4.8
            },
            {
                name: 'Rope Climb Experience',
                description: 'The unique 15-meter rope climb to reach the monastery plateau - an unforgettable adventure.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144613/debre-damo-monastery-tigray-region-600nw-1311333149_ssjys9.jpg',
                price: 0,
                rating: 4.9
            },
            {
                name: 'Ancient Manuscripts',
                description: 'View rare religious manuscripts and artifacts preserved for over 1,500 years.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144613/debre-damo-monastery-tigray-region-600nw-1311333149_ssjys9.jpg',
                price: 5,
                rating: 4.7
            },
            {
                name: 'Panoramic Views',
                description: 'Breathtaking 360-degree views of the Tigray highlands from the monastery plateau.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144613/debre-damo-monastery-tigray-region-600nw-1311333149_ssjys9.jpg',
                price: 0,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Tana Kirkos',
        description: 'Sacred island monastery on Lake Tana, believed to have housed the Ark of the Covenant for 800 years before it was moved to Axum. Rich in religious history and ancient traditions.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144440/01668527_u633fh.jpg'],
        attractions: [
            {
                name: 'Tana Kirkos Monastery',
                description: 'An ancient monastery on an island in Lake Tana, with a rich collection of religious artifacts.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144440/01668527_u633fh.jpg',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Ark of the Covenant Site',
                description: 'The sacred site believed to have housed the Ark of the Covenant for 800 years.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144440/01668527_u633fh.jpg',
                price: 5,
                rating: 4.7
            },
            {
                name: 'Ancient Stone Altar',
                description: 'A pre-Christian altar stone with mysterious inscriptions and ritual significance.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144440/01668527_u633fh.jpg',
                price: 0,
                rating: 4.4
            },
            {
                name: 'Island Nature Walk',
                description: 'Explore the pristine island ecosystem with endemic birds and peaceful lake views.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144440/01668527_u633fh.jpg',
                price: 0,
                rating: 4.3
            }
        ],
    },
    {
        name: 'Dire Dawa',
        description: 'Ethiopia\'s second-largest city, a vibrant commercial hub with French colonial architecture, bustling markets, and a unique blend of cultures. Gateway to the Harar region.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg'],
        attractions: [
            {
                name: 'Kafira Market',
                description: 'A colorful market with a mix of Oromo, Somali, and Afar cultures.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg',
                price: 0,
                rating: 4.4
            },
            {
                name: 'French Colonial Architecture',
                description: 'Explore the unique French-influenced buildings and urban planning from the colonial era.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg',
                price: 0,
                rating: 4.5
            },
            {
                name: 'Dire Dawa Railway Station',
                description: 'Historic railway station connecting Ethiopia to Djibouti, a testament to early 20th-century engineering.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg',
                price: 0,
                rating: 4.3
            },
            {
                name: 'Laga Hare Cave Paintings',
                description: 'Ancient rock art depicting wildlife and human figures from thousands of years ago.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg',
                price: 5,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Adadi Mariam',
        description: 'Rock-hewn church similar to those in Lalibela, attributed to King Lalibela himself. One of the few rock churches in the Oromia region, featuring beautiful carvings and paintings.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144318/c0_bxvczi.jpg'],
        attractions: [
            {
                name: 'Rock-Hewn Church',
                description: 'A subterranean rock-hewn church still in use today.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144318/c0_bxvczi.jpg',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Ancient Carvings',
                description: 'Intricate religious carvings and crosses similar to those found in Lalibela.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144318/c0_bxvczi.jpg',
                price: 5,
                rating: 4.4
            },
            {
                name: 'Underground Tunnels',
                description: 'Explore the mysterious underground passages connecting different chambers.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144318/c0_bxvczi.jpg',
                price: 5,
                rating: 4.3
            },
            {
                name: 'Religious Ceremonies',
                description: 'Witness traditional Ethiopian Orthodox ceremonies in this active place of worship.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144318/c0_bxvczi.jpg',
                price: 0,
                rating: 4.6
            }
        ],
    },
    {
        name: 'Arba Minch',
        description: 'Beautiful city meaning "Forty Springs," situated between Lake Abaya and Lake Chamo. Gateway to the Omo Valley tribes and home to diverse wildlife including giant Nile crocodiles.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg'],
        attractions: [
            {
                name: 'Nechisar National Park',
                description: 'A park separating Lake Abaya and Lake Chamo, home to zebras, gazelles, and crocodiles.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg',
                price: 10,
                rating: 4.6
            },
            {
                name: 'Crocodile Market',
                description: 'Boat trip on Lake Chamo to see hundreds of giant Nile crocodiles basking on the shore.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg',
                price: 15,
                rating: 4.8
            },
            {
                name: 'Dorze Village',
                description: 'Visit the Dorze people known for their beehive-shaped houses and cotton weaving.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg',
                price: 10,
                rating: 4.7
            },
            {
                name: 'Chencha Mountains',
                description: 'Scenic mountain area with cool climate, offering panoramic views of the Rift Valley lakes.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg',
                price: 0,
                rating: 4.5
            }
        ],
    },
    {
        name: 'Tiya',
        description: 'UNESCO World Heritage archaeological site featuring 36 ancient stelae (standing stones) carved with enigmatic symbols. Dating back to the 12th-14th centuries, their purpose remains mysterious.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144274/98_raheuj.jpg'],
        attractions: [
            {
                name: 'Ancient Stelae',
                description: 'A field of 36 carved standing stones, marking a large burial complex.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144274/98_raheuj.jpg',
                price: 5,
                rating: 4.5
            },
            {
                name: 'Mysterious Symbols',
                description: 'Enigmatic carvings including swords and geometric patterns whose meaning remains unknown.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144274/98_raheuj.jpg',
                price: 5,
                rating: 4.4
            },
            {
                name: 'Archaeological Museum',
                description: 'Small museum displaying artifacts and providing context about the Tiya stelae.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144274/98_raheuj.jpg',
                price: 3,
                rating: 4.3
            },
            {
                name: 'Burial Mounds',
                description: 'Ancient burial sites surrounding the stelae, dating from the 12th-14th centuries.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144274/98_raheuj.jpg',
                price: 5,
                rating: 4.2
            }
        ],
    },
    {
        name: 'Konso',
        description: 'UNESCO World Heritage cultural landscape known for stone-walled terraces, traditional villages, and wooden totems (wagas) honoring deceased heroes. Home to the Konso people with unique traditions.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg'],
        attractions: [
            {
                name: 'Konso Cultural Landscape',
                description: 'Terraced hillsides and fortified settlements that demonstrate a shared value system and social cohesion.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg',
                price: 10,
                rating: 4.7
            },
            {
                name: 'Waga Wooden Totems',
                description: 'Traditional carved wooden statues honoring deceased heroes and warriors of the Konso people.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg',
                price: 5,
                rating: 4.6
            },
            {
                name: 'Fortified Villages',
                description: 'Visit traditional Konso villages with stone walls and unique defensive architecture.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg',
                price: 10,
                rating: 4.5
            },
            {
                name: 'Stone Terraces',
                description: 'Ancient agricultural terraces showcasing sustainable farming practices over generations.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg',
                price: 0,
                rating: 4.4
            }
        ],
    },
    {
        name: 'Jijiga',
        description: 'Capital of the Somali Region, a vibrant city with rich Somali culture, traditional markets, and gateway to the Somali lowlands. Known for its unique architecture and hospitality.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144198/330px-Jijiga_lsg6vj.jpg'],
        attractions: [
            {
                name: 'Karamara Mountain',
                description: 'A historic mountain pass offering views of the city and surrounding plains.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144198/330px-Jijiga_lsg6vj.jpg',
                price: 0,
                rating: 4.3
            },
            {
                name: 'Jijiga Market',
                description: 'Vibrant Somali market selling traditional goods, spices, textiles, and livestock.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144198/330px-Jijiga_lsg6vj.jpg',
                price: 0,
                rating: 4.4
            },
            {
                name: 'Somali Cultural Center',
                description: 'Learn about Somali culture, poetry, music, and traditional way of life.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144198/330px-Jijiga_lsg6vj.jpg',
                price: 5,
                rating: 4.2
            },
            {
                name: 'Jijiga Stadium',
                description: 'Modern sports facility and gathering place for community events and celebrations.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144198/330px-Jijiga_lsg6vj.jpg',
                price: 0,
                rating: 4.1
            }
        ],
    },
    {
        name: 'Gambela',
        description: 'Tropical lowland region with unique wetland ecosystems, home to the Nuer and Anuak peoples. Features diverse wildlife and the Baro River, Ethiopia\'s only navigable river.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144112/Baro_river_Gambela_oai3dy.jpg'],
        attractions: [
            {
                name: 'Gambela National Park',
                description: 'A vast park with diverse wildlife including elephants, lions, and antelopes.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144112/Baro_river_Gambela_oai3dy.jpg',
                price: 10,
                rating: 4.4
            },
            {
                name: 'Baro River',
                description: 'Ethiopia\'s only navigable river, offering boat trips and fishing opportunities.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144112/Baro_river_Gambela_oai3dy.jpg',
                price: 0,
                rating: 4.5
            },
            {
                name: 'Nuer and Anuak Villages',
                description: 'Visit traditional villages and learn about the unique cultures of the Nuer and Anuak peoples.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144112/Baro_river_Gambela_oai3dy.jpg',
                price: 15,
                rating: 4.3
            },
            {
                name: 'Wetland Ecosystem',
                description: 'Explore the unique tropical wetlands with diverse bird species and aquatic life.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144112/Baro_river_Gambela_oai3dy.jpg',
                price: 0,
                rating: 4.2
            }
        ],
    },
    {
        name: 'Assosa',
        description: 'Capital of Benishangul-Gumuz region, known for its gold mining history and diverse ethnic groups. Features beautiful landscapes and the Blue Nile River.',
        images: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'],
        attractions: [
            {
                name: 'Blue Nile River',
                description: 'The mighty river flowing through the region towards Sudan.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 0,
                rating: 4.2
            },
            {
                name: 'Gold Mining Sites',
                description: 'Historical and active gold mining areas showcasing the region\'s mineral wealth.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 10,
                rating: 4.3
            },
            {
                name: 'Bamboo Forest',
                description: 'Dense bamboo forests unique to the region, home to diverse wildlife.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 0,
                rating: 4.1
            },
            {
                name: 'Cultural Villages',
                description: 'Visit villages of the Berta, Gumuz, and other ethnic groups with rich traditions.',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                price: 10,
                rating: 4.4
            }
        ],
    },
    {
        name: 'Gishen Mariam',
        description: 'Sacred monastery in Wollo, believed to house a piece of the True Cross brought from Jerusalem. Major pilgrimage site with annual celebrations attracting thousands of faithful.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764143970/Gishen-Mariam-Monastery_bgki5p.jpg'],
        attractions: [
            {
                name: 'Gishen Mariam Monastery',
                description: 'The repository of a fragment of the True Cross, making it one of the holiest sites in Ethiopia.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764143970/Gishen-Mariam-Monastery_bgki5p.jpg',
                price: 5,
                rating: 4.8
            }
        ],
    },
    {
        name: 'Waldeba',
        description: 'Remote monastery complex in the Semien Mountains, home to hermit monks living in caves. One of the most isolated and spiritual places in Ethiopia, accessible only by hiking.',
        images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764143907/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGaGVscHRoZWZvcmdvdHRlbi5vcmclMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjMlMkYxMCUyRnllLXdhbGRpYmEtRW5hdG9jaC0yMDAweDExMjUuanBnJmNhY2hlTWFya2VyPTE3NTg5MzM5NjAtMTAzMTgxOCZ0b2tlbj04M2I3ZTNmZmIwZjM5N2E1.q_fuxme9.jpg'],
        attractions: [
            {
                name: 'Waldeba Monastery',
                description: 'A place of extreme asceticism and spiritual devotion.',
                image: 'https://res.cloudinary.com/dqtnppc7l/image/upload/v1764143907/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGaGVscHRoZWZvcmdvdHRlbi5vcmclMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjMlMkYxMCUyRnllLXdhbGRpYmEtRW5hdG9jaC0yMDAweDExMjUuanBnJmNhY2hlTWFya2VyPTE3NTg5MzM5NjAtMTAzMTgxOCZ0b2tlbj04M2I3ZTNmZmIwZjM5N2E1.q_fuxme9.jpg',
                price: 0,
                rating: 4.7
            }
        ],
    },
];

async function seed() {
    try {
        await dbConnect();
        console.log('🔗 Connected to MongoDB');

        await City.deleteMany({});
        await Tour.deleteMany({});
        await Schedule.deleteMany({});
        await User.deleteMany({});
        await Booking.deleteMany({});
        console.log('🗑️  Cleared existing data');

        const createdCities = await City.insertMany(cities);
        console.log(`✅ Created ${createdCities.length} cities`);

        const tours = [
            // Addis Ababa Tours
            {
                title: 'Historic Addis Ababa City Tour',
                description: 'Explore the capital city\'s rich history, visit the National Museum housing Lucy (the 3.2 million-year-old hominid), Holy Trinity Cathedral, and experience the vibrant Merkato market, Africa\'s largest open-air market.',
                cityId: createdCities[0]._id,
                price: 150,
                duration: 1,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg'],
                highlights: ['National Museum & Lucy', 'Holy Trinity Cathedral', 'Merkato Market', 'Entoto Mountains'],
                included: ['Professional guide', 'Transportation', 'Entrance fees', 'Lunch'],
                excluded: ['Personal expenses', 'Tips'],
            },

            // Lalibela Tours
            {
                title: 'Lalibela Rock Churches Pilgrimage - 3 Days',
                description: 'Visit all 11 magnificent rock-hewn churches of Lalibela, a UNESCO World Heritage site. Experience religious ceremonies, explore the underground tunnels, and witness one of the world\'s greatest religious-historical sites.',
                cityId: createdCities[1]._id,
                price: 650,
                duration: 3,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp'],
                highlights: ['11 Rock-Hewn Churches', 'Bet Giyorgis', 'Religious Ceremonies', 'Yemrehanna Kristos'],
                included: ['Accommodation', 'All meals', 'Professional guide', 'Transportation', 'Entrance fees'],
                excluded: ['International flights', 'Travel insurance', 'Alcoholic drinks'],
            },
            {
                title: 'Lalibela & Asheton Maryam Monastery Trek',
                description: 'Combine the rock churches with a scenic hike to Asheton Maryam Monastery, perched at 3,150m with panoramic views of the Lasta Mountains.',
                cityId: createdCities[1]._id,
                price: 450,
                duration: 2,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp'],
                highlights: ['Rock Churches', 'Mountain Trekking', 'Asheton Maryam', 'Panoramic Views'],
                included: ['Guide', 'Mule rental', 'Entrance fees', 'Meals'],
                excluded: ['Accommodation', 'Tips'],
            },

            // Gondar Tours
            {
                title: 'Gondar Royal Heritage & Castles Tour',
                description: 'Discover the medieval castles and palaces of Gondar, visit the stunning Debre Berhan Selassie Church with its famous ceiling of angels, and explore Fasilides Bath.',
                cityId: createdCities[2]._id,
                price: 380,
                duration: 2,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg'],
                highlights: ['Fasil Ghebbi', 'Royal Enclosure', 'Debre Berhan Selassie', 'Fasilides Bath'],
                included: ['Hotel', 'Breakfast', 'Guide', 'Transport', 'Entrance fees'],
                excluded: ['Lunch & Dinner', 'Tips'],
            },

            // Axum Tours
            {
                title: 'Axum Ancient Civilization & Ark of Covenant Tour',
                description: 'Explore the ancient obelisks, ruins, and religious sites of Axum. Visit the Church of St. Mary of Zion, believed to house the Ark of the Covenant, and discover the Queen of Sheba\'s palace.',
                cityId: createdCities[3]._id,
                price: 420,
                duration: 2,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg'],
                highlights: ['Obelisks', 'St. Mary of Zion', 'Queen of Sheba Palace', 'King Ezana Stone'],
                included: ['Accommodation', 'Guide', 'Entrance fees', 'Transport', 'Breakfast'],
                excluded: ['Other meals', 'Personal shopping'],
            },

            // Bahir Dar Tours
            {
                title: 'Bahir Dar Lake Tana & Blue Nile Falls Adventure',
                description: 'Experience the beauty of Lake Tana with boat trips to ancient island monasteries, witness the spectacular Blue Nile Falls (Tis Issat), and explore the source of the Blue Nile.',
                cityId: createdCities[4]._id,
                price: 480,
                duration: 3,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg'],
                highlights: ['Lake Tana boat trip', 'Island monasteries', 'Blue Nile Falls', 'Monastery murals'],
                included: ['Hotel', 'Boat trip', 'Guide', 'All transport', 'Breakfast'],
                excluded: ['Lunch & Dinner', 'Alcoholic drinks', 'Tips'],
            },

            // Harar Tours
            {
                title: 'Harar Walled City & Hyena Feeding Experience',
                description: 'Discover the ancient walled city of Harar, explore its narrow alleys and 82 mosques, visit Rimbaud House, and experience the unique tradition of feeding wild hyenas at night.',
                cityId: createdCities[5]._id,
                price: 350,
                duration: 2,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png'],
                highlights: ['Harar Jugol', 'Hyena feeding', 'Local markets', 'Rimbaud House', 'Jami Mosque'],
                included: ['Accommodation', 'Breakfast', 'Guide', 'Hyena feeding', 'City tour'],
                excluded: ['Other meals', 'Souvenirs'],
            },

            // Gheralta Tours
            {
                title: 'Gheralta Rock Churches Trekking Adventure',
                description: 'Trek to spectacular cliff-top churches including the famous Abuna Yemata Guh, accessible only by climbing sheer rock faces. An adventure combining spirituality and adrenaline.',
                cityId: createdCities[12]._id,
                price: 580,
                duration: 3,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142603/Visiting-Gheralta-Rock-Churches-Korkor-Lodge-credit-O.-Grunewald.jpg_rhijlp.jpg'],
                highlights: ['Abuna Yemata Guh', 'Maryam Korkor', 'Cliff climbing', 'Ancient churches'],
                included: ['Guide', 'Local guide', 'Camping equipment', 'Meals', 'Transport'],
                excluded: ['Accommodation in towns', 'Tips'],
            },

            // Semien Mountains Tours
            {
                title: 'Semien Mountains Trekking - 5 Days',
                description: 'Trek through the spectacular Semien Mountains, encounter endemic Gelada baboons and Ethiopian wolves, summit viewpoints, and experience the "Roof of Africa".',
                cityId: createdCities[6]._id,
                price: 850,
                duration: 5,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg'],
                highlights: ['Imet Gogo', 'Gelada baboons', 'Ethiopian wolf', 'Mountain camping', 'Ras Dashen'],
                included: ['Camping equipment', 'All meals', 'Guide', 'Scout', 'Mules', 'Park fees'],
                excluded: ['Accommodation before/after trek', 'Tips', 'Personal gear'],
            },

            // Bale Mountains Tours
            {
                title: 'Bale Mountains Wildlife & Sanetti Plateau Safari',
                description: 'Explore the Sanetti Plateau, home to the largest population of Ethiopian wolves. Trek through afro-alpine moorlands and Harenna Forest, spotting endemic wildlife.',
                cityId: createdCities[7]._id,
                price: 720,
                duration: 4,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg'],
                highlights: ['Ethiopian wolves', 'Sanetti Plateau', 'Mountain nyala', 'Harenna Forest'],
                included: ['Accommodation', 'Meals', 'Guide', '4x4 transport', 'Park fees'],
                excluded: ['Tips', 'Personal expenses'],
            },

            // Omo Valley Tours
            {
                title: 'Omo Valley Tribal Cultural Tour - 7 Days',
                description: 'Journey through the Omo Valley visiting Mursi, Hamar, Karo, and other tribes. Witness traditional ceremonies, bull jumping, body painting, and experience ancient cultures.',
                cityId: createdCities[8]._id,
                price: 1200,
                duration: 7,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg'],
                highlights: ['Mursi tribe', 'Hamar bull jumping', 'Karo body art', 'Traditional markets', 'Tribal villages'],
                included: ['Accommodation', 'All meals', 'Guide', '4x4 transport', 'Village fees'],
                excluded: ['Tips', 'Photo fees', 'Personal expenses'],
            },

            // Danakil Depression Tours
            {
                title: 'Danakil Depression Extreme Adventure - 4 Days',
                description: 'Explore one of Earth\'s most extreme environments. Visit Erta Ale lava lake, Dallol\'s colorful sulfur springs, salt flats, and witness traditional salt mining by camel caravans.',
                cityId: createdCities[9]._id,
                price: 950,
                duration: 4,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg'],
                highlights: ['Erta Ale volcano', 'Dallol sulfur springs', 'Salt flats', 'Camel caravans'],
                included: ['Camping equipment', 'All meals', 'Guide', '4x4 transport', 'Armed scout'],
                excluded: ['Accommodation in Mekele', 'Tips', 'Sleeping bag'],
            },

            // Debre Libanos Tour
            {
                title: 'Debre Libanos Monastery & Portuguese Bridge Day Trip',
                description: 'Visit the historic Debre Libanos Monastery, see the Portuguese Bridge, encounter Gelada baboons in their natural habitat, and explore the stunning Jemma River Gorge.',
                cityId: createdCities[10]._id,
                price: 180,
                duration: 1,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg'],
                highlights: ['Debre Libanos Monastery', 'Portuguese Bridge', 'Gelada baboons', 'Jemma Gorge'],
                included: ['Transport', 'Guide', 'Entrance fees', 'Lunch'],
                excluded: ['Personal expenses'],
            },

            // Sof Omar Caves Tour
            {
                title: 'Sof Omar Caves Exploration',
                description: 'Explore one of Africa\'s longest cave systems, walk through spectacular limestone formations, witness the Web River flowing underground, and discover sacred chambers.',
                cityId: createdCities[11]._id,
                price: 320,
                duration: 2,
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg'],
                highlights: ['Cave system', 'Underground river', 'Limestone formations', 'Sacred chambers'],
                included: ['Accommodation', 'Guide', 'Flashlights', 'Transport', 'Meals'],
                excluded: ['Tips', 'Personal expenses'],
            },
        ];

        const createdTours = await Tour.insertMany(tours);
        console.log(`✅ Created ${createdTours.length} tours`);

        // Create schedules for all tours
        const schedules = createdTours.flatMap((tour) => [
            {
                tourId: tour._id,
                startDate: new Date('2025-01-15'),
                endDate: new Date(new Date('2025-01-15').getTime() + tour.duration * 24 * 60 * 60 * 1000),
                availableSlots: 12,
                bookedSlots: 0,
                status: 'available',
            },
            {
                tourId: tour._id,
                startDate: new Date('2025-02-01'),
                endDate: new Date(new Date('2025-02-01').getTime() + tour.duration * 24 * 60 * 60 * 1000),
                availableSlots: 12,
                bookedSlots: 0,
                status: 'available',
            },
            {
                tourId: tour._id,
                startDate: new Date('2025-03-01'),
                endDate: new Date(new Date('2025-03-01').getTime() + tour.duration * 24 * 60 * 60 * 1000),
                availableSlots: 12,
                bookedSlots: 0,
                status: 'available',
            },
        ]);

        await Schedule.insertMany(schedules);
        const createdSchedules = await Schedule.find({});
        console.log(`✅ Created ${schedules.length} schedules`);

        // Create sample users with hashed passwords
        const hashedPassword = await bcrypt.hash('password123', 10);
        const users = [
            {
                name: 'Admin User',
                email: 'admin@ethiotravel.com',
                password: hashedPassword,
                role: 'admin' as const,
                preferences: {
                    language: 'en',
                    interests: ['Management'],
                    budget: 'high',
                },
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'user' as const,
                preferences: {
                    language: 'en',
                    interests: ['History', 'Culture', 'Nature'],
                    budget: 'medium',
                },
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword,
                role: 'user' as const,
                preferences: {
                    language: 'en',
                    interests: ['Adventure', 'Wildlife', 'Photography'],
                    budget: 'high',
                },
            },
            {
                name: 'Ahmed Hassan',
                email: 'ahmed@example.com',
                password: hashedPassword,
                role: 'user' as const,
                preferences: {
                    language: 'en',
                    interests: ['Religious Sites', 'Architecture'],
                    budget: 'low',
                },
            },
        ];

        const createdUsers = await User.insertMany(users);
        console.log(`✅ Created ${createdUsers.length} sample users`);

        // Create sample bookings
        const bookings = [
            {
                userId: createdUsers[0]._id,
                tourId: createdTours[0]._id, // Historic Addis Ababa
                scheduleId: createdSchedules[0]._id,
                numberOfPeople: 2,
                totalPrice: 300,
                status: 'confirmed' as const,
                paymentStatus: 'paid' as const,
                paymentId: 'pay_123456',
            },
            {
                userId: createdUsers[1]._id,
                tourId: createdTours[1]._id, // Lalibela Rock Churches
                scheduleId: createdSchedules[3]._id,
                numberOfPeople: 4,
                totalPrice: 2600,
                status: 'confirmed' as const,
                paymentStatus: 'paid' as const,
                paymentId: 'pay_789012',
            },
            {
                userId: createdUsers[0]._id,
                tourId: createdTours[7]._id, // Semien Mountains
                scheduleId: createdSchedules[21]._id,
                numberOfPeople: 2,
                totalPrice: 1700,
                status: 'pending' as const,
                paymentStatus: 'pending' as const,
            },
            {
                userId: createdUsers[2]._id,
                tourId: createdTours[5]._id, // Harar Walled City
                scheduleId: createdSchedules[15]._id,
                numberOfPeople: 1,
                totalPrice: 350,
                status: 'completed' as const,
                paymentStatus: 'paid' as const,
                paymentId: 'pay_345678',
            },
        ];

        const createdBookings = await Booking.insertMany(bookings);
        console.log(`✅ Created ${createdBookings.length} sample bookings`);

        console.log('\n🎉 Database seeded successfully!');
        console.log(`📍 ${createdCities.length} cities across all Ethiopian regions`);
        console.log(`🎫 ${createdTours.length} diverse tour packages`);
        console.log(`📅 ${schedules.length} available schedules`);
        console.log(`👥 ${createdUsers.length} sample users`);
        console.log(`📝 ${createdBookings.length} sample bookings`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
