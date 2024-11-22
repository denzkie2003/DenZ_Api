const express = require("express");
const { 
  getLatestChapters,
  getNewestNovels,
  getCompletedNovels,
  getRankingNovels,
  getSearchQuery,
  getNovelInfo,
  getChapters,
  getChapterContent
} = require("../fetcher/novelfireFetcher");

const router = express.Router();

router.get("/novelfire/latest", getLatestChapters);
router.get("/novelfire/newest", getNewestNovels);
router.get("/novelfire/completed", getCompletedNovels);
router.get("/novelfire/rank", getRankingNovels);
router.get("/novelfire/search", getSearchQuery);
router.get("/novelfire/info", getNovelInfo);
router.get("/novelfire/chapters", getChapters);
router.get("/novelfire/read/chapter", getChapterContent);

module.exports = router;