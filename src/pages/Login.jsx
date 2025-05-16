import { useState } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { FaSignInAlt, FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg' // Altere para o caminho correto

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  //Função para lidar com login(Precisa ser implementado o API do Backend)
  const handleLongin = async (e) => {
    e.preventDefault()
    setErro('')

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.senha === senha)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      navigate('/dashboard')
    } else {
      setErro('Email ou senha inválidos.')
    }
  }

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
            <h2 className="fw-bold">Acesso ao Sentinel</h2>
            <p className="text-muted mb-0">Análise de fraudes em tempo real</p>
          </div>

          <Form onSubmit={handleLongin}>
            {erro && <div className="text-danger mb-3">{erro}</div>}
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
              Entrar
            </Button>

            <div className="text-center text-muted mt-4">
              Não tem conta? {' '}
              <Link 
                to="/register" 
                className="text-primary text-decoration-none fw-semibold hover-link"
              >
                Criar conta
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login