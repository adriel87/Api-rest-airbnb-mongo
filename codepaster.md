
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticationMiddleware } from './security.middlewares.js';
import { UserSession } from '#common-app/models/user-session.js';

describe('pods/security/security.middlewares specs', () => {
  describe('authorizationMiddleware', () => {
    it('should send 401 status code if it feeds authorization cookie equals undefined', async () => {
      // Arrange
      const authorization = undefined;

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should call next function and assign userSession if it feeds authorization cookie with token', async () => {
      // Arrange
      const authorization = 'Bearer my-token';
      const userSession: UserSession = {
        id: '1',
        role: 'admin',
      };

      // stub
      const verifyStub = jest
        .spyOn(jwt, 'verify')
        .mockImplementation((token, secret, callback: any) => {
          callback(undefined, userSession);
        });

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(verifyStub).toHaveBeenCalled();
    });
  });
});


*********************************

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticationMiddleware } from './security.middlewares.js';
import { UserSession } from '#common-app/models/user-session.js';

describe('pods/security/security.middlewares specs', () => {
  describe('authorizationMiddleware', () => {
    it('should send 401 status code if it feeds authorization cookie equals undefined', async () => {
      // Arrange
      const authorization = undefined;

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should call next function and assign userSession if it feeds authorization cookie with token', async () => {
      // Arrange
      const authorization = 'Bearer my-token';
      const userSession: UserSession = {
        id: '1',
        role: 'admin',
      };

      // stub
      const verifyStub = jest
        .spyOn(jwt, 'verify')
        .mockImplementation((token, secret, callback: any) => {
          callback(undefined, userSession);
        });

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(verifyStub).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(req.userSession).toEqual(userSession);
    });
  });
});


*********************************

import jwt from 'jsonwebtoken';

export const verifyJWT = <T>(token: string, secret: string): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        reject(error);
      }

      if (payload) {
        resolve(payload as unknown as T);
      } else {
        reject();
      }
    });
  });


*********************************

import { RequestHandler, Request, Response, NextFunction } from 'express';
import { verifyJWT } from '#common/helpers/index.js';
import { envConstants } from '#core/constants/index.js';
import { UserSession, Role } from '#common-app/models/index.js';

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [, token] = req.cookies.authorization?.split(' ') || [];
    const userSession = await verifyJWT<UserSession>(
      token,
      envConstants.AUTH_SECRET
    );
    req.userSession = userSession;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const isAuthorized = (currentRole: Role, allowedRoles?: Role[]) =>
  !Boolean(allowedRoles) ||
  (Boolean(currentRole) && allowedRoles.some((role) => currentRole === role));

export const authorizationMiddleware =
  (allowedRoles?: Role[]): RequestHandler =>
  async (req, res, next) => {
    if (isAuthorized(req.userSession?.role, allowedRoles)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };


*********************************

import { Request, Response } from 'express';
import * as helpers from '#common/helpers/index.js';
import { authenticationMiddleware } from './security.middlewares.js';
import { UserSession } from '#common-app/models/user-session.js';

describe('pods/security/security.middlewares specs', () => {
  describe('authorizationMiddleware', () => {
    it('should send 401 status code if it feeds authorization cookie equals undefined', async () => {
      // Arrange
      const authorization = undefined;

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should call next function and assign userSession if it feeds authorization cookie with token', async () => {
      // Arrange
      const authorization = 'Bearer my-token';
      const userSession: UserSession = {
        id: '1',
        role: 'admin',
      };

      // stub
      const verifyStub = jest
        .spyOn(helpers, 'verifyJWT')
        .mockResolvedValue(userSession);

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(verifyStub).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(req.userSession).toEqual(userSession);
    });
  });
});


*********************************

import { Request, Response } from 'express';
import * as helpers from '#common/helpers/jwt.helpers.js';
import { authenticationMiddleware } from './security.middlewares.js';
import { UserSession } from '#common-app/models/user-session.js';

describe('pods/security/security.middlewares specs', () => {
  describe('authorizationMiddleware', () => {
    it('should send 401 status code if it feeds authorization cookie equals undefined', async () => {
      // Arrange
      const authorization = undefined;

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should call next function and assign userSession if it feeds authorization cookie with token', async () => {
      // Arrange
      const authorization = 'Bearer my-token';
      const userSession: UserSession = {
        id: '1',
        role: 'admin',
      };

      // stub
      const verifyStub = jest
        .spyOn(helpers, 'verifyJWT')
        .mockResolvedValue(userSession);

      const req = {
        cookies: {
          authorization,
        },
      } as Request;
      const res = {
        sendStatus: jest.fn() as any,
      } as Response;
      const next = jest.fn();

      // Act
      await authenticationMiddleware(req, res, next);

      // Assert
      expect(verifyStub).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(req.userSession).toEqual(userSession);
    });
  });
});


*********************************

npm install supertest @types/supertest --save-dev

*********************************
 
.env.test

*********************************
 
NODE_ENV=development
PORT=3000
STATIC_FILES_PATH=../public
CORS_ORIGIN=*
CORS_METHODS=GET,POST,PUT,DELETE
API_MOCK=true
MONGODB_URI=mongodb://localhost:27017/book-store
AUTH_SECRET=MY_AUTH_SECRET


*********************************
 
env.config.js

*********************************
 
const { config } = require('dotenv');
config({
  path: './.env.test',
});

*********************************
 
export default {
  rootDir: '../../',
  verbose: true,
  restoreMocks: true,
  setupFiles: ['<rootDir>/config/test/env.config.js'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '#(.*)\\.js$': '<rootDir>/src/$1',
  },
};


*********************************
 
book.rest-api.spec.ts

*********************************
 
describe('pods/book/book.rest-api specs', () => {
  describe('get book list', () => {
    it('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

*********************************
 
npm run test:watch book.rest-api

*********************************
 
import supertest from 'supertest';
import { createRestApiServer } from '#core/servers/index.js';
import { booksApi } from './book.rest-api.js';

const app = createRestApiServer();
app.use(booksApi);

describe('pods/book/book.rest-api specs', () => {
  describe('get book list', () => {
    it('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});


*********************************
 
import supertest from 'supertest';
import { createRestApiServer } from '#core/servers/index.js';
import { booksApi } from './book.rest-api.js';

const app = createRestApiServer();
app.use(booksApi);

describe('pods/book/book.rest-api specs', () => {
  describe('get book list', () => {
    it('should return the whole bookList with values when it request "/" endpoint without query params', async () => {
      // Arrange
      const route = '/';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(7);
    });
  });
});


*********************************
 
npm install @shelf/jest-mongodb --save-dev

*********************************
 
npm install -f @shelf/jest-mongodb --save-dev

*********************************
 
jest-mongodb-config.cjs

*********************************
 
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.10',
      skipMD5: true,
    },
    instance: {
      dbName: 'test-book-store',
    },
    autoStart: false,
  },
};

*********************************
 
export default {
  rootDir: '../../',
  verbose: true,
  restoreMocks: true,
  setupFiles: ['<rootDir>/config/test/env.config.js'],
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['<rootDir>/globalConfig'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '#(.*)\\.js$': '<rootDir>/src/$1',
  },
};


*********************************
 
node_modules
dist
.env
mongo-data
globalConfig.json

*********************************
 
NODE_ENV=development
PORT=3000
STATIC_FILES_PATH=../public
CORS_ORIGIN=*
CORS_METHODS=GET,POST,PUT,DELETE
API_MOCK=false
AUTH_SECRET=MY_AUTH_SECRET


*********************************
 
npm install -f cross-env --save-dev

*********************************
 
{
  "name": "bootcamp-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "prestart": "sh ./create-dev-env.sh",
    "start": "run-p -l type-check:watch start:dev start:local-db",
    "start:dev": "nodemon --transpileOnly --esm src/index.ts",
    "start:console-runners": "run-p -l type-check:watch console-runners start:local-db",
    "console-runners": "nodemon --no-stdin --transpileOnly --esm src/console-runners/index.ts",
    "start:local-db": "docker-compose up -d",
    "type-check": "tsc --noEmit --preserveWatchOutput",
    "type-check:watch": "npm run type-check -- --watch",
    "test": "cross-env MONGO_MEMORY_SERVER_FILE=jest-mongodb-config.cjs jest -c ./config/test/jest.js",
    "test:watch": "npm run test -- --watchAll -i"
  },
  "imports": {
    "#common/*": "./src/common/*",
    "#common-app/*": "./src/common-app/*",
    "#core/*": "./src/core/*",
    "#dals/*": "./src/dals/*",
    "#pods/*": "./src/pods/*"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongodb": "^6.1.0"
  },
  "devDependencies": {
    "@shelf/jest-mongodb": "^4.1.7",
    "@types/cookie-parser": "^1.4.3",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/inquirer": "^9.0.3",
    "@types/jest": "^29.5.2",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/supertest": "^2.0.14",
    "cross-env": "^7.0.3",
    "inquirer": "^9.2.7",
    "jest": "^29.5.0",
    "nodemon": "^2.0.22",
    "npm-run-all": "^4.1.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.3"
  }
}


*********************************
 
import supertest from 'supertest';
import {
  createRestApiServer,
  connectToDBServer,
  disconnectFromDBServer,
} from '#core/servers/index.js';
import { booksApi } from './book.rest-api.js';
import { getBookContext } from '#dals/book/book.context.js';
import { ObjectId } from 'mongodb';

const app = createRestApiServer();
app.use(booksApi);

const MONGODB_URI = `${globalThis.__MONGO_URI__}${globalThis.__MONGO_DB_NAME__}`;

describe('pods/book/book.rest-api specs', () => {
  beforeAll(async () => {
    await connectToDBServer(MONGODB_URI);
  });

  beforeEach(async () => {
    await getBookContext().insertOne({
      _id: new ObjectId(),
      title: 'book-1',
      author: 'author-1',
      releaseDate: new Date('2023-10-03'),
    });
  });

  afterEach(async () => {
    await getBookContext().deleteMany({});
  });

  afterAll(async () => {
    await disconnectFromDBServer();
  });

  describe('get book list', () => {
    it('should return the whole bookList with values when it request "/" endpoint without query params', async () => {
      // Arrange
      const route = '/';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(1);
    });
  });
});
º;


*********************************
 
git init
git remote add origin git@...git
git add .
git commit -m "add project with tests"
git push -u origin main

*********************************
 
.github

*********************************
 
workflows

*********************************
 
name: CI Workflow

on: pull_request

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install
        run: npm ci

      - name: Tests
        run: npm test


*********************************
 