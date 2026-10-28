# Grupo Global Agronext Ventures & Estudio Hexagonal

Plataforma unificada y automatizada de cotización, compra de miel pura, frascos de vidrio y diseño normado de etiquetas (NOM-051) para productores apícolas y artesanales.

---

## 📁 Estructura del Proyecto y Carpetas de Imágenes

```text
├── public/
│   └── images/               # Imágenes estáticas servidas en la raíz (/images/...)
│       ├── apiary-harvest.jpg
│       ├── artisan-products.jpg
│       ├── before-after-honey.jpg
│       ├── hero-honey.jpg
│       ├── jar-hexagonal.jpg
│       ├── jar-mielero.jpg
│       ├── jar-osito.jpg
│       ├── label-materials.jpg
│       └── label-mockup.jpg
├── src/
│   ├── assets/
│   │   └── images/           # Mismas imágenes procesadas por Vite con hash de caché
│   ├── components/           # Componentes modulares y etapas 1 a 8
│   │   ├── stages/           # Etapa 1 a 8 del flujo de cliente
│   │   ├── Header.tsx        # Cabecera institucional
│   │   └── HelpModal.tsx     # Modal interactivo de ayuda visual
│   ├── data/
│   │   └── mockData.ts       # Datos de productos, cotizaciones e import de imágenes
│   ├── types/
│   │   └── workflow.ts       # Tipos TypeScript del flujo
│   ├── App.tsx               # Componente principal
│   └── main.tsx              # Entrada React
├── server.ts                 # Servidor Express Full-Stack con API Gemini y Vite
├── render.yaml               # Configuración automática para Render.com
└── package.json              # Dependencias y scripts
```

---

## 🚀 Despliegue en Render (Render.com)

El proyecto incluye archivo de configuración `render.yaml` listo para despliegue automático.

### Configuración manual en Render (si no usas el blueprint):
1. **Tipo de Servicio**: Web Service (Node.js).
2. **Build Command**:
   ```bash
   npm install && npm run build
   ```
3. **Start Command**:
   ```bash
   npm start
   ```
4. **Variables de Entorno**:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: *(Opcional)* Clave de Google Gemini API para la generación asistida del concepto gráfico.

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Probar en modo producción local
NODE_ENV=production npm start
```
