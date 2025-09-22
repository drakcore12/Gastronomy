export type Hotspot = {
  id: string;
  x: number;
  y: number;
  label?: string; // <- ahora opcional
  cutId?: string;
  es: string;
  en: string;
  especie?:
    | 'res'
    | 'cerdo'
    | 'pollo'
    | 'cordero'
    | 'pavo'
    | 'cabra'
    | 'pescado';
};

export const HOTSPOTS_RES: Hotspot[] = [
  { id: 'head', en: 'Head', es: 'cabeza', x: 56, y: 42 },
  { id: 'tongue', en: 'Tongue', es: 'Lengua', x: 59, y: 57 },
  { id: 'cheek', en: 'Cheek', es: 'Cachete', x: 72.5, y: 45 },
  { id: 'neck', en: 'Neck', es: 'Cuello', x: 88, y: 45 },
  { id: 'chuck', en: 'Chuck', es: 'Espaldilla', x: 110, y: 50 },
  { id: 'brisket', en: 'Brisket', es: 'Pecho', x: 115, y: 90 },
  { id: 'fshank', en: 'Shank', es: 'Brazuelo', x: 125, y: 120 },
  { id: 'rib', en: 'Rib', es: 'Costilla', x: 145, y: 52 },
  { id: 'plate', en: 'Plate', es: 'Falda', x: 152, y: 90 },
  { id: 'shortloin', en: 'Short Loin', es: 'Lomo corto', x: 182, y: 65 },
  { id: 'flank', en: 'Flank', es: 'Vacío', x: 190, y: 95 },
  { id: 'sirloin', en: 'Sirloin', es: 'Solomillo', x: 222, y: 58.5 },
  { id: 'tender', en: 'Tenderloin', es: 'Lomo fino', x: 218, y: 45 },
  { id: 'topsir', en: 'Top Sirloin', es: 'Solomillo superior', x: 207, y: 35 },
  { id: 'bottomsir', en: 'Bottom Sirloin', es: 'Cuadril', x: 218, y: 77 },
  { id: 'round', en: 'Round', es: 'Posta / Pierna', x: 247, y: 65 },
  { id: 'oxtail', en: 'Oxtail', es: 'Rabo', x: 253, y: 35 },
  { id: 'rshank', en: 'Shank (rear)', es: 'Brazuelo trasero', x: 238, y: 115 },
];

export const HOTSPOTS_PIG: Hotspot[] = [
  { id: 'head', en: 'Head', es: 'Cabeza', x: 65, y: 88 },
  { id: 'clear_plate', en: 'Clear Plate', es: 'Cabeza', x: 110, y: 45 },
  { id: 'back_fat', en: 'Back Fat', es: 'Cabeza', x: 170, y: 40 },
  { id: 'ears', en: 'Ears', es: 'Orejas', x: 65, y: 70 },
  { id: 'jowl', en: 'Jowl', es: 'Papada', x: 85, y: 105 },
  { id: 'shoulder', en: 'Shoulder', es: 'Paleta', x: 115, y: 80 },
  { id: 'loin', en: 'Loin', es: 'Lomo', x: 166, y: 70 },
  { id: 'belly', en: 'Belly', es: 'Panceta', x: 170, y: 110 },
  { id: 'ham', en: 'Ham', es: 'Jamón', x: 225, y: 70 },
  { id: 'hocks_r', en: 'Hocks', es: 'Patas', x: 126, y: 130 },
  { id: 'hocks_b', en: 'Hocks', es: 'Patas', x: 236, y: 123 },
];

export const HOTSPOTS_CHICKEN: Hotspot[] = [
  { id: 'neck', en: 'Neck', es: 'Cuello', x: 110, y: 50 },
  { id: 'breast', en: 'Breast', es: 'Pechuga', x: 115, y: 95 },
  { id: 'back', en: 'Back', es: 'Espalda', x: 155, y: 67 },
  { id: 'wing', en: 'Wing', es: 'Ala', x: 160, y: 90 },
  { id: 'leg', en: 'Leg', es: 'Pierna', x: 160, y: 130 },
  { id: 'thigh', en: 'Thigh', es: 'Muslo', x: 185, y: 120 },
  { id: 'tail', en: 'Tail', es: 'Cola', x: 210, y: 80 },
];

export const HOTSPOTS_FISH: Hotspot[] = [
  { id: 'head', en: 'Head', es: 'Cabeza', x: 50, y: 90 },
  { id: 'kama', en: 'Kama', es: 'Collar', x: 80, y: 75 },
  { id: 'back_meat', en: 'Back Meat', es: 'Lomo', x: 140, y: 70 },
  { id: 'abdomen_meat', en: 'Abdomen Meat', es: 'Vientre', x: 130, y: 105 },
  { id: 'tail_meat', en: 'Tail Meat', es: 'Carne de cola', x: 195, y: 100 },
  { id: 'tail', en: 'Tail', es: 'Cola', x: 250, y: 90 },
];

export const HOTSPOTS_LAMB: Hotspot[] = [
  { id: 'head', en: 'Head', es: 'Cabeza', x: 88, y: 40 },
  { id: 'neck', en: 'Neck', es: 'Cuello', x: 105, y: 60 },
  { id: 'shoulder', en: 'Shoulder', es: 'Paleta', x: 120, y: 70 },
  { id: 'breast', en: 'Breast', es: 'Pecho', x: 140, y: 90 },
  { id: 'shank_f', en: 'Shank (Fore)', es: 'Jarrete delantero', x: 148, y: 112 },
  { id: 'rib', en: 'Rib', es: 'Costillar', x: 153, y: 62 },
  { id: 'loin', en: 'Loin', es: 'Lomo', x: 180, y: 65 },
  { id: 'flank', en: 'Flank', es: 'Falda', x: 185, y: 100 },
  { id: 'sirloin', en: 'Sirloin', es: 'Solomillo / Cadera', x: 195, y: 70 },
  { id: 'leg', en: 'Leg', es: 'Pierna', x: 225, y: 80 },
  { id: 'shank_b', en: 'Shank (Hind)', es: 'Jarrete trasero', x: 230, y: 120 },
];

export const HOTSPOTS_TURKEY = HOTSPOTS_RES;
export const HOTSPOTS_GOAT = HOTSPOTS_RES;



