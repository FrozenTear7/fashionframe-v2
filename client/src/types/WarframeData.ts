export interface WarframeData {
  armAttachments: string[];
  chestAttachments: string[];
  colorPickers: { [colorPicker: string]: string[] };
  ephemeras: string[];
  frames: string[];
  helmets: { [frame: string]: string[] };
  legAttachments: string[];
  skins: { [frame: string]: string[] };
  syandanas: string[];
}
