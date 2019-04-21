jQuery(function($) {
  var Theme = {
    utils: {
      onEscKey: function(callback) {
        $(document).on('keyup', function(event) {
          if (event.keyCode === 27) callback();
        })
      }
    },

    interval: function(condition, action, duration, limit) {
      var counter = 0;
      var looper = setInterval(function() {
        if (counter >= limit || Theme.checkElement(condition)) {
          clearInterval(looper);
        } else {
          action();
          counter++;
        }
      }, duration);
    },

    checkElement: function(selector) {
      return $(selector).length;
    },

    moveLogin: function() {
      var self = this;
      var login = $('#member-login').detach();
      $("#navmobile .wsite-menu-default li:last-child").after(login);
      self.mobileMenu();
    },

    wrapSelects: function() {
      $('select:not(.w-input-offscreen)').wrap('<div class="simple-select-wrapper" />');
    },

    miniCartSetup: function() {
      var self = this;
      var cartOpenClass = 'fixed-body';

      // Toggle minicart visibility
      function toggleMinicart(state) {
        $('html, body').toggleClass(cartOpenClass);
        $('.minicart-takeover').revealer(state);
      }

      // Override the header icon / toggle button
      function hijackMinicartToggle() {
        var $cartToggle = $('#wsite-nav-cart-a');
        var $cartToggleWrap = $cartToggle.parent();

        if (!$cartToggleWrap.children('svg').length) {
          $cartToggleWrap.prepend('<svg width="16px" height="15px" viewBox="0 0 16 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="assets" transform="translate(-84.000000, -50.000000)" fill="#EC403C"><path d="M100,53.6486486 C100,53.0484459 99.8758,52.8378378 99.2512,52.8378378 L88.4902,52.8378378 L88.17,50.8108108 C88.1262,50.2189189 87.8302,50 87.2016,50 L84.8004,50 C84.2078,50 84,50.1986486 84,50.8108108 L84,51.2162162 C84,51.845 84.2078,52.027027 84.8004,52.027027 L86.289,52.027027 L87.6018,59.7297297 C87.7416,60.1513514 88.126,60.5202703 88.8022,60.5405405 L97.6064,60.5405405 C98.3068,60.5405405 98.635,60.3947973 98.8072,59.7297297 L100,53.6486486 L100,53.6486486 Z M97.1902,58.5135135 L89.2786,58.5135135 L88.6904,54.8648649 L97.8708,54.8648649 L97.1902,58.5135135 L97.1902,58.5135135 Z M89.2028,63.3783784 C89.2028,64.2743243 89.9188,65 90.8036,65 C91.688,65 92.4044,64.2743243 92.4044,63.3783784 C92.4044,62.4824324 91.688,61.7567568 90.8036,61.7567568 C89.9188,61.7567568 89.2028,62.4824324 89.2028,63.3783784 L89.2028,63.3783784 Z M94.405,63.3783784 C94.405,64.2743243 95.1214,65 96.0058,65 C96.8902,65 97.6066,64.2743243 97.6066,63.3783784 C97.6066,62.4824324 96.8902,61.7567568 96.0058,61.7567568 C95.1214,61.7567568 94.405,62.4824324 94.405,63.3783784 L94.405,63.3783784 Z" id="icon"></path></g></g></svg>');
        }

        $cartToggle.off('click mouseenter mouseover mouseleave mouseout');

        if ($(window).width() <= 991) {
          $cartToggleWrap.appendTo('.site-utils');
          $cartToggle.html($cartToggle.html().replace(/[^0-9]/g, ''));
        }
      };

      // Override the minicart panel
      function hijackMinicart() {
        var $miniCart = $('#wsite-mini-cart');
        var count = 0;

        $('#wsite-mini-cart .wsite-product-item').each(function() {
          count += parseInt($(this).find('.wsite-product-price').text(), 10);
        });

        var items = count === 1 ? ' item ' : ' items ';
        var templateData = {
          count: count,
          items: items,
          rest: 'in your cart'
        };

        $miniCart
          .off('mouseenter mouseover mouseleave mouseout')
          .removeClass('arrow-top')
          .removeAttr('style')
          .children('.mini-cart-header').remove();

        if (count > 0
            && $(window).width() < 992
            && ! $('body').hasClass('splash-page')) {
          $miniCart
            .prepend('<div class="mini-cart-header"></div>')
            .children('.mini-cart-header').loadTemplate($('#mini-cart-header-template'), templateData);
        }

        if (!$('.minicart-takeover').length) {
          $miniCart.wrap('<div class="minicart-takeover" />');
        }
      };

      $(document).on('click', '.wsite-nav-cart', function() {
        toggleMinicart('toggle');
      });

      $(document).on('click', '.minicart-close', function() {
        toggleMinicart('hide');
      });

      self.utils.onEscKey(function() {
        if ($(document.body).hasClass(cartOpenClass)) {
          toggleMinicart('hide');
        }
      });

      // Watch for minicart
      self.observeDom(document, function(docObserver, target, config) {
        // Bail if minicart & toggle not available yet
        if (!$('#wsite-mini-cart').length || !$('#wsite-nav-cart-a').length) return;

        // Watch minicart
        self.observeDom($('#wsite-mini-cart')[0], function(observer, target, config) {
          observer.disconnect();
          hijackMinicart();
          hijackMinicartToggle();
          observer.observe(target, config);
        });

        // Watch toggle (sometimes default toggle updates after cart)
        self.observeDom($('#wsite-nav-cart-a')[0], function(observer, target, config) {
          observer.disconnect();
          hijackMinicartToggle();
          observer.observe(target, config);
        });

        self.observeDom($('#navmobile')[0], function(observer, target, config) {
          observer.disconnect();
          self.mobileMenu();
          observer.observe(target, config);
        });

        // minicart available, so stop watching the doc
        docObserver.disconnect();
      }, {subtree: true});
    },

    mobileMenu: function () {
      $("#navmobile li a").each(function() {
        // Differentiating post-load nav elements by the presence of an id (only currently available modifier)
        if ($(this).attr("id")) {
          var navLinkId = $(this).attr("id");
          var navLinkParent = $(this).parent().detach();

          // Append to mobile nav if new element
          if (!$("#navmobile #" + navLinkId).length) {
            $("#navmobile .wsite-menu-default").append(navLinkParent);
            var newheight = $("#navmobile .wsite-menu-default").height();
            $(".wsite-mobile-menu").height(newheight);
          }
        }
      });
    },

    observeDom: function(target, callback, config) {
      var config = $.extend({
        attributes: true,
        childList: true,
        characterData: true
      }, config);

      // create an observer instance & callback
      var observer = new MutationObserver(function(mutations) {
        // Using every() instead of forEach() allows us to short-circuit the observer in the callback
        mutations.every(function(mutation) {
          callback(observer, target, config, mutation);
        });
      });

      // pass in the target node, as well as the observer options
      observer.observe(target, config);
    }
  }

  $(document).ready(function() {

    // General styling
    $("body").addClass("postload").addClass("wsite-theme-light").removeClass("wsite-theme-dark");

    $('.hamburger').click(function() {
      var $body = $('body');
      if ($body.hasClass('menu-open')) {
        $body.add('html').removeClass('fixed-body');
        $('.minicart-takeover').revealer('hide');
      } else {
        $body.add('html').addClass('fixed-body');
      }

      $("body").toggleClass("menu-open");
    });

    // Product Element
    // --------------------------------------------------------------------------------------

    // Swap preview images for hi-res images in product elements

    $("a.wsite-product-image").each(function() {
      var hires = $(this).attr("href");
      $(this).find('img').attr("src", hires);
    });

    // Format Product Element

    function product() {
      $(".wsite-product").each(function() {
        if ($(this).children(".wsite-product-image-wrap").outerHeight() <= $(this).children(".wsite-product-right").outerHeight()) {
          if ($(this).parents('.wsite-multicol-tr').length) {
            $('.wsite-multicol-tr').find(".wsite-product").addClass('break');
          }
          else {
            $(this).addClass('break');
          }
        }
      });
    }

    product();

    var timeout;

    $(window).on('resize', function(e) {

      clearTimeout(timeout);
      timeout = setTimeout(function() {

        product();

      }, 300);

    });

    // End Product Element

    // Add fullwidth class to gallery thumbs if less than 6

    $('.imageGallery').each(function() {
      if ($(this).children('div').length <= 6) {
        $(this).children('div').addClass('halfwidth-mobile');
      }
    });

    // Add swipe to fancybox mobile

    var swipeGallery = function() {
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          }
          else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          swipeGallery();
        });
      }, 500);
    }
    if ('ontouchstart' in window) {
      $("body").on("click", "a.w-fancybox", function() {
        swipeGallery();
      });
    }


    // Format Store markup

    $('#wsite-com-product-add-to-cart, .wsite-product-button').removeClass("wsite-button-highlight");

    $("#wsite-com-product-images-strip a:first-child").addClass("current-thumb");

    $("#wsite-com-product-images-strip a").click(function() {
      $(".current-thumb").removeClass("current-thumb");
      $(this).addClass("current-thumb");
    });

    // Cart + Member
/*
    $('#navmobile').on('DOMSubtreeModified propertychange', function() {
      $("#navmobile li a").each(function() {
        // Differentiating post-load nav elements by the presence of an id (only currently available modifier)
        if ($(this).attr("id")) {
          var navLinkId = $(this).attr("id");
          var navLinkParent = $(this).parent().detach();

          // Append to mobile nav if new element
          if (!$("#navmobile #" + navLinkId).length) {
            $("#navmobile .wsite-menu-default").append(navLinkParent);
            var newheight = $("#navmobile .wsite-menu-default").height();
            $(".wsite-mobile-menu").height(newheight);
          }
        }
      });
    });
*/
    $('#wsite-com-product-add-to-cart').on('click', function() {
      $('html, body').animate({scrollTop: $('#wsite-nav-cart-a').offset().top}, 500);
      $('#wsite-nav-cart-a').focus();
    });

    // BLOG
    // --------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------

    // Blog styling

    $("#commentReplyTitle").text("Leave a comment");

    $(".blogCommentLevel0").each(function() {
      if ($(this).parent().prev("h2").text() == "Comments") {
        $(this).addClass("first");
      }
    });

    $(".blogCommentLevel1").each(function() {
      if ($(this).parent().prev("div").children("div").hasClass("blogCommentLevel0")) {
        $(this).addClass("first");
      }
    });

    $(".blogCommentLevel2").each(function() {
      if ($(this).parent().prev("div").children("div").hasClass("blogCommentLevel1")) {
        $(this).addClass("first");
      }
    });

  });

  Theme.miniCartSetup();
  Theme.wrapSelects();
  Theme.interval('#navmobile #member-login', Theme.moveLogin.bind(Theme), 800, 5);
});
