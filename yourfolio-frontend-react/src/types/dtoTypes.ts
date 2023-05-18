export interface ElementDTO {
  id: number;
  type: ElementTypeDTO;
  name: string;
  position: number;
  files: Array<ImageDTO>;
  elements: Array<ElementDTO>;
  description?: string;
  thumbnailFile?: ImageDTO;
  style: StyleDTO;
}

export const EMPTY_ELEMENT_DTO: ElementDTO = {
  id: -1,
  name: "",
  type: { id: "", name: "", male: true },
  style: { bgColor: "black", fontColor: "white" },
  position: 0,
  files: [],
  elements: [],
};

export interface ElementSaveDTO {
  typeId: string;
  name: string;
  position?: number;
  description?: string;
  thumbnailFile?: ImageDTO;
  style?: StyleDTO;
}

export const EMPTY_ELEMENT_SAVE_DTO: ElementSaveDTO = {
  typeId: "portfolio",
  name: ""
};

export interface ImageDTO {
  id: number;
  url: string;
  description: string;
}

export interface StyleDTO {
  bgColor?: string;
  fontColor?: string;
  fontFamily?: string;
}

export interface ElementTypeDTO {
  id: string;
  name: string;
  male: boolean;
  possibleChildren?: ElementTypeDTO[];
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