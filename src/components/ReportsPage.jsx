import React from 'react';
import TopNavbar from './TopNavbar';
import '../styles/ReportsPage.css';

export default function ReportsPage() {
  return (
    <>
      <TopNavbar hideNavButtons={false} />
      <div className="reports-container">
        <div className="report-block">
          <div className="report-content"></div>
          <div className="report-footer">
            Количество задач, завершенных<br />за определенный период
          </div>
        </div>
        <div className="report-block">
          <div className="report-content"></div>
          <div className="report-footer">
            Визуализация потока задач<br />по колонкам за период
          </div>
        </div>
      </div>
    </>
  );
}
