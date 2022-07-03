import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {addDoc, collection, getDoc, getDocs, getFirestore,doc} from "firebase/firestore";
import { add, bodyChange, titleChange } from "../actions";
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

function AddNote() {

    const [added,setAdded] = useState(false);

    const db = getFirestore(app);

    //title store state
    const title = useSelector(store => store.title);

    //body store state
    const body = useSelector(store => store.body);

    useEffect(() => {
        const getData = async () => {

            const snapshot = await getDocs(collection(db,"Notes"));
            snapshot.forEach((doc) => {
                const {title,body,date} = doc.data();
                dispatch(add(doc.id,title,body,date))
            })
        }
        try {
            getData();
        } catch(err) {
            console.log(err.message);
        }
    },[]) ;

    // dispathc func
    const dispatch = useDispatch();

    const boxref = createRef();

    const handleShowBox = () => {
        boxref.current.style.display = "flex";
    }

    const handleCloseBox = () => {
        boxref.current.style.display = "none";
    }

    const handleSubmit = (e) => {
        let d = new Date()
        let d_date = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDay()} (${d.getHours()}:${d.getUTCMinutes()})`;
        /*const addRef = addDoc(collection(db,"Notes"),{
            title: title,
            body: body,
            date: d_date
        });*/
        addToDB(title,body,d_date);
        //dispatch(add(id,title,body,d_date));
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
        },2000);
        handleCloseBox();
        dispatch(titleChange(""));
        dispatch(bodyChange(""));
    }

    const addToDB = async (title,body,date) => {
        const addRef = await addDoc(collection(db,"Notes"),{
            title: title,
            body: body,
            date: date
        });
        showDataAfterSubmit(addRef.id);
    }

    const showDataAfterSubmit = async (id) => {
        const docRef = await getDoc(doc(db,"Notes",id));
        
        if (docRef.exists()) {
            const {title,body,date} = docRef.data();
            dispatch(add(docRef.id,title,body,date));
        }
    }

    const handleBodyChange = (e) => {
        dispatch(bodyChange(e.target.value));
    }

    const handleTitleChange = (e) => {
        dispatch(titleChange(e.target.value));
    }

    return ( 
        <div className="add-note">
            <button className="addNote" onClick={handleShowBox}>
                <span className="material-symbols-outlined">
                    add
                </span>
            </button>
            {
                added ? <p style={{color: "green"}}><b>NOTE ADDED SUCCESSFULLY</b></p> : null
            }
            <div className="add-note-form" ref={boxref}>
                <span className="material-symbols-outlined" onClick={handleCloseBox}>
                    close
                </span>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Title" id="title" value={title} onChange={handleTitleChange}/>
                <label htmlFor="body">Body</label>
                <textarea id="body" value={body} onChange={handleBodyChange}>

                </textarea>
                <button onClick={handleSubmit}>
                    Submit Note
                </button>
            </div>
        </div>
     );
}

export default AddNote;