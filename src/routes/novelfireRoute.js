const express = require("express");
const { 
  getLatestChapters,
  getNewestNovels,
  getCompletedNovels,
  getRankingNovels,
  getSearchQuery
} = require("../fetcher/novelfireFetcher");

const router = express.Router();

router.get("/novelfire/latest/page/:page?", getLatestChapters);
router.get("/novelfire/newest/page/:page?", getNewestNovels);
router.get("/novelfire/completed/page/:page?", getCompletedNovels);
router.get("/novelfire/rank/:type?", getRankingNovels);
router.get("/novelfire/search/:query?", getSearchQuery);

module.exports = router;