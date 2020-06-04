import React from 'react';

const CrewScreen: React.FC = () => (
  <div className="form-group row flex-column flex-sm-row">
    <div className="vol col-sm-3">
      <p>Подходящий экипаж:</p>
    </div>
    <div className="col col-sm-6">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Chevrolet Lachetti</h5>
          <h6 className="card-subtitle mb-2 text-muted">Синий</h6>
          <p className="card-text">кв290уа20</p>
        </div>
      </div>
    </div>
  </div>
);

export default CrewScreen;
