import React, {Component, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cardMedia: {
    objectFit: 'cover',
    objectPosition: 'top',
    userSelect: 'none',
    pointerEvents: 'none',
  },
});


const Dummy = () =>{
 
  return(
     
    // <div className="tinder">
   
  
    // <div className="tinder--cards">
    
    //   <div class="tinder--card" >
    //     <img src="https://placeimg.com/600/300/people"/>
     
    //     <h3 id="question1">Question 1</h3>
      
    //   </div>
     
    //   <div class="tinder--card">
    //     <img src="https://placeimg.com/600/300/nature"/>
    //     <h3>Demo card 3</h3>
    //     <p>This is a demo for Tinder like swipe cards</p>
    //   </div>
    //   <div class="tinder--card">
    //     <img src="https://placeimg.com/600/300/tech"/>
    //     <h3>Demo card 4</h3>
    //     <p>This is a demo for Tinder like swipe cards</p>
    //   </div>
    //   <div class="tinder--card">
    //     <img src="https://placeimg.com/600/300/arch"/>
    //     <h3>Demo card 5</h3>
    //     <p>This is a demo for Tinder like swipe cards</p>
    //   </div>
       <div className="card" >
                          <div className="card-content">
                          <div className="card-image">
                              
                          <img src="https://placeimg.com/600/300/arch"/>
                             </div>
                            <div className="card-titles">
                            <h3>Demo card 5</h3>
                            <p>This is a demo for Tinder like swipe cards</p>
                           </div>  
                          </div>
                       
  
  
    <div class="tinder--buttons">
      <button id="nope"><i class="fa fa-remove"></i></button>
      <button id="love"><i class="fa fa-heart"></i></button>
    </div>
    </div>

//  {/* <MaterialCard className="card">
//       <CardActionArea>
//         <CardMedia
//           className="media"
//           component="img"
//           height="250"
//           image={url}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h6" component="h3">
//             {title}
//           </Typography>
//           <Typography gutterBottom variant="body1" component="h3">
//             {text}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </MaterialCard> */}



    )

}

export default Dummy;
