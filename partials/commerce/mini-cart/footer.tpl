{{!
NOTE: the `checkout_url` variable must be used
to allow the user to checkout from the mini-cart
}}
<div class="minicart-close" data-minicart-close></div>
<div class="wsite-cart-bottom">
  <div class="wsite-vertical-align wsite-subtotal-wrapper">
    <span>{{#ftl}}templates.cart.subtotalText{{/ftl}}:</span>
    {{{currency_prefix_html}}}<span class="wsite-price">{{price_number}}</span>{{{currency_suffix_html}}}
  </div>
  <div class="wsite-vertical-align wsite-button-wrapper">
    <a id="wsite-com-minicart-checkout-button" class="wsite-button" href="{{checkout_url}}">
      <span class="wsite-button-inner">{{#ftl}}templates.cart.checkoutText{{/ftl}}</span>
    </a>
  </div>
</div>
