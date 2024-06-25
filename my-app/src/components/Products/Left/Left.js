import React from 'react';
import './Left.css';

const Left = ({ category, setSelectedCategoryId }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col left">
            {category.map((item) => (
              <div className='category' key={item.id} onClick={() => setSelectedCategoryId(item.categoryId)}>
                <p className='men'>{item.categoryName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Left;
