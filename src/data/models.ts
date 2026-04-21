export interface ModelData {
  id: string;
  title: string;
  category: 'Characters' | 'Props' | 'Environments' | 'Doodles' | 'Speedsculpts';
  thumbnail: string;
  modelUrl: string;
  polycount: string;
  software: string[];
  description: string;
  renderImages: string[];
}

export const MODELS: ModelData[] = [
  {
    id: 'astronaut',
    title: 'Space Explorer',
    category: 'Characters',
    thumbnail: 'https://picsum.photos/seed/astronaut/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    polycount: '45k Tris',
    software: ['ZBrush', 'Maya', 'Substance Painter'],
    description: 'Ein hochdetaillierter Astronaut für Sci-Fi Umgebungen. Fokus auf realistische Texturen und funktionale Rüstungsteile.',
    renderImages: [
      'https://picsum.photos/seed/astro1/1200/800',
      'https://picsum.photos/seed/astro2/1200/800',
      'https://picsum.photos/seed/astro3/1200/800'
    ]
  },
  {
    id: 'cyberpunk-crate',
    title: 'Cyberpunk Supply Crate',
    category: 'Props',
    thumbnail: 'https://picsum.photos/seed/crate/800/600',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    polycount: '12k Tris',
    software: ['Blender', 'Substance Painter'],
    description: 'Eine modulare Versorgungskiste mit emissiven Elementen und Abnutzungsspuren.',
    renderImages: [
      'https://picsum.photos/seed/crate1/1200/800',
      'https://picsum.photos/seed/crate2/1200/800'
    ]
  },
  {
    id: 'doodle-blob',
    title: 'Organic Blob Sculpt',
    category: 'Speedsculpts',
    thumbnail: 'https://picsum.photos/seed/blob/800/600',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
    polycount: '5k Tris',
    software: ['ZBrush'],
    description: 'Ein schneller organischer Sculpt, entstanden in einer 20-minütigen Mittagspause. Fokus auf Flow und Silhouette.',
    renderImages: [],
  },
  {
    id: 'sci-fi-corridor',
    title: 'Deep Space Corridor',
    category: 'Environments',
    thumbnail: 'https://picsum.photos/seed/corridor/800/600',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
    polycount: '85k Tris',
    software: ['Unreal Engine 5', 'Blender', 'Quixel Mixer'],
    description: 'Ein atmosphärischer Korridor eines verlassenen Raumschiffs. Fokus auf Lighting und Storytelling durch Details.',
    renderImages: [
      'https://picsum.photos/seed/env1/1200/800',
      'https://picsum.photos/seed/env2/1200/800'
    ]
  },
  {
    id: 'doodle-sword',
    title: 'Low Poly Blade',
    category: 'Speedsculpts',
    thumbnail: 'https://picsum.photos/seed/sword/800/600',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
    polycount: '800 Tris',
    software: ['Blender'],
    description: 'Ein minimalistisches Schwert-Design. Experiment mit extrem niedriger Polycount-Limitierung.',
    renderImages: [],
  },
  {
    id: 'robot-drone',
    title: 'Scout Drone X-1',
    category: 'Characters',
    thumbnail: 'https://picsum.photos/seed/drone/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    polycount: '28k Tris',
    software: ['Maya', 'Substance Painter', 'Marmoset'],
    description: 'Eine agile Aufklärungsdrohne mit animierten Gelenken und Sensoren.',
    renderImages: [
      'https://picsum.photos/seed/drone1/1200/800',
      'https://picsum.photos/seed/drone2/1200/800'
    ]
  }
];
