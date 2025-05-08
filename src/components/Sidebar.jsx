import { Card, ListGroup, Button } from 'react-bootstrap'
import { 
  HiOutlineDocumentText,
  HiOutlineChatBubbleOvalLeft
} from 'react-icons/hi2'
import FraudBadge from './FraudBadge'

const Sidebar = ({ messages }) => {
  return (
    <Card className="h-100 border-0 bg-transparent">
      <Card.Body className="d-flex flex-column p-0">
        <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-center py-5">
              <HiOutlineChatBubbleOvalLeft className="text-white mb-3" size={40} />
              <p className="text-white-50">Nenhuma conversa recente</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <ListGroup.Item 
                key={index}
                action 
                className="border-0 bg-transparent text-white rounded-3 mb-2"
              >
                <div className="d-flex align-items-center gap-3">
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
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
        
        <Button 
          variant="light" 
          className="rounded-pill mx-3 mb-3 d-flex align-items-center gap-2"
        >
          <HiOutlineChatBubbleOvalLeft />
          <span>Nova Análise</span>
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Sidebar