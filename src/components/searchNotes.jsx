import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleNote from "./singleNote";

function SearchNotes() {

    const [searchText,setSearchText] = useState("");
    const [filtered,setFiltered] = useState(null);

    const notes = useSelector(store => store.notes);

    useEffect(() => {
        if (filtered !== null) {
            let eg = notes.filter((el) => el.title.startsWith(searchText))
            setFiltered(eg);
        }
    },[notes])

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
        let eg = notes.filter((el) => el.title.startsWith(searchText))
        setFiltered(eg);
    }

    

    return ( 
        <div className="search-notes">
            <form>
                <input
                    type="text"
                    placeholder="...search notes"
                    value={searchText}
                    onChange={handleTextChange}
                />
            </form>
            {
                filtered === null ? null : <p><b>{filtered.length}</b> Notes Found</p>
            }
            {
                filtered === null ? null : 
                <div className="search-result">
                    {
                        filtered.map((note) => {
                            return <SingleNote
                                        id={note.id}
                                        key={note.id}
                                        title={note.title}
                                        data={note.body}
                                        date={note.date}
                                    />
                        })
                    }
                </div>
            }
        </div>
     );
}

export default SearchNotes;