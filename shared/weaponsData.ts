export interface Weapon {
  id: string;
  name: string;
  type: "Assault Rifle" | "Sniper" | "SMG" | "Shotgun" | "LMG" | "Marksman" | "Pistol";
  description: string;
  code: string;
  image?: string;
}

export const weaponsData: Weapon[] = [
  {
    id: "xm4",
    name: "XM4",
    type: "Assault Rifle",
    description: "Rifle de assalto equilibrado com bom controle de recuo",
    code: "XM4-SLXCODM",
    image: "/attached_assets/weapon_xm4.jpg"
  },
  {
    id: "ak74",
    name: "AK-74",
    type: "Assault Rifle",
    description: "Rifle de alto dano com recuo significativo",
    code: "AK74-SLXCODM",
    image: "/attached_assets/weapon_ak74.jpg"
  },
  {
    id: "lw3a1",
    name: "LW3A1 Frostline",
    type: "Sniper",
    description: "Sniper de um tiro com alcance máximo",
    code: "LW3A1-SLXCODM",
    image: "/attached_assets/weapon_lw3a1.jpg"
  },
  {
    id: "lc10",
    name: "LC10",
    type: "SMG",
    description: "SMG rápida com excelente TTK",
    code: "LC10-SLXCODM",
    image: "/attached_assets/weapon_lc10.jpg"
  },
  {
    id: "marine_sp",
    name: "Marine SP",
    type: "Shotgun",
    description: "Shotgun confiável para combate próximo",
    code: "MARINESP-SLXCODM",
    image: "/attached_assets/weapon_marinesp.jpg"
  },
  {
    id: "gpmg7",
    name: "GPMG-7",
    type: "LMG",
    description: "LMG com grande capacidade de munição",
    code: "GPMG7-SLXCODM",
    image: "/attached_assets/weapon_gpmg7.jpg"
  },
  {
    id: "xpr50",
    name: "XPR-50",
    type: "Marksman",
    description: "Rifle marksman com bom alcance e dano",
    code: "XPR50-SLXCODM",
    image: "/attached_assets/weapon_xpr50.jpg"
  },
  {
    id: "mw23",
    name: "MW23",
    type: "Pistol",
    description: "Pistola secundária rápida",
    code: "MW23-SLXCODM",
    image: "/attached_assets/weapon_mw23.jpg"
  }
];
