export enum CustomInputType {
  Image,
  Description,
}

export function getCustomInputs(elementType: string): CustomInputType[] {
  switch (elementType) {
    case "vertical-carousel-gallery":
      return [CustomInputType.Image, CustomInputType.Description];
    default:
      return [];
  }
}
