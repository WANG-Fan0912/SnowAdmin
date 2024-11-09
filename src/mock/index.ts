import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import testModule from "./test/index";

export function setupProdMockServer() {
  createProdMockServer([...testModule]);
}
