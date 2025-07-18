import { create } from "zustand";

export type PlantScanStatus =
  | "ready"
  | "capturing"
  | "loading"
  | "success"
  | "error";

type IPlantInfo = {
  name: string;
};

interface PlantScanState {
  status: PlantScanStatus;
  plantRecognized: IPlantInfo | null;
  setStatus: (status: PlantScanStatus) => void;
  setPlant: (plant: IPlantInfo) => void;
  reset: () => void;
}

const usePlantScan = create<PlantScanState>((set) => ({
  status: "ready",
  plantRecognized: null,
  setStatus: (status) => set({ status }),
  reset: () => set({ status: "ready" }),
  setPlant: (plant: IPlantInfo) => set({ plantRecognized: plant }),
}));

export default usePlantScan;
