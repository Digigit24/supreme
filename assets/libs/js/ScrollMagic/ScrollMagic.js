/*! ScrollMagic v2.0.8 | (c) 2020 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */ !(function (
  e,
  t
) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.ScrollMagic = t());
})(this, function () {
  "use strict";

  function _() {}
  (_.version = "2.0.8"),
    "undefined" != typeof window &&
      window.addEventListener("mousewheel", void 0);
  var P = "data-scrollmagic-pin-spacer";
  _.Controller = function (e) {
    function t() {
      var e, t, n;
      v &&
        u &&
        ((e = R.type.Array(u) ? u : f.slice(0)),
        (u = !1),
        (t = d),
        0 != (n = (d = l.scrollPos()) - t) && (h = 0 < n ? "FORWARD" : i),
        h === i && e.reverse(),
        e.forEach(function (e, t) {
          e.update(!0);
        }));
    }

    function r() {
      n = R.rAF(t);
    }
    var n,
      o,
      i = "REVERSE",
      s = "PAUSED",
      a = z.defaults,
      l = this,
      c = R.extend({}, a, e),
      f = [],
      u = !1,
      d = 0,
      h = s,
      p = !0,
      g = 0,
      v = !0,
      m = function () {
        0 < c.refreshInterval && (o = window.setTimeout(E, c.refreshInterval));
      },
      w = function () {
        return c.vertical
          ? R.get.scrollTop(c.container)
          : R.get.scrollLeft(c.container);
      },
      y = function () {
        return c.vertical
          ? R.get.height(c.container)
          : R.get.width(c.container);
      },
      S = (this._setScrollPos = function (e) {
        c.vertical
          ? p
            ? window.scrollTo(R.get.scrollLeft(), e)
            : (c.container.scrollTop = e)
          : p
          ? window.scrollTo(e, R.get.scrollTop())
          : (c.container.scrollLeft = e);
      }),
      b = function (e) {
        "resize" == e.type && ((g = y()), (h = s)), !0 !== u && ((u = !0), r());
      },
      E = function () {
        if (!p && g != y()) {
          var t;
          try {
            t = new Event("resize", {
              bubbles: !1,
              cancelable: !1,
            });
          } catch (e) {
            (t = document.createEvent("Event")).initEvent("resize", !1, !1);
          }
          c.container.dispatchEvent(t);
        }
        f.forEach(function (e, t) {
          e.refresh();
        }),
          m();
      };
    this._options = c;

    function x(e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return (
        t.sort(function (e, t) {
          return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
        }),
        t
      );
    }
    return (
      (this.addScene = function (e) {
        if (R.type.Array(e))
          e.forEach(function (e, t) {
            l.addScene(e);
          });
        else if (e instanceof _.Scene)
          if (e.controller() !== l) e.addTo(l);
          else if (!~f.indexOf(e))
            for (var t in (f.push(e),
            (f = x(f)),
            e.on("shift.controller_sort", function () {
              f = x(f);
            }),
            c.globalSceneOptions))
              e[t] && e[t].call(e, c.globalSceneOptions[t]);
        return l;
      }),
      (this.removeScene = function (e) {
        var t;
        return (
          R.type.Array(e)
            ? e.forEach(function (e, t) {
                l.removeScene(e);
              })
            : -1 < (t = f.indexOf(e)) &&
              (e.off("shift.controller_sort"), f.splice(t, 1), e.remove()),
          l
        );
      }),
      (this.updateScene = function (e, n) {
        return (
          R.type.Array(e)
            ? e.forEach(function (e, t) {
                l.updateScene(e, n);
              })
            : n
            ? e.update(!0)
            : !0 !== u &&
              e instanceof _.Scene &&
              (~(u = u || []).indexOf(e) || u.push(e), (u = x(u)), r()),
          l
        );
      }),
      (this.update = function (e) {
        return (
          b({
            type: "resize",
          }),
          e && t(),
          l
        );
      }),
      (this.scrollTo = function (e, t) {
        if (R.type.Number(e)) S.call(c.container, e, t);
        else if (e instanceof _.Scene)
          e.controller() === l && l.scrollTo(e.scrollOffset(), t);
        else if (R.type.Function(e)) S = e;
        else {
          var n = R.get.elements(e)[0];
          if (n) {
            for (; n.parentNode.hasAttribute(P); ) n = n.parentNode;
            var r = c.vertical ? "top" : "left",
              o = R.get.offset(c.container),
              i = R.get.offset(n);
            p || (o[r] -= l.scrollPos()), l.scrollTo(i[r] - o[r], t);
          }
        }
        return l;
      }),
      (this.scrollPos = function (e) {
        return arguments.length
          ? (R.type.Function(e) && (w = e), l)
          : w.call(l);
      }),
      (this.info = function (e) {
        var t = {
          size: g,
          vertical: c.vertical,
          scrollPos: d,
          scrollDirection: h,
          container: c.container,
          isDocument: p,
        };
        return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
      }),
      (this.loglevel = function (e) {
        return l;
      }),
      (this.enabled = function (e) {
        return arguments.length
          ? (v != e && ((v = !!e), l.updateScene(f, !0)), l)
          : v;
      }),
      (this.destroy = function (e) {
        window.clearTimeout(o);
        for (var t = f.length; t--; ) f[t].destroy(e);
        return (
          c.container.removeEventListener("resize", b),
          c.container.removeEventListener("scroll", b),
          R.cAF(n),
          null
        );
      }),
      (function () {
        for (var e in c) a.hasOwnProperty(e) || delete c[e];
        if (((c.container = R.get.elements(c.container)[0]), !c.container))
          throw "ScrollMagic.Controller init failed.";
        (p =
          c.container === window ||
          c.container === document.body ||
          !document.body.contains(c.container)) && (c.container = window),
          (g = y()),
          c.container.addEventListener("resize", b),
          c.container.addEventListener("scroll", b);
        var t = parseInt(c.refreshInterval, 10);
        (c.refreshInterval = R.type.Number(t) ? t : a.refreshInterval), m();
      })(),
      l
    );
  };
  var z = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100,
    },
  };
  (_.Controller.addOption = function (e, t) {
    z.defaults[e] = t;
  }),
    (_.Controller.extend = function (e) {
      var t = this;
      (_.Controller = function () {
        return (
          t.apply(this, arguments),
          (this.$super = R.extend({}, this)),
          e.apply(this, arguments) || this
        );
      }),
        R.extend(_.Controller, t),
        (_.Controller.prototype = t.prototype),
        (_.Controller.prototype.constructor = _.Controller);
    }),
    (_.Scene = function (e) {
      var n,
        l,
        c = "BEFORE",
        f = "DURING",
        u = "AFTER",
        r = D.defaults,
        d = this,
        h = R.extend({}, r, e),
        p = c,
        g = 0,
        a = {
          start: 0,
          end: 0,
        },
        v = 0,
        o = !0,
        s = {};
      (this.on = function (e, o) {
        return (
          R.type.Function(o) &&
            (e = e.trim().split(" ")).forEach(function (e) {
              var t = e.split("."),
                n = t[0],
                r = t[1];
              "*" != n &&
                (s[n] || (s[n] = []),
                s[n].push({
                  namespace: r || "",
                  callback: o,
                }));
            }),
          d
        );
      }),
        (this.off = function (e, i) {
          return (
            e &&
              (e = e.trim().split(" ")).forEach(function (e, t) {
                var n = e.split("."),
                  r = n[0],
                  o = n[1] || "";
                ("*" === r ? Object.keys(s) : [r]).forEach(function (e) {
                  for (var t = s[e] || [], n = t.length; n--; ) {
                    var r = t[n];
                    !r ||
                      (o !== r.namespace && "*" !== o) ||
                      (i && i != r.callback) ||
                      t.splice(n, 1);
                  }
                  t.length || delete s[e];
                });
              }),
            d
          );
        }),
        (this.trigger = function (e, n) {
          var t, r, o, i;
          return (
            e &&
              ((t = e.trim().split(".")),
              (r = t[0]),
              (o = t[1]),
              (i = s[r]) &&
                i.forEach(function (e, t) {
                  (o && o !== e.namespace) ||
                    e.callback.call(d, new _.Event(r, e.namespace, d, n));
                })),
            d
          );
        }),
        d
          .on("change.internal", function (e) {
            "loglevel" !== e.what &&
              "tweenChanges" !== e.what &&
              ("triggerElement" === e.what
                ? y()
                : "reverse" === e.what && d.update());
          })
          .on("shift.internal", function (e) {
            t(), d.update();
          }),
        (this.addTo = function (e) {
          return (
            e instanceof _.Controller &&
              l != e &&
              (l && l.removeScene(d),
              (l = e),
              E(),
              i(!0),
              y(!0),
              t(),
              l.info("container").addEventListener("resize", S),
              e.addScene(d),
              d.trigger("add", {
                controller: l,
              }),
              d.update()),
            d
          );
        }),
        (this.enabled = function (e) {
          return arguments.length
            ? (o != e && ((o = !!e), d.update(!0)), d)
            : o;
        }),
        (this.remove = function () {
          var e;
          return (
            l &&
              (l.info("container").removeEventListener("resize", S),
              (e = l),
              (l = void 0),
              e.removeScene(d),
              d.trigger("remove")),
            d
          );
        }),
        (this.destroy = function (e) {
          return (
            d.trigger("destroy", {
              reset: e,
            }),
            d.remove(),
            d.off("*.*"),
            null
          );
        }),
        (this.update = function (e) {
          var t, n;
          return (
            l &&
              (e
                ? l.enabled() && o
                  ? ((t = l.info("scrollPos")),
                    (n =
                      0 < h.duration
                        ? (t - a.start) / (a.end - a.start)
                        : t >= a.start
                        ? 1
                        : 0),
                    d.trigger("update", {
                      startPos: a.start,
                      endPos: a.end,
                      scrollPos: t,
                    }),
                    d.progress(n))
                  : m && p === f && T(!0)
                : l.updateScene(d, !1)),
            d
          );
        }),
        (this.refresh = function () {
          return i(), y(), d;
        }),
        (this.progress = function (e) {
          if (arguments.length) {
            var t,
              n,
              r,
              o = !1,
              i = p,
              s = l ? l.info("scrollDirection") : "PAUSED",
              a = h.reverse || g <= e;
            return (
              0 === h.duration
                ? ((o = g != e), (p = 0 === (g = e < 1 && a ? 0 : 1) ? c : f))
                : e < 0 && p !== c && a
                ? ((p = c), (o = !(g = 0)))
                : 0 <= e && e < 1 && a
                ? ((g = e), (p = f), (o = !0))
                : 1 <= e && p !== u
                ? ((g = 1), (p = u), (o = !0))
                : p !== f || a || T(),
              o &&
                ((t = {
                  progress: g,
                  state: p,
                  scrollDirection: s,
                }),
                (r = function (e) {
                  d.trigger(e, t);
                }),
                (n = p != i) &&
                  i !== f &&
                  (r("enter"), r(i === c ? "start" : "end")),
                r("progress"),
                n && p !== f && (r(p === c ? "start" : "end"), r("leave"))),
              d
            );
          }
          return g;
        });
      var m,
        w,
        t = function () {
          (a = {
            start: v + h.offset,
          }),
            l &&
              h.triggerElement &&
              (a.start -= l.info("size") * h.triggerHook),
            (a.end = a.start + h.duration);
        },
        i = function (e) {
          var t;
          !n ||
            (x((t = "duration"), n.call(d)) &&
              !e &&
              (d.trigger("change", {
                what: t,
                newval: h[t],
              }),
              d.trigger("shift", {
                reason: t,
              })));
        },
        y = function (e) {
          var t = 0,
            n = h.triggerElement;
          if (l && (n || 0 < v)) {
            if (n)
              if (n.parentNode) {
                for (
                  var r = l.info(),
                    o = R.get.offset(r.container),
                    i = r.vertical ? "top" : "left";
                  n.parentNode.hasAttribute(P);

                )
                  n = n.parentNode;
                var s = R.get.offset(n);
                r.isDocument || (o[i] -= l.scrollPos()), (t = s[i] - o[i]);
              } else d.triggerElement(void 0);
            var a = t != v;
            (v = t),
              a &&
                !e &&
                d.trigger("shift", {
                  reason: "triggerElementPosition",
                });
          }
        },
        S = function (e) {
          0 < h.triggerHook &&
            d.trigger("shift", {
              reason: "containerResize",
            });
        },
        b = R.extend(D.validate, {
          duration: function (t) {
            var e;
            if (
              (R.type.String(t) &&
                t.match(/^(\.|\d)*\d+%$/) &&
                ((e = parseFloat(t) / 100),
                (t = function () {
                  return l ? l.info("size") * e : 0;
                })),
              R.type.Function(t))
            ) {
              n = t;
              try {
                t = parseFloat(n.call(d));
              } catch (e) {
                t = -1;
              }
            }
            if (((t = parseFloat(t)), !R.type.Number(t) || t < 0))
              throw ((n = n && void 0), 0);
            return t;
          },
        }),
        E = function (e) {
          (e = arguments.length ? [e] : Object.keys(b)).forEach(function (
            t,
            e
          ) {
            var n;
            if (b[t])
              try {
                n = b[t](h[t]);
              } catch (e) {
                n = r[t];
              } finally {
                h[t] = n;
              }
          });
        },
        x = function (e, t) {
          var n = !1,
            r = h[e];
          return h[e] != t && ((h[e] = t), E(e), (n = r != h[e])), n;
        },
        z = function (t) {
          d[t] ||
            (d[t] = function (e) {
              return arguments.length
                ? ("duration" === t && (n = void 0),
                  x(t, e) &&
                    (d.trigger("change", {
                      what: t,
                      newval: h[t],
                    }),
                    ~D.shifts.indexOf(t) &&
                      d.trigger("shift", {
                        reason: t,
                      })),
                  d)
                : h[t];
            });
        };
      (this.controller = function () {
        return l;
      }),
        (this.state = function () {
          return p;
        }),
        (this.scrollOffset = function () {
          return a.start;
        }),
        (this.triggerPosition = function () {
          var e = h.offset;
          return (
            l &&
              (h.triggerElement
                ? (e += v)
                : (e += l.info("size") * d.triggerHook())),
            e
          );
        }),
        d
          .on("shift.internal", function (e) {
            var t = "duration" === e.reason;
            ((p === u && t) || (p === f && 0 === h.duration)) && T(), t && A();
          })
          .on("progress.internal", function (e) {
            T();
          })
          .on("add.internal", function (e) {
            A();
          })
          .on("destroy.internal", function (e) {
            d.removePin(e.reset);
          });

      function C() {
        l && m && p === f && !l.info("isDocument") && T();
      }

      function F() {
        l &&
          m &&
          p === f &&
          (((w.relSize.width || w.relSize.autoFullWidth) &&
            R.get.width(window) != R.get.width(w.spacer.parentNode)) ||
            (w.relSize.height &&
              R.get.height(window) != R.get.height(w.spacer.parentNode))) &&
          A();
      }

      function L(e) {
        l &&
          m &&
          p === f &&
          !l.info("isDocument") &&
          (e.preventDefault(),
          l._setScrollPos(
            l.info("scrollPos") -
              ((e.wheelDelta ||
                e[l.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 ||
                30 * -e.detail)
          ));
      }
      var T = function (e) {
          var t, n, r, o, i, s;
          m &&
            l &&
            ((t = l.info()),
            (n = w.spacer.firstChild),
            e || p !== f
              ? ((r = {
                  position: w.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                }),
                (o = R.css(n, "position") != r.position),
                w.pushFollowers
                  ? 0 < h.duration &&
                    ((p === u &&
                      0 === parseFloat(R.css(w.spacer, "padding-top"))) ||
                      (p === c &&
                        0 === parseFloat(R.css(w.spacer, "padding-bottom")))) &&
                    (o = !0)
                  : (r[t.vertical ? "top" : "left"] = h.duration * g),
                R.css(n, r),
                o && A())
              : ("fixed" != R.css(n, "position") &&
                  (R.css(n, {
                    position: "fixed",
                  }),
                  A()),
                (i = R.get.offset(w.spacer, !0)),
                (s =
                  h.reverse || 0 === h.duration
                    ? t.scrollPos - a.start
                    : Math.round(g * h.duration * 10) / 10),
                (i[t.vertical ? "top" : "left"] += s),
                R.css(w.spacer.firstChild, {
                  top: i.top,
                  left: i.left,
                })));
        },
        A = function () {
          var e, t, n, r, o;
          m &&
            l &&
            w.inFlow &&
            ((e = p === f),
            (t = l.info("vertical")),
            (n = w.spacer.firstChild),
            (r = R.isMarginCollapseType(R.css(w.spacer, "display"))),
            (o = {}),
            w.relSize.width || w.relSize.autoFullWidth
              ? e
                ? R.css(m, {
                    width: R.get.width(w.spacer),
                  })
                : R.css(m, {
                    width: "100%",
                  })
              : ((o["min-width"] = R.get.width(t ? m : n, !0, !0)),
                (o.width = e ? o["min-width"] : "auto")),
            w.relSize.height
              ? e
                ? R.css(m, {
                    height:
                      R.get.height(w.spacer) -
                      (w.pushFollowers ? h.duration : 0),
                  })
                : R.css(m, {
                    height: "100%",
                  })
              : ((o["min-height"] = R.get.height(t ? n : m, !0, !r)),
                (o.height = e ? o["min-height"] : "auto")),
            w.pushFollowers &&
              ((o["padding" + (t ? "Top" : "Left")] = h.duration * g),
              (o["padding" + (t ? "Bottom" : "Right")] = h.duration * (1 - g))),
            R.css(w.spacer, o));
        };
      (this.setPin = function (e, t) {
        if (
          ((t = R.extend(
            {},
            {
              pushFollowers: !0,
              spacerClass: "scrollmagic-pin-spacer",
            },
            t
          )),
          !(e = R.get.elements(e)[0]))
        )
          return d;
        if ("fixed" === R.css(e, "position")) return d;
        if (m) {
          if (m === e) return d;
          d.removePin();
        }
        var n = (m = e).parentNode.style.display,
          r = [
            "top",
            "left",
            "bottom",
            "right",
            "margin",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
          ];
        m.parentNode.style.display = "none";
        var o = "absolute" != R.css(m, "position"),
          i = R.css(m, r.concat(["display"])),
          s = R.css(m, ["width", "height"]);
        (m.parentNode.style.display = n),
          !o && t.pushFollowers && (t.pushFollowers = !1);
        var a,
          l = m.parentNode.insertBefore(document.createElement("div"), m),
          c = R.extend(i, {
            position: o ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box",
          });
        return (
          o || R.extend(c, R.css(m, ["width", "height"])),
          R.css(l, c),
          l.setAttribute(P, ""),
          R.addClass(l, t.spacerClass),
          (w = {
            spacer: l,
            relSize: {
              width: "%" === s.width.slice(-1),
              height: "%" === s.height.slice(-1),
              autoFullWidth:
                "auto" === s.width && o && R.isMarginCollapseType(i.display),
            },
            pushFollowers: t.pushFollowers,
            inFlow: o,
          }),
          m.___origStyle ||
            ((m.___origStyle = {}),
            (a = m.style),
            r
              .concat([
                "width",
                "height",
                "position",
                "boxSizing",
                "mozBoxSizing",
                "webkitBoxSizing",
              ])
              .forEach(function (e) {
                m.___origStyle[e] = a[e] || "";
              })),
          w.relSize.width &&
            R.css(l, {
              width: s.width,
            }),
          w.relSize.height &&
            R.css(l, {
              height: s.height,
            }),
          l.appendChild(m),
          R.css(m, {
            position: o ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto",
          }),
          (w.relSize.width || w.relSize.autoFullWidth) &&
            R.css(m, {
              boxSizing: "border-box",
              mozBoxSizing: "border-box",
              webkitBoxSizing: "border-box",
            }),
          window.addEventListener("scroll", C),
          window.addEventListener("resize", C),
          window.addEventListener("resize", F),
          m.addEventListener("mousewheel", L),
          m.addEventListener("DOMMouseScroll", L),
          T(),
          d
        );
      }),
        (this.removePin = function (e) {
          var t, n, r;
          return (
            m &&
              (p === f && T(!0),
              (!e && l) ||
                ((t = w.spacer.firstChild).hasAttribute(P) &&
                  ((n = w.spacer.style),
                  (r = {}),
                  [
                    "margin",
                    "marginLeft",
                    "marginRight",
                    "marginTop",
                    "marginBottom",
                  ].forEach(function (e) {
                    r[e] = n[e] || "";
                  }),
                  R.css(t, r)),
                w.spacer.parentNode.insertBefore(t, w.spacer),
                w.spacer.parentNode.removeChild(w.spacer),
                m.parentNode.hasAttribute(P) ||
                  (R.css(m, m.___origStyle), delete m.___origStyle)),
              window.removeEventListener("scroll", C),
              window.removeEventListener("resize", C),
              window.removeEventListener("resize", F),
              m.removeEventListener("mousewheel", L),
              m.removeEventListener("DOMMouseScroll", L),
              (m = void 0)),
            d
          );
        });
      var N,
        O = [];
      return (
        d.on("destroy.internal", function (e) {
          d.removeClassToggle(e.reset);
        }),
        (this.setClassToggle = function (e, t) {
          var n = R.get.elements(e);
          return (
            0 !== n.length &&
              R.type.String(t) &&
              (0 < O.length && d.removeClassToggle(),
              (N = t),
              (O = n),
              d.on("enter.internal_class leave.internal_class", function (e) {
                var n = "enter" === e.type ? R.addClass : R.removeClass;
                O.forEach(function (e, t) {
                  n(e, N);
                });
              })),
            d
          );
        }),
        (this.removeClassToggle = function (e) {
          return (
            e &&
              O.forEach(function (e, t) {
                R.removeClass(e, N);
              }),
            d.off("start.internal_class end.internal_class"),
            (N = void 0),
            (O = []),
            d
          );
        }),
        (function () {
          for (var e in h) r.hasOwnProperty(e) || delete h[e];
          for (var t in r) z(t);
          E();
        })(),
        d
      );
    });
  var D = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: 0.5,
      reverse: !0,
      loglevel: 2,
    },
    validate: {
      offset: function (e) {
        if (((e = parseFloat(e)), !R.type.Number(e))) throw 0;
        return e;
      },
      triggerElement: function (e) {
        if ((e = e || void 0)) {
          var t = R.get.elements(e)[0];
          if (!t || !t.parentNode) throw 0;
          e = t;
        }
        return e;
      },
      triggerHook: function (e) {
        var t = {
          onCenter: 0.5,
          onEnter: 1,
          onLeave: 0,
        };
        if (R.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
        else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function (e) {
        return !!e;
      },
    },
    shifts: ["duration", "offset", "triggerHook"],
  };
  (_.Scene.addOption = function (e, t, n, r) {
    e in D.defaults ||
      ((D.defaults[e] = t), (D.validate[e] = n), r && D.shifts.push(e));
  }),
    (_.Scene.extend = function (e) {
      var t = this;
      (_.Scene = function () {
        return (
          t.apply(this, arguments),
          (this.$super = R.extend({}, this)),
          e.apply(this, arguments) || this
        );
      }),
        R.extend(_.Scene, t),
        (_.Scene.prototype = t.prototype),
        (_.Scene.prototype.constructor = _.Scene);
    }),
    (_.Event = function (e, t, n, r) {
      for (var o in (r = r || {})) this[o] = r[o];
      return (
        (this.type = e),
        (this.target = this.currentTarget = n),
        (this.namespace = t || ""),
        (this.timeStamp = this.timestamp = Date.now()),
        this
      );
    });
  var R = (_._util = (function (s) {
    function a(e) {
      return parseFloat(e) || 0;
    }

    function l(e) {
      return e.currentStyle ? e.currentStyle : s.getComputedStyle(e);
    }

    function r(e, t, n, r) {
      if ((t = t === document ? s : t) === s) r = !1;
      else if (!u.DomElement(t)) return 0;
      e = e[0].toUpperCase() + e.substr(1).toLowerCase();
      var o,
        i =
          (n
            ? t["offset" + e] || t["outer" + e]
            : t["client" + e] || t["inner" + e]) || 0;
      return (
        n &&
          r &&
          ((o = l(t)),
          (i +=
            "Height" === e
              ? a(o.marginTop) + a(o.marginBottom)
              : a(o.marginLeft) + a(o.marginRight))),
        i
      );
    }

    function c(e) {
      return e
        .replace(/^[^a-z]+([a-z])/g, "$1")
        .replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        });
    }
    var e = {};
    (e.extend = function (e) {
      for (e = e || {}, f = 1; f < arguments.length; f++)
        if (arguments[f])
          for (var t in arguments[f])
            arguments[f].hasOwnProperty(t) && (e[t] = arguments[f][t]);
      return e;
    }),
      (e.isMarginCollapseType = function (e) {
        return !!~[
          "block",
          "flex",
          "list-item",
          "table",
          "-webkit-box",
        ].indexOf(e);
      });
    for (
      var o = 0,
        t = ["ms", "moz", "webkit", "o"],
        n = s.requestAnimationFrame,
        i = s.cancelAnimationFrame,
        f = 0;
      !n && f < 4;
      ++f
    )
      (n = s[t[f] + "RequestAnimationFrame"]),
        (i =
          s[t[f] + "CancelAnimationFrame"] ||
          s[t[f] + "CancelRequestAnimationFrame"]);
    (n =
      n ||
      function (e) {
        var t = new Date().getTime(),
          n = Math.max(0, 16 - (t - o)),
          r = s.setTimeout(function () {
            e(t + n);
          }, n);
        return (o = t + n), r;
      }),
      (i =
        i ||
        function (e) {
          s.clearTimeout(e);
        }),
      (e.rAF = n.bind(s)),
      (e.cAF = i.bind(s));
    var u = (e.type = function (e) {
      return Object.prototype.toString
        .call(e)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    });
    (u.String = function (e) {
      return "string" === u(e);
    }),
      (u.Function = function (e) {
        return "function" === u(e);
      }),
      (u.Array = function (e) {
        return Array.isArray(e);
      }),
      (u.Number = function (e) {
        return !u.Array(e) && 0 <= e - parseFloat(e) + 1;
      }),
      (u.DomElement = function (e) {
        return "object" == typeof HTMLElement ||
          "function" == typeof HTMLElement
          ? e instanceof HTMLElement || e instanceof SVGElement
          : e &&
              "object" == typeof e &&
              null !== e &&
              1 === e.nodeType &&
              "string" == typeof e.nodeName;
      });
    var d = (e.get = {});
    return (
      (d.elements = function (e) {
        var t = [];
        if (u.String(e))
          try {
            e = document.querySelectorAll(e);
          } catch (e) {
            return t;
          }
        if ("nodelist" === u(e) || u.Array(e) || e instanceof NodeList)
          for (var n = 0, r = (t.length = e.length); n < r; n++) {
            var o = e[n];
            t[n] = u.DomElement(o) ? o : d.elements(o);
          }
        else (!u.DomElement(e) && e !== document && e !== s) || (t = [e]);
        return t;
      }),
      (d.scrollTop = function (e) {
        return e && "number" == typeof e.scrollTop
          ? e.scrollTop
          : s.pageYOffset || 0;
      }),
      (d.scrollLeft = function (e) {
        return e && "number" == typeof e.scrollLeft
          ? e.scrollLeft
          : s.pageXOffset || 0;
      }),
      (d.width = function (e, t, n) {
        return r("width", e, t, n);
      }),
      (d.height = function (e, t, n) {
        return r("height", e, t, n);
      }),
      (d.offset = function (e, t) {
        var n,
          r = {
            top: 0,
            left: 0,
          };
        return (
          e &&
            e.getBoundingClientRect &&
            ((n = e.getBoundingClientRect()),
            (r.top = n.top),
            (r.left = n.left),
            t || ((r.top += d.scrollTop()), (r.left += d.scrollLeft()))),
          r
        );
      }),
      (e.addClass = function (e, t) {
        t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
      }),
      (e.removeClass = function (e, t) {
        t &&
          (e.classList
            ? e.classList.remove(t)
            : (e.className = e.className.replace(
                RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
              )));
      }),
      (e.css = function (e, t) {
        if (u.String(t)) return l(e)[c(t)];
        if (u.Array(t)) {
          var n = {},
            r = l(e);
          return (
            t.forEach(function (e, t) {
              n[e] = r[c(e)];
            }),
            n
          );
        }
        for (var o in t) {
          var i = t[o];
          i == parseFloat(i) && (i += "px"), (e.style[c(o)] = i);
        }
      }),
      e
    );
  })(window || {}));
  return _;
});
