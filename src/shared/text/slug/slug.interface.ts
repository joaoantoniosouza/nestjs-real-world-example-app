export interface SlugifyOptions {
  /**
   * Substitui os espaços com o caractere de substituição, defaults '-'.
   */
  replacement?: string;

  /**
   * Remove os caracteres que casam com o regex.
   */
  remove?: RegExp;

  /**
   * converte para letras minusculas. default false.
   */
  lower?: boolean;

  /**
   * Remove os caracteres especiais, exceto o caractere de substituição (replacement)
   */
  strict?: boolean; // strip special characters except replacement, defaults to `false`

  /**
   * Código do idioma.
   */
  locale?: 'pt-Br';
}

export interface ISlug {
  slugify(text: string, options?: SlugifyOptions): string;
}
