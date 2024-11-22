<div align="center">
  <img src="assets/logo.jpg" alt="Enoki API Logo" width="300"/>
  
  # DenZ API
  
  Free and open source novel API that provides seamless access to detailed novel information from various sources.

  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
    <img src="https://img.shields.io/badge/Cheerio.js-000000?style=for-the-badge" alt="Cheerio"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  </div>

  <br />

</div>

## Features

- Retrieve novel title information, chapters, and images
- Explore the latest, popular, newest, and completed novel per source
- Dedicated search endpoints for each source for a focused search experience

## Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Cheerio** - Web scraping library
- **Axios** - HTTP client

## API Endpoints

### Root

- **`GET /`**  
  Returns a welcome message.

### Search Endpoints (by Source)

Search each source independently with the following endpoints:

- **NovelFire Search**

  - **`GET /novel/novelfire/search?query={query}`**
    - Searches for novel titles on NovelFire by query. Optional: Empty `query` resulting to default `shadow`

### NovelFire Routes

| Endpoint                               | Description                                    |
| -------------------------------------- | ---------------------------------------------- |
| **`GET /novel/novelfire/info?novelId={novelId}`**       | Fetches details of a specific novel by ID.     |
| **`GET /novel/novelfire/read/chapter?chapterId={chapterId}`** | Retrieves chapter content for a specific novel chapter. |
| **`GET /nove/novelfire/latest?page={page}`**     | Lists the latest novel titles (paginated) (default = 1}.     |
| **`GET /novel/novelfire/newest?page={page}`**    | Lists newest novel titles (paginated) (default = 1).        |
| **`GET /novel/novelfire/completed?page={page}`**     | Lists completed novel titles (paginated) (default = 1).     |
| **`GET /novel/novelfire/rank?type={type}`**  | Lists ranking novels (type: ["daily-rank","monthly-rank","alltime-rank","hot-rank","rating-rank","mostlib-rank"]) (default = "daily-rank").      |
| **`GET /novel/novelfire/search?query={query}`**     | Lists of results from query (default = "shadow").     |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/denzkie2003/DenZ_Api.git
   cd DenZ_Api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file as needed.

4. Run the server:

   ```bash
   npm start
   ```

5. The API will be accessible at `http://localhost:3000`.

### Usage

Test the API by visiting endpoints like:

- **`http://localhost:3000/novel/novelfire/info?novelId={novelId}`** – Get novel details
- **`http://localhost:3000/novel/novelfire/latest`** – Get novel latest chapters
- **`http://localhost:3000/novel/novelfire/search?query={query}`** – Search for novel on NovelFire

## Folder Structure

```plaintext
denzk_api/
├── src/
│   ├── fetcher/          # Fetcher functions for each route
│   ├── routes/               # API route definitions
│   ├── scraper/             # Web scraping logic for each source
│   └── utils/                # Utility functions
├── assets/                   # Static assets including logo
├── .env                      # Environment variables (gitignored)
├── package.json             # Project dependencies and scripts
├── app.js                # Main server entry point
└── README.md                # Documentation
```

## Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name – [warlock071603@gmail.com](mailto:warlock071603@gmail.com)  
Project Link: [https://github.com/denzkie2003/DenZ_Api](https://github.com/denzkie2003/DenZ_Api)