import { useState } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.svg'
import { Loader, AlertMessage } from '../components/Utils';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Função para lidar com registro (futuramente adicionar chamada à API)
  const handleRegister = async (e) => {
      e.preventDefault()
      setErro('');
      setSucesso('');
      setLoading(true);

      if (!nome || !email || !senha || !telefone) {
      setErro('Preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/usuarios/cadastro`, {
        nome,
        email,
        telefone,
        senha
      });

      if (response.status === 201) {
        setSucesso('Cadastro realizado com sucesso!');
        setTimeout(() => {
          setSucesso('');
          navigate('/login');
        }, 1800);
      }
    } 
    catch (err) {
      if (err.response && err.response.status === 400) {
        setErro('Email já cadastrado.');
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    }
    finally {
      setLoading(false);
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
            <h2 className="fw-bold">Criar Nova Conta</h2>
            <p className="text-muted mb-0">Proteja suas comunicações</p>
          </div>

          <Form onSubmit={handleRegister}>
            <Loader show={loading} text="Registrando..." />
            <AlertMessage show={!!erro} variant="danger" message={erro} onClose={() => setErro('')} />
            <AlertMessage show={!!sucesso} variant="success" message={sucesso} onClose={() => setSucesso('')} />
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nome Completo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Seu nome"
                className="py-2 rounded-3"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="seu@email.com"
                className="py-2 rounded-3"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Telefone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="(99) 99999-9999"
                className="py-2 rounded-3"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                className="py-2 rounded-3"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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