const axios = require("axios");
const cheerio = require("cheerio");
const BASE_URL = "https://novelbuddy.com/";

function scrapeData(data) {
  const $ = cheerio.load(data);
  const novels = [];

  $(".list .book-item").each((i, element) => {
    const id =
      $(element)
        .find(".book-detailed-item .thumb a")
        .attr("href")
        .split("/")
        .pop() || "";
    const poster =
      $(element).find(".book-detailed-item .thumb a img").attr("data-src") ||
      "";
    const chapterTitle =
      $(element).find(".book-detailed-item .thumb span").text().trim() || "";
    const title =
      $(element).find(".book-detailed-item .meta .title h3 a").text().trim() ||
      "";
    const views =
      $(element).find(".book-detailed-item .meta .views span").text().trim() ||
      "";
    const ratings =
      $(element)
        .find(".book-detailed-item .meta .rating span")
        .eq(0)
        .text()
        .trim() || "";
    const genres = [];
    $(element)
      .find(".genres span")
      .each((i, elem) => {
        const genre = $(elem).text().trim();
        genres.push(genre);
      });
    const summary = $(element).find(".summary").html() || "";
    novels.push({
      id,
      poster,
      title,
      chapterTitle,
      views,
      ratings,
      genres,
      summary
    });
  });
  return novels;
}
// Scrape Latest Chapters
async function scrapeLatestChapters(page) {
  const url = `${BASE_URL}latest?page=${page}`;
  const { data } = await axios.get(url, { referrer: `${BASE_URL}` });

  return scrapeData(data);
}

async function scrapeRankingNovels(type) {
  const url = `${BASE_URL}top/${type}`;
  const { data } = await axios.get(url, { referrer: `${BASE_URL}` });

  return scrapeData(data);
}

async function scrapePopularNovels(type, page) {
  const url = `${BASE_URL}popular?page=${page}&status=${type}`;
  const { data } = await axios.get(url, { referrer: `${BASE_URL}` });

  return scrapeData(data);
}

async function scrapeSearchNovels(query, page) {
  const formattedQuery = query.replaceAll(" ", "_");
  const url = `${BASE_URL}search?status=all&sort=views&q=${formattedQuery}&page=${page}`;
  const { data } = await axios.get(url, { referrer: `${BASE_URL}` });

  return scrapeData(data);
}

async function scrapeNovelInfo(novelId){
  const url = `${BASE_URL}novel/${novelId}`;
  const { data } = await axios.get(url, { referrer: `${BASE_URL}` });
  const $ = cheerio.load(data);
  const novelData = [];
  
  const bookInfo = $(".book-info");
  const id = novelId;
  const poster = bookInfo.find(".img-cover img").attr("data-src") || "";
  const title =  bookInfo.find(".detail .name h1").text().trim() || "";
  const authors = [];
  bookInfo.find(".meta p").eq(0).each((i, elem) => {
    const author = $(elem).find("a").text().trim();
    authors.push(author);
  });
  const status = bookInfo.find(".meta p").eq(1).find("a span").text().trim() || "";
  const genres = [];
  bookInfo.find(".meta p").eq(2).each((i, elem) => {
    const genre = $(elem).find("a").text().trim();
    const formatedGenre = genre.replace(" , ","");
    genres.push(formatedGenre);
  });
  const totalChapter = bookInfo.find(".meta p").eq(3).find("span").text().trim() || "";
  const updatedTo = bookInfo.find(".meta p").eq(4).find("span").text().trim() || "";
  const tags = [];
  $(".section .tags a").each((i, elem) => {
    const tag = $(elem).text().trim();
    tags.push(tag);
  });
  const summary = $(".summary p.content").text().trim() || "";
  const chapterList = [];
  $(".chapter-list-inner .chapter-list li").each((i, elem) => {
    const chapterId = $(elem).find("a").split("/").pop() || "";
    const chaptetTitle = $(elem).find("a div .chapter-title").text().trim() || "";
    const uploadTime = $(elem).find("a div .chapter-update").text().trim() || "";
    chapterList.push({ chapterId, chaptetTitle, uploadTime });
  });
  
  novelData.push({
    id,
    poster,
    title,
    authors,
    status,
    genres,
    totalChapter,
    uploadTo,
    tags,
    summary,
    chapterList,
  });
}

module.exports = {
  scrapeLatestChapters,
  scrapeRankingNovels,
  scrapePopularNovels,
  scrapeSearchNovels,
  scrapeNovelInfo
};
