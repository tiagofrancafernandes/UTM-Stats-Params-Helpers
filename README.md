# UTM Stats Params Helpers

### [`script.js` from GitHub Pages](https://tiagofrancafernandes.github.io/UTM-Stats-Params-Helpers/script.js)
### [Demo from GitHub Pages](https://tiagofrancafernandes.github.io/UTM-Stats-Params-Helpers)

## Usage

```html
<script src="//tiagofrancafernandes.github.io/UTM-Stats-Params-Helpers/script.js" defer></script>

<script>
globalThis.targetQueries = [ // Selectors of your links
    // '.botao-compra',
    // 'a.buy-link-2',
];
globalThis.useKeys = [
    'utm_source',
    'utm_medium',
    'utm_id',
    'utm_content',
    'utm_term',
    'utm_campaign',
];
```

----

## Docs

* See demo file [`index.html`](./index.html)


### Load script file

* **With setup by global variables**

```html
<script src="script.js" defer></script>

<script>
globalThis.targetQueries = [
    '.botao-compra',
    'a.buy-link-2',
];
globalThis.useKeys = [
    'utm_source',
    'utm_medium',
    'utm_id',
    'utm_content',
    'utm_term',
    'utm_campaign',
];

// (Optional) default value when the parameter is not passed via URL
globalThis.defaultUrlParamValues = {
    // utm_source: 123, // Static value
    get utm_source() { // Dinamic value (useful like to use localStorage values)
        return 'abcjhg';
    },
};
</script>
```

* **With setup by URL params**

```html
<script src="script.js?init&targetQueries=.botao-compra,a.buy-link-2&useKeys=utm_source,utm_medium,utm_id,utm_content,utm_term,utm_campaign" defer></script>
```

> **TIP**: You can parse URL params like using `encodeURI`
>
> ```js
> encodeURI(globalThis.useKeys);
> encodeURI(globalThis.targetQueries);
> encodeURI('a[href*="ti"]') // a%5Bhref*=%22ti%22%5D
> ```


#### Helpers

* **`UrlHelpers`**
```js
globalThis.updateLinks // Function <void>
globalThis.UrlHelpers // Object

UrlHelpers.currentURL: // URL
UrlHelpers.currentURLSearchParams: // URLSearchParams
UrlHelpers.currentURLSearchParamsAsArray: // Array
UrlHelpers.currentURLSearchParamsAsObject: // Object
UrlHelpers.currentURLSearchParamsEntries: // URLSearchParams Iterator
UrlHelpers.selfScript // HTMLScriptElement

UrlHelpers.selfScriptURL: // URL
UrlHelpers.selfScriptURLParams: // URLSearchParams
UrlHelpers.selfScriptURLParamsAsArray: // Array
UrlHelpers.selfScriptURLParamsAsObject: // Object
UrlHelpers.selfScriptURLParamsEntries: // URLSearchParams Iterator

UrlHelpers.tryCreateUrl // Function <null|URL>
UrlHelpers.targetQueries // Array
UrlHelpers.useKeys // Array
```

* **`LocalStorageHelper`**
```js
let linkStorage = new LocalStorageHelper('link_tags');
let linkStorage2 = new LocalStorageHelper('other_storage');

linkStorage.setItem('abc', 123);
let abc = linkStorage.getOrSet('abc', 789); // 123
let abc2 = linkStorage2.getOrSet('abc', 789); // 789
console.log(linkStorage.toJson(), abc, abc2);
```
