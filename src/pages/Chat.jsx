import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { FiMenu, FiPlus, FiTrash2, FiChevronLeft, FiChevronRight, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import FraudBadge from '../components/FraudBadge';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.svg';
import Photo from '../assets/NoPhoto.jpeg';
import axios from 'axios';

export default function Chat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')));
  const isLoggedIn = !!currentUser;

  // Carrega mensagens do backend para o usuário logado
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [logoutMsg, setLogoutMsg] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Garante que currentUser tenha id (busca pelo email se necessário)
  useEffect(() => {
    async function ensureUserId() {
      if (currentUser && !currentUser.id && currentUser.email) {
        try {
          const res = await axios.get(`${API_URL}/usuarios/email/${currentUser.email}`);
          if (res.status === 200) {
            setCurrentUser(res.data);
            localStorage.setItem('currentUser', JSON.stringify(res.data));
          }
        } catch {
          setError('Erro ao buscar dados do usuário. Faça login novamente.');
        }
      }
    }
    ensureUserId();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!isLoggedIn || !currentUser.id) return;
      try {
        const response = await axios.get(`${API_URL}/mensagens/usuario/${currentUser.id}`);
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          setMessages([]);
        }
      } catch (err) {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [isLoggedIn, currentUser, API_URL]);

  const toggleTheme = () => {
    document.body.setAttribute('data-bs-theme', 
      document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setLogoutMsg('Logout realizado com sucesso!');
    setTimeout(() => {
      setLogoutMsg("");
      navigate('/login');
    }, 1200);
  };

  // Limpa histórico apenas do usuário logado
  const clearChat = () => {
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // O backend espera um DTO: { usuarioId, conteudo }
      const response = await axios.post(`${API_URL}/mensagens/enviar`, {
        usuarioId: currentUser.id,
        conteudo: input
      });
      if (response.status === 201 && response.data) {
        const msg = response.data;
        setMessages(prev => [
          ...prev,
          {
            id: msg.id,
            conteudo: msg.conteudo,
            usuarioNome: msg.usuarioNome,
            timestamp: new Date().toISOString()
          }
        ]);
        setInput('');
      } else {
        setError('Erro ao enviar mensagem.');
      }
    } catch (err) {
      setError('Erro ao comunicar com o servidor.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <>
      <div className="user-profile">
        {isLoggedIn ? (
          <Link to="/profile" className="d-inline-block">
            <img 
              src={Photo} 
              alt="Perfil" 
              className="profile-pic"
              style={{ 
                border: `2px solid ${messages.length > 0 ? '#0D8BF1' : '#004883'}`
              }}
            />
          </Link>
        ) : (
          <Link to="/login" className="text-decoration-none">
            <FaUserCircle className="profile-pic text-primary" size={45} />
          </Link>
        )}
      </div>

      {/* Botão flutuante da logo para abrir a sidebar no mobile */}
      {sidebarCollapsed && (
        <div className="sidebar-logo-toggle" onClick={toggleSidebar}>
          <img src={logo} alt="Abrir menu" />
        </div>
      )}

      <Container fluid className="chat-container p-0">
        {error && <Alert variant="danger" className="m-3">{error}</Alert>}
        {logoutMsg && <Alert variant="success" className="m-3">{logoutMsg}</Alert>}
        <Row className="g-0 h-100">
          <Col md={3} className={`sidebar position-fixed h-100 ${sidebarCollapsed ? 'collapsed' : ''}`}
          style={{
            width: sidebarCollapsed ? '7vw' : '30vw',
            zIndex: 2
          }}>
            {/* Botão de logout fixo no final */}
            {isLoggedIn && (
              <div className="d-flex justify-content-end">
                <Button 
                  variant="outline-light" 
                  className="logout w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} />
                  {!sidebarCollapsed && "Sair"}
                </Button>
              </div>
            )}
            <Button 
              variant="light" 
              className="sidebar-toggle"
              onClick={toggleSidebar}
              aria-label={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </Button>
            
            <div className="sidebar-content p-4 h-100">
              <div className="text-center mb-5 position-relative">
                <img 
                  src={logo} 
                  alt="Logo Sentinel" 
                  className="logo-icon mb-3" 
                  style={{ width: sidebarCollapsed ? '40px' : '60px', transition: 'all 0.3s' }}
                />
                {!sidebarCollapsed && <h4 className="app-name text-white mb-0 text-uppercase"><b>Sentinel AI</b></h4>}
              </div>
              <Sidebar messages={messages} sidebarCollapsed={sidebarCollapsed} />
            </div>
          </Col>
          
          <Col md={9} className="chat-area p-4" style={{
            marginLeft: sidebarCollapsed ? '7vw' : '30vw',
            width: sidebarCollapsed ? '93vw' : '70vw',
            transition: 'margin-left 0.3s'
          }}>
            <div className="messages-container">
              {messages.map((msg, i) => (
                <div key={msg.id || i} className="message-bubble">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small>{msg.usuarioNome || currentUser.nome}</small>
                    <small>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}</small>
                  </div>
                  <p className="mb-0">{msg.conteudo}</p>
                </div>
              ))}
            </div>

            <Form onSubmit={handleSubmit} className={`chat-input ${messages.length === 0 ? 'empty-state' : ''}`}>
              <div className="d-flex gap-2">
                <Form.Control
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="rounded-pill"
                  disabled={isAnalyzing}
                />
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="rounded-pill px-4"
                  disabled={isAnalyzing || !input.trim()}
                >
                  {isAnalyzing ? 'Analisando...' : 'Analisar'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <div className="chat-actions">
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Novo Chat</Tooltip>}
          >
            <Button variant="primary" onClick={() => setMessages([])}>
              <FiPlus size={20} />
            </Button>
          </OverlayTrigger>
          
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Limpar Histórico</Tooltip>}
          >
            <Button variant="danger" onClick={clearChat}>
              <FiTrash2 size={18} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Modo Escuro</Tooltip>}
          >
            <Button
              variant="primary"
              onClick={toggleTheme}
              style={{margin: 0}}
            >
              <FiSun className="theme-icon-light" />
              <FiMoon className="theme-icon-dark" />
            </Button>
          </OverlayTrigger>
        </div>
      </Container>
    </>
  );
}