import { ToolComponent } from "../tool/tool-component-interface";

type ComponentClass = {
    new (): ToolComponent
};

const REGISTRY = new Map<string, Object>();

export function ReturnComponentByName(name: string): any {
    return REGISTRY.get(name);
}

export function RegisterComponent(tc: Object): void {
    let cpc = tc as ComponentClass;
    REGISTRY.set(cpc.name, cpc);
}