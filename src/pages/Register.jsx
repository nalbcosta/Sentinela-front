import { Container, Card, Form, Button } from 'react-bootstrap'
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg' // Altere para o caminho correto

const Register = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg rounded-4" style={{ width: '100%', maxWidth: '450px' }}>
        <Card.Body className="p-4 position-relative">
          
          {/* Botão de Retorno */}
          <Link to="/" className="position-absolute top-3 start-3 text-decoration-none">
            <Button variant="link" className="text-secondary p-0">
              <FaArrowLeft className="me-2" />
            </Button>
          </Link>

          {/* Logo do Sistema */}
          <div className="text-center mb-4">
            <img 
              src={logo} 
              alt="Logo do Sistema" 
              className="mb-4" 
              style={{ width: '80px', height: 'auto' }}
            />
            <h2 className="fw-bold">Criar Nova Conta</h2>
            <p className="text-muted mb-0">Proteja suas comunicações</p>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nome Completo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Seu nome"
                className="py-2 rounded-3"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="seu@email.com"
                className="py-2 rounded-3"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                className="py-2 rounded-3"
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3 py-2 rounded-3 fw-semibold"
            >
              Registrar
            </Button>

            <div className="text-center text-muted">
              Já tem conta? {' '}
              <Link 
                to="/login" 
                className="text-primary text-decoration-none fw-semibold hover-link"
              >
                Faça login
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register