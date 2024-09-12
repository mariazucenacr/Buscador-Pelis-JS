document.getElementById('searchButton').addEventListener('click', searchMovies)

//API UNICO (Este se debe obtener de la pagina https://www.themoviedb.org/ luego de suscribirse):
//let api_key = 
//url base
let urlBase = 'https://api.themoviedb.org/3/search/movie'
//url img
let urlImg = 'https://image.tmdb.org/t/p/w500'

let resultContainer = document.getElementById('results')
    

function searchMovies() {
    resultContainer.innerHTML = 'Cargando...'
    let searchInput = document.getElementById('searchInput').value

    //aqui llamamos al api
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))

}

//vamos a crear una funcion para mostrar los datos en pantalla
function displayMovies(movies) {
    resultContainer.innerHTML = ''
    //si viene vacio muestra un aviso que no encontro las peliculas
    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu busqueda</p>'
        //return se pone para que pueda salir el mensaje de displayMovies
        return
    }

    //si hubiese mas de una pelicula
    movies.forEach(movie => {
        //se crea un div por cada pelicula, esto para crear cada cajita con la info
        let movieDiv = document.createElement('div')
        //aqui estamos llamando a la clase css para que tenga la apariencia de la tarjeta
        movieDiv.classList.add('movie')

        //vamos a mostrar los elementos
        //titulo
        let title = document.createElement('h2')
        title.textContent = movie.title

        //fecha de lanzamiento
        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        //descripcion
        let overview = document.createElement('p')
        overview.textContent = movie.overview

        //imagen
        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        //ahora llamaremos a los elementos en el DIV con appendChild
        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        //el div movieDiv , se tiene que meter en el div principal resultContainer
        resultContainer.appendChild(movieDiv)

    });
}
