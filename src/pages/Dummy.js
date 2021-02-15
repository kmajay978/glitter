import React, { useState, useEffect } from "react";
import Stories from 'react-insta-stories';
import { Translator, T, TF, LanguageList, Config } from 'react-translator-component'
// import translate from 'translate-google';

function Dummy() {

  
  const stories = [
    {
        "status_id": 50,
        "url": "http://167.172.209.57/glitter-101/public/profile_images/hii, harmeet",
        "totalviews": "0",
        "type": "text",
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

  Config.default = 'tr';
Config.list = {
  default: 'en',
  list: {
    en: {
      text: 'English',
     
    },
    tr: {
      text: 'Türkçe',
     
    }
  }
}

  function App() {
    return (
      <div>
        <h1>
          {T("There are no facts, only interpretations.")}
        </h1>
        <h6>
          {TF("{0} {1}", "Friedrich", "Nietzsche")}
        </h6>
        <LanguageList />
      </div>
    )
  }
//   const tranObj = {
//     a: 1,
//     b: '1',
//     c: "How are you?\nI'm nice.",
//     d: [true, 'true', 'hi', { a: 'hello', b: ['world']}],
//   }
   
//   translate(tranObj, {to: 'zh-cn', except:['a']}).then(res => {
//       console.log(res)
//   }).catch(err => {
//       console.error(err)
//   })

    return ( 
<div>
      <Stories
      stories={stories}
      defaultInterval={1500}
      width={300}
      height={768}
  />
  <div>
  <Translator>
      <App />
    </Translator>
</div>
</div>
  );
}

export default Dummy;