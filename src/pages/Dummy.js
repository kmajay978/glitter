import React, {useState, useEffect} from "react";
import Stories from 'react-insta-stories';

function Dummy() {

  const stories = [
    {
        url: 'http://167.172.209.57/glitter-101/public/profile_images/1611328573_Snapchat-1342745707.jpg',
        type:'image',
    },
    {
      url: 'http://167.172.209.57/glitter-101/public/profile_images/1611042638_sample-mp4-file.mp4',
      type: 'video',
    },
];
    return ( 
   
      <Stories
      stories={stories}
      defaultInterval={1500}
      width={432}
      height={768}
  />
  );
}

export default Dummy;