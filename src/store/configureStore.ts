import { applyMiddleware, createStore, Middleware } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./rootReducer";

export const configureStore = () => {
    const middlewares: Middleware[] = [thunk];

    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { createLogger } = require(`redux-logger`);
        middlewares.push(createLogger({ collapsed: true }));

        const store = createStore(rootReducer(), applyMiddleware(...middlewares));

        // eslint-disable-next-line no-console
        console.log("Creating Store...");

        if (module.hot)
            // Enable Webpack hot module replacement for reducers
            module.hot.accept(() => {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const nextRootReducer = require("./rootReducer");
                // eslint-disable-next-line no-console
                console.log("Store Reducers Replaced...", nextRootReducer);
                store.replaceReducer(nextRootReducer.rootReducer());
                // import("./rootReducer")
                //     .then((nextReducer) => {
                //         // eslint-disable-next-line no-console
                //         console.log("Store Reducers Replaced...", nextReducer);
                //         store.replaceReducer(nextReducer.rootReducer());
                //     })
                //     .catch((err) => {
                //         // eslint-disable-next-line no-console
                //         console.error("something went wrong while replacing store reducers...", err);
                //     });
            });

        return store;
    }

    const store = createStore(rootReducer(), applyMiddleware(...middlewares));

    return store;
};
