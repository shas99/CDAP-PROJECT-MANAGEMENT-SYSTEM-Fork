import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
import Swal from 'sweetalert2'
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

const UserProfile = ({history}) => { 
  const Swal = require('sweetalert2')
  const [fetchFeedbackData, setFeedbackData] = useState("")
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
  const [imageUploadData, setimageUploadData] = useState({img:{data:{data:""}}});
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

    const fetchFeedbackData = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/userprofilemanagement",userprofileconfig);
       
        setFeedbackData(data.data);
        
      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };

    const fetchImages = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/retrieveImages",userprofileconfig);
       
        setimageUploadData(data.data);
        // data.data.array.forEach(function(image) { 
        //   console.log(image.name)
        // });
      } catch (error) {
          console.log(error)
        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchFeedbackData()
    fetchPrivateDate()
    fetchImages()
  }, [history]);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
 //SUCCESS SWEET ALERT MESSAGE
 Swal.fire({
  title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
    // Handle File Data from the state Before Sending
    const data = new FormData();
    data.append("image", fileData);
    fetch("http://localhost:5000/single", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log("File Sent Successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})

    

   

      
  };

  

 

  // localStorage.setItem("authToken", data.token);

  // history.push("/");

  
  

  
  return  error ? ( 
  
    <span className="error-message">{error}</span>
    
  ) :
  (


 <div className="userprofileClass">
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <Header/>
  <SideNavigationBar page="StudentProfile"/>


<div className="mt-[-50rem] ">
     
      {/* profile image */}
      <div className="ml-[-50rem]">
        <img src={`data:image/png;base64,${Buffer.from(imageUploadData.img.data.data).toString('base64')}`} alt="Profile Picture" loading="lazy" width="15%" height="15%" className="profileiImage" ></img>
      </div>

      <div className="ml-[55rem] mt-[-20rem]">
      <div className="userprofileBox">

      <h2 id="userprofilecaption" >Bio</h2>
      
      <p className="userprofilecontent1"> User Email:{fetchFeedbackData.email}</p> 
      
      <p className="userprofilecontent2"> Username:{fetchFeedbackData.username}</p> 
      
      <p className="userprofilecontent1"> Address: {fetchFeedbackData.address}</p> 
      
      <p className="userprofilecontent2"> Phone Number: {fetchFeedbackData.phoneNumber}</p> 
      
      <div className="btn btn-success"style={{fontSize:"medium",fontWeight:"bold",backgroundColor:'#8256D0',width:"170px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",marginLeft:"125px",padding:"5px",marginTop:"25px"}}> <a href={`/edituserprofile/${fetchFeedbackData._id}`}>  Update Your Profile!</a></div>
     
      
     
      </div>

      {/* <div className="userprofileBox1">
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Skills</h2>
        <button type="button" class="btn btn-primary" id="firstButt">Coding</button>
        <button type="button" class="btn btn-primary" id="secondButt">DevOps</button>
        <button type="button" class="btn btn-primary" id="thirdButt">SQL</button>
        <button type="button" class="btn btn-primary" id="fourthButt">Algorithms</button>
        <button type="button" class="btn btn-primary" id="fifthButt">Heroku</button>
        <button type="button" class="btn btn-primary" id="sixthButt">Java</button>
         
      </div> */}
      </div>

      <div className="ml-[-45rem]">
      
      <form action="/api/imageUpload" method="POST" enctype="multipart/form-data" className="ImageSubmitProfile">
        {/* <input type="file" name="image" style={{marginBottom:"10px"}} placeholder="upd"/> */}


<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
<input name="image"  class="block w-[13rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

        
        {/* <label for="name" style={{color:"royalblue",fontSize:"large",fontWeight:"bold"}}>Image Title</label> */}
        <br/>
        <input type="text" id="name" placeholder="Name" name="name" required>
         
        </input>
              <input type="hidden"  id="ID" name="ID" value={fetchFeedbackData._id} style={{marginBottom:"10px"}}></input>
        <button type="submit"  className="ml-[rem] mt-7 text-white bg-[#121518] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2" >Submit!</button>

        </form>
        </div>

       

 

        
   
      
      
     
     
</div>
</div>



 
    
)  
};

export default UserProfile;
