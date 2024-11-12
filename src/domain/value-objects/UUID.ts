import crypto from 'node:crypto';

class UuidValueObject {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static make(): UuidValueObject {
    return UuidValueObject.restore(crypto.randomUUID());
  }

  static restore(uuid: string): UuidValueObject {
    if (!this.isValidUUID(uuid)) throw new Error('Invalid UUID');
    return new UuidValueObject(uuid);
  }

  getValue(): string {
    return this.value;
  }

  equals(uuid: UuidValueObject): boolean {
    return this.getValue() === uuid.getValue();
  }

  toUpperCase(): UuidValueObject {
    return UuidValueObject.restore(this.getValue().toUpperCase());
  }

  toLowerCase(): UuidValueObject {
    return UuidValueObject.restore(this.getValue().toLowerCase());
  }

  removeHyphens(): UuidValueObject {
    return UuidValueObject.restore(this.getValue().replace(/-/g, ''));
  }

  addHyphens(): UuidValueObject {
    return UuidValueObject.restore(
      this.getValue().replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')
    );
  }

  private static isValidUUID(uuid: string): boolean {
    const uuidPatternWithHyphens =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const uuidPatternWithoutHyphens = /^[0-9a-fA-F]{32}$/;

    return uuidPatternWithHyphens.test(uuid) || uuidPatternWithoutHyphens.test(uuid);
  }
}

export default UuidValueObject;
