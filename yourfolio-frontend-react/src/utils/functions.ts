import { ElementDTO } from "src/api/dtoTypes";
import { Font, Category, Script, Variant } from "@samuelmeuli/font-manager";
import { loadActiveFont } from "src/modules/fontManager/loadFonts";

export function getElementByIdRecursive(
  elementId: number,
  parentElement: ElementDTO | null
): ElementDTO | null {
  if (parentElement === null) {
    return null;
  }

  if (parentElement.id === elementId) {
    return parentElement;
  }

  for (let i = 0; i < parentElement.elements.length; i++) {
    const child = parentElement.elements[i];
    const result = getElementByIdRecursive(elementId, child);
    if (result !== null) {
      return result;
    }
  }

  return null;
}

function createFontFromString(fontString: string): Font {
  const family = fontString;
  const id = fontString;
  const category = "" as Category;
  const scripts = [] as Script[];
  const variants = [] as Variant[];

  return {
    family,
    id,
    category,
    scripts,
    variants,
  };
}

export function applyFont(font: string) {
  loadActiveFont(createFontFromString(font), "", [], [], "");
}
