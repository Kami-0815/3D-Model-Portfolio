# 3D Vision Portfolio

Ein modernes, interaktives Portfolio für 3D-Artists.

## Features
- **Interaktiver 3D-Viewer**: Nutzt Googles `<model-viewer>` für flüssige 3D-Darstellung im Browser.
- **Kategorisierte Galerie**: Filtere Modelle nach Charakteren, Props oder Umgebungen.
- **Detailseiten**: Technische Daten, Render-Galerie und Prozessbeschreibungen.
- **Responsive Design**: Optimiert für Mobile und Desktop mit Tailwind CSS.
- **Animationen**: Sanfte Übergänge mit Framer Motion.

## Eigene Modelle einbinden

Um deine eigenen Modelle hinzuzufügen, folge diesen Schritten:

1. **Datei vorbereiten**: Exportiere dein Modell als `.glb` (glTF Binary) Format. Dies ist das Standardformat für das Web.
2. **Datei hochladen**: Lege die `.glb` Datei in den `public/assets/models/` Ordner (oder nutze eine externe URL).
3. **Daten aktualisieren**: Öffne `src/data/models.ts` und füge ein neues Objekt zum `MODELS` Array hinzu:

```typescript
{
  id: 'mein-modell-id',
  title: 'Mein cooles Modell',
  category: 'Props',
  thumbnail: '/assets/images/thumbnail.jpg',
  modelUrl: '/assets/models/modell.glb',
  polycount: '15k Tris',
  software: ['Blender', 'Substance'],
  description: 'Beschreibung hier...',
  renderImages: ['/assets/images/render1.jpg']
}
```

## Technologien
- React 19
- Tailwind CSS 4
- Framer Motion
- Lucide React Icons
- Google Model Viewer

## Setup
1. `npm install`
2. `npm run dev`
