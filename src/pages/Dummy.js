import React, { useState, useEffect } from "react";
import Stories from 'react-insta-stories';

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
        }
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
        }
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
        }
    }
  ];

    return ( 

      <Stories
      stories={stories}
      defaultInterval={1500}
      width={300}
      height={768}
  />
  );
}

export default Dummy;