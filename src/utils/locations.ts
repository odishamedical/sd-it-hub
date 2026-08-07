export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const ODISHA_DISTRICTS = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack",
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)",
  "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh",
  "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)", "Sundargarh"
];

export const ODISHA_DISTRICT_BLOCKS: Record<string, string[]> = {
  "Angul": ["Angul", "Athmallik", "Banarpal", "Chhendipada", "Kishorenagar", "Pallahara", "Talcher"],
  "Balasore": ["Bahanaga", "Baleswar", "Baliapal", "Basta", "Bhograi", "Jaleswar", "Khaira", "Nilagiri", "Oupada", "Remuna", "Simulia", "Soro"],
  "Bhadrak": ["Basudevpur", "Bhadrak", "Bhandaripokhari", "Bonth", "Chandabali", "Dihidi", "Tihidi"],
  "Cuttack": ["Athagarh", "Badamba", "Banki", "Barang", "Cuttack", "Cuttack Sadar", "Kantapada", "Mahanga", "Niali", "Nischintakoili", "Salepur", "Tangi-Choudwar"],
  "Khordha": ["Bhubaneswar", "Balianta", "Balipatna", "Banapur", "Begunia", "Bologarh", "Chilika", "Jatni", "Khurda", "Tangi"],
  "Puri": ["Astaranga", "Brahmagiri", "Delanga", "Gop", "Kakatpur", "Kanas", "Krushnaprasad", "Nimapada", "Pipili", "Puri", "Puri Sadar", "Satyabadi"],
  // Add other block mapping as needed, keeping it lightweight for now
};
