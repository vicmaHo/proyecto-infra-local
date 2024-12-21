
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Building, 
  DollarSign, 
  MapPin, 
  Check, 
  Key 
} from 'lucide-react';
import '../../Styles/TenantProfile.css';
import { Encabezado } from '../Encabezado';

const TenantProfile = (userData) => {
  const [visibleComments, setVisibleComments] = useState(2);

  // Mock data for comments
  const comments = [
    { 
      id: 1, 
      text: "Excelente inquilino, siempre paga a tiempo.", 
      author: "Carlos Martínez",
      date: "Hace 2 meses"
    },
    { 
      id: 2, 
      text: "Muy respetuoso con la propiedad y los vecinos.", 
      author: "Laura Sánchez",
      date: "Hace 3 meses"
    },
    { 
      id: 3, 
      text: "Comunicación clara y responsable.", 
      author: "Roberto Guzmán",
      date: "Hace 4 meses"
    }
  ];

  const loadMoreComments = () => {
    setVisibleComments(prev => Math.min(prev + 2, comments.length));
  };

  return (
    <section>
    <Encabezado></Encabezado>
    <div className="tenant-profile">
      <div className="profile-header">
        <img 
          src="profile_picture_url" 
          alt="Foto de perfil" 
          className="profile-pic" 
        />
        <div className="profile-header-info">
          <h2 className="profile-name">{userData.userData.name}</h2>
          <p className="bio">Estudiante de ingeniería en busca de un apartamento cerca de la universidad.</p>
        </div>
      </div>
      
      <div className="contact-info">
        <h3 className="section-title">Información de Contacto</h3>
        <p><Phone className="icon" /> Teléfono: +57 123 456 7890</p>
        <p><Mail className="icon" /> Correo electrónico: {userData.userData.email}</p>
      </div>
      
      <div className="rental-history">
        <h3 className="section-title">Historial como arrendatario</h3>
        <div className="comments-section">
          {comments.slice(0, visibleComments).map(comment => (
            <div key={comment.id} className="comment">
              <p><MessageCircle className="icon" /> {comment.text}</p>
              <small>- {comment.author}, {comment.date}</small>
            </div>
          ))}
        </div>
        {visibleComments < comments.length && (
          <button 
            className="load-more-btn" 
            onClick={loadMoreComments}
          >
            Cargar más comentarios
          </button>
        )}
      </div>
      
      <div className="preferences">
        <h3 className="section-title">Preferencias</h3>
        <div className="preferences-list">
          <p><Building className="icon" /> Tipos de propiedades: Estudio, Departamento compartido, Casa</p>
          <p><DollarSign className="icon" /> Presupuesto mensual: $500 - $1000</p>
          <p><MapPin className="icon" /> Ubicación preferida: Cerca de la universidad</p>
        </div>
      </div>
      
      <div className="verifications">
        <h3 className="section-title">Verificaciones</h3>
        <p><Key className="icon" /> Documento de identificación: <span className="verification-status">Verificado</span></p>
        <p><DollarSign className="icon" /> Prueba de ingresos: <span className="verification-status">Verificado</span></p>
        <p><Check className="icon" /> Redes sociales: <span className="verification-status">Verificadas</span></p>
      </div>
    </div>
    </section>
  );
};

export default TenantProfile;