import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => "");

const rule = createRule<[], "unexpectedSoftPrivate">({
  name: "no-soft-private",
  meta: {
    type: "problem",
    hasSuggestions: false,
    docs: {
      recommended: "error",
      description: "soft private not allow",
    },
    fixable: "code",
    messages: {
      unexpectedSoftPrivate:
        "soft private ではなく、hard privateを利用してください",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (node.accessibility !== "private") {
          return;
        }

        context.report({
          node,
          messageId: "unexpectedSoftPrivate",
        });
      },
    };
  },
});

module.exports = rule;
