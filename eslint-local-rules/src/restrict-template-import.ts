import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => "");

const rule = createRule<[], "RestrictModuleImport" | "RestrictComponentImport">(
  {
    name: "restrict-modules-import",
    meta: {
      type: "problem",
      hasSuggestions: false,
      docs: {
        recommended: "error",
        description: "template内でのimportを制限する",
      },
      fixable: "code",
      messages: {
        RestrictModuleImport:
          "template内でCommon以外の名称の異なるディレクトリのmoduleをimportしないでください\n{{ test }}",
        RestrictComponentImport:
          "module以外のcomponentをimportしないでください",
      },
      schema: [],
    },
    defaultOptions: [],
    create(context) {
      return {
        ImportDeclaration(node) {
          const filePath = context
            .getPhysicalFilename()
            .replace(context.getCwd(), "");

          // TemplateのDir取得
          const templateRegexResult = filePath.match(
            /templates\/(?<dir>.*?)\//
          );
          if (!templateRegexResult?.groups) {
            return;
          }
          const templateDir = templateRegexResult.groups["dir"];

          // parts/templateのimport制限
          const componentRegexResult = node.source.value.match(
            /\.\.\/(parts|templates)\//
          );
          if (componentRegexResult) {
            context.report({
              node,
              messageId: "RestrictComponentImport",
            });
          }

          if (!filePath.includes("templates")) {
            return;
          }

          // moduleのDir取得
          const moduleRegexResult = node.source.value.match(
            /modules\/(?<dir>.*?)\//
          );
          if (!moduleRegexResult?.groups) {
            return;
          }
          const moduleDir = moduleRegexResult.groups["dir"];

          // Dir同一チェック
          if (moduleDir === templateDir) {
            return;
          }

          if (moduleDir === "Common") {
            return;
          }

          context.report({
            node,
            messageId: "RestrictModuleImport",
            data: { test: `${templateDir}:${moduleDir}` },
          });
        },
      };
    },
  }
);

module.exports = rule;
