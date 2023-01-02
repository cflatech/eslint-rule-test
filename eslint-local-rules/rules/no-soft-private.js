"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => "");
const rule = createRule({
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
            unexpectedSoftPrivate: "soft private ではなく、hard privateを利用してください",
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
