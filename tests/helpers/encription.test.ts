import Encrypt from '../../src/helpers/encription';

describe('Encrypt', () => {
  let encrypt: Encrypt;

  beforeEach(() => {
    encrypt = new Encrypt();
  });

  it('should hash a password', async () => {
    const password = 'mySecurePassword';
    const hashedPassword = await encrypt.hashPassword(password);

    // Verifica que el resultado no sea nulo y que sea una cadena
    expect(hashedPassword).toBeTruthy();
    expect(typeof hashedPassword).toBe('string');
  });

  it('should compare a password and return true for a match', async () => {
    const password = 'mySecurePassword';
    const hashedPassword = await encrypt.hashPassword(password);

    // Verifica que la comparación de contraseñas devuelva true para una coincidencia
    const matchResult = await encrypt.comparePassword(password, hashedPassword);
    expect(matchResult).toBe(true);
  });

  it('should compare a password and return false for a mismatch', async () => {
    const password = 'mySecurePassword';
    const hashedPassword = await encrypt.hashPassword(password);

    // Verifica que la comparación de contraseñas devuelva false para una falta de coincidencia
    const matchResult = await encrypt.comparePassword(
      'incorrectPassword',
      hashedPassword,
    );
    expect(matchResult).toBe(false);
  });
});
