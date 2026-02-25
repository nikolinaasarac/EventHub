import { Injectable } from '@nestjs/common';
import { StatusRule } from '../interfaces/status-rule.interface';

@Injectable()
export class StatusEngineService {
  checkStatus<Entity, StatusType extends string | number>(
    entity: Entity & { status: StatusType },
    rules: StatusRule<Entity, StatusType>[],
    now: Date = new Date(),
  ): StatusType | null {
    for (const rule of rules) {
      const fromStatuses = Array.isArray(rule.from) ? rule.from : [rule.from];
      if (fromStatuses.includes(entity.status) && rule.condition(entity, now)) {
        return rule.to;
      }
    }
    return null;
  }

  async applyRules<Entity, StatusType extends string | number>(
    entity: Entity & { status: StatusType },
    rules: StatusRule<Entity, StatusType>[],
    updateCallback: (entity: Entity, newStatus: StatusType) => Promise<void>,
  ) {
    const newStatus = this.checkStatus(entity, rules);
    if (newStatus && newStatus !== entity.status) {
      await updateCallback(entity, newStatus);
    }
  }
}
