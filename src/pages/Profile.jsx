import { Container, Card, Form, Button, Image } from 'react-bootstrap'
import { FaUserEdit, FaUpload, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Photo from '../assets/NoPhoto.jpeg'
import logo from '../assets/logo.svg' // Altere para o caminho correto

const Profile = () => {
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
                className="border border-4 border-primary-subtle object-fit-cover"
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

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nome Completo</Form.Label>
              <Form.Control 
                type="text" 
                defaultValue="Fulano da Silva"
                className="py-2 rounded-3"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue="fulano@email.com"
                className="py-2 rounded-3 bg-light"
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Nova Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Deixe em branco para manter a atual"
                className="py-2 rounded-3"
              />
            </Form.Group>

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
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Profile