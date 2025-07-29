import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import Card from "./components/card";

function App() {
    const baseUrl = "http://localhost:3001";
    const [values, setValues] = useState({ nombre: '', costo: '', categoria: '' });
    const [vestidos, setVestidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleClickButton = async () => {
        if (!values?.nombre || !values?.costo || !values?.categoria) {
            setError("Por favor completa todos los campos");
            return;
        }
        
        setError(null);
        setLoading(true);

        try {
            const postResponse = await Axios.post(`${baseUrl}/register`, {
                nombre: values.nombre,
                costo: values.costo,
                categoria: values.categoria,
            });

            const getResponse = await Axios.get(`${baseUrl}/vestidos`);
            setVestidos(getResponse.data);
            setValues({ nombre: '', costo: '', categoria: '' });

        } catch (error) {
            console.error("Error al registrar o actualizar la lista:", error);
            setError("Ocurrió un error al agregar el vestido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchVestidos = async () => {
            setLoading(true);
            try {
                const response = await Axios.get(`${baseUrl}/vestidos`);
                setVestidos(response.data);
            } catch (error) {
                console.error("Error al obtener los vestidos:", error);
                setError("Error al cargar los vestidos");
            } finally {
                setLoading(false);
            }
        };
        
        fetchVestidos();
    }, []);

    return (
        <div className="app-container">
            <div className="main-container">
                <header className="app-header">
                    <h1 className="app-title">DresShop</h1>
                    <p className="app-subtitle">Tu tienda de vestidos favorita</p>
                </header>

                <section className="add-dress-section">
                    <div className="section-header">
                        <h2 className="section-title">Agrega un vestido</h2>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    
                    <div className="form-container">
                        <div className="input-group">
                            <label htmlFor="nombre" className="input-label">Nombre</label>
                            <input 
                                id="nombre"
                                className="form-input" 
                                type="text" 
                                name="nombre" 
                                placeholder="Ej: Vestido de verano" 
                                value={values.nombre}
                                onChange={handleChangeValues} 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="costo" className="input-label">Precio</label>
                            <input 
                                id="costo"
                                className="form-input" 
                                type="text" 
                                name="costo" 
                                placeholder="Ej: $49.99" 
                                value={values.costo}
                                onChange={handleChangeValues} 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="categoria" className="input-label">Categoría</label>
                            <input 
                                id="categoria"
                                className="form-input" 
                                type="text" 
                                name="categoria" 
                                placeholder="Ej: Fiesta, Casual" 
                                value={values.categoria}
                                onChange={handleChangeValues} 
                            />
                        </div>
                        
                        <button 
                            className={`submit-button ${loading ? 'loading' : ''}`} 
                            onClick={handleClickButton}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="button-loader"></span>
                            ) : (
                                'Agregar Vestido'
                            )}
                        </button>
                    </div>
                </section>

                <section className="dresses-section">
                    <h2 className="section-title">Nuestra Colección</h2>
                    
                    {loading && vestidos.length === 0 ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Cargando vestidos...</p>
                        </div>
                    ) : error && vestidos.length === 0 ? (
                        <div className="error-container">
                            <p>{error}</p>
                            <button 
                                className="retry-button"
                                onClick={() => window.location.reload()}
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : (
                        <div className="dresses-grid">
                            {vestidos.length > 0 ? (
                                vestidos.map((vestido) => (
                                    <Card
                                        key={vestido.idvestido}
                                        id={vestido.idvestido}
                                        nombre={vestido.nombre}
                                        costo={vestido.costo}
                                        categoria={vestido.categoria}
                                    />
                                ))
                            ) : (
                                <div className="empty-state">
                                    <img 
                                        src="/empty-dress.png" 
                                        alt="No hay vestidos" 
                                        className="empty-image"
                                    />
                                    <p className="empty-message">No hay vestidos disponibles</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default App;