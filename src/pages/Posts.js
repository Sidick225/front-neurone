import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Posts.css';

const Posts = ({ onSearch }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [paginate, setPaginate] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, sortBy, paginate });
  };



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token'); 

        if (!token) {
          alert("Vous devez être connecté pour accéder à cette page.");
          navigate('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8300/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setPosts(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts : ", error);
        if (error.response && error.response.status === 401) {
          alert("Session expirée, veuillez vous reconnecter.");
          navigate('/login');
        }
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleLogout = async () => {

    const confirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (!confirmed) {
      return; 
    }
  
    try {
      const token = localStorage.getItem('token'); 
        console.log(token);
        
    //   if (token) {
    //     await axios.delete('http://127.0.0.1:8300/api/auth/logout', {}, { 
    //       headers: {
    //         Authorization: `Bearer ${token}`, 
    //       },
    //     });
    //   }
  
      localStorage.removeItem('token'); 
      alert('Déconnexion réussie !');
      navigate('/login'); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
      alert("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };
  

  const [navClosed, setNavClosed] = useState(false);
  const toggleNav = () => {
    setNavClosed(prevState => !prevState);
  };

  return (
    <div className="dashboard-container">
      <header>
        <div className="logosec">
          <div className="logo">Neurones Posts</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
        </div>

        {/* <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div> */}

        <div className="message">
          <div className="circle"></div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            className="icn"
            alt="message-icon"
          />
          <div className="dp">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>

      <div className="main-container">
        <div className={`navcontainer ${navClosed ? 'navclose' : ''}`}>
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option option1">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt="dashboard"
                />
                <h3>Dashboard</h3>
              </div>

              {/* <div className="option2 nav-option">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="articles"
                />
                <h3>Articles</h3>
              </div>

              <div className="nav-option option3">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  className="nav-img"
                  alt="report"
                />
                <h3>Report</h3>
              </div>

              <div className="nav-option option4">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  className="nav-img"
                  alt="institution"
                />
                <h3>Institution</h3>
              </div>

              <div className="nav-option option5">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                  className="nav-img"
                  alt="blog"
                />
                <h3>Profile</h3>
              </div>

              <div className="nav-option option6">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                  className="nav-img"
                  alt="settings"
                />
                <h3>Settings</h3>
              </div> */}

              <div className="nav-option logout" onClick={handleLogout}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className="nav-img"
                  alt="logout"
                />
                <h3 >Logout</h3>
              </div>
            </div>
          </nav>
        </div>

        <div className="main">
          <div className="searchbar2">
            <input type="text" placeholder="Search" />
            <div className="searchbtn">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                className="icn srchicn"
                alt="search-button"
              />
            </div>
          </div>

          {/* <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">60.5k</h2>
                <h2 className="topic">Article Views</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                alt="Views"
              />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">150</h2>
                <h2 className="topic">Likes</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
                alt="likes"
              />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">320</h2>
                <h2 className="topic">Comments</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                alt="comments"
              />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">70</h2>
                <h2 className="topic">Published</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt="published"
              />
            </div>
          </div> */}

          {/* <div className="report-container"> */}
            
            <div className="table-container">
            <h1>Liste des posts</h1>
            


            <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="search">Recherche</label>
                <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Recherche..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="sortBy">Trier par</label>
                <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                >
                <option value="date">Date</option>
                <option value="title">Titre</option>
                <option value="views">Vues</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="paginate">Résultats par page</label>
                <input
                type="number"
                id="paginate"
                value={paginate}
                onChange={(e) => setPaginate(e.target.value)}
                min="1"
                max="100"
                />
            </div>

            <button type="submit" className="submit-button">
                Recharger
            </button>
            </form>



            <table className="super-table">
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Contenue</th>
                    <th>Crée le</th>
                    <th>Dernière mise à jour</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{new Date(post.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            })} {new Date(post.created_at).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            })}
                        </td>
                        <td>{new Date(post.last_update).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            })} {new Date(post.last_update).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            })}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
  
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Posts;