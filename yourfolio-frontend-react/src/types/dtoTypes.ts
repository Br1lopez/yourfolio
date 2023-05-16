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

export const EMPTY_ELEMENT_DTO: ElementDTO = {
  id: -1,
  name: "",
  style: {
    bgColor: "",
    fontColor: "",
  },
  elements: [],
  type: { id: "", name: "" },
  description: "",
  files: [],
  thumbnailFile: { id: -1, description: "", url: "" },
  position: -1,
};

export interface ElementSaveDTO {
  typeId: string;
  name: string;
  position?: number;
  description?: string;
  thumbnailFile?: FileDTO;
  style?: StyleDTO;
}

export const EMPTY_ELEMENT_SAVE_DTO: ElementSaveDTO = {
  typeId: "portfolio",
  name: ""
};

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


export function mapElementDtoToElementSaveDto(elementDto: ElementDTO): ElementSaveDTO {
  return {
    typeId: elementDto.type.id,
    name: elementDto.name,
    position: elementDto.position,
    description: elementDto.description,
    thumbnailFile: elementDto.thumbnailFile,
    style: elementDto.style,
  }
}