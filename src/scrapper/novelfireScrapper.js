const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl = "https://novelfire.net/";
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Referer': 'https://novelfire.net/'
};

const scrapeLatestChapters = async (page = 1) => {
  const url = baseUrl + "latest-release-novels?page=" + page;
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const novels = [];
    
    $(".novel-list li").each((i, element) => {
      const id =
        $(element).find("div.cover-wrap a").attr("href").split("/").pop() || "";
      const poster = $(element).find(".novel-cover img").attr("data-src") || "";
      const itemBody = $(element).find(".item-body a");
      const title = itemBody.find("h4.novel-title").text().trim() || "";
      const chapter = itemBody.find("h5.chapter-title").text().trim() || "";
      const chapterId = itemBody.eq(1).attr("href").replace("https://novelfire.net/book/","");

      novels.push({ id, poster, title, chapter, chapterId });
    });
    return novels;
    
  }catch(error){
    console.log("Error fetching latest updates " + error.message);
    throw new Error(error.message);
  }
};

const scrapeNewestNovels = async (page = 1) => {
  const url = baseUrl + "genre-all/sort-new/status-all/all-novel?page=" + page;
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const novels = [];
    
    $(".novel-list li").each((i, element) => {
      const id =
        $(element).find("a").first().attr("href").split("/").pop() || "";
      const poster = $(element).find("img").attr("data-src") || "";
      const title = $(element).find("h4").text().trim() || "";

      novels.push({ id, poster, title });
    });
    return novels;
    
  }catch(error){
    console.log("Error fetching newest added novels " + error.message);
    throw new Error(error.message);
  }
};

const scrapeCompletedNovels = async (page = 1) => {
  const url = baseUrl + "genre-all/sort-new/status-completed/all-novel?page=" + page;
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const novels = [];
    
    $(".novel-list li").each((i, element) => {
      const id =
        $(element).find("a").first().attr("href").split("/").pop() || "";
      const poster = $(element).find("img").attr("data-src") || "";
      const title = $(element).find("h4").text().trim() || "";

      novels.push({ id, poster, title });
    });
    return novels;
    
  }catch(error){
    console.log("Error fetching newest added novels " + error.message);
    throw new Error(error.message);
  }
};

const scrapeRankingNovels = async (type) => {
  const url = `${baseUrl}${type}`;
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const novels = [];
    
    $(".rank-novels li").each((i, element) => {
      // Extract rank number (assumes it's the index + 1)
      const rank = i + 1;

      const id = $(element).find(".cover-wrap a").attr("href").split("/").pop() || "";
      
      const poster = $(element).find(".cover-wrap img").attr("data-src") || "";

      // Extract title
      const title = $(element).find(".title a").text().trim() || "";

      // Extract views
      const viewsText = $(element)
        .find(".numberOf")
        .text()
        .trim()
        .match(/(\d+(,\d+)*)/); // Extract numeric value
      const views = viewsText ? viewsText[0].replace(/,/g, "") : "0";

      // Extract status (e.g., Ongoing, Completed)
      const status = $(element).find(".status-group .status").text().trim() || "";

      // Extract genres (multiple <span> elements)
      const genres = [];
      $(element).find(".categories .scroll span").each((j, genreElement) => {
        genres.push($(genreElement).text().trim());
      });

      // Push data into novels array
      novels.push({
        id,
        rank,
        poster,
        title,
        views,
        status,
        genres,
      });
    });
    return novels;
    
  }catch(error){
    console.log("Error fetching newest added novels " + error.message);
    throw new Error(error.message);
  }
};

const scrapeSearchResults = async (query) => {
  const url = `${baseUrl}ajax/searchLive`;
  
  try{
    const { data } = await axios.get(url, {
      params: { inputContent: query }
    });

    // Load the response HTML into cheerio
    const $ = cheerio.load(data.html);

    const results = [];

    // Parse the novel search results
   $(".novel-item").each((i, element) => {
     const id = $(element).find("a").first().attr("href").split("/").pop() || "";
      const title = $(element).find("h4").text().trim() || "";
      const poster = $(element).find("img").attr("src") || "";

      results.push({
        id,
        title,
        poster
      });
    });

    return results;
  }catch(error){
    console.log("Error fetching query " + error.message);
    throw new Error(error.message);
  }
};

const scrapeNovelInfo = async (novelId) => {
  const url = baseUrl + "book/" + novelId;
  
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const novels = [];
    
    const info = $(".novel-info");
    const id = novelId;
    const title = info.find("h1.novel-title").text().trim() || "";
    const poster = $(".cover img").attr("data-src") || "";
    const author = $(".author a span").text().trim() || "";
    const rating = $(".my-rating").attr("data-rating") || "";
    const totalChapter = $(".header-stats strong").eq(0).text().trim() || "";
    const views = $(".header-stats strong").eq(1).text().trim() || "";
    const bookmark = $(".header-stats strong").eq(2).text().trim() || "";
    const status = $(".header-stats strong").eq(3).text().trim() || "";
    const description = $(".description").text().trim() || "";
    const summary = $(".summary .inner").html() || "";
    const genres = [];
    $(".categories ul li").each((i, element) => {
      const genre = $(element).find("a").text().trim();
      genres.push(genre);
    });
    novels.push({
      id,
      title,
      poster,
      author,
      rating,
      totalChapter,
      views,
      bookmark,
      status,
      description,
      summary,
      genres
    });
    return novels;
  }catch(error){
    console.log("Error fetching novel detais " + error.message);
    throw new Error(error.message);
  }
}

const scrapeChapters = async (novelId, page = 1) => {
  const url = `${baseUrl}book/${novelId}/chapters?page=${page}`;
  
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const chapters = [];
    
    $(".chapter-list li").each((i, element) => {
      const chapterId = $(element).find("a").attr("href").replace("https://novelfire.net/book/","") || "";
      const chapterTitle = $(element).find("a strong").text().trim() || "";
      chapters.push({
        chapterId,
        chapterTitle
      });
    });
    return chapters;
  }catch(error){
    console.log("Error fetching novel chapters " + error.message);
    throw new Error(error.message);
  }
}

const scrapeChapterContent = async (chapterId) => {
  const url = baseUrl + "book/" + chapterId;
  
  try{
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const novelContents = [];
    
    const chapterTitle = $("span.chapter-title").text().trim() || "";
    const previousChapter = $("a.prevchap").attr("href").replace("https://novelfire.docsachhay.net/book/","") || "";
    const nextChapter = $("a.nextchap").attr("href").replace("https://novelfire.docsachhay.net/book/","") || "";
    const content = $("#chapter-container #content").html() || "";
    novelContents.push({ chapterTitle, previousChapter, nextChapter, content });
    return novelContents;
  }catch(error){
    console.log("Error fetching novel chapters content" + error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  scrapeLatestChapters,
  scrapeNewestNovels,
  scrapeCompletedNovels,
  scrapeRankingNovels,
  scrapeSearchResults,
  scrapeNovelInfo,
  scrapeChapters,
  scrapeChapterContent
}