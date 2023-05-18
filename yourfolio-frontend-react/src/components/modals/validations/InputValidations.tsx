import { Schema } from "rsuite";

export const requiredInput = Schema.Types.StringType().minLength(1, 'Campo obligatorio.')