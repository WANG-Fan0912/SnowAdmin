import { useSystemStore } from "@/store/modules/system";
import { storeToRefs } from "pinia";
import { Message } from "@arco-design/web-vue";
/**
 * 字典解析
 * @param { string } key 字典key
 * @return 返回字典的list
 */
export const dictFilter = (key: string) => {
  try {
    const system = useSystemStore();
    let { dict } = storeToRefs(system);
    if (!dict.value) return [];
    let curr = dict.value.find((item: any) => item.value === key);
    if (curr?.list?.length > 0) {
      return curr.list;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

/**
 * Message提示框
 * @param type 提示类型
 * @param text 提示文字
 */
export const arcoMessage = (type: string, text: string) => {
  switch (type) {
    case "info":
      Message.info(text);
      break;
    case "success":
      Message.success(text);
      break;
    case "warning":
      Message.warning(text);
      break;
    case "error":
      Message.error(text);
      break;
    case "loading":
      Message.loading(text);
      break;
    case "normal":
      Message.normal(text);
      break;
    case "clear":
      Message.clear(text);
      break;
    default:
      Message.info(text);
      break;
  }
};
