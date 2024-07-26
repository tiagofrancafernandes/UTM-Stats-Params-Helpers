# UTM Stats Params Helpers

## Usage

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
