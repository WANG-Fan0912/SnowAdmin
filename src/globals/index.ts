import { useSystemStore } from "@/store/modules/system";
import { storeToRefs } from "pinia";
import { Message } from "@arco-design/web-vue";
/**
 * 字典解析
 * @param { string } code 字典编码code
 * @return 返回字典的list
 */
export const dictFilter = (code: string) => {
  try {
    const system = useSystemStore();
    let { dict } = storeToRefs(system);
    if (!dict.value) return [];
    let curr = dict.value.find((item: any) => item.code === code);
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
 *
 * Message提示框
 * @param {string} type 提示框类型
 * @param {string} content 提示框内容
 * @param {boolean} closable 是否可关闭
 * @param {string} position 提示框位置
 * @param {any} icon 提示框图标
 */
export const arcoMessage = (type: string, content: string, closable: boolean = false, position: string = "top", icon?: any) => {
  interface ArcoMessage {
    content: string;
    closable?: boolean;
    position?: string;
    icon?: any;
  }
  let message: ArcoMessage = {
    content,
    closable,
    position
  };
  // icon必须是一个组件，例如：import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';
  if (icon) {
    message.icon = () => h(icon);
  }
  switch (type) {
    case "info":
      Message.info(message);
      break;
    case "success":
      Message.success(message);
      break;
    case "warning":
      Message.warning(message);
      break;
    case "error":
      Message.error(message);
      break;
    case "loading":
      Message.loading(message);
      break;
    case "normal":
      Message.normal(message);
      break;
    case "clear":
      Message.clear(message);
      break;
    default:
      Message.info(message);
      break;
  }
};
