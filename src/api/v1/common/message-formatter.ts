import { ValidationError } from "class-validator";

function dfs(src: ValidationError[], dest: Constraint[], msg: string = "") {
  const cur = msg ? `${msg}` : "";
  for (const validationError of src) {
    if (validationError.constraints) {
      for (const key in validationError.constraints) {
        if (validationError.constraints[key]) {
          const formatProperty = cur
            ? `.${validationError.property}`
            : `${validationError.property}`;
          const field = isNaN(parseInt(validationError.property, 10))
            ? formatProperty
            : `[${validationError.property}]`;
          dest.push({
            field: `${cur}${field}`,
            message: `${
              validationError.constraints[key].charAt(0).toUpperCase() +
              validationError.constraints[key].slice(1)
            }`.replace(/_/g, ' '),//capital first letter of error in uppercase and replace underscore with space 
          });
        }
      }
    }

    if (validationError.children && validationError.children.length) {
      const formatProperty = cur
        ? `.${validationError.property}`
        : `${validationError.property}`;
      const field = isNaN(parseInt(validationError.property, 10))
        ? formatProperty
        : `[${validationError.property}]`;
      dfs(validationError.children, dest, `${cur}${field}`);
    }
  }
}

interface Constraint {
  field: string;
  message: string;
}

export class MessageFormatter {
  public static format(validationErrors: ValidationError[]) {
    const dest: Constraint[] = [];
    dfs(validationErrors, dest);

    return dest;
  }
}
// export default new MessageFormatter();
