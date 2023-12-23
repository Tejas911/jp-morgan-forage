// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
// ┃ ██████ ██████ ██████       █      █      █      █      █ █▄  ▀███ █       ┃
// ┃ ▄▄▄▄▄█ █▄▄▄▄▄ ▄▄▄▄▄█  ▀▀▀▀▀█▀▀▀▀▀ █ ▀▀▀▀▀█ ████████▌▐███ ███▄  ▀█ █ ▀▀▀▀▀ ┃
// ┃ █▀▀▀▀▀ █▀▀▀▀▀ █▀██▀▀ ▄▄▄▄▄ █ ▄▄▄▄▄█ ▄▄▄▄▄█ ████████▌▐███ █████▄   █ ▄▄▄▄▄ ┃
// ┃ █      ██████ █  ▀█▄       █ ██████      █      ███▌▐███ ███████▄ █       ┃
// ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
// ┃ Copyright (c) 2017, the Perspective Authors.                              ┃
// ┃ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ ┃
// ┃ This file is part of the Perspective library, distributed under the terms ┃
// ┃ of the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). ┃
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { IPerspectiveViewerElement } from "./viewer";
import type { HTMLPerspectiveViewerPluginElement } from "./plugin";
import type React from "react";

// JSX / React extensions

type ReactPerspectiveViewerAttributes<T> = React.HTMLAttributes<T>;

type JsxPerspectiveViewerElement = { class?: string } & React.DetailedHTMLProps<
    ReactPerspectiveViewerAttributes<HTMLPerspectiveViewerElement>,
    HTMLPerspectiveViewerElement
>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "perspective-viewer": JsxPerspectiveViewerElement;
        }
    }
}

// Custom Elements extensions

declare global {
    interface Document {
        createElement(
            tagName: "perspective-viewer",
            options?: ElementCreationOptions
        ): HTMLPerspectiveViewerElement;
        createElement(
            tagName: "perspective-viewer-plugin",
            options?: ElementCreationOptions
        ): HTMLPerspectiveViewerPluginElement;
        querySelector<E extends Element = Element>(selectors: string): E | null;
        querySelector(
            selectors: "perspective-viewer"
        ): HTMLPerspectiveViewerElement | null;
    }

    interface CustomElementRegistry {
        get(tagName: "perspective-viewer"): typeof HTMLPerspectiveViewerElement;
        get(
            tagName: "perspective-viewer-plugin"
        ): typeof HTMLPerspectiveViewerPluginElement;
    }
}

import { PerspectiveViewerElement } from "../../dist/pkg/perspective.js";

// This unused class asserts that the _real_ class (the one generated by
// `wasm-bindgen`) implements the same interface we register to the
// custom element.
//
class __PerspectiveViewerElement
    extends PerspectiveViewerElement
    implements IPerspectiveViewerElement {}

/**
 * @noInheritDoc
 */
export interface HTMLPerspectiveViewerElement
    extends IPerspectiveViewerElement {}

export declare class HTMLPerspectiveViewerElement
    extends HTMLElement
    implements IPerspectiveViewerElement
{
    /**
     * Register a new plugin via its custom element name.  This method is called
     * automatically as a side effect of importing a plugin module, so this
     * method should only typically be called by plugin authors.
     *
     * @category Plugin
     * @param name The `name` of the custom element to register, as supplied
     * to the `customElements.define(name)` method.
     * @example
     * ```javascript
     * customElements.get("perspective-viewer").registerPlugin("my-plugin");
     * ```
     */
    static registerPlugin(name: string): Promise<void>;

    /**
     * Get metadata for ExprTK's supported commands.
     *
     * @category Internal
     * @returns An array of JSON descriptors for ExprTK commands
     */
    static getExprtkCommands(): Promise<Array<Record<string, string>>>;
}