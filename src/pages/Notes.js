import { useState, useEffect, useRef } from "react";
import "../App.css";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Notes({ database }) {
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
  const isMounted = useRef();
  const db = collection(database, "notes-data");

  const addNotes = () => {
    addDoc(db, {
      title: title,
      body: "",
    })
      .then(() => {
        alert("Data Added");
      })
      .catch(() => {
        alert("Cannot add data");
      });
  };

  const getData = () => {
    onSnapshot(db, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, []);

  const openEditor = (id) => {
    navigate(`/Editor/${id}`);
  };

  return (
    <div>
      <button onClick={() => setIsAdd(!isAdd)}>Add Notes</button>
      {isAdd ? (
        <div>
          <input
            placeholder="Enter a Title..."
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button onClick={addNotes}>Add</button>
        </div>
      ) : (
        <></>
      )}
      <div>
        {docsData.map((docs) => {
          return (
            <div onClick={() => openEditor(docs.id)}>
              <p className="docs">{docs.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
