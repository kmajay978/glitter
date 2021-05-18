import React from 'react';
const Loader = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="loader center">
        <i className="fa fa-cog fa-spin" />
      </div>
    );
  }
  return null;
};
export default Loader;
