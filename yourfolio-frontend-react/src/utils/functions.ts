import { ElementDTO } from "src/api/elementTypes";
import { Font, Category, Script, Variant } from "@samuelmeuli/font-manager";
import { loadActiveFont } from "src/modules/fontManager/loadFonts";

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
