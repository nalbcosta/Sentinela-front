import { useState, useEffect } from 'react'
import { Container, Card, Form, Button, Image } from 'react-bootstrap'
import { FaUserEdit, FaUpload, FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Photo from '../assets/NoPhoto.jpeg'
import logo from '../assets/logo.svg' 
import { Loader, AlertMessage } from '../components/Utils'
import axios from 'axios'


const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.id) {
      setLoading(true);
      axios.get(`${apiUrl}/usuarios/${user.id}`)
        .then(res => {
          setNome(res.data.nome || '');
          setEmail(res.data.email || '');
          setTelefone(res.data.telefone || '');
        })
        .catch(() => {
          setMsg('Erro ao carregar dados do perfil.');
          setMsgType('danger');
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (user && user.email) {
      setLoading(true);
      axios.get(`${apiUrl}/usuarios/email/${user.email}`)
        .then(res => {
          setNome(res.data.nome || '');
          setEmail(res.data.email || '');
          setTelefone(res.data.telefone || '');
          // Atualiza localStorage para incluir o id
          localStorage.setItem('currentUser', JSON.stringify(res.data));
        })
        .catch(() => {
          setMsg('Erro ao carregar dados do perfil.');
          setMsgType('danger');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMsg('Usuário não encontrado. Faça login novamente.');
      setMsgType('danger');
    }
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    try {
      setLoading(true);
      const payload = { nome, telefone };
      if (senha) payload.senha = senha;
      const response = await axios.put(`${apiUrl}/usuarios/${user.id}`, payload);
      if (response.status === 200) {
        // Atualize o localStorage com o novo DTO retornado
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        setMsg('Perfil atualizado!');
        setMsgType('success');
      }
    } catch {
      setMsg('Erro ao atualizar perfil!')
      setMsgType('danger');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg rounded-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Card.Body className="p-4 position-relative">
          
          {/* Botão de Retorno */}
          <Link to="/" className="position-absolute top-3 start-3 text-decoration-none">
            <Button variant="link" className="text-secondary p-0">
              <FaArrowLeft className="me-2" />
            </Button>
          </Link>

          {/* Logo do Sistema */}
          <div className="text-center mb-2">
            <img 
              src={logo} 
              alt="Logo do Sistema" 
              style={{ width: '60px', height: 'auto' }}
              className="mb-3"
            />
          </div>

          <div className="text-center mb-4">
            <div className="position-relative d-inline-block">
              <Image 
                src={Photo}
                roundedCircle 
                width={150}
                height={150}
                className="border-4 border-primary-subtle object-fit-cover"
              />
              <Button 
                variant="primary" 
                size="sm" 
                className="rounded-circle position-absolute bottom-0 end-0 shadow-sm"
                style={{ width: '34px', height: '34px' }}
              >
                <FaUpload className="position-relative" style={{ top: '-1px' }} />
              </Button>
            </div>
            <h2 className="mt-3 fw-bold">Meu Perfil</h2>
          </div>

          <Loader loading={loading} text='Carregando Perfil..' />
          <AlertMessage show={!!msg} variant={msgType} message={msg} onClose={() => setMsg('')} />
          {!loading && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nome Completo</Form.Label>
                <Form.Control 
                  type="text" 
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  className="py-2 rounded-3 bg-light"
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Nova Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Deixe em branco para manter a atual"
                  className="py-2 rounded-3"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                />
              </Form.Group>
              {msg && <div className="text-success mb-3">{msg}</div>}

              <div className="d-flex justify-content-end gap-3">
                <Button 
                  variant="outline-secondary" 
                  className="rounded-3 px-4 py-2 fw-semibold"
                  as={Link}
                  to="/"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="rounded-3 px-4 py-2 fw-semibold d-flex align-items-center"
                >
                  <FaUserEdit className="me-2" />
                  Atualizar Perfil
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Profile