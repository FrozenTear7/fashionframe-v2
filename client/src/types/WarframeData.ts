export interface ColorPickers {
  [colorPicker: string]: string[];
}

interface Helmets {
  [frame: string]: string[];
}

interface Skins {
  [frame: string]: string[];
}

export interface WarframeData {
  armAttachments: string[];
  chestAttachments: string[];
  colorPickers: ColorPickers;
  ephemeras: string[];
  frames: string[];
  helmets: Helmets;
  legAttachments: string[];
  skins: Skins;
  syandanas: string[];
}
