/**
 * Usage:
 * <script src="script.js?init&useKeys=utm&targetQueries=.botao-compra"></script>
 * <script src="script.js?init=false&useKeys=utm&targetQueries=.botao-compra"></script>
 * <script src="script.js"></script>
 *
 * // targetQueries = '.botao-compra';
 * // targetQueries = ['.botao-compra'];
 * // useKeys = 'utm,key2';
 * // useKeys = ['utm', 'key2'];
 */

(function (thisCurrentScript) {
    const UrlHelpers = {
        tryCreateUrl(link) {
            try {
                return typeof link === 'string' ? new URL(link) : null;
            } catch (error) {
                return null;
            }
        },
        useKeys: [],
        targetQueries: [],
        selfScript: thisCurrentScript,
        get currentURL() {
            return this.tryCreateUrl(location?.href) || null;
        },
        get currentURLSearchParams() {
            return this.currentURL?.searchParams || new URLSearchParams('');
        },
        get currentURLSearchParamsAsObject() {
            return Object.fromEntries(this.currentURLSearchParamsEntries);
        },
        get currentURLSearchParamsAsArray() {
            return Object.entries(this.currentURLSearchParamsAsObject);
        },
        get currentURLSearchParamsEntries() {
            return this.currentURL?.searchParams?.entries() || Object.entries({});
        },

        get selfScriptURL() {
            return this.tryCreateUrl(thisCurrentScript?.src || '') || null;
        },
        get selfScriptURLParams() {
            return this.selfScriptURL?.searchParams || new URLSearchParams('');
        },
        get selfScriptURLParamsAsObject() {
            return Object.fromEntries(this.selfScriptURLParamsEntries);
        },
        get selfScriptURLParamsAsArray() {
            return Object.entries(this.selfScriptURLParamsAsObject);
        },
        get selfScriptURLParamsEntries() {
            return this.selfScriptURL?.searchParams?.entries() || Object.entries({});
        },
    };

    globalThis.UrlHelpers = UrlHelpers;

    document.addEventListener('DOMContentLoaded', (event) => {
        globalThis.validElementSelector = (selector) => {
            try {
                if (!selector || typeof selector !== 'string') {
                    return null;
                }

                document.querySelector(selector);
                return selector?.trim();
            } catch (error) {
                return null;
            }
        };

        const validTargetQueries = (targetQueriesValue) => {
            if (
                !targetQueriesValue
                || !['string', 'object'].includes(typeof targetQueriesValue)
            ) {
                return [];
            }

            if (typeof targetQueriesValue === 'string') {
                targetQueriesValue = targetQueriesValue.split(',');
            }

            if (
                    targetQueriesValue
                    && (typeof targetQueriesValue === 'object')
                    && !Array.isArray(targetQueriesValue)
            ) {
                let newValue = [];

                for (let item of Object.entries(targetQueriesValue || {})) {
                    if (item[1]) {
                        newValue.push(item[0]);
                    }
                }

                targetQueriesValue = newValue;
            }

            if (!Array.isArray(targetQueriesValue)) {
                return [];
            }

            return targetQueriesValue.filter(selector => validElementSelector(selector));
        };

        globalThis.useKeys = ((keys) => {
            keys = typeof keys === 'string' || Array.isArray(keys) ? keys : [];

            keys = (Array.isArray(keys) ? keys : keys.split(',')).filter(key => {
                if (!key || typeof key !== 'string' || !key.trim()) {
                    return false;
                }

                return true;
            });

            return keys;
        })(globalThis.useKeys || UrlHelpers?.selfScriptURLParams?.get('useKeys'));

        globalThis.targetQueries = validTargetQueries(
            globalThis?.targetQueries || UrlHelpers?.selfScriptURLParamsAsObject?.targetQueries
        );

        UrlHelpers['useKeys'] = globalThis.useKeys;
        UrlHelpers['targetQueries'] = globalThis.targetQueries;

        if (!UrlHelpers?.currentURLSearchParams) {
            return;
        }

        const updateLinks = () => {
            if (!globalThis.targetQueries || !globalThis.targetQueries.length) {
                return;
            }

            console.log('globalThis.targetQueries', globalThis.targetQueries);

            globalThis.targetQueries.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    let tagName = element.tagName;

                    if (tagName === 'A') {
                        let linkHref = element.getAttribute('href');
                        let linkHrefUrl = UrlHelpers?.tryCreateUrl(linkHref);
                        let linkHrefUQP = linkHrefUrl ? linkHrefUrl.searchParams : null;

                        if (!linkHrefUQP || !UrlHelpers?.currentURLSearchParams) {
                            return;
                        }

                        for(let item of UrlHelpers?.currentURLSearchParams?.entries()) {
                            let [key, value] = item;
                            if (globalThis.useKeys?.includes(key)) {
                                linkHrefUQP?.set(key, value);
                            }
                        }

                        element.href = linkHrefUrl?.toString();
                        return;
                    }
                });
            });
        };

        globalThis.updateLinks = updateLinks;

        let autoInit = UrlHelpers?.selfScriptURLParams?.get('init') || true;

        if (autoInit && !['0', 'false'].includes(`${autoInit}`.toLowerCase())) {
            updateLinks();
        }
    });
})(document?.currentScript);
