/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { css } from '@emotion/css'
import { useAnimeListQuery } from "../generated/graphql-types"
import { Link} from 'react-router-dom';


function Home() {

  const [page, setPage] = useState(1)
  const { loading, data } = useAnimeListQuery({
    variables: { page: page, perPage: 10 },
  })

  const animeContainer = css`
  margin: 25px 50px 0px;
  text-align:center;
  `

  const animeCardDiv = css`
  margin: auto;
  `

  const animeCard = css`
  margin-bottom: 25px;
  border:1px solid rgba(245, 213, 203);
	box-shadow: 0px 0px 10px 0px #F5D5CB;
  background-color: #F6F6EB;
  `

  const animeImg = css`
  max-height: 15rem;
  padding: 1rem;
  `
  const animeTitle = css`
  height: 60px;
  font-weight: bold;
  `

  const animeLink = css`
  text-color: black;
  text-decoration: none;
  `

  const nextPrevBtn = css`
  margin: 10px;
  background-color: #F5D5CB;
  `

  const detailsBtn = css`
  background-color: #F5D5CB;
  `

  return (
    <div>
      <div className={animeContainer + ' row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5'}>
        {loading || !data ? (<p>Loading...</p>) :
          data?.Page?.media?.map((anime) => (
            <div className={animeCardDiv + ' col'}>
              <div className={animeCard + " card"}>
                <img className={animeImg + " card-img-top"} src={anime?.coverImage?.large ? anime?.coverImage?.large : "..."} alt="Card image cap" />
                <div className="card-body">
                  <p className={animeTitle + " card-text"}>{anime?.title?.romaji}</p>
                  <Link className={animeLink} to={'/' + anime?.id}><button className={detailsBtn + ' btn btn-light btn-md'}>Details</button></Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <button className={nextPrevBtn + ' btn btn-light btn-sm'} disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}><i className="bi bi-caret-left-fill"></i></button>
        <span>Page {page}</span>
        <button className={nextPrevBtn + ' btn btn-light btn-sm'} onClick={() => setPage((prev) => prev + 1)}><i className="bi bi-caret-right-fill"></i></button>
      </div>
    </div>
  );
}

export default Home;