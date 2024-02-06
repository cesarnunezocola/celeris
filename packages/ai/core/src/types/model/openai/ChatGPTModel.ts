import { LanguageModel } from "../llm";

export enum ChatGPTModelEnum {
  /**
   * GPT 3.5 Turbo
   */
  GPT3_5 = "gpt-3.5-turbo",
  GPT3_5_1106 = "gpt-3.5-turbo-1106",
  GPT3_5_16K = "gpt-3.5-turbo-16k",
  GPT3_5_0125 = "gpt-3.5-turbo-0125",
  /**
   * GPT 4
   */
  GPT4 = "gpt-4",
  GPT4_32K = "gpt-4-32k",
  GPT4_PREVIEW = "gpt-4-0125-preview",
  GPT4_VISION_PREVIEW = "gpt-4-vision-preview",
}

// 语言模型的设置参数
export interface ChatGPTParams {
  /**
   * 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 0.6
   */
  temperature?: number;
  /**
   * 控制生成文本中最高概率的单个 token
   * @default 1
   */
  top_p?: number;
}

/**
 * Interface representing a chat model card.
 */
export interface ChatModelCard {
  /** Description of the chat model. */
  description?: string;
  /** Display name of the chat model. */
  displayName?: string;
  /**
   * Indicates whether the model supports file upload.
   */
  files?: boolean;
  /**
   * Indicates whether the model supports function call.
   */
  functionCall?: boolean;
  /** Indicates whether the chat model is hidden. */
  hidden?: boolean;
  /** Unique identifier for the chat model. */
  id: string;
  /**
   * Indicates whether the chat model is custom.
   */
  isCustom?: boolean;
  /**
   * Indicates whether the chat model is legacy (deprecated but not removed yet).
   */
  legacy?: boolean;
  /** Number of tokens supported by the chat model. */
  tokens?: number;
  /**
   * Indicates whether the model supports vision.
   */
  vision?: boolean;
}

export interface ModelProviderCard {
  chatModels: ChatModelCard[];
  enabled?: boolean;
  id: string;
}

export type ChatGPTRoleType = "user" | "system" | "assistant" | "function";

export interface ChatGPTMessage {
  content: string;
  role: ChatGPTRoleType;
}

export class ChatGPTModel extends LanguageModel<ChatGPTParams> {
  static _model: ChatGPTModelEnum;
}