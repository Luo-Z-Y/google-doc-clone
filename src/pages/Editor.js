import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore";

export default function EditDocs({ database }) {
  const isMounted = useRef();
  const db = collection(database, "notes-data");
  let params = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const getQuillData = (value) => {
    setBody(value);
  };

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(db, params.id);
      updateDoc(document, {
        body: body,
      })
        .then(() => {
          toast.success("Document Saved", {
            autoClose: 1000,
          });
        })
        .catch(() => {
          toast.error("Cannot Save Document", {
            autoClose: 1000,
          });
        });
    }, 1500);
    return () => clearTimeout(updateDocsData);
  }, [body]);

  const getData = () => {
    const document = doc(db, params.id);
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title);
      setBody(docs.data().body);
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, []);

  return (
    <div className="editor">
      <ToastContainer />
      <h1>{title}</h1>
      <div>
        <ReactQuill
          className="react-quill"
          value={body}
          onChange={getQuillData}
        />
      </div>
    </div>
  );
}
