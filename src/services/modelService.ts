import { ModelData, MODELS as INITIAL_MODELS } from "../data/models";

const STORAGE_KEY = "3d_vision_models";

const getStoredModels = (): ModelData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MODELS));
    return INITIAL_MODELS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_MODELS;
  }
};

export const fetchModels = async (): Promise<ModelData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getStoredModels();
};

export const addModel = async (model: ModelData): Promise<void> => {
  const models = getStoredModels();
  if (models.find(m => m.id === model.id)) {
    throw new Error("Model with this ID already exists");
  }
  models.unshift(model);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
};
