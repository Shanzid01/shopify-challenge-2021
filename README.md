
# Shopify front-end internship challenge 2021
<img src="https://shanzid01.github.io/shopify-challenge-2021/ograph.png" width="100%" />
<sup> <b><i>PS. The idea was to create an icon which clearly shows that the application is a part of the Shopify brand. Please don't sue me 🙇‍♂️.</i></b> </sup>


### <a href="https://shanzid01.github.io/shopify-challenge-2021/">↗ See demo</a>

## 🎯 Objective
Create a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. <a href="https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit#">See details</a><br/>
### <b> Breakdown: </b>
<ul>
  <li> <b>(Primary)</b> Allow user to nominate <b>five</b> movies see movie nominations </li>
  <li> <b>(Secondary)</b> Search movies from OMDB to nominate </li>
</ul>

## ⚙ Tech stack and tools
<ul>
  <li> Vue + TypeScript front-end development library </li>
  <li> <a href="https://www.gethalfmoon.com/docs/introduction/">Halfmoon UI</a> design framework </li>
  <li> <a href="https://greensock.com/gsap/">GSAP - GreenSock</a> animation library </li>
  <li> <a href="https://fontawesome.com/">fontawesome</a> icons </li>
  <li> <a href="http://www.omdbapi.com/">OMDB API</a> for searching movies </li>
</ul>

## 🎨 UI/UX goals
1. Keep UI clean and visually appealing (W3C-compliant), and only show most relevant info depending on user's intent.
2. Landing page: 
    * Allow user to see the movie nominations as the primary objective of the application.
    * Convey only 5 nominations are required using empty nomination cards.
    * Searching is hidden on this screen since user's intent is to see the nominations.
3. Searching: 
    * Searching (secondary objective) for movies to nominate is possible by clicking on an empty nomination card.
    * Full-screen modal allows user to search and see results (movie titles, year, and poster) when user intends to search. Nominations are hidden (behind modal) when on search screen since user's intent is to search. Using full-screen allows search results to be comprehensive, allowing user to easily identify movies.
    * Choosing a nominee from the results automatically closes the search modal and shows the nomination on the main screen.
    * Cross (x) button on modal allows user to dismiss the search modal. Also possible with Esc key (intuitive for many users).
4. Removing nomination is possible by clicking on a cross (x) icon at the top-right of the nomination card in the main screen. A help tooltip is displayed on hover to ensure user understands the function of the button.
### Extras
5. App's logo should represent relation to the Shopify brand.
6. Limited and meaningful animations to represent flow of information. No animation is longer than 120 milliseconds.
7. User's nominations are saved locally, i.e. reloading page does not empty the list.
8. Dark mode available (duh!). Button to switch between dark/light modes prominently displayed on the main page.
9. Search results are cached to prevent repeated calls to API with the same query.
10. Responsive design to allow use on mobile devices.

<img src="/public/demo.gif"/>

## Using code locally
Install:
`npm i`

Run locally (<a href="http://localhost:8080">http://localhost:8080</a> default):
`npm run serve`

Deploy to GitHub pages:
`npm run deploy`
