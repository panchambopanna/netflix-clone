import "./App.css";
import Row from "./components/rows/Row";
import { urls } from "./requests";
import Banner from "./components/banner/Banner";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={urls.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending" fetchUrl={urls.fetchTrending} />
      <Row title="Top Rated" fetchUrl={urls.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={urls.fecthActionMovies} />
      <Row title="Comedy Movies" fetchUrl={urls.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={urls.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetchUrl={urls.fetchRomanticMovies} />
      <Row title="Documentaries" fetchUrl={urls.fetchDocumentaries} />
    </div>
  );
}

export default App;
