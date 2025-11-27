import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Save, XCircle } from 'lucide-react';

// URL de la API Mock (Usamos la URL de trabajo)
const API_URL = 'https://690fa2d345e65ab24ac46de4.mockapi.io/prductos'; 

// Este componente permite la creación y edición de productos (CREATE y UPDATE)
const CrudPage = () => {
    const navigate = useNavigate();
    
    // Estado inicial del formulario (debe coincidir con el esquema de la API: name, price, imageUrl, description)
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
    });
    const [status, setStatus] = useState(''); // Estado de la operación (Guardando, Éxito, Error)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Guardando...');
        
        const method = 'POST'; // Usamos POST para crear un nuevo producto
        
        try {
            const response = await fetch(API_URL, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    price: parseFloat(form.price), // Aseguramos que el precio sea un número
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo ${method === 'POST' ? 'crear' : 'actualizar'} el producto.`);
            }

            // Éxito: Limpiar formulario y notificar
            setForm({ name: '', description: '', price: '', imageUrl: '' });
            setStatus('¡Producto creado con éxito!');

            // Opcional: Redirigir al catálogo después de 1 segundo
            setTimeout(() => navigate('/burguers'), 1000); 

        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };
    
    // Estilos CSS para el CRUD
    const styles = {
        container: { maxWidth: '700px', margin: '2rem auto', padding: '2rem', backgroundColor: '#1f2937', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', color: 'white' },
        title: { fontSize: '2rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1.5rem', borderBottom: '2px solid #374151', paddingBottom: '0.5rem' },
        formGroup: { marginBottom: '1rem' },
        label: { display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#ccc' },
        input: { width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #4b5563', backgroundColor: '#374151', color: 'white' },
        buttonContainer: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' },
        saveButton: { padding: '0.75rem 1.5rem', backgroundColor: '#db2777', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' },
        cancelButton: { padding: '0.75rem 1.5rem', backgroundColor: '#6b7280', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
        statusMessage: { marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold' }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}><PlusCircle size={30} style={{ marginRight: '0.5rem' }} /> {form.id ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
            
            <form onSubmit={handleSubmit}>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nombre del Producto</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} style={styles.input} required />
                </div>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>Descripción</label>
                    <input type="text" name="description" value={form.description} onChange={handleChange} style={styles.input} required />
                </div>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>Precio</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} style={styles.input} required min="0.01" step="0.01" />
                </div>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>URL de la Imagen</label>
                    <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} style={styles.input} required />
                </div>

                <div style={styles.buttonContainer}>
                    <button type="button" style={styles.cancelButton} onClick={() => navigate('/burguers')}>
                        <XCircle size={20} style={{ marginRight: '0.5rem' }} /> Cancelar
                    </button>
                    <button type="submit" style={styles.saveButton}>
                        <Save size={20} style={{ marginRight: '0.5rem' }} /> Guardar Producto
                    </button>
                </div>
                
                {status && (
                    <div style={{...styles.statusMessage, backgroundColor: status.includes('Error') ? '#991b1b' : '#047857' }}>
                        {status}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CrudPage;