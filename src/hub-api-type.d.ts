declare global {
  namespace Express {
    interface Request {
      identity?: { token: string };
    }
  }

  type AppController = (
    req: import("express").Request,
    res: import("express").Response,
    next?: import("express").NextFunction
  ) => void;

  type AppMiddleware = (
    req: import("express").Request,
    res: import("express").Response,
    next: import("express").NextFunction
  ) => void;

  type AppErrorMiddleware = (
    err: unknown,
    req: import("express").Request,
    res: import("express").Response,
    next: import("express").NextFunction
  ) => void;
}

export {};
