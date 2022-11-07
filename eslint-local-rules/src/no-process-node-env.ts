import { Rule } from "eslint";
import {
  Expression,
  Identifier,
  MemberExpression,
  PrivateIdentifier,
  Super,
} from "estree";

function isMemberExpression(
  object: Expression | Super
): object is MemberExpression {
  return object.type === "MemberExpression";
}

const isIdentifier = (
  expression: Expression | Super | PrivateIdentifier
): expression is Identifier => {
  return expression.type === "Identifier";
};

export const rule: Rule.RuleModule = {
  // ruleの説明
  meta: {
    type: "problem",
    hasSuggestions: true,
    docs: {
      description: "許可されていないprocess.env.NODENV",
    },
    fixable: "code",
    messages: {
      unexpectedProcessEnvNodeEnv:
        "process.env.NODE_ENVは許可されていません。myNodeenv()を利用してください",
      replaceToNodeEnv: "myNodeEnv()に書き換える",
    },
  },
  // ruleの実装
  create(context: Rule.RuleContext) {
    return {
      MemberExpression(node) {
        const sourceNode = node.object;

        if (!isMemberExpression(sourceNode)) {
          return;
        }

        const sourceObject = sourceNode.object;
        const sourceProperty = sourceNode.property;
        const targetProperty = node.property;

        if (!isIdentifier(sourceObject)) {
          return;
        }

        if (!isIdentifier(sourceProperty)) {
          return;
        }

        if (!isIdentifier(targetProperty)) {
          return;
        }

        if (sourceProperty.name !== "env") {
          return;
        }

        if (sourceObject.name !== "process") {
          return;
        }

        if (targetProperty.name !== "NODE_ENV") {
          return;
        }

        context.report({
          node,
          // metaのmessages
          messageId: "unexpectedProcessEnvNodeEnv",
          fix(fixer) {
            return fixer.replaceText(node, "myNodeEnv()");
          },
        });
      },
    };
  },
};
