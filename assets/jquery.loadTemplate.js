(function(a) {
  var w = {}, v = {}, h = {}, m;

  function o(G, C, E) {
    var B = this, A, D, F;
    C = C || {};
    F = a.extend(true, {
      async: true,
      overwriteCache: false,
      complete: null,
      success: null,
      error: function() {
        a(this).each(function() {
          a(this).html(F.errorMessage)
        })
      },
      errorMessage: "There was an error loading the template.",
      paged: false,
      pageNo: 1,
      elemPerPage: 10,
      append: false,
      prepend: false,
      beforeInsert: null,
      afterInsert: null,
      bindingOptions: {ignoreUndefined: false, ignoreNull: false, ignoreEmptyString: false}
    }, E);
    if (a.type(C) === "array") {
      m = true;
      return t.call(this, G, C, F)
    }
    if (!g(G)) {
      A = a(G);
      if (typeof G === "string" && G.indexOf("#") === 0) {
        F.isFile = false
      }
    }
    D = F.isFile || (typeof F.isFile === "undefined" && (typeof A === "undefined" || A.length === 0));
    if (D && !F.overwriteCache && w[G]) {
      r(G, B, C, F)
    } else {
      if (D && !F.overwriteCache && w.hasOwnProperty(G)) {
        c(G, B, C, F)
      } else {
        if (D) {
          n(G, B, C, F)
        } else {
          p(A, B, C, F)
        }
      }
    }
    return this
  }

  function b(B, A) {
    if (A) {
      h[B] = A
    } else {
      h = a.extend(h, B)
    }
  }

  function g(A) {
    return typeof A === "string" && A.indexOf("/") > -1
  }

  function t(K, B, H) {
    H = H || {};
    var A = this, L = B.length, D = H.prepend && !H.append, C = 0, J = 0, E = false, F = [], G;
    if (H.paged) {
      var I = (H.pageNo - 1) * H.elemPerPage;
      B = B.slice(I, I + H.elemPerPage);
      L = B.length
    }
    if (!H.append && !H.prepend) {
      A.html("")
    }
    G = a.extend({}, H, {
      append: !H.prepend && true, complete: function(M) {
        C++;
        if (C === L || E) {
          if (E && H && typeof H.error === "function") {
            H.error.call(A, F)
          }
          if (H && typeof H.complete === "function") {
            H.complete()
          }
        }
      }, success: function() {
        J++;
        if (J === L) {
          if (H && typeof H.success === "function") {
            H.success()
          }
        }
      }, error: function(M) {
        E = true;
        F.push(M)
      }
    });
    if (D) {
      B.reverse()
    }
    a(B).each(function() {
      o.call(A, K, this, G);
      if (E) {
        return false
      }
    });
    return this
  }

  function c(D, B, A, C) {
    if (v[D]) {
      v[D].push({data: A, selection: B, settings: C})
    } else {
      v[D] = [{data: A, selection: B, settings: C}]
    }
  }

  function r(E, C, B, D) {
    var A = w[E].clone();
    q.call(C, A, B, D);
    if (typeof D.success === "function") {
      D.success()
    }
  }

  function x() {
    return new Date().getTime()
  }

  function y(A) {
    if (A.indexOf("?") !== -1) {
      return A + "&_=" + x()
    } else {
      return A + "?_=" + x()
    }
  }

  function n(D, B, A, C) {
    w[D] = null;
    var E = D;
    if (C.overwriteCache) {
      E = y(E)
    }
    a.ajax({
      url: E, async: C.async, success: function(F) {
        l(a(F), D, B, A, C)
      }, error: function(F) {
        k(D, B, A, C, F)
      }
    })
  }

  function p(A, C, B, D) {
    if (A.is("script") || A.is("template")) {
      A = a.parseHTML(a.trim(A.html()))
    }
    q.call(C, A, B, D);
    if (typeof D.success === "function") {
      D.success()
    }
  }

  function q(C, A, B) {
    var C = a("<div/>").append(C);
    f(C, A, B);
    a(this).each(function() {
      var D = C.children().clone(true);
      a("select", D).each(function(E, F) {
        a(this).val(a("select", C).eq(E).val())
      });
      if (B.beforeInsert) {
        B.beforeInsert(D, A)
      }
      if (B.append) {
        a(this).append(D)
      } else {
        if (B.prepend) {
          a(this).prepend(D)
        } else {
          a(this).html("").append(D)
        }
      }
      if (B.afterInsert) {
        B.afterInsert(D, A)
      }
    });
    if (typeof B.complete === "function") {
      B.complete.call(a(this), A)
    }
  }

  function k(E, C, A, D, B) {
    var F;
    if (typeof D.error === "function") {
      D.error.call(C, B)
    }
    a(v[E]).each(function(G, H) {
      if (typeof H.settings.error === "function") {
        H.settings.error.call(H.selection, B)
      }
    });
    if (typeof D.complete === "function") {
      D.complete.call(C)
    }
    while (v[E] && (F = v[E].shift())) {
      if (typeof F.settings.complete === "function") {
        F.settings.complete.call(F.selection)
      }
    }
    if (typeof v[E] !== "undefined" && v[E].length > 0) {
      v[E] = []
    }
  }

  function l(A, E, C, B, D) {
    var F;
    w[E] = A.clone();
    q.call(C, A, B, D);
    if (typeof D.success === "function") {
      D.success.call(C)
    }
    while (v[E] && (F = v[E].shift())) {
      q.call(F.selection, w[E].clone(), F.data, F.settings);
      if (typeof F.settings.success === "function") {
        F.settings.success.call(F.selection)
      }
    }
  }

  function f(C, A, B) {
    A = A || {};
    u("data-content", C, A, B, function(D, E) {
      D.html(e(D, E, "content", B))
    });
    u("data-content-append", C, A, B, function(D, E) {
      D.append(e(D, E, "content", B))
    });
    u("data-content-prepend", C, A, B, function(D, E) {
      D.prepend(e(D, E, "content", B))
    });
    u("data-content-text", C, A, B, function(D, E) {
      D.text(e(D, E, "content", B))
    });
    u("data-innerHTML", C, A, B, function(D, E) {
      D.html(e(D, E, "content", B))
    });
    u("data-src", C, A, B, function(D, E) {
      D.attr("src", e(D, E, "src", B))
    }, function(D) {
      D.remove()
    });
    u("data-href", C, A, B, function(D, E) {
      D.attr("href", e(D, E, "href", B))
    }, function(D) {
      D.remove()
    });
    u("data-alt", C, A, B, function(D, E) {
      D.attr("alt", e(D, E, "alt", B))
    });
    u("data-id", C, A, B, function(D, E) {
      D.attr("id", e(D, E, "id", B))
    });
    u("data-class", C, A, B, function(D, E) {
      D.addClass(e(D, E, "class", B))
    });
    u("data-link", C, A, B, function(D, F) {
      var E = a("<a/>");
      E.attr("href", e(D, F, "link", B));
      E.html(D.html());
      D.html(E)
    });
    u("data-link-wrap", C, A, B, function(D, F) {
      var E = a("<a/>");
      E.attr("href", e(D, F, "link-wrap", B));
      D.wrap(E)
    });
    u("data-options", C, A, B, function(D, E) {
      a(E).each(function() {
        var F = a("<option/>");
        F.attr("value", this).text(this).appendTo(D)
      })
    });
    s(C, A, B);
    u("data-value", C, A, B, function(D, E) {
      D.val(e(D, E, "value", B))
    })
  }

  function u(A, F, B, E, C, D) {
    a("[" + A + "]", F).each(function() {
      var G = a(this), H = G.attr(A), I = j(B, H);
      if (!z(G, I, E)) {
        G.remove();
        return
      }
      G.removeAttr(A);
      if (typeof I !== "undefined" && C) {
        C(G, I)
      } else {
        if (D) {
          D(G)
        }
      }
    });
    return
  }

  function z(B, D, C) {
    var A = i(B, C);
    if (A.ignoreUndefined && typeof D === "undefined") {
      return false
    } else {
      if (A.ignoreNull && D === null) {
        return false
      } else {
        if (A.ignoreEmptyString && D === "") {
          return false
        } else {
          return true
        }
      }
    }
  }

  function i(B, C) {
    var A = {};
    if (B instanceof jQuery && B.attr("data-binding-options")) {
      A = a.parseJSON(B.attr("data-binding-options"));
      B.removeAttr("data-binding-options")
    } else {
      if (typeof B === "object" && B.hasOwnProperty("bindingOptions")) {
        A = B.bindingOptions
      }
    }
    return a.extend({}, C.bindingOptions, A)
  }

  function s(C, A, B) {
    a("[data-template-bind]", C).each(function() {
      var D = a(this), E = a.parseJSON(D.attr("data-template-bind"));
      D.removeAttr("data-template-bind");
      a(E).each(function() {
        var G;
        if (typeof(this.value) === "object") {
          G = j(A, this.value.data)
        } else {
          G = j(A, this.value)
        }
        if (this.attribute) {
          if (!z(this, G, B)) {
            D.remove();
            return
          }
          switch (this.attribute) {
            case"content":
            case"innerHTML":
              D.html(d(D, G, this));
              break;
            case"contentAppend":
              D.append(d(D, G, this));
              break;
            case"contentPrepend":
              D.prepend(d(D, G, this));
              break;
            case"contentText":
              D.text(d(D, G, this));
              break;
            case"options":
              var F = this;
              a(G).each(function() {
                var H = a("<option/>");
                H.attr("value", this[F.value.value]).text(d(D, this[F.value.content], F)).attr("selected", typeof this[F.value.selected] == undefined ? false : this[F.value.selected]).appendTo(D)
              });
              break;
            default:
              D.attr(this.attribute, d(D, G, this))
          }
        }
      })
    })
  }

  function d(A, D, B, C) {
    if (B.formatter && h[B.formatter]) {
      return (function(E) {
        return h[B.formatter].call(A, D, B.formatOptions, E)
      })(C)
    }
    return D
  }

  function j(A, B) {
    if (B === "this") {
      return A
    }
    var C = B.split("."), D, E = A;
    while ((D = C.shift()) && typeof E !== "undefined" && E != null) {
      E = E[D]
    }
    return E
  }

  function e(A, G, B, F) {
    var E = A.attr("data-format-target"), D;
    if (E === B || (!E && B === "content")) {
      D = A.attr("data-format");
      if (D && typeof h[D] === "function") {
        var C = A.attr("data-format-options");
        return (function(H) {
          return h[D].call(A[0], G, C, a.extend({}, H))
        })(F)
      }
    }
    return G
  }

  b("nestedTemplateFormatter", function(E, B, A) {
    if (!B) {
      return
    }
    if (typeof B === "string" && B[0] === "{") {
      B = a.parseJSON(B)
    }
    var C = B.parentElement || "div";
    var D = B.template || B;
    if (B.parentElement) {
      return a("<" + C + "/>").loadTemplate(D, E, A)
    } else {
      return a("<" + C + "/>").loadTemplate(D, E, A).children()
    }
  });
  a.fn.loadTemplate = o;
  a.addTemplateFormatter = b
})(jQuery);
