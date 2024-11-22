const {
  scrapeLatestChapters,
  scrapeNewestNovels,
  scrapeCompletedNovels,
  scrapeRankingNovels,
  scrapeSearchResults
} = require("../scrapper/novelfireScrapper");

const getLatestChapters = async (req, res) => {
  const page = req.params.page || 1;
  try{
    const data = await scrapeLatestChapters(page);
    res.send(data);
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

const getNewestNovels = async (req, res) => {
  const page = req.params.page || 1;
  try{
    const data = await scrapeNewestNovels(page);
    res.send(data);
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

const getCompletedNovels = async (req, res) => {
  const page = req.params.page || 1;
  try{
    const data = await scrapeCompletedNovels(page);
    res.send(data);
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

/*const getRankingNovels = async (req, res) => {
  const { type = "daily" } = req.params;
  
  try{
    if (!["daily-rank", "monthly-rank", "alltime-rank", "hot-rank", "rating-rank", "mostlib-rank"].includes(type)) {
      return res.status(400).send({
        success: false,
        message: "Invalid type. Please use 'daily-rank', 'monthly-rank', 'alltime-rank', 'hot-rank', 'rating-rank', 'mostlib-rank'.",
      });
    }
    
    const data = await scrapeCompletedNovels(type);
    res.send(data);
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}*/

const getRankingNovels = async (req, res) => {
  const type = req.params.type || "daily-rank";
  
  try{
    const data = await scrapeRankingNovels(type);
    res.send(data);
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

const getSearchQuery = async (req, res) => {
  const query = req.params.query || "shadow";
  
  try{
    const data = await scrapeSearchResults(query);
    res.send(data);
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

module.exports = {
  getLatestChapters,
  getNewestNovels,
  getCompletedNovels,
  getRankingNovels,
  getSearchQuery
}