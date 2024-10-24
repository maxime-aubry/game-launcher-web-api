import type { InputJsonValue } from '@prisma/client/runtime/library';
import type { StrategyModel } from './strategy.model';

export abstract class CredentialsModel {
  constructor(strategy: StrategyModel) {
    this.strategy = strategy;
  }

  public strategy: StrategyModel;

  public abstract toJsonInputValue(): InputJsonValue;
}
