import React from 'react';
import styles from './App.module.scss';
import OrderForm from '../OrderForm';


const App: React.FC = () => (
  <div className="container-md">
    <header className={styles.header}>
      <div className="row justify-content-center">
        <h2>Детали заказа</h2>
      </div>
    </header>

    <main className={styles.main}>
      <div className="row justify-content-center">
        <div className="col col-md-12 col-lg-9 col-xl-8">
          <OrderForm />
        </div>
      </div>
    </main>

    <footer className="visually-hidden" />

  </div>
);

export default App;
