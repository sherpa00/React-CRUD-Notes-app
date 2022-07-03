import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import { add, remove_all } from "../actions";
import SingleNote from "./singleNote";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

const firebaseConfig = {
    apiKey: "AIzaSyBPQqWsTOWN21Ro6Db8_Yl-90-7q4-wDgA",
    authDomain: "notes-app-e511f.firebaseapp.com",
    projectId: "notes-app-e511f",
    storageBucket: "notes-app-e511f.appspot.com",
    messagingSenderId: "349381177161",
    appId: "1:349381177161:web:fe9fb2360333419eb97498"
  };

const app = initializeApp(firebaseConfig);

function NotesList() {

    const notes = useSelector(store => store.notes);

    const db = getFirestore(app);

    /*useEffect(() => {
        const getData = async () => {

            const snapshot = await getDocs(collection(db,"Notes"));
            snapshot.forEach((doc) => {
                const {id,title,body,date} = doc.data();
                dispatch(add(id,title,body,date))
            })
        }
        try {
            getData();
        } catch(err) {
            console.log(err.message);
        }
    },[]) */

    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(remove_all());
        const deleteAll = async () => {
            const snapshot = await getDocs(collection(db,"Notes"));
            snapshot.forEach((d) => {
                const del =  deleteDoc(doc(db,"Notes",d.id))
            })
        }
        deleteAll();
    }


    return ( 
        <div className="notes-list">
            {
               notes.length <= 0 ? <h3>No Notes Found</h3> : notes.map((note,index) => {
                   return <SingleNote 
                            id={note.id}
                            key={index}
                            title={note.title}
                            data={note.body}
                            date={note.date}
                        />
               })
            }
            {
                notes.length <= 0 ? null : <button onClick={handleDeleteAll} id="remove-all">REMOVE ALL</button>
            }
        </div>
     );
}

export default NotesList;