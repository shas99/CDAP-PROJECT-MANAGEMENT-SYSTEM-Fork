import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import "./SubmissionScreen.css";
// import { Link } from "react-router-dom";
import "./StudentTopicRegistrationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const Submission = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    // const [suggestions,setsuggestions] = useState("")
   
    //image upload to s3
    const [file, setFile] = useState()
    const [description,setDescription] = useState("")
    const [images,setImages] = useState([])
    const [documentID,setDocuemntID] =useState()
    
    useEffect(() => {
       
      const fetchPrivateDate = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        try {
          const { data} = await axios.get("/api/private", config);
          
          setPrivateData(data.data);
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };
  


    

      fetchPrivateDate();
    
    }, [history]);
  
    //Logout feature
    const logOutHandler=()=>{
      localStorage.removeItem("authToken");
      history.push("/login");
  
    };
   

      const postImage = async (e) => {
      
        const formData = new FormData()
        formData.append("image", file)
        formData.append("description",description)

        const config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };
    
        try {

          const { data } = await axios.post(
            "/images",
            formData,
            config
          );
          //This displays image/filename
            console.log(data.imagePath)
            //split 'image/' and storing the filename to setDocumentID() and pass it to download url ex:/images/d322d9d3fa3370a90387d8b9bb54757f
            const splitDocumentID = data.imagePath.slice(8,100)
              console.log(splitDocumentID)
              setDocuemntID(splitDocumentID)
        return data.data 
    
        //   history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };

     const submit = async event => {
         event.preventDefault()
        
         console.log(file)
         
         const result = await postImage({images: file,description})
         alert("File Uploaded successfully !")
        //  setImages([result.image, ...images])
         console.log("THis thisjkncknknr"+result)
         
     }

     const fileSelected = event => {
         const file = event.target.files[0]
         setFile(file)
     }

     const download = e => {
      console.log(e.target.href);
      fetch(e.target.href, {
        method: "GET",
        headers: {}
      })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", description+".pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
      
    }
    
    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back" style={{height:"50rem"}}>
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
           <h1 id="caption">Project Submission</h1>
           <br/>
          
        

<div className="submission-screen">
  
            {/* file upload */}
            <form onSubmit={submit} id="submissionForm">
              <label style={{marginLeft:"5rem"}}>Select file to upload</label>&nbsp;&nbsp;&nbsp;
                <input className="inputs" id="file" onChange={fileSelected} type="file"></input><br></br><br></br>
                <label style={{textAlign:"left",marginLeft:"5rem"}}>Add a descriptoin about file:&nbsp;&nbsp;&nbsp;</label>  
                <input style={{color:"black"}} className="inputs" value={description} onChange={e => setDescription(e.target.value)}type="text"></input><br></br><br></br>
                <button id="btn" type="submit" style={{marginLeft:"21.3rem"}} className="btn btn-primary1">Submit</button><br/>

            </form>

              {/* download try */}
              <br></br>
              <p style={{marginLeft:"-4rem",marginTop:"1rem"}}><em style={{color:"#726e77",fontSize:"0.9rem"}}>Click to download submitted </em> 
              <a
              href={`/images/${documentID} `}
              download
              style={{color:"#073a7c",textDecorationColor:"#002b64",textDecorationStyle:"solid",textDecorationLine:"underline"}}
              onClick={e => download(e)}
              >Document
      </a></p>
      </div>
          <Footer/>
        </div>
      
        </>
      );
    };
    
    export default Submission;