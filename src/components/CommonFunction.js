import React, {Component, useEffect} from 'react';


// Common function toggle
export default function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);
  return [value, toggle];
}

export function addBodyClass(className) {
   return ()  => useEffect(() => {
  document.body.className = className;
  return () => { document.body.className = 'no-bg'; }
});

}


