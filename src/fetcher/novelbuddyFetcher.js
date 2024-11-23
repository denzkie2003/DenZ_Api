const {
  scrapeLatestChapters,
  scrapeRankingNovels,
  scrapePopularNovels,
  scrapeSearchNovels,
  scrapeNovelInfo
} = require("../scrapper/novelbuddyScrapper");

async function getLatestChapters(req, res) {
  const page = req.query.page || 1;
  try {
    const data = await scrapeLatestChapters(page);
    if (data) {
      return res.status(200).send({ success: true, data: data });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Page not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Failed to fetch data from NovelBuddy!"
      });
  }
}

async function getRankingNovels(req, res) {
  const type = req.query.type || "day";
  try {
    const data = await scrapeRankingNovels(type);
    if (data) {
      return res.status(200).send({ success: true, data: data });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Page not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Failed to fetch data from NovelBuddy!"
      });
  }
}

async function getPopularNovels(req, res) {
  const type = req.query.type || "all";
  const page = req.query.page || 1;
  try {
    const data = await scrapePopularNovels(type, page);
    if (data) {
      return res.status(200).send({ success: true, data: data });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Page not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Failed to fetch data from NovelBuddy!"
      });
  }
}

async function getSearchNovels(req, res) {
  const query = req.query.query;
  const page = req.query.page || 1;
  if(!query || query.trim() === ""){
    return res.status(400).send({ success: false, message: "Query is required and should not be empty!" });
  }
  
  try {
    const data = await scrapeSearchNovels(query, page);
    if (data) {
      return res.status(200).send({ success: true, data: data });
    } else {
      return res
        .status(400)
        .send({ success: false, message: `No results found for ${query}!` });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Failed to fetch data from NovelBuddy!"
      });
  }
}

async function getNovelInfo(req, res) {
  const id = req.query.novelId;
  if(!id || id.trim() === ""){
    return res.status(400).send({ success: false, message: "Novel id is required and should not be empty!" });
  }
  
  try {
    const data = await scrapeNovelInfo(id);
    if (data) {
      return res.status(200).send({ success: true, data: data });
    } else {
      return res
        .status(400)
        .send({ success: false, message: `Page not found!` });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Failed to fetch data from NovelBuddy!"
      });
  }
}

module.exports = {
  getLatestChapters,
  getRankingNovels,
  getPopularNovels,
  getSearchNovels,
  getNovelInfo
};
