import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import testModule from "./test/index";
import userModule from "./user/index";
import systemModule from "./system/index";

export function setupProdMockServer() {
  createProdMockServer([...testModule, ...userModule, ...systemModule]);
}
