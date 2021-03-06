import React, { useEffect, useState } from "react";
import $ from 'jquery';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dummy() {
    const [startDate, setStartDate] = useState(new Date());
    const google = window.google;

  //   function initialize() {
  //     var content = document.getElementById('content');
  //     content.innerHTML = '<div id="text">Hola, me alegro mucho de verte.<\/div><div id="translation"/>';
  //     var text = document.getElementById("text").innerHTML;
  //     google.language.translate(text, 'es', 'en', function(result) {
  //         var translated = document.getElementById("translation");
  //         if (result.translation) {
  //             translated.innerHTML = result.translation;
  //         }
  //     });
  // }
  // google.setOnLoadCallback(initialize);
  useEffect (() => { 
  //  initialize();
   $('#trans').click(function() {
    google.language.translate($('#some').html(), 'en', 'fr', function(result) {
        $('#some').html(result.translation);
    });
  });
  },[])

    return ( 
      <div>  
              <p id="some">Hello</p>
        <input id="trans" value="Translate" type="button"/>
                         
    {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} />    */}
   
      </div>
  );
    }
export default Dummy;