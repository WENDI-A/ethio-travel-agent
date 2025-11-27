# Expanded Ethiopian Cities & Regions Database

## 🎉 What Was Added

I've massively expanded the database seed script from **6 cities** to **26 cities** covering all Ethiopian regions, religious sites, and historical places!

## 📍 Cities by Region (26 Total)

### Major Cities (6)
1. **Addis Ababa** - Capital city, National Museum, Holy Trinity Cathedral, Merkato Market
2. **Lalibela** - 11 rock-hewn churches, UNESCO World Heritage site
3. **Gondar** - Royal castles and palaces, "Camelot of Africa"
4. **Axum** - Ancient obelisks, Ark of the Covenant, Queen of Sheba Palace
5. **Bahir Dar** - Lake Tana, Blue Nile Falls, island monasteries
6. **Harar** - Walled city, 82 mosques, hyena feeding tradition

### Tigray Region (3 Religious & Historical Sites)
7. **Gheralta** - 120+ cliff-top rock churches, Abuna Yemata Guh
8. **Yeha** - Great Temple (700 BC), pre-Aksumite civilization
9. **Debre Damo** - Monastery accessible only by rope, 6th century

### Amhara Region (3 Religious & Historical Sites)
10. **Debre Libanos** - Important monastery, Portuguese Bridge, Gelada baboons
11. **Tana Kirkos** - Sacred island, housed Ark of Covenant for 800 years
12. **Semien Mountains** - UNESCO site, Ethiopian wolves, Gelada baboons, "Roof of Africa"

### Oromia Region (4 Sites)
13. **Dire Dawa** - Second-largest city, French colonial architecture
14. **Bale Mountains** - Ethiopian wolves, Sanetti Plateau, afro-alpine moorlands
15. **Sof Omar Caves** - 15.1 km cave system, underground river
16. **Adadi Mariam** - Rock-hewn church, similar to Lalibela

### Southern Nations (4 Cultural Sites)
17. **Arba Minch** - "Forty Springs," Lake Chamo, Lake Abaya, crocodiles
18. **Omo Valley** - UNESCO site, indigenous tribes (Mursi, Hamar, Karo)
19. **Tiya** - UNESCO site, 36 ancient stelae with mysterious symbols
20. **Konso** - UNESCO cultural landscape, terraced hillsides, waga totems

### Afar Region (1 Natural Wonder)
21. **Danakil Depression** - Erta Ale volcano, Dallol sulfur springs, salt flats

### Somali Region (1 City)
22. **Jijiga** - Capital of Somali Region, traditional markets

### Gambela Region (1 Site)
23. **Gambela** - Wetland ecosystems, Baro River, Nuer and Anuak peoples

### Benishangul-Gumuz Region (1 City)
24. **Assosa** - Gold mining history, Blue Nile River

### Additional Sacred Sites (2)
25. **Gishen Mariam** - Monastery with True Cross relic, major pilgrimage site
26. **Waldeba** - Remote hermit monastery in Semien Mountains

## 🎫 Tour Packages (15 Total)

### City Tours
- Historic Addis Ababa City Tour (1 day, $150)
- Gondar Royal Heritage & Castles Tour (2 days, $380)
- Harar Walled City & Hyena Feeding (2 days, $350)

### Religious Pilgrimages
- Lalibela Rock Churches Pilgrimage (3 days, $650)
- Lalibela & Asheton Maryam Trek (2 days, $450)
- Axum Ancient Civilization Tour (2 days, $420)
- Debre Libanos Monastery Day Trip (1 day, $180)

### Nature & Wildlife
- Bahir Dar Lake Tana & Blue Nile Falls (3 days, $480)
- Semien Mountains Trekking (5 days, $850)
- Bale Mountains Wildlife Safari (4 days, $720)

### Adventure Tours
- Gheralta Rock Churches Trekking (3 days, $580)
- Danakil Depression Extreme Adventure (4 days, $950)
- Sof Omar Caves Exploration (2 days, $320)

### Cultural Immersion
- Omo Valley Tribal Cultural Tour (7 days, $1,200)

## 🗺️ Regional Coverage

✅ **Tigray** - Rock churches, ancient temples, cliff monasteries  
✅ **Amhara** - Monasteries, mountains, royal heritage  
✅ **Oromia** - Caves, mountains, rock churches  
✅ **Southern Nations** - Tribal cultures, archaeological sites  
✅ **Afar** - Volcanic landscapes, extreme environments  
✅ **Somali** - Traditional markets, cultural sites  
✅ **Gambela** - Wetlands, rivers, wildlife  
✅ **Benishangul-Gumuz** - Rivers, gold mining heritage  

## 🔧 How to Seed the Database

### Option 1: Using Local MongoDB
```powershell
# Make sure MongoDB is running locally
$env:MONGODB_URI="mongodb://localhost:27017/ethio-travel"
npm run seed
```

### Option 2: Using MongoDB Atlas
```powershell
# Set your MongoDB Atlas connection string in .env.local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ethio-travel

# Then run
npm run seed
```

### Option 3: Using the Helper Script
```powershell
# Run the PowerShell helper script
.\scripts\run-seed.ps1
```

## 📊 Database Statistics

After seeding, you'll have:
- **26 cities** across all Ethiopian regions
- **15 tour packages** with diverse experiences
- **45 schedules** (3 dates per tour)
- **150+ attractions** across all cities

## 🎯 What This Enables

### For Users:
- Explore cities from every region of Ethiopia
- Discover both famous and hidden gems
- Find tours for every interest (religious, cultural, nature, adventure)
- Experience authentic Ethiopian diversity

### For AI Features:
- **AI Chatbot** can answer questions about any region
- **Recommendations** cover diverse preferences
- **Content Generator** has rich context for all regions
- **Image Generator** can create visuals for any location

## 🌟 Highlights

### Religious Sites
- 11 rock churches in Lalibela
- Ark of the Covenant in Axum
- Debre Libanos monastery
- Gishen Mariam with True Cross
- 120+ cliff churches in Gheralta

### Historical Sites
- Royal castles of Gondar
- Ancient obelisks of Axum
- Great Temple of Yeha (700 BC)
- Tiya stelae (12th-14th century)
- Konso cultural landscape

### Natural Wonders
- Semien Mountains ("Roof of Africa")
- Danakil Depression (hottest place on Earth)
- Blue Nile Falls
- Bale Mountains
- Sof Omar Caves (15.1 km)

### Cultural Experiences
- Omo Valley tribes
- Hyena feeding in Harar
- Traditional markets
- Tribal ceremonies

---

**All content is in TypeScript as requested!** The seed script (`scripts/seed.ts`) is ready to populate your database with comprehensive Ethiopian tourism data.
