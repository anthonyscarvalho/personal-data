import { MODULE_TYPES } from "../enums";

export interface ConsumerRequest {
  actionType?: string;
  moduleType: MODULE_TYPES;
  entityId: string;
}
