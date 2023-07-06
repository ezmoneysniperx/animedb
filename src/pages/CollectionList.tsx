/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css'
import { Link } from 'react-router-dom';
import DeleteConfirmation from "../components/DeleteConfirmation";
import AddCollectionModal from '../components/AddCollectionModal';
import EditCollectionModal from '../components/EditCollectionModal';

function CollectionList() {

  const [collectionName, setCollectionName] = useState('');
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const [addCollectionModal, setAddCollectionModal] = useState(false);

  const [editCollectionModal, setEditCollectionModal] = useState(false);

  const savedCollectionsList = new Array(0);
  for (let [key] of Object.entries(localStorage)) {
    let collectionItems = localStorage.getItem(key);
    let collectionItemsArr = JSON.parse(collectionItems || '{}');
    if (collectionItemsArr.length > 0) {
      let first = collectionItemsArr[0];
      let collectionObj = {
        name: key,
        image: first.image
      }
      savedCollectionsList.push(collectionObj);
    }
    else {
      let collectionObj = {
        name: key,
        image: 'https://images.unsplash.com/photo-1616628188540-925618b98318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
      savedCollectionsList.push(collectionObj);
    }
  }


  const showDeleteModal = (collection: string) => {
    setCollectionName(collection);
    setConfirmationMessage(`Are you sure you want to delete the '${collection}' collection?`);
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = () => {
    localStorage.removeItem(collectionName);
    setDisplayConfirmationModal(false);
  };
  //ADD NEW COLLECTIONS MODAL //
  const showAddCollectionModal = () => {
    setAddCollectionModal(true);
  }

  const hideAddCollectionModal = () => {
    setAddCollectionModal(false);
  };

  const addCollection = (name: string) => {

    const isExist = savedCollectionsList.findIndex(item => name.toUpperCase().trim() === item.name.toUpperCase().trim());

    if (name == "") {
      alert("The Field Cannot Be Empty!");
    } else if (isExist !== -1) {
      alert("The Entered Name Already Exist in Your Collections!");
    } else {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (specialChars.test(name)) {
        alert("Collection Name Must Not Contain Special Characters!");
      } else {
        let array = new Array(0);
        let content = JSON.stringify(array);
        let trimmedName = name.trim();
        localStorage.setItem(trimmedName, content);
        savedCollectionsList.push(trimmedName);
        setAddCollectionModal(false);
      }
    }
  };
  //EDIT COLLECTIONS MODAL //
  const showEditCollectionModal = (collection: string) => {
    setCollectionName(collection);
    setEditCollectionModal(true);
  }

  const hideEditCollectionModal = () => {
    setEditCollectionModal(false);
  };

  const editCollection = (name: string) => {

    const isExist = savedCollectionsList.findIndex(item => name.toUpperCase().trim() === item.name.toUpperCase().trim());

    if (name == "") {
      alert("The Field Cannot Be Empty!");
    } else if (isExist !== -1) {
      alert("The Entered Name Already Exist in Your Collections!");
    } else {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (specialChars.test(name)) {
        alert("Collection Name Must Not Contain Special Characters!");
      } else {
        let content = JSON.parse(localStorage.getItem(collectionName) || '{}');
        let newName = name.trim();
        localStorage.setItem(newName, JSON.stringify(content));
        localStorage.removeItem(collectionName);
        savedCollectionsList.push(newName);
        setEditCollectionModal(false);
      }
    }
  };

  const collectionTitle = css`
  background-color: #F6ECF5;
  `

  const animeContainer = css`
  margin: 25px 50px 0px;
  text-align:center;
  
  `

  const animeCardDiv = css`
  margin: auto;
  `

  const animeCard = css`
  margin-bottom: 25px;
  background-color: #F6F6EB;
  `

  const animeImg = css`
  max-height: 15rem;
  padding: 1rem;
  `
  const animeTitle = css`
  height: 30px
  `
  const buttons = css`
  margin: 0px 3px 0px;
  `


  return (
    <div>
      <div className="container my-3">
        <div className={collectionTitle + " p-5 text-center rounded-3"}>
          <h1 className="text-body-emphasis">Collections</h1>
          <button className="btn btn-sm btn-secondary m-2" onClick={() => showAddCollectionModal()}><i className="bi bi-folder-plus"></i> Add New Collection</button>
          <AddCollectionModal showModal={addCollectionModal} hideModal={hideAddCollectionModal} addCollection={addCollection} />
        </div>
      </div>
      <div className={animeContainer + ' row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5'}>
        {savedCollectionsList.map((collection) => (
          <div className={animeCardDiv + ' col'}>
            <div className={animeCard + " card"}>
              <img className={animeImg + " card-img-top"} src={collection.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className={animeTitle + " card-text"}>{collection.name}</h5>
                <button className={buttons + " btn btn-sm btn-danger"} onClick={() => showDeleteModal(collection.name)}><i className="bi bi-trash3"></i> Delete</button>
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={confirmationMessage} />
                <Link to={'/collections/' + collection.name}><button className={buttons + ' btn btn-primary btn-sm'}><i className="bi bi-info-circle"></i> Details</button></Link>
                <button className={buttons + " btn btn-sm btn-secondary"} onClick={() => showEditCollectionModal(collection.name)}><i className="bi bi-pencil-square"></i> Edit</button>
                <EditCollectionModal showModal={editCollectionModal} hideModal={hideEditCollectionModal} editCollection={editCollection} />
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )

}

export default CollectionList;