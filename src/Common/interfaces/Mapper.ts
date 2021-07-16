export interface Mapper<S, R> {
  map(source: S): R;
}
