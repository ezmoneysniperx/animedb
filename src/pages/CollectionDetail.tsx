/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css'
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from "../components/DeleteConfirmation";
import AddCollectionModal from '../components/AddCollectionModal';

function CollectionDetail() {

    const params = useParams();
    const collectionName = params.collectionId?.toString();
    //const collectionArray = [];

    const [animeName, setAnimeName] = useState('');
    const [animeId, setAnimeId] = useState(0);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

    const [collectionArray, setCollectionArray] = useState(() => {
        const savedItem = localStorage.getItem(collectionName as string);
        const parsedItem = JSON.parse(savedItem || '{}');
        return parsedItem || "";
    });

    const showDeleteModal = (anime: string, animeId: number) => {
        setAnimeName(anime);
        setAnimeId(animeId);
        setConfirmationMessage(`Are you sure you want to delete ${anime} from this collection?`);
        setDisplayConfirmationModal(true);
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const submitDelete = () => {
        let arrayIndex = collectionArray.findIndex((anime: any) => anime.id === animeId);
        let removedElementsArray = collectionArray.splice(arrayIndex, 1);
        console.log(removedElementsArray);
        console.log(arrayIndex);
        console.log(collectionArray);
        localStorage.setItem(collectionName as string, JSON.stringify(collectionArray));
        setCollectionArray(collectionArray);
        setDisplayConfirmationModal(false);
    };

    const navigate = useNavigate();

    const onDivClick = (id: number) => {
        navigate('/' + id);
    };

    const collectionTitle = css`
    margin-top: 15px;
    margin-bottom: 15px;
    `

    const mainContainer = css`
    max-width: 700px;
    `

    const animeCard = css`
    margin-bottom: 10px;
    max-height: 150px;
    `

    const animeImage = css`
    max-height: 130px;
    `

    const animeTitle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-shadow: -1px 1px 0 #000,
                1px 1px 0 #000,
                1px -1px 0 #000,
                -1px -1px 0 #000;
                
    `

    const deleteButton = css`
    float: right;
    border:1px solid rgba(255,255,255);
    `

    return (
        <div className={mainContainer + ' container'}>
            <h2 className={collectionTitle}>{collectionName + ' Collection'}</h2>
            {collectionArray.map((anime: any, index: any) =>
                <div className={animeCard + " card text-bg-dark"} key={index} onClick={() => onDivClick(anime.id)}>
                    <img src={anime.banner} className={animeImage + " card-img"} alt="..." />
                    <div className="card-img-overlay">
                        <button className={deleteButton + " btn btn-sm btn-danger"} onClick={(e) => {
                            e.stopPropagation();
                            showDeleteModal(anime.title, anime.id);
                        }}><i className="bi bi-trash"></i></button>
                        <div className={animeTitle}>
                            <h5 className='card-title' >{anime.title}</h5>
                        </div>
                        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={confirmationMessage} />
                    </div>
                </div>
            )}
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={confirmationMessage} />

        </div>
    )

}

export default CollectionDetail;