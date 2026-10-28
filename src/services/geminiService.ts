import { GoogleGenAI } from '@google/genai';
import { AiConceptReport } from '../types/workflow';

export interface GenerateConceptParams {
  brandName: string;
  story: string;
  style: string;
  colorPalette: string;
  symbols: string;
  targetMarket: string;
  jarType: string;
  hasHoney: boolean;
  material: string;
}

/**
 * Builds high-quality domain fallback data for Estudio Hexagonal & Agronext.
 */
export function getFallbackConcept(params: GenerateConceptParams): AiConceptReport {
  const {
    brandName = 'Miel San Isidro',
    story = 'Herencia apícola de 3 generaciones en la sierra',
    style = 'Artesanal y Botánico',
    colorPalette = 'Oro Cálido & Ámbar Tostado',
    symbols = 'Abeja reina, pencas silvestres, panal hexagonal',
    targetMarket = 'Supermercados & Cadenas Comerciales (Walmart / City Market)',
    jarType = 'Tarro Hexagonal 500g',
    material = 'BOPP Mate Texturizado',
  } = params;

  return {
    tagline: `El néctar auténtico de nuestra tierra, cosechado con respeto y tradición.`,
    conceptJustification: `La identidad visual de ${brandName} fue estructurada bajo los principios de composición de Estudio Hexagonal. Se equilibró el valor de la herencia tradicional (${story}) con una estructura visual moderna y competitiva para posicionarse con solvencia ante compradores de ${targetMarket}. La arquitectura del diseño prioriza la pureza del producto mediante una jerarquía tipográfica limpia y contrastada.`,
    typographyRationale: `Se implementó una familia tipográfica de corte humanista en estilo ${style} para el logotipo de ${brandName}, dotándolo de nobleza y autenticidad botánica, complementada con una sans-serif geométrica para los textos legales y nutrimentales para garantizar legibilidad instantánea en anaquel según la norma NOM-051.`,
    paletteRationale: `La paleta de ${colorPalette} crea un maridaje cromático directo con el tono dorado natural de la miel envasada en tu ${jarType}. Los toques contrastantes guían la mirada del consumidor al nombre de la marca y a los sellos de garantía artesanal.`,
    nom051Compliance: `Cumplimiento normativo estricto: De acuerdo con la modificación a la NOM-051-SCFI/SSA1-2010, la miel 100% pura de abeja sin azúcares añadidos cuenta con formulación de tabla nutrimental simplificada. Se previó el área frontal visible de 40% para denominación oficial ("Miel Pura de Abeja"), contenido neto en gramos y país de origen ("Hecho en México").`,
    promptEngineering: [
      {
        title: 'Prompt Frontal para Motor Gráfico',
        prompt: `Artisanal honey packaging design for ${brandName}, label mounted on ${jarType}, typography in ${style} style, botanical illustration of honeycombs, flora, and ${symbols}, golden stamp highlights, 8k product render, photorealistic lighting.`,
      },
      {
        title: 'Prompt Escena Comercial en Anaquel',
        prompt: `Commercial retail shelf showcase featuring multiple jars of ${brandName} artisanal honey, clean wooden supermarket shelf, soft warm overhead grocery store lighting, macro depth of field.`,
      },
    ],
    technicalSpecs: {
      dimensionsMm: jarType.includes('1.3')
        ? '220 x 85 mm'
        : jarType.includes('Osito')
        ? '60 x 50 mm (óvalo)'
        : '190 x 62 mm',
      resolution: '300 DPI CMYK curvas vectorizadas',
      substrate: material || 'BOPP con barniz de sobreimpresión mate o Kraft texturizado',
      printMethod: 'Flexografía HD / Prensa Digital Indigo',
      specialFinishes: 'Hot stamping oro o serigrafía con relieve táctil',
    },
  };
}

/**
 * Direct client-side generation using @google/genai and VITE_GEMINI_API_KEY.
 * Falls back to domain heuristic report if key is not provided or request fails.
 */
export async function generateConceptReport(
  params: GenerateConceptParams
): Promise<AiConceptReport> {
  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY ||
    (typeof process !== 'undefined' && process.env ? process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY : undefined);

  if (!apiKey) {
    // Return domain fallback immediately if no API key is present
    return getFallbackConcept(params);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Eres el director de arte y especialista regulatorio de Estudio Hexagonal y Central Mieles Mexicanas (Grupo Global Agronext Ventures).
Elabora un "Reporte de Justificación Conceptual y Ficha Técnica de Impresión" para el cliente que solicitó diseño de etiqueta de miel.

DATOS DEL CLIENTE:
- Nombre de la marca: "${params.brandName}"
- Historia familiar/esencia: "${params.story}"
- Estilo gráfico deseado: "${params.style}"
- Paleta de color: "${params.colorPalette}"
- Símbolos requeridos: "${params.symbols}"
- Mercado meta / Visión futura: "${params.targetMarket}"
- Envase seleccionado: "${params.jarType}"
- Incluye miel pura: ${params.hasHoney ? 'Sí' : 'No'}
- Soporte de impresión: "${params.material}"

Devuelve ÚNICAMENTE un objeto JSON válido con esta estructura exacta (sin markdown extra):
{
  "tagline": "lema comercial breve y memorable de la marca",
  "conceptJustification": "explicación clara y convincente de 2 a 3 párrafos de por qué se eligieron esas formas y jerarquías",
  "typographyRationale": "análisis de por qué la tipografía elegida comunica confianza artesanal y alta legibilidad",
  "paletteRationale": "fundamentación psicológica y comercial de la paleta seleccionada",
  "nom051Compliance": "diagnóstico técnico para cumplimiento NOM-051 (sellos de advertencia, leyenda de contenido neto en masa escurrida, tabla nutrimental obligatoria para miel en México)",
  "promptEngineering": [
    { "title": "Prompt Principal de Etiqueta Frontal", "prompt": "texto en inglés para render fotorrealista" },
    { "title": "Prompt Mockup de Producto en Anaquel", "prompt": "texto en inglés para visualización comercial" }
  ],
  "technicalSpecs": {
    "dimensionsMm": "190 x 62 mm",
    "resolution": "300 DPI vectorizado",
    "substrate": "BOPP con barniz de sobreimpresión mate o Kraft texturizado",
    "printMethod": "Flexografía HD / Prensa Digital Indigo",
    "specialFinishes": "Hot stamping oro o serigrafía con relieve táctil"
  }
}`;

    // Set a client timeout of 10 seconds to ensure the UI never hangs
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout de consulta Gemini')), 10000)
    );

    const callPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const aiResponse = await Promise.race([callPromise, timeoutPromise]);

    if (aiResponse && aiResponse.text) {
      const parsed = JSON.parse(aiResponse.text);
      if (parsed && parsed.tagline && parsed.conceptJustification) {
        return parsed as AiConceptReport;
      }
    }

    return getFallbackConcept(params);
  } catch (error) {
    console.warn('Direct Gemini generation fallback applied:', error);
    return getFallbackConcept(params);
  }
}
