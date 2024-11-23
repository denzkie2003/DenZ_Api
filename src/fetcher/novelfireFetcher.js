const {
  scrapeLatestChapters,
  scrapeNewestNovels,
  scrapeCompletedNovels,
  scrapeRankingNovels,
  scrapeSearchResults,
  scrapeNovelInfo,
  scrapeChapters,
  scrapeChapterContent
} = require("../scrapper/novelfireScrapper");

async function getLatestChapters(req, res){
  const page = req.query.page || 1;
  try{
    const data = await scrapeLatestChapters(page);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "Data not found!",
      });
    }
  }catch(err){
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getNewestNovels(req, res){
  const page = req.query.page || 1;
  try{
    const data = await scrapeNewestNovels(page);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "Data not found!",
      });
    }
  }catch(err){
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getCompletedNovels(req, res){
  const page = req.query.page || 1;
  try{
    const data = await scrapeCompletedNovels(page);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "Data not found!",
      });
    }
  }catch(err){
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getRankingNovels(req, res){
  const type = req.query.type || "daily-rank";
  try{
    const data = await scrapeRankingNovels(type);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "Data not found!",
      });
    }
  }catch(err){
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getSearchQuery(req, res){
  const query = req.query.query || "shadow";
  try{
    const data = await scrapeSearchResults(query);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "No result found!",
      });
    }
  }catch(err){
    console.log("Failed to fetch novel data from NovelFire.");
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getNovelInfo(req, res){
  const id = req.query.novelId;
  if(!id || id.trim() === ""){
    return res.status(400).send({
      success: false,
      message: "Failed to fetch novel. Novel ID is required!",
    });
  }
  try{
    const data = await scrapeNovelInfo(id);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "Novel not found!",
      });
    }
  }catch(err){
    console.log("Failed to fetch novel data from NovelFire.");
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getChapters(req, res){
  const id = req.query.novelId;
  const page = req.query.page || 1;
  try{
    const data = await scrapeChapters(id,page);
    if(data){
      return res.status(200).send({
        success: true,
        data: data,
      });
    }else{
      return res.status(400).send({
        success: false,
        message: "Chapters not found!",
      });
    }
  }catch(err){
    console.log("Failed to fetch chapters data from NovelFire.");
    return res.status(500).send({
      success: false,
      message: "Failed to fetch novel data from NovelFire.",
    });
  }
}

async function getChapterContent(req, res){
  const chapterId = req.query.chapterId;
  // Check if chapterId is missing or empty
  if (!chapterId || chapterId.trim() === "") {
    return res.status(400).send({
      success: false,
      message: "Failed to fetch chapter content. Chapter ID is required!",
    });
  }
  try {
    const data = await scrapeChapterContent(chapterId);

    // Check if data was successfully retrieved
    if (data) {
      return res.status(200).send({
        success: true,
        data: data, // Assuming data is an array or an object
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Chapter content not found.",
      });
    }
  } catch (err) {
    console.error("Error fetching chapter content:", err);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch chapter content due to a server error.",
    });
  }
}


module.exports = {
  getLatestChapters,
  getNewestNovels,
  getCompletedNovels,
  getRankingNovels,
  getSearchQuery,
  getNovelInfo,
  getChapters,
  getChapterContent
};