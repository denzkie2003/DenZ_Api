const express = require("express");
const {
  getLatestChapters,
  getRankingNovels,
  getPopularNovels,
  getSearchNovels,
  getNovelInfo
} = require("../fetcher/novelbuddyFetcher");
const router = express.Router();

router.get("/novelbuddy/latest", getLatestChapters);
router.get("/novelbuddy/rank", getRankingNovels);
router.get("/novelbuddy/popular", getPopularNovels);
router.get("/novelbuddy/search", getSearchNovels);
router.get("/novelbuddy/info", getNovelInfo);

module.exports = router;
