import { JarPackaging, BriefingData, HelpModalContent, LabelFinishType } from '../types/workflow';

// Asset imports for production bundler
import heroImg from '../assets/images/hero-honey.jpg';
import jarHexagonalImg from '../assets/images/jar-hexagonal.jpg';
import jarMieleroImg from '../assets/images/jar-mielero.jpg';
import jarOsitoImg from '../assets/images/jar-osito.jpg';
import labelMockupImg from '../assets/images/label-mockup.jpg';
import apiaryHarvestImg from '../assets/images/apiary-harvest.jpg';
import beforeAfterImg from '../assets/images/before-after-honey.jpg';
import artisanProductsImg from '../assets/images/artisan-products.jpg';
import labelMaterialsImg from '../assets/images/label-materials.jpg';

export const IMAGES = {
  hero: heroImg,
  jarHexagonal: jarHexagonalImg,
  jarMielero: jarMieleroImg,
  jarOsito: jarOsitoImg,
  labelMockup: labelMockupImg,
  apiaryHarvest: apiaryHarvestImg,
  beforeAfter: beforeAfterImg,
  artisanProducts: artisanProductsImg,
  labelMaterials: labelMaterialsImg,
};

export const PACKAGING_OPTIONS: JarPackaging[] = [
  {
    id: 'jar-hexagonal-500g',
    name: 'Tarro Hexagonal 500g',
    capacity: '500 g / 370 ml',
    material: 'Vidrio Grado Alimenticio',
    unitPrice: 14.5,
    honeyCapacityKg: 0.5,
    honeyCost: 55.0,
    minOrder: 12,
    image: IMAGES.jarHexagonal,
    description: 'Vidrio facetado con tapa dorada. El favorito para tiendas gourmet y regalo.',
    dieCutDimensions: '190 x 62 mm',
    idealFor: 'Tiendas artesanales y autoservicio.',
  },
  {
    id: 'jar-mielero-1300g',
    name: 'Tarro Mielero 1.3 kg',
    capacity: '1.3 kg / 1,000 ml',
    material: 'Vidrio Grado Alimenticio',
    unitPrice: 22.0,
    honeyCapacityKg: 1.3,
    honeyCost: 140.0,
    minOrder: 12,
    image: IMAGES.jarMielero,
    description: 'Frasco tradicional de boca ancha. Ideal para consumo familiar y mayoreo.',
    dieCutDimensions: '220 x 85 mm',
    idealFor: 'Consumo familiar y venta directa.',
  },
  {
    id: 'jar-osito-pet-340g',
    name: 'Osito Squeeze PET 340g',
    capacity: '340 g / 250 ml',
    material: 'PET Virgen Libre de BPA',
    unitPrice: 9.8,
    honeyCapacityKg: 0.34,
    honeyCost: 38.0,
    minOrder: 24,
    image: IMAGES.jarOsito,
    description: 'Práctico con tapa antigoteo. No se quiebra y encanta a chicos y grandes.',
    dieCutDimensions: '60 x 52 mm',
    idealFor: 'Desayunos, mesas y cafeterías.',
  },
];

export const LABEL_FINISH_CARDS: Array<{
  id: LabelFinishType;
  shortName: string;
  tagline: string;
  description: string;
  bestFor: string;
  modalKey: string;
}> = [
  {
    id: 'Plástico impermeable (resistente al agua y miel)',
    shortName: 'Plástico Resistente al Agua',
    tagline: 'No se despega, no se mancha',
    description: 'Material plástico mate. Si se escurre miel o metes el frasco al refrigerador, la tinta no se corre ni se arruga.',
    bestFor: 'Recomendado para miel, salsas, mezcal y botellas.',
    modalKey: 'material_plastic',
  },
  {
    id: 'Papel Kraft rústico (artesanal y ecológico)',
    shortName: 'Papel Kraft Rústico',
    tagline: 'Aspecto 100% natural',
    description: 'Papel café con textura de fibra natural. Da una apariencia rústica, campirana y ecológica de inmediato.',
    bestFor: 'Café de grano, jabones artesanales, miel de monte.',
    modalKey: 'material_kraft',
  },
  {
    id: 'Papel brillante con barniz (colores vivos)',
    shortName: 'Papel Brillante con Barniz',
    tagline: 'Colores intensos y nítidos',
    description: 'Papel blanco brillante con barniz protector. Hace que las fotos de frutas y los colores resalten con brillo en anaquel.',
    bestFor: 'Mermeladas, botanas y productos comerciales.',
    modalKey: 'material_gloss',
  },
];

export const HELP_MODALS: Record<string, HelpModalContent> = {
  material_plastic: {
    id: 'material_plastic',
    title: 'Plástico Impermeable (Resistente al Agua y Miel)',
    subtitle: 'El material más duradero para frascos y botellas',
    image: IMAGES.labelMaterials,
    description: 'Es una película plástica especial autoadhesiva. No es papel común: resiste humedad, refrigeración y si se escurre miel o salsa, solo pasas un trapo húmedo y la etiqueta queda intacta sin perder color.',
    recommendation: 'Recomendado si tus clientes guardan el producto en la cocina, refrigerador o lo transportan seguido.',
    highlights: [
      'No se despega con agua ni grasa',
      'No se rompe al frotar',
      'Tinta sellada que no se corre',
    ],
  },
  material_kraft: {
    id: 'material_kraft',
    title: 'Papel Kraft Rústico Ecológico',
    subtitle: 'Textura cálida y artesanal',
    image: IMAGES.labelMaterials,
    description: 'Papel elaborado con fibras naturales color café trigo. Al tocarlo se siente la textura orgánica del campo, ideal para marcas que quieren resaltar que su producto es 100% natural y sin conservadores.',
    recommendation: 'Excelente para café molido, jabones artesanales, miel de floración silvestre y productos botánicos.',
    highlights: [
      'Aspecto artesanal inconfundible',
      'Fibra natural ecológica',
      'Se ve elegante con tintas negras y doradas',
    ],
  },
  material_gloss: {
    id: 'material_gloss',
    title: 'Papel Brillante con Barniz Protector',
    subtitle: 'Máximo brillo e impacto visual',
    image: IMAGES.labelMaterials,
    description: 'Papel blanco de alta blancura cubierto con una capa de barniz brillante. Los colores se ven vivos, intensos y las letras pequeñas se leen con total nitidez.',
    recommendation: 'Ideal para anaqueles con iluminación directa donde quieres que tu etiqueta llame la atención de lejos.',
    highlights: [
      'Brillo llamativo tipo revista',
      'Letras pequeñas y sellos muy nítidos',
      'Económico y de excelente calidad',
    ],
  },
  jar_hexagonal: {
    id: 'jar_hexagonal',
    title: 'Tarro Hexagonal 500g (Vidrio)',
    subtitle: 'El favorito de las tiendas gourmet',
    image: IMAGES.jarHexagonal,
    description: 'Frasco de vidrio grueso con 6 caras facetadas y tapa dorada hermética. Su geometría hace que la miel brille como ámbar cuando le da la luz del sol.',
    recommendation: 'Es el frasco que más valor percibido da para regalos y tiendas especializadas.',
    highlights: [
      'Vidrio grado alimenticio grueso',
      'Tapa de corona dorada hermética',
      'Capacidad: 500 gramos de miel',
    ],
  },
  jar_mielero: {
    id: 'jar_mielero',
    title: 'Tarro Mielero Tradicional 1.3 kg',
    subtitle: 'El tamaño familiar por excelencia',
    image: IMAGES.jarMielero,
    description: 'Frasco clásico de 1.3 kg con boca ancha. Permite meter fácilmente una cuchara o mielero de madera sin escurrir.',
    recommendation: 'Ideal para clientes recurrentes que consumen miel todos los días en el desayuno o té.',
    highlights: [
      'Gran capacidad (1.3 kg / 1 litro)',
      'Boca ancha fácil de servir',
      'Económico por kilo para el comprador',
    ],
  },
  jar_osito: {
    id: 'jar_osito',
    title: 'Osito Squeeze PET 340g',
    subtitle: 'Práctico, irrompible y divertido',
    image: IMAGES.jarOsito,
    description: 'Envase flexible de plástico PET transparente con forma de osito y tapa amarilla con válvula de silicona antigoteo. Al apretarlo sale la miel y se corta sin manchar.',
    recommendation: 'El consentido de los niños y cafeterías. No se quiebra si se cae al piso.',
    highlights: [
      'Válvula antigoteo que no ensucia',
      'Plástico virgen libre de BPA',
      'Fácil de usar en la mesa',
    ],
  },
  artisan_products: {
    id: 'artisan_products',
    title: 'Etiquetas para Otros Productos del Campo',
    subtitle: 'Salsas, Café, Mezcal, Jabones y más',
    image: IMAGES.artisanProducts,
    description: 'No solo hacemos miel: apoyamos a productores de salsas machas, tostadores de café, maestros mezcaleros y artesanas de jabón botánico. Diseñamos etiquetas a la medida de tu frasco o bolsa con los sellos que pide la tienda.',
    recommendation: 'Dinos qué producto elaboras y te entregamos la etiqueta con las medidas y papel que mejor le va.',
    highlights: [
      'Etiquetas para botellas de mezcal y licores',
      'Etiquetas para frascos de salsas y mermeladas',
      'Etiquetas para bolsas de café y jabones',
    ],
  },
};

export const INITIAL_BRIEFING: BriefingData = {
  brandName: 'Apiario Luna Real',
  producerName: 'Carlos Mendoza Garza',
  phoneWhatsapp: '+52 444 829 1102',
  originState: 'San Luis Potosí',
  productType: 'Miel 100% Pura de Abeja',
  storyHeritage: 'Empresa familiar apícola con más de 35 años cuidando colmenas en la Huasteca y el Altiplano potosino. Floración mezquite y azahar.',
  preferredSymbols: ['Abeja reina grabada', 'Panal hexagonal', 'Rama de mezquite floral'],
  typographicStyle: 'Rústico & Botánico',
  colorPalette: 'Oro Ámbar & Negro',
  futureVisionMarket: 'Supermercados nacionales (Walmart, HEB, Chedraui)',
  additionalNotes: 'Miel 100% cruda, no pasteurizada y con floración silvestre.',
};

export const SYMBOL_OPTIONS = [
  'Abeja reina grabada',
  'Panal hexagonal',
  'Rama de mezquite floral',
  'Sol del altiplano',
  'Gota de miel pura',
  'Sello familiar',
  'Flor de azahar',
  'Grabado botánico',
];

export const WORKFLOW_STAGES = [
  {
    id: 1,
    title: 'Inicio',
    subtitle: 'Menú principal',
    description: 'Miel, frascos, paquetes apícolas y etiquetas para tu producto.',
    badge: 'Paso 1',
  },
  {
    id: 2,
    title: 'Cotizador',
    subtitle: 'Precio en vivo',
    description: 'Elige tu envase, cantidad y material con fotos claras.',
    badge: 'Paso 2',
  },
  {
    id: 3,
    title: 'Tu Marca',
    subtitle: 'En 3 minutos',
    description: 'Elige el estilo visual de tu etiqueta con clics rápidos.',
    badge: 'Paso 3',
  },
  {
    id: 4,
    title: 'Pedido',
    subtitle: 'WhatsApp directo',
    description: 'Resumen a tu WhatsApp y apartado seguro de tu lote.',
    badge: 'Paso 4',
  },
  {
    id: 5,
    title: 'Taller',
    subtitle: 'Medidas exactas',
    description: 'Adaptamos tu etiqueta al troquel y normas oficiales.',
    badge: 'Paso 5',
  },
  {
    id: 6,
    title: 'Muestra 3D',
    subtitle: 'Visto Bueno',
    description: 'Revisa cómo lucirá tu frasco real y aprueba con tu firma.',
    badge: 'Paso 6',
  },
  {
    id: 7,
    title: 'Envío',
    subtitle: 'Listo para anaquel',
    description: 'Empacado protegido hasta tu dirección o taller SLP.',
    badge: 'Paso 7',
  },
  {
    id: 8,
    title: 'Reorden',
    subtitle: 'Siguiente cosecha',
    description: 'Vuelve a pedir etiquetas sin volver a pagar diseño.',
    badge: 'Paso 8',
  },
];
