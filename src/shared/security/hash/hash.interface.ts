export interface Hash {
  /**
   * @description Generate a hash.
   * @param value - value to hashing.
   */
  generate(value: string): Promise<string>;

  /**
   * @description Compare if value is a match of hash.
   * @param value - value to compare.
   * @param hash - hash to compare.
   */
  isMatch(value: string, hash: string): Promise<boolean>;
}
