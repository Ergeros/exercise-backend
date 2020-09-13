import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const mockUser: User = {
  id: "test",
  firstName: "I am",
  lastName: "Ironman",
  email: "iamironman@ironman.man",
  password: "definitelyNotBatman",
  registered: new Date(),
  articles: [],
};

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  findByEmail: jest.fn().mockResolvedValueOnce(mockUser),
  findById: jest.fn().mockResolvedValueOnce(mockUser),
  createUser: jest.fn().mockResolvedValueOnce(mockUser),
}));

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findByEmail", () => {
    it("should return user by email", async () => {
      expect(await service.findByEmail("test")).toStrictEqual(mockUser);
    });
  });
  describe("findById", () => {
    it("should return user by email", async () => {
      expect(await service.findById("test")).toStrictEqual(mockUser);
    });
  });
  describe("createUser", () => {
    it("should return user by email", async () => {
      expect(await service.createUser(mockUser)).toStrictEqual(mockUser);
    });
  });
});
