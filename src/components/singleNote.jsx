import { deleteDoc , doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { bodyChange, remove, titleChange } from "../actions";

const firebaseConfig = {
    apiKey: "AIzaSyBPQqWsTOWN21Ro6Db8_Yl-90-7q4-wDgA",
    authDomain: "notes-app-e511f.firebaseapp.com",
    projectId: "notes-app-e511f",
    storageBucket: "notes-app-e511f.appspot.com",
    messagingSenderId: "349381177161",
    appId: "1:349381177161:web:fe9fb2360333419eb97498"
  };

const app = initializeApp(firebaseConfig);

function SingleNote(props) {

    const db = getFirestore(app);

    const dispatch = useDispatch();

    const handleEdit = (e) => {
        const box = document.querySelector(".add-note-form")
        const box_title = document.querySelector("#title");

        const getData = async () => {
            const data = await getDoc(doc(db,"Notes",props.id));
            
            if (data.exists()) {
                box.style.display = "flex";
                dispatch(titleChange(data.data().title));
                dispatch(bodyChange(data.data().body));
                box_title.focus();
                dispatch(remove(props.id));
                delDoc();
            }
        }

        getData();
    }

    const handleDelete = (e) => {
        dispatch(remove(props.id));

        delDoc();
    }

    const delDoc = async (id) => {
        const del = await deleteDoc(doc(db,"Notes",props.id));
    }

    return ( 
        <div className="single-note">
            <h3>{props.title}</h3>
            <p id="text">{props.data}</p>
            <div className="single-note-date">
                <p>Created on: <b>{props.date}</b></p>
                <div className="single-note-date-btn">
                    <span className="material-symbols-outlined" id="edit" onClick={handleEdit}>
                        edit_note
                    </span>
                    <span className="material-symbols-outlined" id="delete" onClick={handleDelete}>
                        delete
                    </span>
                </div>
            </div>
        </div>
     );
}

export default SingleNote;