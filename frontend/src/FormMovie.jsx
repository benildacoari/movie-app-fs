import './catalog.css'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const CREATE = gql`
  mutation($movie: MovieInput!){
    createMovie(movie: $movie) {
      _id
      title
    }
  }
`;

function Catalog() {
    const [createMovieRequest] = useMutation(CREATE);
    
    const createMovieAction = async (event) => {
      event.preventDefault();
      
      //utilitario para obtener los names de un formulario
      const dataForm = new FormData(event.target)
      
      await createMovieRequest({ variables: { "movie": {
		    "title": dataForm.get("title"),
        "image": dataForm.get("image"),
        "description": dataForm.get("description")
      } } })
      
    }

    return (
        <div className="catalogue">
            <form onSubmit={createMovieAction}>
              <p>Title Movie:</p>
              <input name="title" />
              <p>Image:</p>
              <input name="image" />
              <p>Description:</p>
              <input name="description" />
              <br/><br/>
              <input type="submit" value="Create"/>
            </form>
        </div>
    )
}

export default Catalog
