import React, { useState } from 'react';

const AuthorDetails = ({ author, onClose }) => {
  if (!author) {
    return null;
  }

  return (
    <div className="modal">
      <div className="authorDeets">
        <span className="close" onClick={onClose}>&times;</span>
        <img
          className="authorPic"
          key={author.key}
          alt={author.name}
          src={`http://covers.openlibrary.org/a/id/${author.photos[0]}.jpg`}
        />
        <div><b>{author.personal_name}</b></div>
        <div><b>{author.birth_date} - {author.death_date}</b></div>
        <div>{author.bio}</div>
      </div>
    </div>
  );
};

const AuthorSearch = () => {
  const [searchAuthor, setSearchAuthor] = useState('');
  const [data, setData] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://openlibrary.org/search/authors.json?q=${searchAuthor}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.docs);
        console.log(result.docs);
      })
      .catch((error) => console.error(`Sorry, can't get data`, error));
  };

  const handleSelectAuthor = (authorKey) => {
    fetch(`http://openlibrary.org/authors/${authorKey}.json`)
      .then((response) => response.json())
      .then((result) => {
        setSelectedAuthor(result);
        console.log(result);
        openModal();
      })
      .catch((error) => console.error(`Can't get author details:`, error));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div >
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          placeholder="Author Name"
        />
        <button type="submit">Search</button>
      </form>

      <div className="left">
        {data.map((result) => (
          <div id="list" key={result.key}>
            <div>{result.name}</div>
            <button onClick={() => handleSelectAuthor(result.key)}>Select</button>
          </div>
        ))}
      </div>

    {isModalOpen &&
              <AuthorDetails author={selectedAuthor}
                  onClose={closeModal} />}
          
    </div>
  );
};

export default AuthorSearch;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import AuthorDetails from '../components/AuthorDetails';

// FOLLOWING CODE TO ROUTE DOES NOT WORK!

// const Homepage = () => {
//     const [searchAuthor, setSearchAuthor] = useState('');
//     const [data, setData] = useState([]);
//     const [selectedAuthor, setSelectedAuthor] = useState(null);
  
//     const handleSearch = (e) => {
//       e.preventDefault();
  
//       fetch(`http://openlibrary.org/search/authors.json?q=${searchAuthor}`)
//         .then((response) => response.json())
//         .then((result) => {
//           setData(result.docs);
//           console.log(result.docs);
//         })
//         .catch((error) => console.error(`Sorry, can't get details`, error));
//     };
  
//     const handleSelectAuthor = (authorKey) => {
//       fetch(`http://openlibrary.org/authors/${authorKey}.json`)
//         .then((response) => response.json())
//         .then((result) => {
//           setSelectedAuthor(result);
//           console.log(result);
//         })
//         .catch((error) => console.error(`Can't get author details:`, error));
//     };
  
//     return (
//       <Router>
//         <div>
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               value={searchAuthor}
//               onChange={(e) => setSearchAuthor(e.target.value)}
//               placeholder="Author Name"
//             />
//             <button type="submit">Search</button>
//           </form>
  
//           {data.map((result) => (
//             <div id="list" key={result.key}>
//               <div>Author Name: {result.name}</div>
//               <Link to={`/author/${result.key}`}>
//                 <button onClick={() => handleSelectAuthor(result.key)}>Select</button>
//               </Link>
//             </div>
//           ))}
  
//           {selectedAuthor && (
//             <Route path={`/author/${selectedAuthor.key}`}>
//               <AuthorDetailPage author={selectedAuthor} />
//             </Route>
//           )}
//         </div>
//       </Router>
//     );
//   };
  
//   export default Homepage;