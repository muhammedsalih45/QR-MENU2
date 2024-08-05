// src/components/Table.jsx
import React, { useState, useEffect } from 'react';
import '../table2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import ProductModal from './NewProductModal';
import CategoryModal from './NewCategoryModal';


const Table = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/dishes');
      if (!response.ok) {
        throw new Error('Verileri çekmede bir hata oluştu');
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Bir hata oluştu', error);
      setError('Veriler alınamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleCheckboxChange = (id) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.dish_id === id ? { ...row, is_selected: !row.is_selected } : row,
      ),
    );
  };

  const handleToggleChange = (id) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.dish_id === id ? { ...row, is_toggled: !row.is_toggled } : row,
      ),
    );
  };

  const handleSave = () => {
    fetchDishes();
    setShowProductModal(false);
    setShowCategoryModal(false);
  };



  return (
    <div>
      

    <div className="btn-group" role="group">
      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"b>
        + Ekle 
      </button>
      <ul class="dropdown-menu">
        <li className='list' onClick={() => setShowProductModal(true)}>Ürün</li>
        <li className='list' onClick={() => setShowCategoryModal(true)}>Kategori</li>
      </ul>
    </div>


      <CategoryModal show={showCategoryModal} handleClose={() => setShowCategoryModal(false) } handleSave={handleSave}/>
      <ProductModal show={showProductModal} handleClose={() => setShowProductModal(false)} handleSave={handleSave} />

      
      <table className="table">
        <thead className="table-column">
          <tr>
            <th style={{ textAlign: 'left' }}>
              <input
                className="form-check-input"
                type="checkbox"
                id="check1"
                name="option1"
                value="something"
              />
            </th>
            <th>Dish Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Visible</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.dish_id} className={row.is_toggled ? 'faded disabled' : ''}>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check1"
                  name="option1"
                  value="something"
                  checked={row.is_selected}
                  onChange={() => handleCheckboxChange(row.dish_id)}
                  disabled={row.is_toggled}
                />
              </td>
              <td>{row.dish_name}</td>
              <td>{row.description}</td>
              <td>{row.price}</td>
              <td>{row.kategoriler ? row.kategoriler.category_name : 'Kategori Yok'}</td>
              <td className="toggle">
                <FontAwesomeIcon
                  icon={row.is_toggled ? faToggleOn : faToggleOff}
                  onClick={() => handleToggleChange(row.dish_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
