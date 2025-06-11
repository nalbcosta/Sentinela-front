import { Spinner, Alert } from 'react-bootstrap';

// Loader component to show a loading spinner or error message
export function Loader({ show = false, text = 'Carregando...'}) {
    if (!show) return null;
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
            <Spinner animation='border' role='status'/>
            <span className="mt-2">{text}</span>
        </div>
    );
}

// AlertMessage component to show error messages (Customizable)
export function AlertMessage({ show = false, variant = "info", message = "", onClose }){
    if (!show || !message) return null;
    return (
        <Alert variant={variant} onClose={onClose} dismissible>
            {message}
        </Alert>
    );
}