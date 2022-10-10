import './catalog.css'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const CATALOGUE = gql`
  query{
    movies{
      _id
      title
      description
      image
      likes
    }
  }
`;

const LIKE = gql`
  mutation($movieUniqueId: ID!){
    incrementLikes(movieId: $movieUniqueId) {
      title
      likes
  }
}
`;

const DELETE = gql`
  mutation($movieUniqueId: ID!){
    deleteMovie(movieId: $movieUniqueId) {
      title
    }
  }
`;

function Catalog() {
  const [ incrementLikeRequest ] = useMutation(LIKE);
  const [ deleteMovieRequest ] = useMutation(DELETE);
  const [ loadCatalogRequest , { error, data}] = useLazyQuery(CATALOGUE);

  //  query variables (playground) 
  const like = async (id) => {
    await incrementLikeRequest({variables: {movieUniqueId: id}})
    loadCatalogRequest({fetchPolicy: "no-cache"})
  }

  const deleteMovie = async (id) => {
    console.log(id);
    await deleteMovieRequest({variables: {movieUniqueId: id}})
    loadCatalogRequest({fetchPolicy: "no-cache"})
  }

  useEffect(() => {
    loadCatalogRequest()
  }, [])

  if (error) return <p>Error :(</p>;

  return (
    <div className="catalogue">
      {
        (data ?? {}).movies?.map(({ _id, title, description, image, likes }) => (
          <div key={_id} className="card-movie">
            <h3>{title}</h3>
            <img alt="location-reference" src={`${image}`} className="photo" />
            <br />
            <b>About this movie:</b>
            <p>{description}</p>
            <p>{likes}</p>
            <button onClick={() => like(_id)}>Like</button>
            <button onClick={() => deleteMovie(_id)}>Delete</button>
            <br />
          </div>
        ))
      }
    </div>
  )
}

export default Catalog
