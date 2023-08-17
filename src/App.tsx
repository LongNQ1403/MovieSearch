import { useState, useEffect } from 'react';
import './App.css';
import searchIcon from '../public/search.svg';
import MovieCart from './movieCard';

const API_URL = 'http://www.omdbapi.com?apikey=4222d661';

function App() {
  // định nghĩa ra 1 state( tên là searchTerm chứa value của input và giá trị khởi tạo ban đầu là "").
  // setSearchTerm(newValue) được sử dụng để cập nhật giá trị cho biến searchTerm.
  // khi mà state thay đổi thì tự động sẽ re-render lại component
  const [searchTerm, setSearchTerm] = useState("");
  // định nghĩa là 1 state( tên là movies chứa danh sách các bộ phim và giá trị ban đầu là mảng rỗng).
  // setMovies(value) sẽ cập nhật giá trị cho biến movies.
  const [movies, setMovies] = useState([]);
   
  // cái hàm callback trong useEffect này sẽ được thực thi khi component re-render
  // sử dụng dependency [] ám chỉ rằng callback sẽ chỉ chạy 1 lần khi component lần đầu tiên được render ra
  useEffect(() => {
    //searchMovies(searchTerm);
    searchMovies("Batman");
  });

  const searchMovies = async (title: string) => {
    //gửi 1 yêu cầu HTTP đến API để tìm kiếm phim với title truyền vào
    const response = await fetch(`${API_URL}&s=${title}`);
    // sau khi hoàn thành thì chuyển đổi respone thành 1 JSON object
    const data = await response.json();
    // set giá trị cho biến movies với giá trị = [{},{},....] là các bộ phim
    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCart movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  )
};


export default App
