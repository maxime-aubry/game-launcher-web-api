import type { StrategyModel } from './strategy.model';

export class CredentialsModel {
  constructor(strategy: StrategyModel) {
    this.strategy = strategy;
  }

  public strategy: StrategyModel;
}
