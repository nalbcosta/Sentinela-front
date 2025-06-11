import { Card, ListGroup, Button } from 'react-bootstrap'
import { 
  HiOutlineDocumentText,
  HiOutlineChatBubbleOvalLeft
} from 'react-icons/hi2'
import FraudBadge from './FraudBadge'

const Sidebar = ({ messages, sidebarCollapsed }) => {
  return (
    <Card className="h-100 border-0 bg-transparent">
      <Card.Body className="d-flex flex-column p-0">
        <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-center py-5">
              <HiOutlineChatBubbleOvalLeft className="text-white mb-3" size={40} />
              {!sidebarCollapsed && (
                <p className="texto-base text-white-50">Nenhuma conversa recente</p>
              )}
            </div>
          ) : (
            messages.map((msg, index) => (
              <ListGroup.Item 
                key={index}
                action 
                className={`border-0 bg-transparent text-white rounded-3 mb-2 d-flex align-items-center justify-content-center ${sidebarCollapsed ? 'p-2' : ''}`}
                style={sidebarCollapsed ? { justifyContent: 'center', padding: '12px 0' } : {}}
              >
                {sidebarCollapsed ? (
                  // Apenas ícones quando colapsado
                  <HiOutlineDocumentText
                    size={24}
                    style={{ color: msg.isFraud ? '#dc3545' : '#28a745' }}
                  />
                ) : (
                <div className="d-flex align-items-center gap-3 w-100">
                  <div className="bg-white rounded-circle p-2">
                    <HiOutlineDocumentText className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-truncate">{msg.text.substring(0, 15)}...</span>
                      <FraudBadge isFraud={msg.isFraud} />
                    </div>
                    <small className="text-white-50">
                      {new Date(msg.timestamp).toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </div>
                </div>
                )}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Sidebar