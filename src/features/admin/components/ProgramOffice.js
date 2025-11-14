import React, { useState } from 'react';

const ProgramOffice = ({ onBack, onLogout, userRole }) => {
  const [activeTab, setActiveTab] = useState('add-building');
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  
  // Define maroon color
  const maroonColor = '#800000';
  
  // Building form state
  const [buildingForm, setBuildingForm] = useState({
    name: '',
    inchargeName: '',
    inchargePhone: '',
    inchargeEmail: '',
    description: ''
  });

  // Room form state
  const [roomForm, setRoomForm] = useState({
    buildingId: '',
    roomName: '',
    floor: '',
    description: ''
  });

  const handleAddBuilding = (e) => {
    e.preventDefault();
    const newBuilding = {
      id: Date.now(),
      ...buildingForm
    };
    setBuildings([...buildings, newBuilding]);
    setBuildingForm({ name: '', inchargeName: '', inchargePhone: '', inchargeEmail: '', description: '' });
    alert('Building added successfully!');
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!roomForm.buildingId) {
      alert('Please select a building first');
      return;
    }
    
    const newRoom = {
      id: Date.now(),
      ...roomForm,
      buildingName: buildings.find(b => b.id == roomForm.buildingId)?.name
    };
    setRooms([...rooms, newRoom]);
    setRoomForm({ buildingId: '', roomName: '', floor: '', description: '' });
    alert('Room added successfully!');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px',
          marginBottom: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderLeft: `5px solid ${maroonColor}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: maroonColor, margin: 0 }}>
                Program Office Dashboard
              </h1>
              <p style={{ color: '#666', margin: '5px 0 0 0' }}>
                Manage buildings, rooms, and student booking requests
              </p>
            </div>
            <button 
              onClick={onLogout}
              style={{
                background: maroonColor,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Feature Buttons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setActiveTab('add-building')}
            style={{
              background: activeTab === 'add-building' ? maroonColor : 'white',
              color: activeTab === 'add-building' ? 'white' : '#333',
              padding: '25px 20px',
              border: `2px solid ${activeTab === 'add-building' ? maroonColor : '#e0e0e0'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'add-building') {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'add-building') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}></div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Add Buildings & Rooms
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: activeTab === 'add-building' ? 0.9 : 0.7, lineHeight: '1.4' }}>
              Add new buildings and manage rooms
            </p>
          </button>

          <button
            onClick={() => setActiveTab('manage-incharges')}
            style={{
              background: activeTab === 'manage-incharges' ? maroonColor : 'white',
              color: activeTab === 'manage-incharges' ? 'white' : '#333',
              padding: '25px 20px',
              border: `2px solid ${activeTab === 'manage-incharges' ? maroonColor : '#e0e0e0'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'manage-incharges') {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'manage-incharges') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}></div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Manage Incharges
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: activeTab === 'manage-incharges' ? 0.9 : 0.7, lineHeight: '1.4' }}>
              Assign and manage building incharges
            </p>
          </button>

          <button
            onClick={() => setActiveTab('booking-requests')}
            style={{
              background: activeTab === 'booking-requests' ? maroonColor : 'white',
              color: activeTab === 'booking-requests' ? 'white' : '#333',
              padding: '25px 20px',
              border: `2px solid ${activeTab === 'booking-requests' ? maroonColor : '#e0e0e0'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'booking-requests') {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'booking-requests') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}></div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Booking Requests
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: activeTab === 'booking-requests' ? 0.9 : 0.7, lineHeight: '1.4' }}>
              Manage and review room booking requests
            </p>
          </button>

          <button
            onClick={() => setActiveTab('approve-bookings')}
            style={{
              background: activeTab === 'approve-bookings' ? maroonColor : 'white',
              color: activeTab === 'approve-bookings' ? 'white' : '#333',
              padding: '25px 20px',
              border: `2px solid ${activeTab === 'approve-bookings' ? maroonColor : '#e0e0e0'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'approve-bookings') {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'approve-bookings') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}></div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Approve/Reject
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: activeTab === 'approve-bookings' ? 0.9 : 0.7, lineHeight: '1.4' }}>
              Accept or reject bookings with reasons
            </p>
          </button>
        </div>

        {/* Feature Content Area */}
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '10px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minHeight: '400px'
        }}>
          {activeTab === 'add-building' && (
            <div style={{ display: 'grid', gap: '40px' }}>
              {/* Section 1: Add Building */}
              <div style={{ border: `2px solid ${maroonColor}`, borderRadius: '10px', padding: '25px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: maroonColor, marginBottom: '20px' }}>
                  1. Add Building Details
                </h2>
                <form onSubmit={handleAddBuilding} style={{ display: 'grid', gap: '15px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                      Building Name *
                    </label>
                    <input
                      type="text"
                      value={buildingForm.name}
                      onChange={(e) => setBuildingForm({...buildingForm, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                      placeholder="e.g., Tabba Academic Building"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                        Incharge Name *
                      </label>
                      <input
                        type="text"
                        value={buildingForm.inchargeName}
                        onChange={(e) => setBuildingForm({...buildingForm, inchargeName: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                        Phone No *
                      </label>
                      <input
                        type="tel"
                        value={buildingForm.inchargePhone}
                        onChange={(e) => setBuildingForm({...buildingForm, inchargePhone: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                        placeholder="0300-1234567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={buildingForm.inchargeEmail}
                      onChange={(e) => setBuildingForm({...buildingForm, inchargeEmail: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                      placeholder="incharge@iba.edu.pk"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                      Building Description
                    </label>
                    <textarea
                      value={buildingForm.description}
                      onChange={(e) => setBuildingForm({...buildingForm, description: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px',
                        minHeight: '80px'
                      }}
                      placeholder="Short description about the building"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: maroonColor,
                      color: 'white',
                      padding: '12px 30px',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Add Building
                  </button>
                </form>
              </div>

              {/* Section 2: Add Room - FIXED BLUE BORDER */}
              <div style={{ border: `2px solid ${maroonColor}`, borderRadius: '10px', padding: '25px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: maroonColor, marginBottom: '20px' }}>
                  2. Add Room to Building
                </h2>
                <form onSubmit={handleAddRoom} style={{ display: 'grid', gap: '15px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                      Select Building *
                    </label>
                    <select
                      value={roomForm.buildingId}
                      onChange={(e) => setRoomForm({...roomForm, buildingId: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                      required
                    >
                      <option value="">Choose a building</option>
                      {buildings.map(building => (
                        <option key={building.id} value={building.id}>
                          {building.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                        Room Name *
                      </label>
                      <input
                        type="text"
                        value={roomForm.roomName}
                        onChange={(e) => setRoomForm({...roomForm, roomName: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                        placeholder="e.g., Room 101, Lab A"
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                        Floor *
                      </label>
                      <input
                        type="text"
                        value={roomForm.floor}
                        onChange={(e) => setRoomForm({...roomForm, floor: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                        placeholder="e.g., Ground Floor, 1st Floor"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                      Room Description
                    </label>
                    <textarea
                      value={roomForm.description}
                      onChange={(e) => setRoomForm({...roomForm, description: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px',
                        minHeight: '80px'
                      }}
                      placeholder="Room capacity, facilities, equipment"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: maroonColor,
                      color: 'white',
                      padding: '12px 30px',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Add Room
                  </button>
                </form>
              </div>

              {/* Display Added Data */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Added Buildings ({buildings.length})</h3>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {buildings.map(building => (
                      <div key={building.id} style={{ 
                        background: '#f9f9f9', 
                        padding: '10px', 
                        marginBottom: '8px',
                        borderRadius: '5px',
                        border: '1px solid #eee'
                      }}>
                        <div style={{ fontWeight: 'bold', color: maroonColor }}>{building.name}</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Incharge: {building.inchargeName}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          Rooms: {rooms.filter(r => r.buildingId == building.id).length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Added Rooms ({rooms.length})</h3>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {rooms.map(room => (
                      <div key={room.id} style={{ 
                        background: '#f9f9f9', 
                        padding: '10px', 
                        marginBottom: '8px',
                        borderRadius: '5px',
                        border: '1px solid #eee'
                      }}>
                        <div style={{ fontWeight: 'bold', color: maroonColor }}>{room.roomName}</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {room.buildingName} • {room.floor}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{room.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manage-incharges' && (
            <div>
              <h2 style={{ color: maroonColor, marginBottom: '20px' }}>Manage Building Incharges</h2>
              <p>Building incharge management content coming soon...</p>
            </div>
          )}
          
          {activeTab === 'booking-requests' && (
            <div>
              <h2 style={{ color: maroonColor, marginBottom: '20px' }}>View Booking Requests</h2>
              <p>Booking requests management content coming soon...</p>
            </div>
          )}
          
          {activeTab === 'approve-bookings' && (
            <div>
              <h2 style={{ color: maroonColor, marginBottom: '20px' }}>Approve/Reject Bookings</h2>
              <p>Booking approval content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramOffice;