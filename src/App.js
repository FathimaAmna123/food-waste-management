import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api';

function App() {
  const [foods, setFoods] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState('foods');

  // Food Form State
  const [foodForm, setFoodForm] = useState({
    foodName: '', quantity: '', category: 'cooked',
    expiryDate: '', location: '', description: '', postedBy: ''
  });

  // User Form State
  const [userForm, setUserForm] = useState({
    name: '', email: '', phone: '', userType: 'restaurant', address: ''
  });

  useEffect(() => {
    fetchFoods();
    fetchDonations();
    fetchUsers();
  }, []);

  // Fetch Functions
  const fetchFoods = async () => {
    const res = await axios.get(`${API}/foods`);
    setFoods(res.data.data);
  };

  const fetchDonations = async () => {
    const res = await axios.get(`${API}/donations`);
    setDonations(res.data.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data.data);
  };

  // Add Food
  const addFood = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/foods`, foodForm);
    fetchFoods();
    setFoodForm({ foodName: '', quantity: '', category: 'cooked', expiryDate: '', location: '', description: '', postedBy: '' });
  };

  // Delete Food
  const deleteFood = async (id) => {
  if(window.confirm('Are you sure you want to delete this food item?')) {
    await axios.delete(`${API}/foods/${id}`);
    fetchFoods();
  }
};

  // Update Food Status
  const updateFoodStatus = async (id, status) => {
    await axios.put(`${API}/foods/${id}`, { status });
    fetchFoods();
  };

  // Add User
  const addUser = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/users`, userForm);
    fetchUsers();
    setUserForm({ name: '', email: '', phone: '', userType: 'restaurant', address: '' });
  };

  // Delete User
  const deleteUser = async (id) => {
  if(window.confirm('Are you sure you want to delete this user?')) {
    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
  }
};

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🍱 Food Waste Management System</h1>
        <p>Reduce waste, feed communities</p>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <button onClick={() => setActivePage('foods')} className={activePage === 'foods' ? 'active' : ''}>🍱 Foods</button>
        <button onClick={() => setActivePage('users')} className={activePage === 'users' ? 'active' : ''}>👤 Users</button>
        <button onClick={() => setActivePage('donations')} className={activePage === 'donations' ? 'active' : ''}>🤝 Donations</button>
      </nav>

      <div className="container">

        {/* FOODS PAGE */}
        {activePage === 'foods' && (
          <div>
            <h2>Add Food Item</h2>
            <form onSubmit={addFood} className="form">
              <input placeholder="Food Name" value={foodForm.foodName} onChange={e => setFoodForm({...foodForm, foodName: e.target.value})} required />
              <input placeholder="Quantity" value={foodForm.quantity} onChange={e => setFoodForm({...foodForm, quantity: e.target.value})} required />
              <select value={foodForm.category} onChange={e => setFoodForm({...foodForm, category: e.target.value})}>
                <option value="cooked">Cooked</option>
                <option value="raw">Raw</option>
                <option value="packaged">Packaged</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
              </select>
              <input type="date" value={foodForm.expiryDate} onChange={e => setFoodForm({...foodForm, expiryDate: e.target.value})} required />
              <input placeholder="Location" value={foodForm.location} onChange={e => setFoodForm({...foodForm, location: e.target.value})} required />
              <input placeholder="Description" value={foodForm.description} onChange={e => setFoodForm({...foodForm, description: e.target.value})} />
              <select value={foodForm.postedBy} onChange={e => setFoodForm({...foodForm, postedBy: e.target.value})} required>
                <option value="">Select User</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
              <button type="submit">Add Food</button>
            </form>

            <h2>Available Foods</h2>
            <div className="cards">
              {foods.map(food => (
                <div key={food._id} className="card">
                  <h3>{food.foodName}</h3>
                  <p>📦 {food.quantity}</p>
                  <p>📍 {food.location}</p>
                  <p>🏷️ {food.category}</p>
                  <p>👤 {food.postedBy?.name || 'Unknown'}</p>
                  <span className={`badge ${food.status}`}>{food.status}</span>
                  <div className="card-buttons">
                    <button className="btn-donate" onClick={() => updateFoodStatus(food._id, 'donated')}>Mark Donated</button>
                    <button className="btn-delete" onClick={() => deleteFood(food._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS PAGE */}
        {activePage === 'users' && (
          <div>
            <h2>Add User</h2>
            <form onSubmit={addUser} className="form">
              <input placeholder="Name" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} required />
              <input placeholder="Email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} required />
              <input placeholder="Phone" value={userForm.phone} onChange={e => setUserForm({...userForm, phone: e.target.value})} required />
              <select value={userForm.userType} onChange={e => setUserForm({...userForm, userType: e.target.value})}>
                <option value="restaurant">Restaurant</option>
                <option value="household">Household</option>
                <option value="ngo">NGO</option>
                <option value="volunteer">Volunteer</option>
              </select>
              <input placeholder="Address" value={userForm.address} onChange={e => setUserForm({...userForm, address: e.target.value})} required />
              <button type="submit">Add User</button>
            </form>

            <h2>Users List</h2>
            <div className="cards">
              {users.map(user => (
                <div key={user._id} className="card">
                  <h3>{user.name}</h3>
                  <p>📧 {user.email}</p>
                  <p>📞 {user.phone}</p>
                  <p>📍 {user.address}</p>
                  <span className="badge available">{user.userType}</span>
                  <div className="card-buttons">
                    <button className="btn-delete" onClick={() => deleteUser(user._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DONATIONS PAGE */}
        {activePage === 'donations' && (
          <div>
            <h2>Donations List</h2>
            <div className="cards">
              {donations.map(donation => (
                <div key={donation._id} className="card">
                  <h3>🍱 {donation.foodItem?.foodName || 'Food Item'}</h3>
                  <p>👤 From: {donation.donatedBy?.name || 'Unknown'}</p>
                  <p>🤝 To: {donation.receivedBy?.name || 'Unknown'}</p>
                  <p>📝 {donation.notes}</p>
                  <span className={`badge ${donation.status}`}>{donation.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;