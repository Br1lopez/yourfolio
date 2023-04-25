import { ElementDTO } from "src/api/elementTypes";

export function getElementByIdRecursive(
  id: number,
  element: ElementDTO | null
): ElementDTO | null {
  if (element === null) {
    return null;
  }

  if (element.id === id) {
    return element;
  }

  for (let i = 0; i < element.elements.length; i++) {
    const child = element.elements[i];
    const result = getElementByIdRecursive(id, child);
    if (result !== null) {
      return result;
    }
  }

  return null;
}
