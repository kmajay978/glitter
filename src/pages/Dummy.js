import React, { useState, useEffect } from "react";
import Stories from 'react-insta-stories';
import  $ from 'jquery';
// import translate from 'translate-google';

function Dummy() {

  const [files , setFiles] =useState([]);
  useEffect(()=>{
    $(document).on("click", "#upload__media", function () {
      $('#uploadfile').trigger("click");
    });
   
    $(document).on("click", "#uploadfile", function (e) {
      e.stopPropagation();
  });
  })
  
  let fileObj = [];
   const fileArray = [];
  const handleFileChange = (e) => {
    var x=document.createElement('img'),
    y=document.body.appendChild(x);
    y.src = URL.createObjectURL(e.target.files[0]);
    y.width = '100'
   // console.log(y , "Testfiles...");

    var fileArray = files;
    fileArray.push(y.src);
  
    setFiles(fileArray);
    console.log(files, "Testfiles...");
     // fileObj.push(e.target.files)
    //                 for (let i = 0; i < fileObj[0].length; i++) {
    //                     fileArray.push(URL.createObjectURL(fileObj[0][i]))
    //                 }
    //                 setFiles({ file: fileArray })
  }
 
  // const stories = [
  //   {
  //       "status_id": 50,
  //       "url": "http://167.172.209.57/glitter-101/public/profile_images/hii, harmeet",
  //       "totalviews": "0",
  //       "type": "text",
  //       "header": {
  //           "heading": "Ana Catalina Gaby",
  //           "subheading": "Posted: 2 hours ago",
  //           "profileImage": "http://167.172.209.57/glitter-101/public/profile_images/1612613118_download (1).jpeg",
  //           "age": 21,
  //           "height": "",
  //           "weight": "",
  //           "joining_date": "Jan 22, 2021",
  //           "relationship_status": "Single"
  //       },
  //       seeMore: ({ close }) => {
	// 		return <div onClick={close}>Hello, click to close this.</div>;
	// 	},
  //   },
  //   {
  //       "status_id": 49,
  //       "url": "http://167.172.209.57/glitter-101/public/profile_images/1612605270_sample.mp4",
  //       "totalviews": "0",
  //       "type": "video",
  //       "header": {
  //           "heading": "Ana Catalina Gaby",
  //           "subheading": "Posted: 2 hours ago",
  //           "profileImage": "http://167.172.209.57/glitter-101/public/profile_images/1612613118_download (1).jpeg",
  //           "age": 21,
  //           "height": "",
  //           "weight": "",
  //           "joining_date": "Jan 22, 2021",
  //           "relationship_status": "Single"
  //       },
  //       seeMore: ({ close }) => {
	// 		return <div onClick={close}>Hello, click to close this.</div>;
	// 	},
  //   },
  //   {
  //       "status_id": 48,
  //       "url": "http://167.172.209.57/glitter-101/public/profile_images/1612605182_status-img.jpg",
  //       "totalviews": "0",
  //       "type": "image",
  //       "header": {
  //           "heading": "Ana Catalina Gaby",
  //           "subheading": "Posted: 2 hours ago",
  //           "profileImage": "http://167.172.209.57/glitter-101/public/profile_images/1612613118_download (1).jpeg",
  //           "age": 21,
  //           "height": "",
  //           "weight": "",
  //           "joining_date": "Jan 22, 2021",
  //           "relationship_status": "Single"
  //       },
  //       seeMore: ({ close }) => {
	// 		return <div onClick={alert("test")}>Hello, click to close this.</div>;
	// 	},
  //   }
  // ];



 
  

    return ( 
      <div>                           
                                  <div className="">
                                     <a href="javascript:void(0)" className="theme-txt done-media">Done</a>
                                      <h6 className="text-center">Send Photos</h6>
                                      
                                      <div className="send-photos-listing d-flex my-4">
                                      <div className="media-box add-media">
                                                <a id="upload__media"   href="javascript:void(0)">
                                                <img src="/assets/images/add-media.svg" alt="add media" />
                                                 <input id="uploadfile" type="file" className="d-none" onChange={(e) =>handleFileChange(e)} multiple accept="image/* , video/*"/>
                                                    </a>
                                                </div> 
                                                {  files.length > 0 ?
                                                    <>
                                                        {files.map((file , index) =>  {
                                                         return <div className="media-box" id="media_box">
                                                           {file}
                                                           
                                             </div>})}
                                                       </>
                                                        :""

                                                           }
                                                         
                                         
                                          {/* <div className="media-box">
                                              <img src="images/send-media.jpg" alt="media"/>
                                          </div>
                                          <div className="media-box">
                                              <img src="images/send-media.jpg" alt="media"/>
                                          </div>
                                          <div className="media-box">
                                             <span>0:45</span>
                                              <img src="images/send-media.jpg" alt="media"/>
                                          </div> */}
                                          
                                      </div>
                                      
                                      <h6>Put Price</h6>
                                      <div className="image-coins d-flex">
                                      <div className="coin-price">
                                          <input type="radio" id="coin-value1" name="coin"/>
                                          <label for="coin-value1">0 coins</label>
                                         
                                      </div>
                                      
                                      <div className="coin-price">
                                         <input type="radio" id="coin-value2" name="coin"/>
                                          <label for="coin-value2">50 coins</label>
                                          
                                      </div>
                                      
                                      <div className="coin-price">
                                         <input type="radio" id="coin-value3" name="coin"/>
                                          <label for="coin-value3">100 coins</label>
                                          
                                      </div>
                                      
                                      <div className="coin-price">
                                         <input type="radio" id="coin-value4" name="coin"/>
                                          <label for="coin-value4">250 coins</label>
                                          
                                      </div>
                                      </div>
                                  </div>
                             
            {/* <Stories
            stories={stories}
            defaultInterval={1500}
            width={300}
            height={768}
        /> */}

      </div>
  );

    }
export default Dummy;