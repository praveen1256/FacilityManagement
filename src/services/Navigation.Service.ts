import { singleton } from "tsyringe";
import { NavigationContainerRef, StackActions } from "@react-navigation/native";

import { RootStackParamList } from "..//Navigator";

@singleton()
export class NavigationService<ParamList extends Record<string, unknown> = RootStackParamList> {
    private container: NavigationContainerRef<ParamList>;
    constructor(container: NavigationContainerRef<ParamList>) {
        this.container = container;
    }

    public setContainer(container: NavigationContainerRef<ParamList>) {
        this.container = container;
    }

    public navigate<K extends keyof ParamList>(name: K, state: ParamList[K]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.container.navigate(name, state);
    }

    public canGoBack() {
        return this.container.canGoBack();
    }

    public goBack() {
        if (this.container.canGoBack()) this.container.goBack();
    }

    public resetTo(name: string | string[]) {
        this.container.reset({
            index: typeof name === "string" ? 0 : name.length - 1,
            routes: typeof name === "string" ? [{ name }] : name.map((eachName) => ({ name: eachName })),
        });
    }

    public replace(name: string, state?: Record<never, never>) {
        this.container.dispatch(StackActions.replace(name, state));
    }

    public currentScreenName() {
        const route = this.container.getCurrentRoute();
        return route?.name;
    }
}
