import { getFlagUrl } from '../../src/modules/countries/presentation/utils/flagUtils';

describe('flagUtils', () => {
  describe('getFlagUrl', () => {
    it('generates correct flag URL with default size (320px)', () => {
      const url = getFlagUrl('PE');
      expect(url).toBe('https://flagcdn.com/w320/pe.png');
    });

    it('generates correct flag URL with custom size', () => {
      const url = getFlagUrl('AR', 640);
      expect(url).toBe('https://flagcdn.com/w640/ar.png');
    });

    it('converts country code to lowercase', () => {
      const url = getFlagUrl('US', 80);
      expect(url).toBe('https://flagcdn.com/w80/us.png');
    });

    it('handles mixed case country codes', () => {
      const url1 = getFlagUrl('Br');
      const url2 = getFlagUrl('BR');
      expect(url1).toBe(url2);
      expect(url1).toContain('br.png');
    });

    it('supports various image sizes', () => {
      const sizes = [80, 160, 320, 640];
      sizes.forEach(size => {
        const url = getFlagUrl('PE', size);
        expect(url).toContain(`w${size}`);
      });
    });
  });
});
