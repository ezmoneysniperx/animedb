/** @jsxImportSource @emotion/react */

import React from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { css } from '@emotion/css'

const AddAnimeModal = ({ showModal, hideModal, addAnime, addAnimeToNewCollection, collectionArray }: { showModal: any, hideModal: any, addAnime: any, addAnimeToNewCollection: any, collectionArray: Array<string> }) => {

    const [nameInput, setNameInput] = useState(" ");
    const [state, setState] = useState<{ selections: string[] }>({ selections: [] });

    const handleInputChange = (e: any) => {
        setNameInput(e.target.value);
    }

    const inputForm = css`
	box-shadow: 0px 0px 3px 0px #000;
    `

    const collectionName = css`
    display: inline-block;
    `

    const addBtn = css`
    display: inline-block;
    float: right;
    `

    const renderElement = () => {
        if (collectionArray.length === 0) {
            return (
                <Modal show={showModal} onHide={hideModal} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Collection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <input type="text" className={inputForm + " form-control"} value={nameInput} aria-describedby="emailHelp" onChange={handleInputChange} placeholder='Write new collection name here' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" onClick={hideModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={() => { addAnimeToNewCollection(nameInput); setNameInput(""); }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        } else {
            return (
                <Modal show={showModal} onHide={hideModal} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Anime to Existing Collection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {collectionArray.map((collection) => (
                            <div className="card mb-2">
                                <div className="card-body">
                                    <h5 className={collectionName}>{collection}</h5>
                                    <button className={addBtn + " btn btn-sm btn-primary"} onClick={() => { addAnime(collection) }}><i className="bi bi-plus-square"></i> Add</button>
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={hideModal}>
                            Done
                        </Button>
                    </Modal.Footer>
                </Modal>
            )

        }
    }

    return (
        renderElement()

    )
}

export default AddAnimeModal;