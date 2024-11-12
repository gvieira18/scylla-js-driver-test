import { faker } from '@faker-js/faker';

import UuidValueObject from '../../../../src/domain/value-objects/UUID';

const ERROR_RESTORE = 'should throw an exception if the UUID is invalid';
const ERROR_EXCEPTION = 'Invalid UUID';

let fakeUuid: string;

beforeEach(() => {
  fakeUuid = faker.string.uuid();
});

describe('#make', () => {
  it('should create an uuid instance', () => {
    expect(UuidValueObject.make()).toBeDefined();
  });
});

describe('#restore', () => {
  it('should restore a instance of UUID if value is correct', () => {
    expect(UuidValueObject.restore(fakeUuid)).toBeDefined();
  });

  describe('failure', () => {
    it.each(['6ba7b8109dad11d1', '6ba7b8109dad11d180b400c04fd430c800', 'xpto', '123-abc'])(
      `${ERROR_RESTORE} - %s`,
      (param) => {
        expect(() => UuidValueObject.restore(param)).toThrowWithMessage(Error, ERROR_EXCEPTION);
      }
    );
  });
});

describe('#getValue', () => {
  it('Should return an uuid instance', () => {
    expect(UuidValueObject.make().getValue()).toBeDefined();
  });
});

describe('#equals', () => {
  it('should return true if has same uuid', () => {
    expect(UuidValueObject.restore(fakeUuid).equals(UuidValueObject.restore(fakeUuid))).toBeTrue();
  });

  it('should return false if they are different uuids', () => {
    expect(UuidValueObject.make().equals(UuidValueObject.make())).toBeFalse();
  });
});

describe('#toUpperCase', () => {
  it('should return a new UUID instance with all letter in upper case', () => {
    expect(UuidValueObject.restore('6725dcb4-abfa-41f8-8bf1-917ebe406234').toUpperCase().getValue()).toBe(
      '6725DCB4-ABFA-41F8-8BF1-917EBE406234'
    );
  });
});

describe('#toLowerCase', () => {
  it('should return a new UUID instance with all letter in lower case', () => {
    expect(UuidValueObject.restore('6725DCB4-ABFA-41F8-8BF1-917EBE406234').toLowerCase().getValue()).toBe(
      '6725dcb4-abfa-41f8-8bf1-917ebe406234'
    );
  });
});

describe('#removeDashes', () => {
  describe('success', () => {
    it('should remove hyphens and return UUID instance', () => {
      expect(UuidValueObject.restore('6ba7b810-9dad-11d1-80b4-00c04fd430c8').removeHyphens().getValue()).toBe(
        '6ba7b8109dad11d180b400c04fd430c8'
      );
    });
  });

  describe('failure', () => {
    it.each(['6ba7b8109dad11d1', '6ba7b8109dad11d180b400c04fd430c800', 'xpto', '123-abc'])(
      `${ERROR_RESTORE} - %s`,
      (param) => {
        expect(() => UuidValueObject.restore(param).removeHyphens().getValue()).toThrowWithMessage(
          Error,
          ERROR_EXCEPTION
        );
      }
    );
  });
});

describe('#addHyphens', () => {
  describe('success', () => {
    it('should add hyphens and return UUID instance', () => {
      expect(UuidValueObject.restore('6ba7b8109dad11d180b400c04fd430c8').addHyphens().getValue()).toBe(
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
      );
    });
  });

  describe('failure', () => {
    it.each(['6ba7b8109dad11d1', '6ba7b8109dad11d180b400c04fd430c800', 'xpto', '123-abc'])(
      `${ERROR_RESTORE} - %s`,
      (param) => {
        expect(() => UuidValueObject.restore(param).addHyphens().getValue()).toThrowWithMessage(Error, ERROR_EXCEPTION);
      }
    );
  });
});
