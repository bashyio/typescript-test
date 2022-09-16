import { FunctionWithArguments } from "../types";

export function debounce(func: Function, timeout: number): any {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const toReturn: FunctionWithArguments = (...args) => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      // @ts-expect-error comment
      func.apply(this, args);
    }, timeout);
  };

  return toReturn;
}
