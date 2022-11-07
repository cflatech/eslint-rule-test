import { RuleTester } from "eslint";

import { rule } from "../src/no-process-node-env";

const ruleTester = new RuleTester();

ruleTester.run("no-process-node-env", rule, {
  valid: ["process.env.hoge", "process.env"],
  invalid: [
    {
      code: "process.env.NODE_ENV",
      // fixが入る場合はfix後の値を定義
      output: "myNodeEnv()",
      errors: [
        {
          messageId: "unexpectedProcessEnvNodeEnv",
          type: "MemberExpression",
        },
      ],
    },
  ],
});
