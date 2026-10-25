import { create } from 'zustand';

export type ViewMode = 'FULL_HOUSE' | 'STRUCTURAL_PARTS' | 'BLUEPRINT_CAD';

export interface CalculatorState {
  projectType: 'FULL_HOUSE' | 'ROOF_MANSARD' | 'MASONRY_WALLS' | 'FOUNDATION' | 'BLUEPRINT_ONLY';
  areaM2: number;
  floors: number;
  materialType: 'red_brick' | 'sawed_stone' | 'aerated_concrete' | 'monolithic_concrete';
}

interface ConstructionStore {
  // 3D Viewport State
  viewMode: ViewMode;
  explosionFactor: number;        // 0.0 (tam yığılmış) to 1.0 (tam ayrılmış qatlar)
  brickAssemblyProgress: number;  // 0.0 to 1.0
  sunHour: number;                // 6.0 (dan yeri) to 22.0 (gecə fasad işıqları)
  activeStructuralNode: string | null;
  cameraFocus: 'overview' | 'foundation' | 'walls' | 'roof' | 'stairs';
  
  // Blueprint CAD State
  activeCadLayers: {
    masonry: boolean;
    foundation: boolean;
    roofTruss: boolean;
    rebarGrid: boolean;
    dimensions: boolean;
  };

  // Calculator State
  calculator: CalculatorState;

  // Lead / Night Assistant modal
  isNightAssistantOpen: boolean;
  isQuickQuoteOpen: boolean;

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setExplosionFactor: (val: number) => void;
  setBrickAssemblyProgress: (val: number) => void;
  setSunHour: (hour: number) => void;
  setActiveStructuralNode: (node: string | null) => void;
  setCameraFocus: (focus: 'overview' | 'foundation' | 'walls' | 'roof' | 'stairs') => void;
  toggleCadLayer: (layer: keyof ConstructionStore['activeCadLayers']) => void;
  setCalculator: (partial: Partial<CalculatorState>) => void;
  setIsNightAssistantOpen: (open: boolean) => void;
  setIsQuickQuoteOpen: (open: boolean) => void;
}

export const useConstructionStore = create<ConstructionStore>((set) => ({
  viewMode: 'FULL_HOUSE',
  explosionFactor: 0,
  brickAssemblyProgress: 0.8,
  sunHour: 14.5,
  activeStructuralNode: null,
  cameraFocus: 'overview',
  
  activeCadLayers: {
    masonry: true,
    foundation: true,
    roofTruss: false,
    rebarGrid: true,
    dimensions: true,
  },

  calculator: {
    projectType: 'FULL_HOUSE',
    areaM2: 160,
    floors: 1,
    materialType: 'red_brick',
  },

  isNightAssistantOpen: false,
  isQuickQuoteOpen: false,

  setViewMode: (viewMode) => set({ viewMode }),
  setExplosionFactor: (explosionFactor) => set({ explosionFactor }),
  setBrickAssemblyProgress: (brickAssemblyProgress) => set({ brickAssemblyProgress }),
  setSunHour: (sunHour) => set({ sunHour }),
  setActiveStructuralNode: (activeStructuralNode) => set({ activeStructuralNode }),
  setCameraFocus: (cameraFocus) => set({ cameraFocus }),
  toggleCadLayer: (layer) =>
    set((state) => ({
      activeCadLayers: {
        ...state.activeCadLayers,
        [layer]: !state.activeCadLayers[layer],
      },
    })),
  setCalculator: (partial) =>
    set((state) => ({
      calculator: { ...state.calculator, ...partial },
    })),
  setIsNightAssistantOpen: (isNightAssistantOpen) => set({ isNightAssistantOpen }),
  setIsQuickQuoteOpen: (isQuickQuoteOpen) => set({ isQuickQuoteOpen }),
}));
