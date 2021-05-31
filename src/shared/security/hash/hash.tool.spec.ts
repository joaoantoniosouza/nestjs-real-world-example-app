import { Test, TestingModule } from '@nestjs/testing';
import { HashTool } from './hash.tool';

describe('Hash Tool', () => {
  const hashTool = new HashTool();

  it('deve retornar true para a comparação de hash', async () => {
    const password = 'Abc123';
    const hash = await hashTool.generate(password);
    const isMath = await hashTool.isMatch(password, hash);

    expect(isMath).toEqual(true);
  });

  it('deve retornar false para a comparação de hash', async () => {
    const password = 'Abc123';
    const wrongPassword = 'abc123';

    const hash = await hashTool.generate(password);
    const isMath = await hashTool.isMatch(wrongPassword, hash);

    expect(isMath).toEqual(false);
  });
});
