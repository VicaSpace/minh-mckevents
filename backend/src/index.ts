import main from 'main';

import { logger } from '@/utils/logger';

declare module 'express-serve-static-core' {
  interface Request {
    user: object;
    token: string;
  }
}

main().catch((err) => logger.error(err));
