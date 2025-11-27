import React from 'react';
import Jukebox from './Jukebox.jsx'; 
import { Home } from 'lucide-react'; 
// Eliminamos la importación de QRCodeMenu ya que no se usa

const RockolaPage = () => { 
    return (
        <main className="main-rockola-page">
            
            {/* COLUMNA ÚNICA: JUKEBOX (Ahora estará centrada) */}
            <div className="jukebox-col">
                 <Jukebox isEmbedded={true} />
            </div>
        </main>
    );
};

export default RockolaPage;