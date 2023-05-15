export interface ElementDTO {
  id: number;
  type: typeDTO;
  name: string;
  description: string;
  thumbnailFile: FileDTO;
  files: Array<FileDTO>;
  elements: Array<ElementDTO>;
  style: StyleDTO;
  position: number;
}

export interface ElementSaveDTO {
  typeId: string;
  name: string;
  position?: number;
  description?: string;
  thumbnailFile?: FileDTO;
  style?: StyleDTO;
}

export interface FileDTO {
  id: number;
  url: string;
  description: string;
}

export interface StyleDTO {
  bgColor?: string;
  fontColor?: string;
  fontFamily?: string;
}

export interface typeDTO {
  id: string;
  name: string;
  possibleChildren?: typeDTO[];
}
