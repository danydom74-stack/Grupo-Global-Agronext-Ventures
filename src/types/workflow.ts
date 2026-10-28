export type WorkflowStageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type EntryOption =
  | 'wholesale_honey'
  | 'jars_packaging'
  | 'full_pack'
  | 'artisan_custom_product'
  | 'label_design';

export type ProductCategory =
  | 'miel'
  | 'salsas'
  | 'cafe'
  | 'mezcal'
  | 'jabones'
  | 'otro';

export interface JarPackaging {
  id: string;
  name: string;
  capacity: string;
  material: 'Vidrio Grado Alimenticio' | 'PET Virgen Libre de BPA';
  unitPrice: number; // in MXN
  honeyCapacityKg: number;
  honeyCost: number; // cost to fill with pure honey
  minOrder: number;
  image: string;
  description: string;
  dieCutDimensions: string;
  idealFor: string;
}

export type LabelFinishType =
  | 'Plástico impermeable (resistente al agua y miel)'
  | 'Papel Kraft rústico (artesanal y ecológico)'
  | 'Papel brillante con barniz (colores vivos)';

export interface QuoteConfig {
  selectedJarId: string;
  quantity: number;
  includePureHoney: boolean;
  includeLabelDesign: boolean;
  printMaterial: LabelFinishType;
  deliveryMode: 'shipping' | 'workshop_slp';
  productCategory: ProductCategory;
}

export interface BriefingData {
  brandName: string;
  producerName: string;
  phoneWhatsapp: string;
  originState: string;
  productType: string;
  storyHeritage: string;
  preferredSymbols: string[];
  typographicStyle: 'Clásico & Serif' | 'Rústico & Botánico' | 'Moderno & Minimalista' | 'Heráldico Tradicional';
  colorPalette: 'Oro Ámbar & Negro' | 'Kraft Orgánico & Miel' | 'Verde Botánico & Ocre' | 'Terracota Cálido & Crema';
  futureVisionMarket: 'Mercados locales y ferias artesanales' | 'Tiendas gourmet y orgánicas' | 'Supermercados nacionales (Walmart, HEB, Chedraui)';
  additionalNotes: string;
}

export interface AiConceptReport {
  tagline: string;
  conceptJustification: string;
  typographyRationale: string;
  paletteRationale: string;
  nom051Compliance: string;
  promptEngineering: Array<{
    title: string;
    prompt: string;
  }>;
  technicalSpecs: {
    dimensionsMm: string;
    resolution: string;
    substrate: string;
    printMethod: string;
    specialFinishes: string;
  };
}

export interface HelpModalContent {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  description: string;
  recommendation?: string;
  highlights?: string[];
}
