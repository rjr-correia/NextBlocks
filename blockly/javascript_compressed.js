/* eslint-disable */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["./blockly_compressed.js"], factory);
  } else if (typeof exports === "object") {
    // Node.js
    module.exports = factory(require("./blockly_compressed.js"));
  } else {
    // Script
    root.javascript = factory(root.Blockly);
    root.Blockly.JavaScript = root.javascript.javascriptGenerator;
  }
})(this, function (__parent__) {
  var $ = __parent__.__namespace__;
  var colour_picker$$module$build$src$generators$javascript$colour = function (
          a,
          b,
      ) {
        return [
          b.quote_(a.getFieldValue("COLOUR")),
          Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
        ];
      },
      colour_random$$module$build$src$generators$javascript$colour = function (
          a,
          b,
      ) {
        return [
          b.provideFunction_(
              "colourRandom",
              `
function ${b.FUNCTION_NAME_PLACEHOLDER_}() {
  var num = Math.floor(Math.random() * Math.pow(2, 24));
  return '#' + ('00000' + num.toString(16)).substr(-6);
}
`,
          ) + "()",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      colour_rgb$$module$build$src$generators$javascript$colour = function (
          a,
          b,
      ) {
        const c =
                b.valueToCode(
                    a,
                    "RED",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || 0,
            d =
                b.valueToCode(
                    a,
                    "GREEN",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || 0;
        a =
            b.valueToCode(
                a,
                "BLUE",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || 0;
        return [
          b.provideFunction_(
              "colourRgb",
              `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(r, g, b) {
  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
  r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
  g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
  b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}
`,
          ) +
          "(" +
          c +
          ", " +
          d +
          ", " +
          a +
          ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      colour_blend$$module$build$src$generators$javascript$colour = function (
          a,
          b,
      ) {
        const c =
                b.valueToCode(
                    a,
                    "COLOUR1",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "'#000000'",
            d =
                b.valueToCode(
                    a,
                    "COLOUR2",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "'#000000'";
        a =
            b.valueToCode(
                a,
                "RATIO",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || 0.5;
        return [
          b.provideFunction_(
              "colourBlend",
              `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(c1, c2, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  var r1 = parseInt(c1.substring(1, 3), 16);
  var g1 = parseInt(c1.substring(3, 5), 16);
  var b1 = parseInt(c1.substring(5, 7), 16);
  var r2 = parseInt(c2.substring(1, 3), 16);
  var g2 = parseInt(c2.substring(3, 5), 16);
  var b2 = parseInt(c2.substring(5, 7), 16);
  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ('0' + (r || 0).toString(16)).slice(-2);
  g = ('0' + (g || 0).toString(16)).slice(-2);
  b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}
`,
          ) +
          "(" +
          c +
          ", " +
          d +
          ", " +
          a +
          ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      lists_create_empty$$module$build$src$generators$javascript$lists =
          function (a, b) {
            return [
              "[]",
              Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
            ];
          },
      lists_create_with$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        const c = Array(a.itemCount_);
        for (let d = 0; d < a.itemCount_; d++)
          c[d] =
              b.valueToCode(
                  a,
                  "ADD" + d,
                  Order$$module$build$src$generators$javascript$javascript_generator.NONE,
              ) || "null";
        return [
          "[" + c.join(", ") + "]",
          Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
        ];
      },
      lists_repeat$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        const c = b.provideFunction_(
                "listsRepeat",
                `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(value, n) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}
`,
            ),
            d =
                b.valueToCode(
                    a,
                    "ITEM",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "null";
        a =
            b.valueToCode(
                a,
                "NUM",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "0";
        return [
          c + "(" + d + ", " + a + ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      lists_length$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        return [
          (b.valueToCode(
              a,
              "VALUE",
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ) || "[]") + ".length",
          Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
        ];
      },
      lists_isEmpty$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        return [
          "!" +
          (b.valueToCode(
              a,
              "VALUE",
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ) || "[]") +
          ".length",
          Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT,
        ];
      },
      lists_indexOf$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        const c = "FIRST" === a.getFieldValue("END") ? "indexOf" : "lastIndexOf",
            d =
                b.valueToCode(
                    a,
                    "FIND",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''";
        b =
            (b.valueToCode(
                a,
                "VALUE",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
            ) || "[]") +
            "." +
            c +
            "(" +
            d +
            ")";
        return a.workspace.options.oneBasedIndex
            ? [
              b + " + 1",
              Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
            ]
            : [
              b,
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
      },
      lists_getIndex$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        const c = a.getFieldValue("MODE") || "GET",
            d = a.getFieldValue("WHERE") || "FROM_START";
        var e =
            b.valueToCode(
                a,
                "VALUE",
                "RANDOM" === d
                    ? Order$$module$build$src$generators$javascript$javascript_generator.NONE
                    : Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
            ) || "[]";
        switch (d) {
          case "FIRST":
            if ("GET" === c)
              return [
                e + "[0]",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              ];
            if ("GET_REMOVE" === c)
              return [
                e + ".shift()",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              ];
            if ("REMOVE" === c) return e + ".shift();\n";
            break;
          case "LAST":
            if ("GET" === c)
              return [
                e + ".slice(-1)[0]",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              ];
            if ("GET_REMOVE" === c)
              return [
                e + ".pop()",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              ];
            if ("REMOVE" === c) return e + ".pop();\n";
            break;
          case "FROM_START":
            a = b.getAdjusted(a, "AT");
            if ("GET" === c)
              return [
                e + "[" + a + "]",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              ];
            if ("GET_REMOVE" === c)
              return [
                e + ".splice(" + a + ", 1)[0]",
                Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              ];
            if ("REMOVE" === c) return e + ".splice(" + a + ", 1);\n";
            break;
          case "FROM_END":
            a = b.getAdjusted(a, "AT", 1, !0);
            if ("GET" === c)
              return [
                e + ".slice(" + a + ")[0]",
                Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              ];
            if ("GET_REMOVE" === c)
              return [
                e + ".splice(" + a + ", 1)[0]",
                Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              ];
            if ("REMOVE" === c) return e + ".splice(" + a + ", 1);";
            break;
          case "RANDOM":
            e =
                b.provideFunction_(
                    "listsGetRandomItem",
                    `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(list, remove) {
  var x = Math.floor(Math.random() * list.length);
  if (remove) {
    return list.splice(x, 1)[0];
  } else {
    return list[x];
  }
}
`,
                ) +
                "(" +
                e +
                ", " +
                ("GET" !== c) +
                ")";
            if ("GET" === c || "GET_REMOVE" === c)
              return [
                e,
                Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              ];
            if ("REMOVE" === c) return e + ";\n";
        }
        throw Error("Unhandled combination (lists_getIndex).");
      },
      lists_setIndex$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        function c() {
          if (d.match(/^\w+$/)) return "";
          const h = b.nameDB_.getDistinctName(
                  "tmpList",
                  $.NameType$$module$build$src$core$names.VARIABLE,
              ),
              k = "var " + h + " = " + d + ";\n";
          d = h;
          return k;
        }
        let d =
            b.valueToCode(
                a,
                "LIST",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
            ) || "[]";
        const e = a.getFieldValue("MODE") || "GET";
        var f = a.getFieldValue("WHERE") || "FROM_START";
        const g =
            b.valueToCode(
                a,
                "TO",
                Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
            ) || "null";
        switch (f) {
          case "FIRST":
            if ("SET" === e) return d + "[0] = " + g + ";\n";
            if ("INSERT" === e) return d + ".unshift(" + g + ");\n";
            break;
          case "LAST":
            if ("SET" === e)
              return c() + (d + "[" + d + ".length - 1] = " + g + ";\n");
            if ("INSERT" === e) return d + ".push(" + g + ");\n";
            break;
          case "FROM_START":
            a = b.getAdjusted(a, "AT");
            if ("SET" === e) return d + "[" + a + "] = " + g + ";\n";
            if ("INSERT" === e) return d + ".splice(" + a + ", 0, " + g + ");\n";
            break;
          case "FROM_END":
            a = b.getAdjusted(
                a,
                "AT",
                1,
                !1,
                Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION,
            );
            f = c();
            if ("SET" === e)
              return f + (d + "[" + d + ".length - " + a + "] = " + g + ";\n");
            if ("INSERT" === e)
              return (
                  f + (d + ".splice(" + d + ".length - " + a + ", 0, " + g + ");\n")
              );
            break;
          case "RANDOM":
            a = c();
            f = b.nameDB_.getDistinctName(
                "tmpX",
                $.NameType$$module$build$src$core$names.VARIABLE,
            );
            a +=
                "var " + f + " = Math.floor(Math.random() * " + d + ".length);\n";
            if ("SET" === e) return a + (d + "[" + f + "] = " + g + ";\n");
            if ("INSERT" === e)
              return a + (d + ".splice(" + f + ", 0, " + g + ");\n");
        }
        throw Error("Unhandled combination (lists_setIndex).");
      },
      lists_getSublist$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        var c =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
                ) || "[]",
            d = a.getFieldValue("WHERE1");
        const e = a.getFieldValue("WHERE2");
        if ("FIRST" === d && "LAST" === e) c += ".slice(0)";
        else if (c.match(/^\w+$/) || ("FROM_END" !== d && "FROM_START" === e)) {
          switch (d) {
            case "FROM_START":
              d = b.getAdjusted(a, "AT1");
              break;
            case "FROM_END":
              d = b.getAdjusted(
                  a,
                  "AT1",
                  1,
                  !1,
                  Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION,
              );
              d = c + ".length - " + d;
              break;
            case "FIRST":
              d = "0";
              break;
            default:
              throw Error("Unhandled option (lists_getSublist).");
          }
          switch (e) {
            case "FROM_START":
              b = b.getAdjusted(a, "AT2", 1);
              break;
            case "FROM_END":
              b = b.getAdjusted(
                  a,
                  "AT2",
                  0,
                  !1,
                  Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION,
              );
              b = c + ".length - " + b;
              break;
            case "LAST":
              b = c + ".length";
              break;
            default:
              throw Error("Unhandled option (lists_getSublist).");
          }
          c = c + ".slice(" + d + ", " + b + ")";
        } else {
          const f = b.getAdjusted(a, "AT1");
          a = b.getAdjusted(a, "AT2");
          const g = {
            FIRST: "First",
            LAST: "Last",
            FROM_START: "FromStart",
            FROM_END: "FromEnd",
          };
          c =
              b.provideFunction_(
                  "subsequence" + g[d] + g[e],
                  `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(sequence${
                      "FROM_END" === d || "FROM_START" === d ? ", at1" : ""
                  }${"FROM_END" === e || "FROM_START" === e ? ", at2" : ""}) {
  var start = ${getSubstringIndex$$module$build$src$generators$javascript$lists(
                      "sequence",
                      d,
                      "at1",
                  )};
  var end = ${getSubstringIndex$$module$build$src$generators$javascript$lists(
                      "sequence",
                      e,
                      "at2",
                  )} + 1;
  return sequence.slice(start, end);
}
`,
              ) +
              "(" +
              c +
              ("FROM_END" === d || "FROM_START" === d ? ", " + f : "") +
              ("FROM_END" === e || "FROM_START" === e ? ", " + a : "") +
              ")";
        }
        return [
          c,
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      lists_sort$$module$build$src$generators$javascript$lists = function (a, b) {
        const c =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
                ) || "[]",
            d = "1" === a.getFieldValue("DIRECTION") ? 1 : -1;
        a = a.getFieldValue("TYPE");
        b = b.provideFunction_(
            "listsGetSortCompare",
            `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(type, direction) {
  var compareFuncs = {
    'NUMERIC': function(a, b) {
        return Number(a) - Number(b); },
    'TEXT': function(a, b) {
        return String(a) > String(b) ? 1 : -1; },
    'IGNORE_CASE': function(a, b) {
        return String(a).toLowerCase() > String(b).toLowerCase() ? 1 : -1; },
  };
  var compare = compareFuncs[type];
  return function(a, b) { return compare(a, b) * direction; };
}
      `,
        );
        return [
          c + ".slice().sort(" + b + '("' + a + '", ' + d + "))",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      lists_split$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        let c = b.valueToCode(
            a,
            "INPUT",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
        );
        b =
            b.valueToCode(
                a,
                "DELIM",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''";
        a = a.getFieldValue("MODE");
        if ("SPLIT" === a) c || (c = "''"), (a = "split");
        else if ("JOIN" === a) c || (c = "[]"), (a = "join");
        else throw Error("Unknown mode: " + a);
        return [
          c + "." + a + "(" + b + ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      lists_reverse$$module$build$src$generators$javascript$lists = function (
          a,
          b,
      ) {
        return [
          (b.valueToCode(
              a,
              "LIST",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
          ) || "[]") + ".slice().reverse()",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      controls_if$$module$build$src$generators$javascript$logic = function (
          a,
          b,
      ) {
        var c = 0;
        let d = "";
        b.STATEMENT_PREFIX && (d += b.injectId(b.STATEMENT_PREFIX, a));
        do {
          const e =
              b.valueToCode(
                  a,
                  "IF" + c,
                  Order$$module$build$src$generators$javascript$javascript_generator.NONE,
              ) || "false";
          let f = b.statementToCode(a, "DO" + c);
          b.STATEMENT_SUFFIX &&
          (f = b.prefixLines(b.injectId(b.STATEMENT_SUFFIX, a), b.INDENT) + f);
          d += (0 < c ? " else " : "") + "if (" + e + ") {\n" + f + "}";
          c++;
        } while (a.getInput("IF" + c));
        if (a.getInput("ELSE") || b.STATEMENT_SUFFIX)
          (c = b.statementToCode(a, "ELSE")),
          b.STATEMENT_SUFFIX &&
          (c =
              b.prefixLines(b.injectId(b.STATEMENT_SUFFIX, a), b.INDENT) + c),
              (d += " else {\n" + c + "}");
        return d + "\n";
      },
      logic_compare$$module$build$src$generators$javascript$logic = function (
          a,
          b,
      ) {
        const c = { EQ: "==", NEQ: "!=", LT: "<", LTE: "<=", GT: ">", GTE: ">=" }[
                a.getFieldValue("OP")
                ],
            d =
                "==" === c || "!=" === c
                    ? Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY
                    : Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
            e = b.valueToCode(a, "A", d) || "0";
        a = b.valueToCode(a, "B", d) || "0";
        return [e + " " + c + " " + a, d];
      },
      logic_operation$$module$build$src$generators$javascript$logic = function (
          a,
          b,
      ) {
        const c = "AND" === a.getFieldValue("OP") ? "&&" : "||",
            d =
                "&&" === c
                    ? Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_AND
                    : Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_OR;
        let e = b.valueToCode(a, "A", d);
        a = b.valueToCode(a, "B", d);
        e || a
            ? ((b = "&&" === c ? "true" : "false"), e || (e = b), a || (a = b))
            : (a = e = "false");
        return [e + " " + c + " " + a, d];
      },
      logic_negate$$module$build$src$generators$javascript$logic = function (
          a,
          b,
      ) {
        const c =
            Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT;
        return ["!" + (b.valueToCode(a, "BOOL", c) || "true"), c];
      },
      logic_boolean$$module$build$src$generators$javascript$logic = function (
          a,
          b,
      ) {
        return [
          "TRUE" === a.getFieldValue("BOOL") ? "true" : "false",
          Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
        ];
      },
      logic_null$$module$build$src$generators$javascript$logic = function (a, b) {
        return [
          "null",
          Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
        ];
      },
      logic_ternary$$module$build$src$generators$javascript$logic = function (
          a,
          b,
      ) {
        const c =
                b.valueToCode(
                    a,
                    "IF",
                    Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL,
                ) || "false",
            d =
                b.valueToCode(
                    a,
                    "THEN",
                    Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL,
                ) || "null";
        a =
            b.valueToCode(
                a,
                "ELSE",
                Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL,
            ) || "null";
        return [
          c + " ? " + d + " : " + a,
          Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL,
        ];
      },
      controls_repeat_ext$$module$build$src$generators$javascript$loops =
          function (a, b) {
            let c;
            c = a.getField("TIMES")
                ? String(Number(a.getFieldValue("TIMES")))
                : b.valueToCode(
                a,
                "TIMES",
                Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
            ) || "0";
            let d = b.statementToCode(a, "DO");
            d = b.addLoopTrap(d, a);
            a = "";
            const e = b.nameDB_.getDistinctName(
                "count",
                $.NameType$$module$build$src$core$names.VARIABLE,
            );
            let f = c;
            c.match(/^\w+$/) ||
            $.isNumber$$module$build$src$core$utils$string(c) ||
            ((f = b.nameDB_.getDistinctName(
                "repeat_end",
                $.NameType$$module$build$src$core$names.VARIABLE,
            )),
                (a += "var " + f + " = " + c + ";\n"));
            return (
                a +
                ("for (var " +
                    e +
                    " = 0; " +
                    e +
                    " < " +
                    f +
                    "; " +
                    e +
                    "++) {\n" +
                    d +
                    "}\n")
            );
          },
      controls_whileUntil$$module$build$src$generators$javascript$loops =
          function (a, b) {
            const c = "UNTIL" === a.getFieldValue("MODE");
            let d =
                    b.valueToCode(
                        a,
                        "BOOL",
                        c
                            ? Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT
                            : Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                    ) || "false",
                e = b.statementToCode(a, "DO");
            e = b.addLoopTrap(e, a);
            c && (d = "!" + d);
            return "while (" + d + ") {\n" + e + "}\n";
          },
      controls_for$$module$build$src$generators$javascript$loops = function (
          a,
          b,
      ) {
        var c = b.nameDB_.getName(
                a.getFieldValue("VAR"),
                $.NameType$$module$build$src$core$names.VARIABLE,
            ),
            d =
                b.valueToCode(
                    a,
                    "FROM",
                    Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
                ) || "0",
            e =
                b.valueToCode(
                    a,
                    "TO",
                    Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
                ) || "0";
        const f =
            b.valueToCode(
                a,
                "BY",
                Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
            ) || "1";
        let g = b.statementToCode(a, "DO");
        g = b.addLoopTrap(g, a);
        if (
            $.isNumber$$module$build$src$core$utils$string(d) &&
            $.isNumber$$module$build$src$core$utils$string(e) &&
            $.isNumber$$module$build$src$core$utils$string(f)
        )
          (b = Number(d) <= Number(e)),
              (a =
                  "for (" +
                  c +
                  " = " +
                  d +
                  "; " +
                  c +
                  (b ? " <= " : " >= ") +
                  e +
                  "; " +
                  c),
              (c = Math.abs(Number(f))),
              (a =
                  1 === c ? a + (b ? "++" : "--") : a + ((b ? " += " : " -= ") + c)),
              (a += ") {\n" + g + "}\n");
        else {
          a = "";
          let h = d;
          d.match(/^\w+$/) ||
          $.isNumber$$module$build$src$core$utils$string(d) ||
          ((h = b.nameDB_.getDistinctName(
              c + "_start",
              $.NameType$$module$build$src$core$names.VARIABLE,
          )),
              (a += "var " + h + " = " + d + ";\n"));
          d = e;
          e.match(/^\w+$/) ||
          $.isNumber$$module$build$src$core$utils$string(e) ||
          ((d = b.nameDB_.getDistinctName(
              c + "_end",
              $.NameType$$module$build$src$core$names.VARIABLE,
          )),
              (a += "var " + d + " = " + e + ";\n"));
          e = b.nameDB_.getDistinctName(
              c + "_inc",
              $.NameType$$module$build$src$core$names.VARIABLE,
          );
          a += "var " + e + " = ";
          a = $.isNumber$$module$build$src$core$utils$string(f)
              ? a + (Math.abs(f) + ";\n")
              : a + ("Math.abs(" + f + ");\n");
          a += "if (" + h + " > " + d + ") {\n";
          a += b.INDENT + e + " = -" + e + ";\n";
          a =
              a +
              "}\nfor (" +
              (c +
                  " = " +
                  h +
                  "; " +
                  e +
                  " >= 0 ? " +
                  c +
                  " <= " +
                  d +
                  " : " +
                  c +
                  " >= " +
                  d +
                  "; " +
                  c +
                  " += " +
                  e +
                  ") {\n" +
                  g +
                  "}\n");
        }
        return a;
      },
      controls_forEach$$module$build$src$generators$javascript$loops = function (
          a,
          b,
      ) {
        const c = b.nameDB_.getName(
            a.getFieldValue("VAR"),
            $.NameType$$module$build$src$core$names.VARIABLE,
        );
        var d =
            b.valueToCode(
                a,
                "LIST",
                Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
            ) || "[]";
        let e = b.statementToCode(a, "DO");
        e = b.addLoopTrap(e, a);
        a = "";
        let f = d;
        d.match(/^\w+$/) ||
        ((f = b.nameDB_.getDistinctName(
            c + "_list",
            $.NameType$$module$build$src$core$names.VARIABLE,
        )),
            (a += "var " + f + " = " + d + ";\n"));
        d = b.nameDB_.getDistinctName(
            c + "_index",
            $.NameType$$module$build$src$core$names.VARIABLE,
        );
        e = b.INDENT + c + " = " + f + "[" + d + "];\n" + e;
        return a + ("for (var " + d + " in " + f + ") {\n" + e + "}\n");
      },
      controls_flow_statements$$module$build$src$generators$javascript$loops =
          function (a, b) {
            let c = "";
            b.STATEMENT_PREFIX && (c += b.injectId(b.STATEMENT_PREFIX, a));
            b.STATEMENT_SUFFIX && (c += b.injectId(b.STATEMENT_SUFFIX, a));
            if (b.STATEMENT_PREFIX) {
              const d = a.getSurroundLoop();
              d &&
              !d.suppressPrefixSuffix &&
              (c += b.injectId(b.STATEMENT_PREFIX, d));
            }
            switch (a.getFieldValue("FLOW")) {
              case "BREAK":
                return c + "break;\n";
              case "CONTINUE":
                return c + "continue;\n";
            }
            throw Error("Unknown flow statement.");
          },
      math_number$$module$build$src$generators$javascript$math = function (a, b) {
        a = Number(a.getFieldValue("NUM"));
        return [
          a,
          0 <= a
              ? Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
              : Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION,
        ];
      },
      math_arithmetic$$module$build$src$generators$javascript$math = function (
          a,
          b,
      ) {
        var c = {
          ADD: [
            " + ",
            Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
          ],
          MINUS: [
            " - ",
            Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION,
          ],
          MULTIPLY: [
            " * ",
            Order$$module$build$src$generators$javascript$javascript_generator.MULTIPLICATION,
          ],
          DIVIDE: [
            " / ",
            Order$$module$build$src$generators$javascript$javascript_generator.DIVISION,
          ],
          POWER: [
            null,
            Order$$module$build$src$generators$javascript$javascript_generator.NONE,
          ],
        }[a.getFieldValue("OP")];
        const d = c[0];
        c = c[1];
        const e = b.valueToCode(a, "A", c) || "0";
        a = b.valueToCode(a, "B", c) || "0";
        return d
            ? [e + d + a, c]
            : [
              "Math.pow(" + e + ", " + a + ")",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
      },
      math_single$$module$build$src$generators$javascript$math = function (a, b) {
        const c = a.getFieldValue("OP");
        let d;
        if ("NEG" === c)
          return (
              (a =
                  b.valueToCode(
                      a,
                      "NUM",
                      Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION,
                  ) || "0"),
              "-" === a[0] && (a = " " + a),
                  [
                    "-" + a,
                    Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION,
                  ]
          );
        a =
            "SIN" === c || "COS" === c || "TAN" === c
                ? b.valueToCode(
                a,
                "NUM",
                Order$$module$build$src$generators$javascript$javascript_generator.DIVISION,
            ) || "0"
                : b.valueToCode(
                a,
                "NUM",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "0";
        switch (c) {
          case "ABS":
            d = "Math.abs(" + a + ")";
            break;
          case "ROOT":
            d = "Math.sqrt(" + a + ")";
            break;
          case "LN":
            d = "Math.log(" + a + ")";
            break;
          case "EXP":
            d = "Math.exp(" + a + ")";
            break;
          case "POW10":
            d = "Math.pow(10," + a + ")";
            break;
          case "ROUND":
            d = "Math.round(" + a + ")";
            break;
          case "ROUNDUP":
            d = "Math.ceil(" + a + ")";
            break;
          case "ROUNDDOWN":
            d = "Math.floor(" + a + ")";
            break;
          case "SIN":
            d = "Math.sin(" + a + " / 180 * Math.PI)";
            break;
          case "COS":
            d = "Math.cos(" + a + " / 180 * Math.PI)";
            break;
          case "TAN":
            d = "Math.tan(" + a + " / 180 * Math.PI)";
        }
        if (d)
          return [
            d,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
          ];
        switch (c) {
          case "LOG10":
            d = "Math.log(" + a + ") / Math.log(10)";
            break;
          case "ASIN":
            d = "Math.asin(" + a + ") / Math.PI * 180";
            break;
          case "ACOS":
            d = "Math.acos(" + a + ") / Math.PI * 180";
            break;
          case "ATAN":
            d = "Math.atan(" + a + ") / Math.PI * 180";
            break;
          default:
            throw Error("Unknown math operator: " + c);
        }
        return [
          d,
          Order$$module$build$src$generators$javascript$javascript_generator.DIVISION,
        ];
      },
      math_constant$$module$build$src$generators$javascript$math = function (
          a,
          b,
      ) {
        return {
          PI: [
            "Math.PI",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ],
          E: [
            "Math.E",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ],
          GOLDEN_RATIO: [
            "(1 + Math.sqrt(5)) / 2",
            Order$$module$build$src$generators$javascript$javascript_generator.DIVISION,
          ],
          SQRT2: [
            "Math.SQRT2",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ],
          SQRT1_2: [
            "Math.SQRT1_2",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ],
          INFINITY: [
            "Infinity",
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
          ],
        }[a.getFieldValue("CONSTANT")];
      },
      math_number_property$$module$build$src$generators$javascript$math =
          function (a, b) {
            var c = {
              EVEN: [
                " % 2 === 0",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY,
              ],
              ODD: [
                " % 2 === 1",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY,
              ],
              WHOLE: [
                " % 1 === 0",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY,
              ],
              POSITIVE: [
                " > 0",
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
              ],
              NEGATIVE: [
                " < 0",
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
              ],
              DIVISIBLE_BY: [
                null,
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY,
              ],
              PRIME: [
                null,
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              ],
            };
            const d = a.getFieldValue("PROPERTY"),
                [e, f, g] = c[d];
            c = b.valueToCode(a, "NUMBER_TO_CHECK", f) || "0";
            "PRIME" === d
                ? (a =
                    b.provideFunction_(
                        "mathIsPrime",
                        `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(n) {
  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods
  if (n == 2 || n == 3) {
    return true;
  }
  // False if n is NaN, negative, is 1, or not whole.
  // And false if n is divisible by 2 or 3.
  if (isNaN(n) || n <= 1 || n % 1 !== 0 || n % 2 === 0 || n % 3 === 0) {
    return false;
  }
  // Check all the numbers of form 6k +/- 1, up to sqrt(n).
  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {
    if (n % (x - 1) === 0 || n % (x + 1) === 0) {
      return false;
    }
  }
  return true;
}
`,
                    ) +
                    "(" +
                    c +
                    ")")
                : "DIVISIBLE_BY" === d
                    ? ((a =
                        b.valueToCode(
                            a,
                            "DIVISOR",
                            Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                        ) || "0"),
                        (a = c + " % " + a + " === 0"))
                    : (a = c + e);
            return [a, g];
          },
      math_change$$module$build$src$generators$javascript$math = function (a, b) {
        const c =
            b.valueToCode(
                a,
                "DELTA",
                Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
            ) || "0";
        a = b.nameDB_.getName(
            a.getFieldValue("VAR"),
            $.NameType$$module$build$src$core$names.VARIABLE,
        );
        return (
            a + " = (typeof " + a + " === 'number' ? " + a + " : 0) + " + c + ";\n"
        );
      },
      math_on_list$$module$build$src$generators$javascript$math = function (
          a,
          b,
      ) {
        var c = a.getFieldValue("OP");
        switch (c) {
          case "SUM":
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
                ) || "[]";
            a += ".reduce(function(x, y) {return x + y;}, 0)";
            break;
          case "MIN":
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = "Math.min.apply(null, " + a + ")";
            break;
          case "MAX":
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = "Math.max.apply(null, " + a + ")";
            break;
          case "AVERAGE":
            c = b.provideFunction_(
                "mathMean",
                `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(myList) {
  return myList.reduce(function(x, y) {return x + y;}, 0) / myList.length;
}
`,
            );
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = c + "(" + a + ")";
            break;
          case "MEDIAN":
            c = b.provideFunction_(
                "mathMedian",
                `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(myList) {
  var localList = myList.filter(function (x) {return typeof x === 'number';});
  if (!localList.length) return null;
  localList.sort(function(a, b) {return b - a;});
  if (localList.length % 2 === 0) {
    return (localList[localList.length / 2 - 1] + localList[localList.length / 2]) / 2;
  } else {
    return localList[(localList.length - 1) / 2];
  }
}
`,
            );
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = c + "(" + a + ")";
            break;
          case "MODE":
            c = b.provideFunction_(
                "mathModes",
                `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(values) {
  var modes = [];
  var counts = [];
  var maxCount = 0;
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    var found = false;
    var thisCount;
    for (var j = 0; j < counts.length; j++) {
      if (counts[j][0] === value) {
        thisCount = ++counts[j][1];
        found = true;
        break;
      }
    }
    if (!found) {
      counts.push([value, 1]);
      thisCount = 1;
    }
    maxCount = Math.max(thisCount, maxCount);
  }
  for (var j = 0; j < counts.length; j++) {
    if (counts[j][1] === maxCount) {
        modes.push(counts[j][0]);
    }
  }
  return modes;
}
`,
            );
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = c + "(" + a + ")";
            break;
          case "STD_DEV":
            c = b.provideFunction_(
                "mathStandardDeviation",
                `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(numbers) {
  var n = numbers.length;
  if (!n) return null;
  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;
  var variance = 0;
  for (var j = 0; j < n; j++) {
    variance += Math.pow(numbers[j] - mean, 2);
  }
  variance = variance / n;
  return Math.sqrt(variance);
}
`,
            );
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = c + "(" + a + ")";
            break;
          case "RANDOM":
            c = b.provideFunction_(
                "mathRandomList",
                `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(list) {
  var x = Math.floor(Math.random() * list.length);
  return list[x];
}
`,
            );
            a =
                b.valueToCode(
                    a,
                    "LIST",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "[]";
            a = c + "(" + a + ")";
            break;
          default:
            throw Error("Unknown operator: " + c);
        }
        return [
          a,
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      math_modulo$$module$build$src$generators$javascript$math = function (a, b) {
        const c =
            b.valueToCode(
                a,
                "DIVIDEND",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
            ) || "0";
        a =
            b.valueToCode(
                a,
                "DIVISOR",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
            ) || "0";
        return [
          c + " % " + a,
          Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
        ];
      },
      math_constrain$$module$build$src$generators$javascript$math = function (
          a,
          b,
      ) {
        const c =
                b.valueToCode(
                    a,
                    "VALUE",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "0",
            d =
                b.valueToCode(
                    a,
                    "LOW",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "0";
        a =
            b.valueToCode(
                a,
                "HIGH",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "Infinity";
        return [
          "Math.min(Math.max(" + c + ", " + d + "), " + a + ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      math_random_int$$module$build$src$generators$javascript$math = function (
          a,
          b,
      ) {
        const c =
            b.valueToCode(
                a,
                "FROM",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "0";
        a =
            b.valueToCode(
                a,
                "TO",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "0";
        return [
          b.provideFunction_(
              "mathRandomInt",
              `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}
`,
          ) +
          "(" +
          c +
          ", " +
          a +
          ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      math_random_float$$module$build$src$generators$javascript$math = function (
          a,
          b,
      ) {
        return [
          "Math.random()",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      math_atan2$$module$build$src$generators$javascript$math = function (a, b) {
        const c =
            b.valueToCode(
                a,
                "X",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "0";
        return [
          "Math.atan2(" +
          (b.valueToCode(
              a,
              "Y",
              Order$$module$build$src$generators$javascript$javascript_generator.NONE,
          ) || "0") +
          ", " +
          c +
          ") / Math.PI * 180",
          Order$$module$build$src$generators$javascript$javascript_generator.DIVISION,
        ];
      },
      procedures_defreturn$$module$build$src$generators$javascript$procedures =
          function (a, b) {
            const c = b.nameDB_.getName(
                a.getFieldValue("NAME"),
                $.NameType$$module$build$src$core$names.PROCEDURE,
            );
            var d = "";
            b.STATEMENT_PREFIX && (d += b.injectId(b.STATEMENT_PREFIX, a));
            b.STATEMENT_SUFFIX && (d += b.injectId(b.STATEMENT_SUFFIX, a));
            d && (d = b.prefixLines(d, b.INDENT));
            let e = "";
            b.INFINITE_LOOP_TRAP &&
            (e = b.prefixLines(b.injectId(b.INFINITE_LOOP_TRAP, a), b.INDENT));
            const f = b.statementToCode(a, "STACK");
            let g =
                    b.valueToCode(
                        a,
                        "RETURN",
                        Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                    ) || "",
                h = "";
            f && g && (h = d);
            g && (g = b.INDENT + "return " + g + ";\n");
            const k = [],
                l = a.getVars();
            for (let n = 0; n < l.length; n++)
              k[n] = b.nameDB_.getName(
                  l[n],
                  $.NameType$$module$build$src$core$names.VARIABLE,
              );
            d =
                "function " +
                c +
                "(" +
                k.join(", ") +
                ") {\n" +
                d +
                e +
                f +
                h +
                g +
                "}";
            d = b.scrub_(a, d);
            b.definitions_["%" + c] = d;
            return null;
          },
      procedures_callreturn$$module$build$src$generators$javascript$procedures =
          function (a, b) {
            const c = b.nameDB_.getName(
                    a.getFieldValue("NAME"),
                    $.NameType$$module$build$src$core$names.PROCEDURE,
                ),
                d = [],
                e = a.getVars();
            for (let f = 0; f < e.length; f++)
              d[f] =
                  b.valueToCode(
                      a,
                      "ARG" + f,
                      Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                  ) || "null";
            return [
              c + "(" + d.join(", ") + ")",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
          },
      procedures_callnoreturn$$module$build$src$generators$javascript$procedures =
          function (a, b) {
            return b.forBlock.procedures_callreturn(a, b)[0] + ";\n";
          },
      procedures_ifreturn$$module$build$src$generators$javascript$procedures =
          function (a, b) {
            let c =
                "if (" +
                (b.valueToCode(
                    a,
                    "CONDITION",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "false") +
                ") {\n";
            b.STATEMENT_SUFFIX &&
            (c += b.prefixLines(b.injectId(b.STATEMENT_SUFFIX, a), b.INDENT));
            a.hasReturnValue_
                ? ((a =
                    b.valueToCode(
                        a,
                        "VALUE",
                        Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                    ) || "null"),
                    (c += b.INDENT + "return " + a + ";\n"))
                : (c += b.INDENT + "return;\n");
            return c + "}\n";
          },
      text$$module$build$src$generators$javascript$text = function (a, b) {
        return [
          b.quote_(a.getFieldValue("TEXT")),
          Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
        ];
      },
      text_multiline$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        a = b.multiline_quote_(a.getFieldValue("TEXT"));
        b =
            -1 !== a.indexOf("+")
                ? Order$$module$build$src$generators$javascript$javascript_generator.ADDITION
                : Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC;
        return [a, b];
      },
      text_join$$module$build$src$generators$javascript$text = function (a, b) {
        switch (a.itemCount_) {
          case 0:
            return [
              "''",
              Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
            ];
          case 1:
            return (
                (a =
                    b.valueToCode(
                        a,
                        "ADD0",
                        Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                    ) || "''"),
                    forceString$$module$build$src$generators$javascript$text(a)
            );
          case 2:
            var c =
                b.valueToCode(
                    a,
                    "ADD0",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''";
            a =
                b.valueToCode(
                    a,
                    "ADD1",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''";
            return [
              forceString$$module$build$src$generators$javascript$text(c)[0] +
              " + " +
              forceString$$module$build$src$generators$javascript$text(a)[0],
              Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
            ];
          default:
            c = Array(a.itemCount_);
            for (let d = 0; d < a.itemCount_; d++)
              c[d] =
                  b.valueToCode(
                      a,
                      "ADD" + d,
                      Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                  ) || "''";
            return [
              "[" + c.join(",") + "].join('')",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
        }
      },
      text_append$$module$build$src$generators$javascript$text = function (a, b) {
        const c = b.nameDB_.getName(
            a.getFieldValue("VAR"),
            $.NameType$$module$build$src$core$names.VARIABLE,
        );
        a =
            b.valueToCode(
                a,
                "TEXT",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''";
        return (
            c +
            " += " +
            forceString$$module$build$src$generators$javascript$text(a)[0] +
            ";\n"
        );
      },
      text_length$$module$build$src$generators$javascript$text = function (a, b) {
        return [
          (b.valueToCode(
              a,
              "VALUE",
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ) || "''") + ".length",
          Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
        ];
      },
      text_isEmpty$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        return [
          "!" +
          (b.valueToCode(
              a,
              "VALUE",
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ) || "''") +
          ".length",
          Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT,
        ];
      },
      text_indexOf$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        const c = "FIRST" === a.getFieldValue("END") ? "indexOf" : "lastIndexOf",
            d =
                b.valueToCode(
                    a,
                    "FIND",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''";
        b =
            (b.valueToCode(
                a,
                "VALUE",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
            ) || "''") +
            "." +
            c +
            "(" +
            d +
            ")";
        return a.workspace.options.oneBasedIndex
            ? [
              b + " + 1",
              Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
            ]
            : [
              b,
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
      },
      text_charAt$$module$build$src$generators$javascript$text = function (a, b) {
        const c = a.getFieldValue("WHERE") || "FROM_START",
            d =
                b.valueToCode(
                    a,
                    "VALUE",
                    "RANDOM" === c
                        ? Order$$module$build$src$generators$javascript$javascript_generator.NONE
                        : Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
                ) || "''";
        switch (c) {
          case "FIRST":
            return [
              d + ".charAt(0)",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
          case "LAST":
            return [
              d + ".slice(-1)",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
          case "FROM_START":
            return (
                (a = b.getAdjusted(a, "AT")),
                    [
                      d + ".charAt(" + a + ")",
                      Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
                    ]
            );
          case "FROM_END":
            return (
                (a = b.getAdjusted(a, "AT", 1, !0)),
                    [
                      d + ".slice(" + a + ").charAt(0)",
                      Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
                    ]
            );
          case "RANDOM":
            return [
              b.provideFunction_(
                  "textRandomLetter",
                  `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(text) {
  var x = Math.floor(Math.random() * text.length);
  return text[x];
}
`,
              ) +
              "(" +
              d +
              ")",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
        }
        throw Error("Unhandled option (text_charAt).");
      },
      text_getSubstring$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        var c = a.getFieldValue("WHERE1");
        const d = a.getFieldValue("WHERE2");
        var e =
                "FROM_END" !== c && "LAST" !== c && "FROM_END" !== d && "LAST" !== d,
            f =
                b.valueToCode(
                    a,
                    "STRING",
                    e
                        ? Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                        : Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''";
        if ("FIRST" === c && "LAST" === d)
          return [
            f,
            Order$$module$build$src$generators$javascript$javascript_generator.NONE,
          ];
        if (f.match(/^'?\w+'?$/) || e) {
          switch (c) {
            case "FROM_START":
              c = b.getAdjusted(a, "AT1");
              break;
            case "FROM_END":
              c = b.getAdjusted(
                  a,
                  "AT1",
                  1,
                  !1,
                  Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION,
              );
              c = f + ".length - " + c;
              break;
            case "FIRST":
              c = "0";
              break;
            default:
              throw Error("Unhandled option (text_getSubstring).");
          }
          switch (d) {
            case "FROM_START":
              b = b.getAdjusted(a, "AT2", 1);
              break;
            case "FROM_END":
              b = b.getAdjusted(
                  a,
                  "AT2",
                  0,
                  !1,
                  Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION,
              );
              b = f + ".length - " + b;
              break;
            case "LAST":
              b = f + ".length";
              break;
            default:
              throw Error("Unhandled option (text_getSubstring).");
          }
          f = f + ".slice(" + c + ", " + b + ")";
        } else {
          e = b.getAdjusted(a, "AT1");
          a = b.getAdjusted(a, "AT2");
          const g = {
            FIRST: "First",
            LAST: "Last",
            FROM_START: "FromStart",
            FROM_END: "FromEnd",
          };
          f =
              b.provideFunction_(
                  "subsequence" + g[c] + g[d],
                  `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(sequence${
                      "FROM_END" === c || "FROM_START" === c ? ", at1" : ""
                  }${"FROM_END" === d || "FROM_START" === d ? ", at2" : ""}) {
  var start = ${getSubstringIndex$$module$build$src$generators$javascript$text(
                      "sequence",
                      c,
                      "at1",
                  )};
  var end = ${getSubstringIndex$$module$build$src$generators$javascript$text(
                      "sequence",
                      d,
                      "at2",
                  )} + 1;
  return sequence.slice(start, end);
}
`,
              ) +
              "(" +
              f +
              ("FROM_END" === c || "FROM_START" === c ? ", " + e : "") +
              ("FROM_END" === d || "FROM_START" === d ? ", " + a : "") +
              ")";
        }
        return [
          f,
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      text_changeCase$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        const c = {
          UPPERCASE: ".toUpperCase()",
          LOWERCASE: ".toLowerCase()",
          TITLECASE: null,
        }[a.getFieldValue("CASE")];
        a =
            b.valueToCode(
                a,
                "TEXT",
                c
                    ? Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                    : Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''";
        return [
          c
              ? a + c
              : b.provideFunction_(
                  "textToTitleCase",
                  `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(str) {
  return str.replace(/\\S+/g,
      function(txt) {return txt[0].toUpperCase() + txt.substring(1).toLowerCase();});
}
`,
              ) +
              "(" +
              a +
              ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      text_trim$$module$build$src$generators$javascript$text = function (a, b) {
        const c = {
          LEFT: ".replace(/^[\\s\\xa0]+/, '')",
          RIGHT: ".replace(/[\\s\\xa0]+$/, '')",
          BOTH: ".trim()",
        }[a.getFieldValue("MODE")];
        return [
          (b.valueToCode(
              a,
              "TEXT",
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ) || "''") + c,
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      text_print$$module$build$src$generators$javascript$text = function (a, b) {
        return (
            "window.alert(" +
            (b.valueToCode(
                a,
                "TEXT",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''") +
            ");\n"
        );
      },
      text_prompt_ext$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        b =
            "window.prompt(" +
            (a.getField("TEXT")
                ? b.quote_(a.getFieldValue("TEXT"))
                : b.valueToCode(
                a,
                "TEXT",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''") +
            ")";
        "NUMBER" === a.getFieldValue("TYPE") && (b = "Number(" + b + ")");
        return [
          b,
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      text_count$$module$build$src$generators$javascript$text = function (a, b) {
        const c =
            b.valueToCode(
                a,
                "TEXT",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''";
        a =
            b.valueToCode(
                a,
                "SUB",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''";
        return [
          b.provideFunction_(
              "textCount",
              `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(haystack, needle) {
  if (needle.length === 0) {
    return haystack.length + 1;
  } else {
    return haystack.split(needle).length - 1;
  }
}
`,
          ) +
          "(" +
          c +
          ", " +
          a +
          ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      text_replace$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        const c =
                b.valueToCode(
                    a,
                    "TEXT",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''",
            d =
                b.valueToCode(
                    a,
                    "FROM",
                    Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                ) || "''";
        a =
            b.valueToCode(
                a,
                "TO",
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
            ) || "''";
        return [
          b.provideFunction_(
              "textReplace",
              `
function ${b.FUNCTION_NAME_PLACEHOLDER_}(haystack, needle, replacement) {
  needle = needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g, '\\\\$1')
                 .replace(/\\x08/g, '\\\\x08');
  return haystack.replace(new RegExp(needle, 'g'), replacement);
}
`,
          ) +
          "(" +
          c +
          ", " +
          d +
          ", " +
          a +
          ")",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      text_reverse$$module$build$src$generators$javascript$text = function (
          a,
          b,
      ) {
        return [
          (b.valueToCode(
              a,
              "TEXT",
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
          ) || "''") + ".split('').reverse().join('')",
          Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
        ];
      },
      variables_get$$module$build$src$generators$javascript$variables = function (
          a,
          b,
      ) {
        return [
          b.nameDB_.getName(
              a.getFieldValue("VAR"),
              $.NameType$$module$build$src$core$names.VARIABLE,
          ),
          Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
        ];
      },
      variables_set$$module$build$src$generators$javascript$variables = function (
          a,
          b,
      ) {
        const c =
            b.valueToCode(
                a,
                "VALUE",
                Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT,
            ) || "0";
        return (
            b.nameDB_.getName(
                a.getFieldValue("VAR"),
                $.NameType$$module$build$src$core$names.VARIABLE,
            ) +
            " = " +
            c +
            ";\n"
        );
      },
      Order$$module$build$src$generators$javascript$javascript_generator = {
        ATOMIC: 0,
        NEW: 1.1,
        MEMBER: 1.2,
        FUNCTION_CALL: 2,
        INCREMENT: 3,
        DECREMENT: 3,
        BITWISE_NOT: 4.1,
        UNARY_PLUS: 4.2,
        UNARY_NEGATION: 4.3,
        LOGICAL_NOT: 4.4,
        TYPEOF: 4.5,
        VOID: 4.6,
        DELETE: 4.7,
        AWAIT: 4.8,
        EXPONENTIATION: 5,
        MULTIPLICATION: 5.1,
        DIVISION: 5.2,
        MODULUS: 5.3,
        SUBTRACTION: 6.1,
        ADDITION: 6.2,
        BITWISE_SHIFT: 7,
        RELATIONAL: 8,
        IN: 8,
        INSTANCEOF: 8,
        EQUALITY: 9,
        BITWISE_AND: 10,
        BITWISE_XOR: 11,
        BITWISE_OR: 12,
        LOGICAL_AND: 13,
        LOGICAL_OR: 14,
        CONDITIONAL: 15,
        ASSIGNMENT: 16,
        YIELD: 17,
        COMMA: 18,
        NONE: 99,
      },
      JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator = class extends $.CodeGenerator$$module$build$src$core$generator {
        constructor(a) {
          super(null != a ? a : "JavaScript");
          this.ORDER_OVERRIDES = [
            [
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT,
              Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.MULTIPLICATION,
              Order$$module$build$src$generators$javascript$javascript_generator.MULTIPLICATION,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
              Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_AND,
              Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_AND,
            ],
            [
              Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_OR,
              Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_OR,
            ],
          ];
          this.isInitialized = !1;
          for (const b in Order$$module$build$src$generators$javascript$javascript_generator)
            this["ORDER_" + b] =
                Order$$module$build$src$generators$javascript$javascript_generator[
                    b
                    ];
          this.addReservedWords(
              "break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,enum,implements,interface,let,package,private,protected,public,static,await,null,true,false,arguments," +
              Object.getOwnPropertyNames(globalThis).join(","),
          );
        }
        init(a) {
          super.init(a);
          this.nameDB_
              ? this.nameDB_.reset()
              : (this.nameDB_ = new $.Names$$module$build$src$core$names(
                  this.RESERVED_WORDS_,
              ));
          this.nameDB_.setVariableMap(a.getVariableMap());
          this.nameDB_.populateVariables(a);
          this.nameDB_.populateProcedures(a);
          const b = [];
          var c = $.allDeveloperVariables$$module$build$src$core$variables(a);
          for (let d = 0; d < c.length; d++)
            b.push(
                this.nameDB_.getName(
                    c[d],
                    $.NameType$$module$build$src$core$names.DEVELOPER_VARIABLE,
                ),
            );
          a = $.allUsedVarModels$$module$build$src$core$variables(a);
          for (c = 0; c < a.length; c++)
            b.push(
                this.nameDB_.getName(
                    a[c].getId(),
                    $.NameType$$module$build$src$core$names.VARIABLE,
                ),
            );
          b.length && (this.definitions_.variables = "var " + b.join(", ") + ";");
          this.isInitialized = !0;
        }
        finish(a) {
          const b = Object.values(this.definitions_);
          super.finish(a);
          this.isInitialized = !1;
          this.nameDB_.reset();
          return b.join("\n\n") + "\n\n\n" + a;
        }
        scrubNakedValue(a) {
          return a + ";\n";
        }
        quote_(a) {
          a = a
              .replace(/\\/g, "\\\\")
              .replace(/\n/g, "\\\n")
              .replace(/'/g, "\\'");
          return "'" + a + "'";
        }
        multiline_quote_(a) {
          return a.split(/\n/g).map(this.quote_).join(" + '\\n' +\n");
        }
        scrub_(a, b, c) {
          let d = "";
          if (!a.outputConnection || !a.outputConnection.targetConnection) {
            var e = a.getCommentText();
            e &&
            ((e = $.wrap$$module$build$src$core$utils$string(
                e,
                this.COMMENT_WRAP - 3,
            )),
                (d += this.prefixLines(e + "\n", "// ")));
            for (let f = 0; f < a.inputList.length; f++)
              a.inputList[f].type ===
              $.inputTypes$$module$build$src$core$inputs$input_types.VALUE &&
              (e = a.inputList[f].connection.targetBlock()) &&
              (e = this.allNestedComments(e)) &&
              (d += this.prefixLines(e, "// "));
          }
          a = a.nextConnection && a.nextConnection.targetBlock();
          c = c ? "" : this.blockToCode(a);
          return d + b + c;
        }
        getAdjusted(a, b, c, d, e) {
          c = c || 0;
          e = e || this.ORDER_NONE;
          a.workspace.options.oneBasedIndex && c--;
          const f = a.workspace.options.oneBasedIndex ? "1" : "0";
          let g,
              h = e;
          0 < c
              ? (g = h = this.ORDER_ADDITION)
              : 0 > c
                  ? (g = h = this.ORDER_SUBTRACTION)
                  : d && (g = h = this.ORDER_UNARY_NEGATION);
          a = this.valueToCode(a, b, h) || f;
          $.isNumber$$module$build$src$core$utils$string(a)
              ? ((a = Number(a) + c), d && (a = -a))
              : (0 < c ? (a = a + " + " + c) : 0 > c && (a = a + " - " + -c),
              d && (a = c ? "-(" + a + ")" : "-" + a),
                  (g = Math.floor(g)),
                  (e = Math.floor(e)),
              g && e >= g && (a = "(" + a + ")"));
          return a;
        }
      },
      module$build$src$generators$javascript$javascript_generator = {};
  module$build$src$generators$javascript$javascript_generator.JavascriptGenerator =
      JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator;
  module$build$src$generators$javascript$javascript_generator.Order =
      Order$$module$build$src$generators$javascript$javascript_generator;
  var module$build$src$generators$javascript$colour = {};
  module$build$src$generators$javascript$colour.colour_blend =
      colour_blend$$module$build$src$generators$javascript$colour;
  module$build$src$generators$javascript$colour.colour_picker =
      colour_picker$$module$build$src$generators$javascript$colour;
  module$build$src$generators$javascript$colour.colour_random =
      colour_random$$module$build$src$generators$javascript$colour;
  module$build$src$generators$javascript$colour.colour_rgb =
      colour_rgb$$module$build$src$generators$javascript$colour;
  var getSubstringIndex$$module$build$src$generators$javascript$lists =
          function (a, b, c) {
            return "FIRST" === b
                ? "0"
                : "FROM_END" === b
                    ? a + ".length - 1 - " + c
                    : "LAST" === b
                        ? a + ".length - 1"
                        : c;
          },
      module$build$src$generators$javascript$lists = {};
  module$build$src$generators$javascript$lists.lists_create_empty =
      lists_create_empty$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_create_with =
      lists_create_with$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_getIndex =
      lists_getIndex$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_getSublist =
      lists_getSublist$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_indexOf =
      lists_indexOf$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_isEmpty =
      lists_isEmpty$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_length =
      lists_length$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_repeat =
      lists_repeat$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_reverse =
      lists_reverse$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_setIndex =
      lists_setIndex$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_sort =
      lists_sort$$module$build$src$generators$javascript$lists;
  module$build$src$generators$javascript$lists.lists_split =
      lists_split$$module$build$src$generators$javascript$lists;
  var controls_ifelse$$module$build$src$generators$javascript$logic =
          controls_if$$module$build$src$generators$javascript$logic,
      module$build$src$generators$javascript$logic = {};
  module$build$src$generators$javascript$logic.controls_if =
      controls_if$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.controls_ifelse =
      controls_if$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.logic_boolean =
      logic_boolean$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.logic_compare =
      logic_compare$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.logic_negate =
      logic_negate$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.logic_null =
      logic_null$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.logic_operation =
      logic_operation$$module$build$src$generators$javascript$logic;
  module$build$src$generators$javascript$logic.logic_ternary =
      logic_ternary$$module$build$src$generators$javascript$logic;
  var controls_repeat$$module$build$src$generators$javascript$loops =
          controls_repeat_ext$$module$build$src$generators$javascript$loops,
      module$build$src$generators$javascript$loops = {};
  module$build$src$generators$javascript$loops.controls_flow_statements =
      controls_flow_statements$$module$build$src$generators$javascript$loops;
  module$build$src$generators$javascript$loops.controls_for =
      controls_for$$module$build$src$generators$javascript$loops;
  module$build$src$generators$javascript$loops.controls_forEach =
      controls_forEach$$module$build$src$generators$javascript$loops;
  module$build$src$generators$javascript$loops.controls_repeat =
      controls_repeat_ext$$module$build$src$generators$javascript$loops;
  module$build$src$generators$javascript$loops.controls_repeat_ext =
      controls_repeat_ext$$module$build$src$generators$javascript$loops;
  module$build$src$generators$javascript$loops.controls_whileUntil =
      controls_whileUntil$$module$build$src$generators$javascript$loops;
  var math_round$$module$build$src$generators$javascript$math =
          math_single$$module$build$src$generators$javascript$math,
      math_trig$$module$build$src$generators$javascript$math =
          math_single$$module$build$src$generators$javascript$math,
      module$build$src$generators$javascript$math = {};
  module$build$src$generators$javascript$math.math_arithmetic =
      math_arithmetic$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_atan2 =
      math_atan2$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_change =
      math_change$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_constant =
      math_constant$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_constrain =
      math_constrain$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_modulo =
      math_modulo$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_number =
      math_number$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_number_property =
      math_number_property$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_on_list =
      math_on_list$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_random_float =
      math_random_float$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_random_int =
      math_random_int$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_round =
      math_single$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_single =
      math_single$$module$build$src$generators$javascript$math;
  module$build$src$generators$javascript$math.math_trig =
      math_single$$module$build$src$generators$javascript$math;
  var procedures_defnoreturn$$module$build$src$generators$javascript$procedures =
          procedures_defreturn$$module$build$src$generators$javascript$procedures,
      module$build$src$generators$javascript$procedures = {};
  module$build$src$generators$javascript$procedures.procedures_callnoreturn =
      procedures_callnoreturn$$module$build$src$generators$javascript$procedures;
  module$build$src$generators$javascript$procedures.procedures_callreturn =
      procedures_callreturn$$module$build$src$generators$javascript$procedures;
  module$build$src$generators$javascript$procedures.procedures_defnoreturn =
      procedures_defreturn$$module$build$src$generators$javascript$procedures;
  module$build$src$generators$javascript$procedures.procedures_defreturn =
      procedures_defreturn$$module$build$src$generators$javascript$procedures;
  module$build$src$generators$javascript$procedures.procedures_ifreturn =
      procedures_ifreturn$$module$build$src$generators$javascript$procedures;
  var strRegExp$$module$build$src$generators$javascript$text =
          /^\s*'([^']|\\')*'\s*$/,
      forceString$$module$build$src$generators$javascript$text = function (a) {
        return strRegExp$$module$build$src$generators$javascript$text.test(a)
            ? [
              a,
              Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC,
            ]
            : [
              "String(" + a + ")",
              Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
            ];
      },
      getSubstringIndex$$module$build$src$generators$javascript$text = function (
          a,
          b,
          c,
      ) {
        return "FIRST" === b
            ? "0"
            : "FROM_END" === b
                ? a + ".length - 1 - " + c
                : "LAST" === b
                    ? a + ".length - 1"
                    : c;
      },
      text_prompt$$module$build$src$generators$javascript$text =
          text_prompt_ext$$module$build$src$generators$javascript$text,
      module$build$src$generators$javascript$text = {};
  module$build$src$generators$javascript$text.text =
      text$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_append =
      text_append$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_changeCase =
      text_changeCase$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_charAt =
      text_charAt$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_count =
      text_count$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_getSubstring =
      text_getSubstring$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_indexOf =
      text_indexOf$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_isEmpty =
      text_isEmpty$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_join =
      text_join$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_length =
      text_length$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_multiline =
      text_multiline$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_print =
      text_print$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_prompt =
      text_prompt_ext$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_prompt_ext =
      text_prompt_ext$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_replace =
      text_replace$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_reverse =
      text_reverse$$module$build$src$generators$javascript$text;
  module$build$src$generators$javascript$text.text_trim =
      text_trim$$module$build$src$generators$javascript$text;
  var module$build$src$generators$javascript$variables = {};
  module$build$src$generators$javascript$variables.variables_get =
      variables_get$$module$build$src$generators$javascript$variables;
  module$build$src$generators$javascript$variables.variables_set =
      variables_set$$module$build$src$generators$javascript$variables;
  var module$build$src$generators$javascript$variables_dynamic = {};
  module$build$src$generators$javascript$variables_dynamic.variables_get_dynamic =
      variables_get$$module$build$src$generators$javascript$variables;
  module$build$src$generators$javascript$variables_dynamic.variables_set_dynamic =
      variables_set$$module$build$src$generators$javascript$variables;
  var javascriptGenerator$$module$build$src$generators$javascript =
      new JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator();
  Object.assign(
      javascriptGenerator$$module$build$src$generators$javascript.forBlock,
      module$build$src$generators$javascript$colour,
      module$build$src$generators$javascript$lists,
      module$build$src$generators$javascript$logic,
      module$build$src$generators$javascript$loops,
      module$build$src$generators$javascript$math,
      module$build$src$generators$javascript$procedures,
      module$build$src$generators$javascript$text,
      module$build$src$generators$javascript$variables,
      module$build$src$generators$javascript$variables_dynamic,
  );
  var module$build$src$generators$javascript = {};
  module$build$src$generators$javascript.JavascriptGenerator =
      JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator;
  module$build$src$generators$javascript.Order =
      Order$$module$build$src$generators$javascript$javascript_generator;
  module$build$src$generators$javascript.javascriptGenerator =
      javascriptGenerator$$module$build$src$generators$javascript;
  module$build$src$generators$javascript.__namespace__ = $;
  return module$build$src$generators$javascript;
});