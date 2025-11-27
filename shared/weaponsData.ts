export interface Weapon {
  id: string;
  name: string;
  namePt?: string;
  nameEn?: string;
  type: "Assault Rifle" | "Sniper" | "SMG" | "Shotgun" | "LMG" | "Marksman" | "Pistol";
  description: string;
  descriptionEn?: string;
  code: string;
  codePt?: string;
  codeEn?: string;
  image?: string;
  imagePt?: string;
  imageEn?: string;
  keywords?: string[];
}

export const weaponsData: Weapon[] = [
  // SNIPERS / FRANCO-ATIRADORES
  {
    id: "outlaw",
    name: "Outlaw",
    namePt: "Outlaw",
    nameEn: "Outlaw",
    type: "Sniper",
    description: "Franco-atirador rápido e preciso",
    descriptionEn: "Fast and precise sniper",
    code: "2A4C5H6A9C",
    codePt: "2A4C5H6A9C",
    codeEn: "2A4C5H6A9C",
    imagePt: "/attached_assets/1000004329.jpg",
    imageEn: "/attached_assets/1000004335.jpg",
    image: "/attached_assets/1000004329.jpg",
    keywords: ["outlaw", "sniper", "franco-atirador"]
  },
  {
    id: "koshka",
    name: "Koshka",
    namePt: "Koshka",
    nameEn: "Koshka",
    type: "Sniper",
    description: "Franco-atirador com grande poder de fogo",
    descriptionEn: "Sniper with great firepower",
    code: "2A4A5G6A9C",
    codePt: "2A4A5G6A9C",
    codeEn: "2A4A5G6A9C",
    imagePt: "/attached_assets/1000004330.jpg",
    imageEn: "/attached_assets/1000004336.jpg",
    image: "/attached_assets/1000004330.jpg",
    keywords: ["koshka", "sniper", "franco-atirador"]
  },
  {
    id: "three-line-rifle",
    name: "3-Line Rifle",
    namePt: "Fuzil de 3 Linhas",
    nameEn: "3-Line Rifle",
    type: "Sniper",
    description: "Franco-atirador versátil e eficaz",
    descriptionEn: "Versatile and effective sniper",
    code: "1E2A4B5F",
    codePt: "1E2A4B5F",
    codeEn: "1E2A4B5F",
    imagePt: "/attached_assets/1000004331.jpg",
    imageEn: "/attached_assets/1000004337.jpg",
    image: "/attached_assets/1000004331.jpg",
    keywords: ["fuzil", "3 linhas", "three line", "rifle", "sniper", "franco-atirador"]
  },
  {
    id: "locus",
    name: "Locus",
    namePt: "Locus",
    nameEn: "Locus",
    type: "Sniper",
    description: "Franco-atirador equilibrado e confiável",
    descriptionEn: "Balanced and reliable sniper",
    code: "2A4B5H8C9C",
    codePt: "2A4B5H8C9C",
    codeEn: "2A4B5H8C9C",
    imagePt: "/attached_assets/1000004332.jpg",
    imageEn: "/attached_assets/1000004339.jpg",
    image: "/attached_assets/1000004332.jpg",
    keywords: ["locus", "sniper", "franco-atirador"]
  },
  {
    id: "dlq33",
    name: "DL Q33",
    namePt: "DL Q33",
    nameEn: "DL Q33",
    type: "Sniper",
    description: "Franco-atirador de alto dano",
    descriptionEn: "High damage sniper",
    code: "2A4A5A6A8A",
    codePt: "2A4A5A6A8A",
    codeEn: "2A4A5A6A8A",
    imagePt: "/attached_assets/1000004333.jpg",
    imageEn: "/attached_assets/1000004340.jpg",
    image: "/attached_assets/1000004333.jpg",
    keywords: ["dlq", "dl q33", "dlq33", "sniper", "franco-atirador"]
  },
  {
    id: "lw3-tundra",
    name: "LW3-Tundra",
    namePt: "LW3-Tundra",
    nameEn: "LW3-Tundra",
    type: "Sniper",
    description: "Franco-atirador moderno e poderoso",
    descriptionEn: "Modern and powerful sniper",
    code: "1A2F5A8A9E",
    codePt: "1A2F5A8A9E",
    codeEn: "1A2F5A8A9E",
    imagePt: "/attached_assets/1000004334.jpg",
    imageEn: "/attached_assets/1000004338.jpg",
    image: "/attached_assets/1000004334.jpg",
    keywords: ["lw3", "tundra", "lw3-tundra", "sniper", "franco-atirador"]
  },

  // SMG / SUBMETRALHADORAS
  {
    id: "cx9",
    name: "CX-9",
    namePt: "CX-9",
    nameEn: "CX-9",
    type: "SMG",
    description: "Submetralhadora rápida e ágil",
    descriptionEn: "Fast and agile submachine gun",
    code: "1A2B4C8B9A",
    codePt: "1A2B4C8B9A",
    codeEn: "1A2B4C8B9A",
    imagePt: "/attached_assets/1000004501.jpg",
    imageEn: "/attached_assets/1000004508.jpg",
    image: "/attached_assets/1000004501.jpg",
    keywords: ["cx9", "cx-9", "smt", "smg", "submetralhadora"]
  },
  {
    id: "vmp",
    name: "VMP",
    namePt: "VMP",
    nameEn: "VMP",
    type: "SMG",
    description: "Submetralhadora com taxa de fogo alta",
    descriptionEn: "Submachine gun with high fire rate",
    code: "2D4C5H8A9C",
    codePt: "2D4C5H8A9C",
    codeEn: "2D4C5H8A9C",
    imagePt: "/attached_assets/1000004503.jpg",
    imageEn: "/attached_assets/1000004510.jpg",
    image: "/attached_assets/1000004503.jpg",
    keywords: ["vmp", "smt", "smg", "submetralhadora"]
  },
  {
    id: "switchblade-x9",
    name: "Switchblade X9",
    namePt: "Switchblade X9",
    nameEn: "Switchblade X9",
    type: "SMG",
    description: "Submetralhadora compacta e mortífera",
    descriptionEn: "Compact and deadly submachine gun",
    code: "1A2C4C8A9A",
    codePt: "1A2C4C8A9A",
    codeEn: "1A2C4C8A9A",
    imagePt: "/attached_assets/1000004505.jpg",
    imageEn: "/attached_assets/1000004512.jpg",
    image: "/attached_assets/1000004505.jpg",
    keywords: ["switchblade", "x9", "smt", "smg", "submetralhadora"]
  },
  {
    id: "mx9",
    name: "MX9",
    namePt: "MX9",
    nameEn: "MX9",
    type: "SMG",
    description: "Submetralhadora versátil para combate próximo",
    descriptionEn: "Versatile submachine gun for close combat",
    code: "1B2A4D6C8B",
    codePt: "1B2A4D6C8B",
    codeEn: "1B2A4D6C8B",
    imagePt: "/attached_assets/1000004519.jpg",
    imageEn: "/attached_assets/1000004515.jpg",
    image: "/attached_assets/1000004519.jpg",
    keywords: ["mx9", "mx-9", "smt", "smg", "submetralhadora"]
  },

  // ASSAULT / ASSALTO
  {
    id: "type19",
    name: "Type 19",
    namePt: "Type 19",
    nameEn: "Type 19",
    type: "Assault Rifle",
    description: "Rifle de assalto equilibrado",
    descriptionEn: "Balanced assault rifle",
    code: "1D4A7B8B9C",
    codePt: "1D4A7B8B9C",
    codeEn: "1D4A7B8B9C",
    imagePt: "/attached_assets/1000004502.jpg",
    imageEn: "/attached_assets/1000004509.jpg",
    image: "/attached_assets/1000004502.jpg",
    keywords: ["type19", "type 19", "assalto", "assault", "rifle"]
  },
  {
    id: "xm4",
    name: "XM4",
    namePt: "XM4",
    nameEn: "XM4",
    type: "Assault Rifle",
    description: "Rifle de assalto com baixo recuo",
    descriptionEn: "Assault rifle with low recoil",
    code: "1A2G4A7C8D",
    codePt: "1A2G4A7C8D",
    codeEn: "1A2G4A7C8D",
    imagePt: "/attached_assets/1000004504.jpg",
    imageEn: "/attached_assets/1000004511.jpg",
    image: "/attached_assets/1000004504.jpg",
    keywords: ["xm4", "xm-4", "assalto", "assault", "rifle"]
  },
  {
    id: "drh",
    name: "DR-H",
    namePt: "DR-H",
    nameEn: "DR-H",
    type: "Assault Rifle",
    description: "Rifle de assalto poderoso",
    descriptionEn: "Powerful assault rifle",
    code: "1A2B4A8C9A",
    codePt: "1A2B4A8C9A",
    codeEn: "1A2B4A8C9A",
    imagePt: "/attached_assets/1000004506.jpg",
    imageEn: "/attached_assets/1000004513.jpg",
    image: "/attached_assets/1000004506.jpg",
    keywords: ["drh", "dr-h", "assalto", "assault", "rifle"]
  },
  {
    id: "oden",
    name: "Oden",
    namePt: "Oden",
    nameEn: "Oden",
    type: "Assault Rifle",
    description: "Rifle de assalto de alto dano",
    descriptionEn: "High damage assault rifle",
    code: "1A4A5A7C9A",
    codePt: "1A4A5A7C9A",
    codeEn: "1A4A5A7C9A",
    imagePt: "/attached_assets/1000004521.jpg",
    imageEn: "/attached_assets/1000004517.jpg",
    image: "/attached_assets/1000004521.jpg",
    keywords: ["oden", "assalto", "assault", "rifle"]
  },

  // SHOTGUN / ESCOPETA
  {
    id: "hs0405",
    name: "HS0405",
    namePt: "HS0405",
    nameEn: "HS0405",
    type: "Shotgun",
    description: "Escopeta com alta mobilidade",
    descriptionEn: "Shotgun with high mobility",
    code: "1F2A4A5E6A",
    codePt: "1F2A4A5E6A",
    codeEn: "1F2A4A5E6A",
    imagePt: "/attached_assets/1000004507.jpg",
    imageEn: "/attached_assets/1000004514.jpg",
    image: "/attached_assets/1000004507.jpg",
    keywords: ["hs0405", "hs", "escopeta", "shotgun"]
  },
  {
    id: "by15",
    name: "BY15",
    namePt: "BY15",
    nameEn: "BY15",
    type: "Shotgun",
    description: "Escopeta de disparo rápido",
    descriptionEn: "Fast-firing shotgun",
    code: "1C2A3A4A8B",
    codePt: "1C2A3A4A8B",
    codeEn: "1C2A3A4A8B",
    imagePt: "/attached_assets/1000004520.jpg",
    imageEn: "/attached_assets/1000004516.jpg",
    image: "/attached_assets/1000004520.jpg",
    keywords: ["by15", "by", "escopeta", "shotgun"]
  },

  // MARKSMAN / ATIRADOR
  {
    id: "type63",
    name: "Type 63",
    namePt: "Type 63",
    nameEn: "Type 63",
    type: "Marksman",
    description: "Rifle de precisão de médio alcance",
    descriptionEn: "Medium-range precision rifle",
    code: "1C2B4A7E9F",
    codePt: "1C2B4A7E9F",
    codeEn: "1C2B4A7E9F",
    imagePt: "/attached_assets/1000004522.jpg",
    imageEn: "/attached_assets/1000004518.jpg",
    image: "/attached_assets/1000004522.jpg",
    keywords: ["type63", "type 63", "atirador", "marksman"]
  }
];
