import React, { useState, useEffect } from "react";
import Stories from 'react-insta-stories';
import  $ from 'jquery';
// import translate from 'translate-google';

function Dummy() {


  // const [files , setFiles] =useState([]);
  // useEffect(()=>{
  //   $(document).on("click", "#upload__media", function () {
  //     $('#uploadfile').trigger("click");
  //   });
   
  //   $(document).on("click", "#uploadfile", function (e) {
  //     e.stopPropagation();
  // });
  // })
  

  //  const fileArray = [];
  // const handleFileChange = (e) => {
  //       function createElementWithClass(elementName, className)
  //   {
  //       var el = document.createElement(elementName);

  //       el.className = className;

  //       return el;
  //   }
  //   var outerDiv = createElementWithClass('div', 'media-box')
  //   var x=document.createElement('img'),
  //   y=document.body.appendChild(x);
  //   y.src = URL.createObjectURL(e.target.files[0]);
  //   y.width = '100';
  //  // console.log(y , "Testfiles...");

  //  let imageAppned =  y ;
  //  outerDiv.appendChild(imageAppned)
  //   document.getElementById("myImages").appendChild(outerDiv); 
  //   var fileArray = files;
  //   fileArray.push(imageAppned);
  
  //   setFiles(fileArray);
  //   console.log(files, "Testfiles...");
   
  // }
 
  const stories = [
    {
        "status_id": 50,
        "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAHRCAYAAAD0YZ4eAAAH6klEQVR4Xu3Wv+uucxzH8beRldEgCxtJFiYGUhYGA6UYRBmUTfIrmzKQMtgYGJRFGEwssrAx+QfMVn1O93W63N33+dXjJKfnt9Rxzn29rvt+fJ/X5/u9afqiAjfRtcYmUBzBAr1rZh6fmQ92288c/vztzLw8M+/PzN/43vceNn+/it1bZ+a+mflxZl6bmY9n5q+ruH7/0vUZ/5yZn67x+pOXXQ70c3mzo61XZ+abmbka0Adn5o6ZEe/rPwE9V+gbM/POAeiTmVk4T87MEzNz98w8NzMvzcyLM/PrzDx9BLdgVmXfzcz6YI/NzGeHvWcPYNtr1l+v170yMx/OzKMz88jMrH9fha5r133XPdbXQ4fq1u7aXNf+NjOfHr2H9e937j7H8XVra3sv67XbZ1v3uf/E+71w863QL2bmnqOC1tgp0PXYrf/+mJmbZ+btw5tdN1lfq57tyFh/Xq99b2ZeP3o8t0LXNS/MzJuHI2B9s36YmQdOFLwV+tXukV+gC+bdA/LDM/PlbvOWmfloZt46A3ruunXEbe9lPRXbZ1tH5Kn3e+HouNwjf67QfT1bgQt0O5P2Ba/7nKp0A73tUOv++7m+mb/MzPaN3kpe9a8Pdwy63Xf7efDz0dFw6njZP/L769aTc/xe1v9v99h/9u11W8nXBLr/IXZc6HbTfaHnjuFzhZ56/ba39q8EdJ3NW0WXKvT4G7G/bv9D+Bh/X+i/3u+1FLoe4fUor7Nslff9zHx9+KDbG1zQ67eGdYaur62w/U/kVfFTh7NvfyZt5+B6dLdzel/oKuj5mbl9d4Yew6x7X8kZeqnrNqh1tq5v4v43gm17/5qLj/y5gv7Pf78/51ahp87w6/L5buRf7Pfn+MUz7roo7kZvZNDrbXdyP1DMHmigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVWigWADPVSgG/QcvY7fSnp1+aQAAAABJRU5ErkJggg==",
        "totalviews": "0",
        "type": "image",
        "header": {
            "heading": "Ana Catalina Gaby",
            "subheading": "Posted: 2 hours ago",
            "profileImage": "http://167.172.209.57/glitter-101/public/profile_images/1612613118_download (1).jpeg",
            "age": 21,
            "height": "",
            "weight": "",
            "joining_date": "Jan 22, 2021",
            "relationship_status": "Single"
        },
        seeMore: ({ close }) => {
			return <div onClick={close}>Hello, click to close this.</div>;
		},
    },
    {
        "status_id": 49,
        "url": "http://167.172.209.57/glitter-101/public/profile_images/1612605270_sample.mp4",
        "totalviews": "0",
        "type": "video",
        "header": {
            "heading": "Ana Catalina Gaby",
            "subheading": "Posted: 2 hours ago",
            "profileImage": "http://167.172.209.57/glitter-101/public/profile_images/1612613118_download (1).jpeg",
            "age": 21,
            "height": "",
            "weight": "",
            "joining_date": "Jan 22, 2021",
            "relationship_status": "Single"
        },
        seeMore: ({ close }) => {
			return <div onClick={close}>Hello, click to close this.</div>;
		},
    },
    {
        "status_id": 48,
        "url": "http://167.172.209.57/glitter-101/public/profile_images/1612605182_status-img.jpg",
        "totalviews": "0",
        "type": "image",
        "header": {
            "heading": "Ana Catalina Gaby",
            "subheading": "Posted: 2 hours ago",
            "profileImage": "http://167.172.209.57/glitter-101/public/profile_images/1612613118_download (1).jpeg",
            "age": 21,
            "height": "",
            "weight": "",
            "joining_date": "Jan 22, 2021",
            "relationship_status": "Single"
        },
        seeMore: ({ close }) => {
			return <div onClick={alert("test")}>Hello, click to close this.</div>;
		},
    }
  ];


    return ( 
      <div>                           
                                  
                                   {/* <div className="">
                    <a href="javascript:void(0)" className="theme-txt done-media">Done</a>
                    <h6 className="text-center">Send Photos</h6>

                    <div className="send-photos-listing d-flex my-4">
                        <div className="media-box add-media">
                            <a id="upload__media" href="javascript:void(0)">
                                <img src="/assets/images/add-media.svg" alt="add media"/>
                                <input
                                    id="uploadfile"
                                    type="file"
                                    className="d-none"
                                    onChange={(e) => handleFileChange(e)}
                                    multiple
                                    accept="image/* , video/*"/>
                            </a>
                        </div>

                        <div id="myImages"></div>

                        <div className="media-box">
                            <img src="images/send-media.jpg" alt="media"/>
                        </div>
                        <div className="media-box">
                            <img src="images/send-media.jpg" alt="media"/>
                        </div>
                        <div className="media-box">
                            <span>0:45</span>
                            <img src="images/send-media.jpg" alt="media"/>
                        </div>

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
                </div> */}
                                  
                             
            { <Stories
            stories={stories}
            defaultInterval={1500}
            width={300}
            height={768}
        /> }

      </div>
  );

    }
export default Dummy;