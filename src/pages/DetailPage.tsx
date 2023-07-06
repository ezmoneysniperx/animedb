/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css'
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimeDetailsQuery } from "../generated/graphql-types"
import AddAnimeModal from '../components/AddAnimeModal';

function DetailPage() {

  const [animeData, setAnimeData] = useState<Object | null>(null);
  const [displayCollectionModal, setDisplayCollectionModal] = useState(false);
  const [collectionData, setCollectionData] = useState<string[]>([]);

  const params = useParams();
  const animeId = Number(params.animeId);

  const { loading, data } = useAnimeDetailsQuery({
    variables: { perPage: 1, id: animeId },
  })

  useEffect(() => {
    data?.Page?.media?.map((anime) => (
      setAnimeData({
        id: animeId,
        title: anime?.title?.english,
        image: anime?.coverImage?.large,
        banner: anime?.bannerImage
      })
    ))
  }, [data]);

  const savedCollectionsList = new Array(0);
  for (let [key] of Object.entries(localStorage)) {
    savedCollectionsList.push(key);
  }

  useEffect(() => {
    savedCollectionsList.map((collection) => {
      let collectionItems = localStorage.getItem(collection);
      let collectionItemsArr = JSON.parse(collectionItems || '{}');
      var hasMatch = false;
      for (var index = 0; index < collectionItemsArr.length; ++index) {
        var anime = collectionItemsArr[index];
        if (anime.id == animeId) {
          hasMatch = true;
        }
      }
      if (hasMatch) {
        collectionData.push(collection as string)
        setCollectionData(collectionData);
      }
    });
  }, [collectionData]);

  const showDisplayCollectionModal = () => {
    setDisplayCollectionModal(true);
  }

  const hideDisplayCollectionModal = () => {
    setDisplayCollectionModal(false);
  };

  const addAnimeToNewCollection = (name: string) => {
    const isExist = savedCollectionsList.findIndex(item => name.toUpperCase() === item.toUpperCase());

    if (name == "") {
      alert("The Field Cannot Be Empty!");
    } else if (isExist !== -1) {
      alert("The Entered Name Already Exist in Your Collections!");
    } else {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (specialChars.test(name)) {
        alert("Collection Name Must Not Contain Special Characters!");
      } else {
        let contentArr = [];
        contentArr.push(animeData);
        let collectionName = name.trim();
        localStorage.setItem(collectionName, JSON.stringify(contentArr));
        savedCollectionsList.push(collectionName);
        setDisplayCollectionModal(false);
      }
    }
  };

  const addAnimeToExistingCollection = (collection: string) => {
    let savedItem = localStorage.getItem(collection);
    if (savedItem === "[]") {
      let contentArr = [];
      contentArr.push(animeData);
      localStorage.setItem(collection, JSON.stringify(contentArr));
      alert('Successfully Added!');
    } else {
      let arr = [];
      var hasMatch = false;
      arr = JSON.parse(localStorage.getItem(collection) || '{}')
      for (var index = 0; index < arr.length; ++index) {
        var anime = arr[index];
        if (anime.id == animeId) {
          hasMatch = true;
        }
      }
      if (hasMatch) {
        alert('This Anime Already Exist in This Collection!');
      } else {
        arr.push(animeData);
        localStorage.setItem(collection, JSON.stringify(arr));
        alert('Successfully Added!');
      }
    }
  }

  const navigate = useNavigate();

  const onCollectionClick = (collection: string) => {
    navigate('/collections/' + collection);
  };

  const heading = css`
  margin-top: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #F6F6EB;
  border:1px solid rgba(255,255,255);
	box-shadow: 0px 0px 10px 0px #000;
  `
  const descriptionDiv = css`
  margin-top: 25px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #D7ECD9;
  border:1px solid rgba(255,255,255);
	box-shadow: 0px 0px 10px 0px #000;
  text-align: justify;
  `
  const coverImg = css`
  border:1px solid rgba(255,255,255,0.3);
	box-shadow: 0px 0px 10px 0px #000;
  `
  const animeTitles = css`
  text-align: left;
  margin-right: 0px;
  `
  const labels = css`
  border: 2px solid rgba(255, 255, 255, 0.3);
	margin: 5px 2px;
  padding: 0px 6px 0px;
	display: inline-block;
	background:rgba(173,216,230);
  text-decoration:none;
  color: black;
  `
  const genres = css`
  border: 2px solid rgba(255, 255, 255, 0.3);
	margin: 5px 2px;
  padding: 0px 6px 0px;
	display: inline-block;
	background:pink;
  text-decoration:none;
  color: black;
  `
  const collectionsLabel = css`
  margin: 0px 0px 0px 2px; 
  `
  const collections = css`
  border: 2px solid rgba(255, 255, 255, 0.3);
	margin: 1px 2px 5px;
  padding: 0px 6px 0px;
	display: inline-block;
	background:lightgreen;
  text-decoration:none;
  color: black;
  `
  const labelsDiv = css`
  display: inline-block;
  `
  const scoreDiv = css`
    max-width:150px;
    max-height:150px;
  `
  const buttons = css`
	margin: 5px 2px;
  display: inline-block;
  `
  const percentage = 66;

  return (
    <div>
      {loading || !data ? (<p>Loading...</p>) :
        data?.Page?.media?.map((anime) => (
          <div className='container'>
            <div className={heading + ' row'}>
              <div className='col-5'>
                <img className={coverImg + ' float-end img-fluid'} src={anime?.coverImage?.large ? anime?.coverImage?.large : "..."} alt="Card image cap" />
              </div>
              <div className={animeTitles + ' col-7'}>
                <p className="h1">{anime?.title?.english}</p>
                <div className={labelsDiv}>
                  <a className={labels}>{anime?.startDate?.year}</a>
                  <a className={labels}>{anime?.episodes + ' Episodes'}</a>
                </div>
                <div>
                  {anime?.genres?.map((genre) =>
                    <a className={genres}>{genre}</a>
                  )}
                </div>
                {collectionData.length > 0 ? <p className={collectionsLabel}>This anime is in these collections</p> : null}
                <div>
                  {collectionData.map((collection) =>
                    <a className={collections} onClick={() => onCollectionClick(collection)}>{collection}</a>
                  )}
                </div>
                <div>
                  <button className={buttons + " btn btn-sm btn-secondary"} onClick={() => showDisplayCollectionModal()}><i className="bi bi-bookmark-plus"></i> Add to Collection</button>
                  <AddAnimeModal showModal={displayCollectionModal} hideModal={hideDisplayCollectionModal} addAnimeToNewCollection={addAnimeToNewCollection} collectionArray={savedCollectionsList} addAnime={addAnimeToExistingCollection} />
                  <div className={buttons + " dropdown"}>
                    <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-film"></i> Watch Now
                    </button>
                    <ul className="dropdown-menu">
                      {anime?.externalLinks?.map((link: any) =>
                        <li><a className="dropdown-item" href={link.url}>{link.site}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className={descriptionDiv}>
                <h4>Description</h4>
                <p>{anime?.description?.replace(/<[^>]*>/g, '')}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default DetailPage;