import main from 'main';

import { AppUser } from '@/types/user';
import { logger } from '@/utils/logger';

declare module 'express-serve-static-core' {
  interface Request {
    user: AppUser;
    token: string;
  }
}

main().catch((err) => logger.error(err));
