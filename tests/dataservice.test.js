const DataService = require('../src/services/dataservice');

describe('DataService', () => {
  let mockFs;
  let dataService;

  beforeEach(() => {
    mockFs = {
      existsSync: jest.fn(),
      mkdirSync: jest.fn(),
      writeFileSync: jest.fn(),
      readFileSync: jest.fn()
    };

    // default storage content for readFile
    mockFs.readFileSync.mockReturnValue('[]');

    dataService = new DataService({
      dataPath: '/fake/storage/data.json',
      fsModule: mockFs
    });
  });

  // -------------------------------------------------------------
  // 1. Constructor + ensureFileExists
  // -------------------------------------------------------------
  test('creates directory and file if missing', () => {
    // directory does not exist
    mockFs.existsSync.mockReturnValueOnce(false); // dir
    mockFs.existsSync.mockReturnValueOnce(false); // file

    new DataService({
      dataPath: '/fake/storage/data.json',
      fsModule: mockFs
    });

    expect(mockFs.mkdirSync).toHaveBeenCalledWith('/fake/storage', { recursive: true });
    expect(mockFs.writeFileSync).toHaveBeenCalledWith('/fake/storage/data.json', JSON.stringify([], null, 2));
  });

  // -------------------------------------------------------------
  // 2. loadData()
  // -------------------------------------------------------------
  test('loads contacts from JSON file', () => {
    const jsonData = JSON.stringify([
      { email: 'a@test.com', name: 'A', phone: '111' },
      { email: 'b@test.com', name: 'B', phone: '222' }
    ]);

    mockFs.readFileSync.mockReturnValue(jsonData);

    const ds = new DataService({
      dataPath: '/fake/storage/data.json',
      fsModule: mockFs
    });

    expect(ds.contacts.size).toBe(2);
    expect(ds.getContact('a@test.com')).toEqual({ email: 'a@test.com', name: 'A', phone: '111' });
  });

  // -------------------------------------------------------------
  // 3. addContact()
  // -------------------------------------------------------------
  test('successfully adds a new contact', () => {
    const res = dataService.addContact('x@test.com', 'X', '123');

    expect(res).toEqual({
      email: 'x@test.com',
      name: 'X',
      phone: '123',
      exists: false
    });

    expect(mockFs.writeFileSync).toHaveBeenCalled(); // saveData()
  });

  test('fails to add a contact if email already exists', () => {
    dataService.addContact('x@test.com', 'X', '123');
    mockFs.writeFileSync.mockClear();

    const res = dataService.addContact('x@test.com', 'Duplicate', '999');

    expect(res).toEqual({
      error: "Contact with this email already exists",
      exists: true
    });

    expect(mockFs.writeFileSync).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------
  // 4. getContact()
  // -------------------------------------------------------------
  test('returns a contact by email', () => {
    dataService.addContact('y@test.com', 'Y', '123');

    expect(dataService.getContact('y@test.com')).toEqual({
      email: 'y@test.com',
      name: 'Y',
      phone: '123'
    });
  });

  test('returns null for non-existing email', () => {
    expect(dataService.getContact('missing@test.com')).toBeNull();
  });

  // -------------------------------------------------------------
  // 5. deleteContact()
  // -------------------------------------------------------------
  test('deletes a contact successfully', () => {
    dataService.addContact('z@test.com', 'Z', '555');
    mockFs.writeFileSync.mockClear();

    const deleted = dataService.deleteContact('z@test.com');

    expect(deleted).toEqual({
      email: 'z@test.com',
      name: 'Z',
      phone: '555'
    });

    expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(dataService.getContact('z@test.com')).toBeNull();
  });

  test('returns null when deleting non-existing contact', () => {
    mockFs.writeFileSync.mockClear();
    const result = dataService.deleteContact('missing@test.com');
    expect(result).toBeNull();
    expect(mockFs.writeFileSync).not.toHaveBeenCalled();
  });
});
