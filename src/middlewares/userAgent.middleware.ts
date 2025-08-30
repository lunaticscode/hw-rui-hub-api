import { AppError } from "../utils/error";

type UserAgentPreventModes =
  | "normal-bot"
  | "strict-bot"
  | "aggressive-bot"
  | "social-preview"
  | "api-test-tools"
  | "all-bots";

/**
 * @description 가장 기본적인 검색엔진 봇(ex 검색엔진 크롤러)
 */
const NORMAL_BOTS = [
  "Googlebot",
  "Bingbot",
  "Baiduspider",
  "YandexBot",
  "DuckDuckBot",
  "Applebot",
];
/**
 * @description normal-bot + 마케팅/SEO 크롤러
 */
const STRICT_BOTS = [
  ...NORMAL_BOTS,
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "Exabot",
  "Sogou Spider",
  "PetalBot",
  "Coccocbot",
  "SiteAuditBot",
];
/**
 * @description strict-bot + 위장된 UA/스크래퍼 툴
 */
const AGGRESSIVE_BOTS = [
  ...STRICT_BOTS,
  "curl",
  "Wget",
  "python-requests",
  "Scrapy",
  "httpclient",
  "node-fetch",
  "Java",
];
/**
 * @description SNS / 메신저 프리뷰 봇
 */
const SOCIAL_PREVIEWS = [
  "Twitterbot",
  "Slackbot",
  "LinkedInBot",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
  "facebot",
];

/**
 * @description API 테스팅 툴(e.g., Postman)
 */
const API_TEST_TOOLS = [
  "PostmanRuntime",
  "insomnia",
  "Paw",
  "hoppscotch",
  "HTTPie",
];

const mapPreventLevelToBotList: Record<UserAgentPreventModes, string[]> = {
  "normal-bot": NORMAL_BOTS,
  "strict-bot": STRICT_BOTS,
  "aggressive-bot": AGGRESSIVE_BOTS,
  "social-preview": SOCIAL_PREVIEWS,
  "api-test-tools": API_TEST_TOOLS,
  "all-bots": [...AGGRESSIVE_BOTS, ...SOCIAL_PREVIEWS, ...API_TEST_TOOLS],
};

const userAgentMiddleware: (mode?: UserAgentPreventModes) => AppMiddleware =
  (mode = "normal-bot") =>
  (req, _res, next) => {
    const referer = req.headers.referer ?? "(none-referer)";
    const ua = req.headers["user-agent"] ?? "";

    let preventBots = mapPreventLevelToBotList[mode];
    if (process.env.NODE_ENV === "production") {
      preventBots = preventBots.concat(API_TEST_TOOLS);
    }

    if (
      preventBots.some(
        (b) =>
          referer.trim().toLowerCase().startsWith(b.toLowerCase()) ||
          ua.trim().toLowerCase().startsWith(b.toLowerCase())
      )
    ) {
      throw new AppError(
        `'${referer}' or '${ua}' is invalid user-agent.`,
        "INVALID_USER_AGENT"
      );
    }
    next();
  };

export default userAgentMiddleware;
