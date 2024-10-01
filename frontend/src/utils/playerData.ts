// Class Info: Mapping class IDs to class names and colors
export const classInfo: { [key: number]: { name: string; color: string } } = {
  1: { name: 'Warrior', color: '#C69B6D' },
  2: { name: 'Paladin', color: '#F48CBA' },
  3: { name: 'Hunter', color: '#AAD372' },
  4: { name: 'Rogue', color: '#FFF468' },
  5: { name: 'Priest', color: '#FFFFFF' },
  6: { name: 'Death Knight', color: '#C41E3A' },
  7: { name: 'Shaman', color: '#0070DD' },
  8: { name: 'Mage', color: '#3FC7EB' },
  9: { name: 'Warlock', color: '#8788EE' },
  11: { name: 'Druid', color: '#FF7C0A' },
};

// Race-to-Faction Mapping
export const raceFactionMap: { [key: number]: string } = {
  1: 'Alliance',  // Human
  3: 'Alliance',  // Dwarf
  4: 'Alliance',  // Night Elf
  7: 'Alliance',  // Gnome
  11: 'Alliance', // Draenei
  2: 'Horde',     // Orc
  5: 'Horde',     // Undead
  6: 'Horde',     // Tauren
  8: 'Horde',     // Troll
  10: 'Horde',    // Blood Elf
};

// Race Info (Map race IDs to names)
export const raceInfo: { [key: number]: string } = {
  1: 'human',
  2: 'orc',
  3: 'dwarf',
  4: 'nightelf',
  5: 'undead',
  6: 'tauren',
  7: 'gnome',
  8: 'troll',
  10: 'bloodelf',
  11: 'draenei',
};

// Gender Mapping
export const genderInfo: { [key: number]: string } = {
  0: 'male',   // 0 is male
  1: 'female', // 1 is female
};

// Faction Image Paths
export const factionImages: { [key: string]: string } = {
  'Alliance': '/assets/factions/alliance.jpg',
  'Horde': '/assets/factions/horde.jpg',
};

// Helper function to get the race/gender image path
export const getRaceGenderImage = (race: number, gender: number): string => {
  const raceName = raceInfo[race] || 'unknown';
  const genderName = genderInfo[gender] || 'unknown';
  return `/assets/races/achievement_character_${raceName}_${genderName}.jpg`;
};

// Helper function to get the class image path
export const getClassImage = (classId: number): string => {
  const className = classInfo[classId]?.name.toLowerCase().replace(' ', '') || 'unknown';
  return `/assets/classes/classicon_${className}.jpg`;
};
