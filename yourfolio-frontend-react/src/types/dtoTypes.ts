export interface ElementDTO {
  id: number;
  type: ElementTypeDTO;
  name: string;
  position: number;
  files: Array<FileDTO>;
  elements: Array<ElementDTO>;
  description?: string;
  thumbnailImage?: FileDTO;
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
  files?: Array<FileDTO>;
  thumbnailFile?: FileDTO;
  style?: StyleDTO;
}

export const EMPTY_ELEMENT_SAVE_DTO: ElementSaveDTO = {
  typeId: "portfolio",
  name: "",
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

export interface ElementTypeDTO {
  id: string;
  name: string;
  male: boolean;
  possibleChildren?: ElementTypeDTO[];
}

export interface UserSaveDTO {
  name: string;
  password: string;
  email: string;
}

export interface UserDTO {
  id: number
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export function mapElementDtoToElementSaveDto(
  elementDto: ElementDTO
): ElementSaveDTO {
  return {
    typeId: elementDto.type.id,
    name: elementDto.name,
    position: elementDto.position,
    description: elementDto.description,
    thumbnailFile: elementDto.thumbnailImage,
    style: elementDto.style,
  };
}

