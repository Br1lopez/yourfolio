export interface ElementDTO {
    id: number;
    type: string;
    name: string;
    description: string;
    thumbnailFile: FileDTO;
    files: Array<FileDTO>;
    elements: Array<ElementDTO>;
    style: StyleDTO;
    position: number;
  }

  export interface ElementSaveDTO {
    type?: string;
    name?: string;
    position?: number;
    description?: string;
    thumbnailFile?: FileDTO;
  }
  
  export interface FileDTO {
    id: number;
    url: string;
    description: string;
  }
  
  export interface StyleDTO {
    bgColor?: string;
    fontColor?: string;
  }
  