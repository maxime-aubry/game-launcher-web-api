export interface IUserModelInitializer<TDto, TModel> {
  initializeAsync(dto: TDto): Promise<TModel>;
}
