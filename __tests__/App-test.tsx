/**
 * @format
 */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import App from "../src/App";

// Note: test renderer must be required after react-native.

it("renders correctly", () => {
    // TODO: this ts-ignore is a hack to get around the fact that we are not doing any tests
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    renderer.create(<App />);
});
