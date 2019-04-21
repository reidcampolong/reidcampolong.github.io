{{!
NOTE: the pagination relies on an anchor tag with the attribute `data-page` to work correctly,
these must be kept intact.
}}

{{#previous_url}}
  <a data-page="{{previous_url}}">{{#ftl}}templates.platform.theme.base.commerce.category.product-pagination_1{{/ftl}}</a>
{{/previous_url}}
{{#pages}}
  <a {{#is_selected}}class="wsite-selected" {{/is_selected}} data-page="{{value}}">
    {{title}}
  </a>
{{/pages}}
{{#next_url}}
  <a data-page="{{next_url}}">{{#ftl}}templates.platform.theme.base.commerce.category.product-pagination_2{{/ftl}}</a>
{{/next_url}}
