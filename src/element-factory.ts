/* global HTMLElement */
import clsx from "clsx";
import { processTemplateString, TemplateArgs } from "./template-string";
import { FunctionalComponent, h, JSX } from "preact";

export type TWClassName<P> =
  | string
  | TemplateStringsArray
  | TWClassNameCallback<P>;
type TWClassNameCallback<P> = (props: P) => string;

export function elementFactory<
  T extends JSX.HTMLAttributes<HTMLElement> = JSX.HTMLAttributes<HTMLElement>
>(
  element: keyof JSX.IntrinsicElements
): <P = {}>(
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => FunctionalComponent<T & P>;

// Type T is for matching overloading implemetaions of elementFactory
export function elementFactory<T extends {} = {}>(
  element: FunctionalComponent
): <P = {}>(
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => FunctionalComponent<T & P>;

export default function elementFactory(element: any) {
  return function (twClassName: any, ...args: any) {
    if (typeof twClassName === "object") {
      return ({ children, className, ...props }: any) =>
        h(
          element,
          {
            className: clsx([
              className,
              processTemplateString({
                template: twClassName,
                args,
                props: { children, className, ...props },
              }),
            ]),
            ...props,
          },
          children
        );
    }
    if (typeof twClassName === "string") {
      return ({ children, className, ...props }: any) =>
        h(
          element,
          { className: clsx([twClassName, className]), ...props },
          children
        );
    }
    if (typeof twClassName === "function") {
      return ({ children, className, ...props }: any) => {
        //@ts-ignore
        const classNameFromProps = twClassName({ children, ...props });
        return h(
          element,
          {
            className: clsx([classNameFromProps, className]),
            ...props,
          },
          children
        );
      };
    }
    throw new TypeError(`Invalid type of twClassName : ${typeof twClassName}`);
  };
}

export type ComponentFactory<P = {}> = (
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => FunctionalComponent<P>;

export type ElementFactory<
  T extends JSX.HTMLAttributes<HTMLElement> = JSX.HTMLAttributes<HTMLElement>
> = (
  element: keyof JSX.IntrinsicElements
) => <P = {}>(
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => FunctionalComponent<T & P>;
