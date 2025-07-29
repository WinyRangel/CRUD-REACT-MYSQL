import React, { useState } from "react";
import "./card.css";
import FormDialog from "./dialog/dialog";
import axios from "axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ id, nombre, costo, categoria, onDelete, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const cardOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteGame = async () => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`);
            toast.success(`"${nombre}" eliminado correctamente`);
            if (onDelete) onDelete(id);
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error(`Error al eliminar "${nombre}"`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <FormDialog 
                open={open} 
                onClose={handleClose}
                id={id} 
                nombre={nombre} 
                costo={costo} 
                categoria={categoria} 
                onUpdate={onUpdate}
            />
            
            <div className="card-container">
                <div className="card-content">
                    <div className="card-header">
                        <h3 className="card-title" title={nombre}>{nombre}</h3>
                        <span className="card-price">{formatCurrency(costo)}</span>
                    </div>
                    
                    <div className="card-categoria">
                        <span className={`categoria-tag ${getCategoryClass(categoria)}`}>
                            {categoria}
                        </span>
                    </div>
                    
                    <div className="card-image-placeholder">
                        <div className="image-overlay"></div>
                        <span className="image-text">Ver Detalles</span>
                    </div>
                    
                    <div className="card-actions">
                        <button 
                            className="card-btn edit-btn" 
                            onClick={cardOpen}
                            aria-label={`Editar ${nombre}`}
                            disabled={isDeleting}
                        >
                            <FiEdit2 className="icon" /> 
                            <span>Editar</span>
                        </button>
                        <button 
                            className="card-btn delete-btn" 
                            onClick={handleDeleteGame}
                            aria-label={`Eliminar ${nombre}`}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <span className="spinner"></span>
                            ) : (
                                <>
                                    <FiTrash2 className="icon" /> 
                                    <span>Eliminar</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Función para formatear moneda
const formatCurrency = (value) => {
    if (!value) return '$0.00';
    const number = typeof value === 'string' ? parseFloat(value.replace('$', '')) : value;
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(number);
};

// Función para clases de categoría
const getCategoryClass = (categoria) => {
    if (!categoria) return '';
    const normalized = categoria.toLowerCase().replace(/\s+/g, '-');
    return `categoria-${normalized}`;
};

export default Card;