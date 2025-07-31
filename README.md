# pubmed-article-explorer

This is a **web application** that allows users to search and browse articles related to **Artificial intelligence in Healthcare** from the [PubMed](https://pubmed.ncbi.nlm.nih.gov/) academic database.

## Features

- **Search articles** by title, author, journal or year
- **Browse articles** in a clear, responsive table
- **View article details** and abstract

## Tech stack

React, TypeScript, Tailwind CSS, PubMed API

# Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ioanalazea/pubmed-article-explorer.git
cd pubmed-article-explorer
cd my-app

```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your PubMed API key to the pubmed.ts file in the /api folder.

This allows you 10 requests/second with the PubMed API.

```tsx
API_KEY = "....";
```

### 4. Start the server

```bash
npm start
```

or the development server

```bash
npm run dev
```

## Notes
 ### PubMed API issues
First issue encountered when testing the PubMed API was the rate limit of 3 requests/second. (In addition, when NOT in production, React made a double call at the API which was causing a Too Many Requests error.)

Therefore, first step to solve this was **adding an API key** provided by PubMed which allows for 10 requests/second.

Next, being so many articles (more than 28 000), they can't be processed one by one, meaning the API call for summary can't be done for each one. That's why, the summary call was done using an **array of UIDs**. Another improvement was to process the articles in batches, using a BATCH_SIZE parameter, which allowed to interate over all the existing results. Also, after every call, a wait time (sleep) was added so request do not happen too soon that it would trigger the error (Too Many Requests).

**Remaining limitation**: Being too many articles, it takes a very long time to update the whole table. That is why the total count was capped at around 100 articles (at least for now). Improvements to be made for this case.

### Notables

#### Responsiveness
- The app was adapted for smaller screens. Example: on mobile, the summary will open full screen and the filters will reposition in order to look better (using grid).

#### UX 

- Added a "Remove" filters button so the user can go back to the inital list of articles. This button will reset all the filters.

- Added pagination for the table and the user can go to next or previous page.

- Added loading spinner to show to the user that the articles are fetching.

- Added no results message for the table in case there are no results either from fetching the articles or when filtering.

- Some fields in the table were cleaned. Example, the author names in the table were shortened in case they had more than 50 characters (did this because the user can see the whole summary anyway, would not impact the experience).

#### Testing
- Added a test using Jest and mocking to see if a table would be populated.

### Nice to haves
#### Accessibility

- Option to translate the page.
- Option to convert from text-to-speech (for table rows and summary) or speech-to-text (for input filter fields).
#### Pagination
-  Choose different options for how many rows per page (eg: 5, 7, 10).
- When having a lot of articles (and pages) to go to specific page.

#### Table, filters, summary
- Maybe add more columns for the table.
- Add more filter options. Also maybe filter or search as you type.
- Find a way to clean the abstract (!Important). As of yet, the abstract does not have a clear format (coming from the API). It is returned as text but the abstract differ for each article. (Some do have a pattern - an attempt was to try to extract between last Author Information and Copyright).
- Error message for filters (example: "Year" filter should not allow text, only numbers).

#### Testing
- Add more test cases.

#### API
- Faster loading.
- Update the table as the batches come, not wait for everything. (!important)

## License
This project is for demonstration purposes and is not officially affiliated with PubMed or NCBI.