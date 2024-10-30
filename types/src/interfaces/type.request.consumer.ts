import { MODULE_TYPE } from "../enums";

export interface ConsumerRequest {
  actionType?: string;
  moduleType: MODULE_TYPE;
  entityId: string;
}
