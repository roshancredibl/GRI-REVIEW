export interface SDGGoal {
  number: number;
  title: string;
  color?: string;
}

export interface GRISDGMapping {
  [key: string]: SDGGoal[];
}

export const SDG_GOALS: { [key: number]: SDGGoal } = {
  1: { number: 1, title: "No Poverty" },
  2: { number: 2, title: "Zero Hunger" },
  3: { number: 3, title: "Good Health and Well-being" },
  4: { number: 4, title: "Quality Education" },
  5: { number: 5, title: "Gender Equality" },
  6: { number: 6, title: "Clean Water and Sanitation" },
  7: { number: 7, title: "Affordable and Clean Energy" },
  8: { number: 8, title: "Decent Work and Economic Growth" },
  9: { number: 9, title: "Industry, Innovation and Infrastructure" },
  10: { number: 10, title: "Reduced Inequalities" },
  11: { number: 11, title: "Sustainable Cities and Communities" },
  12: { number: 12, title: "Responsible Consumption and Production" },
  13: { number: 13, title: "Climate Action" },
  14: { number: 14, title: "Life Below Water" },
  15: { number: 15, title: "Life on Land" },
  16: { number: 16, title: "Peace, Justice and Strong Institutions" },
  17: { number: 17, title: "Partnerships for the Goals" }
};

export const GRI_SDG_MAPPINGS: GRISDGMapping = {
  // Universal Standards
  "GRI2": [SDG_GOALS[8], SDG_GOALS[16], SDG_GOALS[17]],
  "GRI3": [SDG_GOALS[12], SDG_GOALS[13], SDG_GOALS[14], SDG_GOALS[15]],

  // Topic Standards - Economic/Governance
  "GRI201": [SDG_GOALS[8], SDG_GOALS[9], SDG_GOALS[17]],
  "GRI202": [SDG_GOALS[1], SDG_GOALS[8], SDG_GOALS[10]],
  "GRI203": [SDG_GOALS[1], SDG_GOALS[8], SDG_GOALS[9], SDG_GOALS[11]],
  "GRI204": [SDG_GOALS[8], SDG_GOALS[12], SDG_GOALS[17]],
  "GRI205": [SDG_GOALS[16], SDG_GOALS[17]],
  "GRI206": [SDG_GOALS[8], SDG_GOALS[16]],
  "GRI207": [SDG_GOALS[1], SDG_GOALS[8], SDG_GOALS[10], SDG_GOALS[17]],

  // Topic Standards - Environmental
  "GRI101": [SDG_GOALS[14], SDG_GOALS[15]],
  "GRI102": [SDG_GOALS[13], SDG_GOALS[14], SDG_GOALS[15]],
  "GRI103": [SDG_GOALS[7], SDG_GOALS[12], SDG_GOALS[13]],
  "GRI301": [SDG_GOALS[12], SDG_GOALS[13], SDG_GOALS[15]],
  "GRI302": [SDG_GOALS[7], SDG_GOALS[12], SDG_GOALS[13]],
  "GRI303": [SDG_GOALS[6], SDG_GOALS[12], SDG_GOALS[14], SDG_GOALS[15]],
  "GRI304": [SDG_GOALS[14], SDG_GOALS[15]],
  "GRI305": [SDG_GOALS[3], SDG_GOALS[12], SDG_GOALS[13], SDG_GOALS[14], SDG_GOALS[15]],
  "GRI306": [SDG_GOALS[3], SDG_GOALS[6], SDG_GOALS[11], SDG_GOALS[12], SDG_GOALS[14], SDG_GOALS[15]],
  "GRI308": [SDG_GOALS[12], SDG_GOALS[13], SDG_GOALS[14], SDG_GOALS[15], SDG_GOALS[17]],

  // Topic Standards - Social
  "GRI401": [SDG_GOALS[5], SDG_GOALS[8], SDG_GOALS[10]],
  "GRI402": [SDG_GOALS[8], SDG_GOALS[16]],
  "GRI403": [SDG_GOALS[3], SDG_GOALS[8]],
  "GRI404": [SDG_GOALS[4], SDG_GOALS[5], SDG_GOALS[8], SDG_GOALS[10]],
  "GRI405": [SDG_GOALS[5], SDG_GOALS[8], SDG_GOALS[10]],
  "GRI406": [SDG_GOALS[5], SDG_GOALS[8], SDG_GOALS[10], SDG_GOALS[16]],
  "GRI407": [SDG_GOALS[8], SDG_GOALS[16]],
  "GRI408": [SDG_GOALS[1], SDG_GOALS[8], SDG_GOALS[16]],
  "GRI409": [SDG_GOALS[8], SDG_GOALS[16]],
  "GRI410": [SDG_GOALS[16]],
  "GRI411": [SDG_GOALS[1], SDG_GOALS[2], SDG_GOALS[10], SDG_GOALS[15], SDG_GOALS[16]],
  "GRI414": [SDG_GOALS[1], SDG_GOALS[5], SDG_GOALS[8], SDG_GOALS[16]],
  "GRI415": [SDG_GOALS[16]],
  "GRI416": [SDG_GOALS[3], SDG_GOALS[12]],
  "GRI417": [SDG_GOALS[12], SDG_GOALS[16]],
  "GRI418": [SDG_GOALS[16]],

  // Sector Standards
  "GRI11": [SDG_GOALS[6], SDG_GOALS[7], SDG_GOALS[13], SDG_GOALS[14], SDG_GOALS[15]],
  "GRI12": [SDG_GOALS[3], SDG_GOALS[7], SDG_GOALS[13], SDG_GOALS[15]],
  "GRI13": [SDG_GOALS[2], SDG_GOALS[6], SDG_GOALS[14], SDG_GOALS[15]],
  "GRI14": [SDG_GOALS[3], SDG_GOALS[6], SDG_GOALS[12], SDG_GOALS[15]]
};

export const getSDGsForGRI = (griStandard: string): SDGGoal[] => {
  // Extract the GRI number from various formats (e.g., "GRI201", "GRI 201", "201")
  const griKey = griStandard.replace(/[\s\-:]/g, '').toUpperCase();
  
  // Try exact match first
  if (GRI_SDG_MAPPINGS[griKey]) {
    return GRI_SDG_MAPPINGS[griKey];
  }
  
  // Try with GRI prefix if not present
  const griWithPrefix = griKey.startsWith('GRI') ? griKey : `GRI${griKey}`;
  if (GRI_SDG_MAPPINGS[griWithPrefix]) {
    return GRI_SDG_MAPPINGS[griWithPrefix];
  }
  
  // Default fallback
  return [SDG_GOALS[12], SDG_GOALS[17]];
};
