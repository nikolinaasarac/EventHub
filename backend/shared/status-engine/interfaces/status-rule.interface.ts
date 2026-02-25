export interface StatusRule<
  Entity,
  StatusType extends string | number = string,
> {
  from: StatusType | StatusType[];
  to: StatusType;
  condition: (entity: Entity, now: Date) => boolean;
}
