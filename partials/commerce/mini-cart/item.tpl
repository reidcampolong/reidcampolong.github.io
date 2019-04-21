<div class="wsite-vertical-align wsite-product-image">
  <a class="wsite-product-link" href="{{url}}">
    {{{thumbnail_html}}}
  </a>
</div>

<div class="wsite-description-wrapper">
  <div class="wsite-product-description">
    <div class="wsite-product-name">
      <a href="{{url}}" class="wsite-name-header">{{{title_html}}}</a>
    </div>
    {{#options}}
      {{#value}}
        <div class="wsite-product-option">
          {{name}}: {{value}}
        </div>
      {{/value}}
    {{/options}}
  </div>

  {{!
  Designer note: the `wsite-remove-button` class is required to
  allow the user to remove an item from the mini-cart
  }}
  <div class="wsite-product-price">
    {{quantity}} x {{{currency_prefix_html}}}<span class="wsite-price">{{price_number}}</span>{{{currency_suffix_html}}}
  </div>
  <a class="wsite-remove-button">Remove</a>
</div>
