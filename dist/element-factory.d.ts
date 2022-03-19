import { TemplateArgs } from "./template-string";
import { FunctionalComponent, JSX } from "preact";
export declare type TWClassName<P> = string | TemplateStringsArray | TWClassNameCallback<P>;
declare type TWClassNameCallback<P> = (props: P) => string;
export declare function elementFactory<T extends JSX.HTMLAttributes<HTMLElement> = JSX.HTMLAttributes<HTMLElement>>(element: keyof JSX.IntrinsicElements): <P = {}>(twClassName: TWClassName<P>, ...args: TemplateArgs[]) => FunctionalComponent<T & P>;
export declare function elementFactory<T extends {} = {}>(element: FunctionalComponent): <P = {}>(twClassName: TWClassName<P>, ...args: TemplateArgs[]) => FunctionalComponent<T & P>;
export default function elementFactory(element: any): (twClassName: any, ...args: any) => ({ children, className, ...props }: any) => import("preact").VNode<any>;
export declare type ComponentFactory<P = {}> = (twClassName: TWClassName<P>, ...args: TemplateArgs[]) => FunctionalComponent<P>;
export declare type ElementFactory<T extends JSX.HTMLAttributes<HTMLElement> = JSX.HTMLAttributes<HTMLElement>> = (element: keyof JSX.IntrinsicElements) => <P = {}>(twClassName: TWClassName<P>, ...args: TemplateArgs[]) => FunctionalComponent<T & P>;
export {};